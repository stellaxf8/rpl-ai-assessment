import { useState } from "react";
import { ArrowLeft, ArrowRight, Server, Database, Users, Puzzle, DollarSign, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { questions, Question } from "@/lib/assessment-data";
import { quickQuestions } from "@/lib/quick-assessment-data";
import { getIndustryQuestionVariation, hasIndustryVariations } from "@/lib/industry-questions";
import IndustrySelection from "@/components/assessment/industry-selection";
import AssessmentTypeSelection from "@/components/assessment/assessment-type-selection";
import { Assessment } from "@shared/schema";

interface QuestionnaireProps {
  onComplete: (assessment: Assessment) => void;
  onBack: () => void;
}

const getIconComponent = (iconName: string) => {
  const iconMap = {
    Server: Server,
    Database: Database,
    Users: Users,
    Puzzle: Puzzle,
    DollarSign: DollarSign,
    Shield: Shield,
  };
  const IconComponent = iconMap[iconName as keyof typeof iconMap] || Server;
  return <IconComponent className="text-[#cd0000]" />;
};

export default function Questionnaire({ onComplete, onBack }: QuestionnaireProps) {
  const [assessmentType, setAssessmentType] = useState<'detailed' | 'quick' | ''>("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [showAssessmentTypeSelection, setShowAssessmentTypeSelection] = useState(true);
  const [showIndustrySelection, setShowIndustrySelection] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [organizationName, setOrganizationName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [showContactForm, setShowContactForm] = useState(false);

  // Reset function to clear all assessment state
  const resetAssessment = () => {
    setAssessmentType("");
    setSelectedIndustry("");
    setShowAssessmentTypeSelection(true);
    setShowIndustrySelection(false);
    setCurrentQuestion(0);
    setResponses({});
    setOrganizationName("");
    setContactEmail("");
    setShowContactForm(false);
  };

  // Get questions based on assessment type and industry
  const getQuestionsForAssessment = (): Question[] => {
    // For quick assessment, use quick questions (no industry customization)
    if (assessmentType === 'quick') {
      return quickQuestions;
    }
    
    // For detailed assessment, use full questions with industry customization
    if (assessmentType === 'detailed') {
      if (!selectedIndustry || !hasIndustryVariations(selectedIndustry)) {
        return questions;
      }

      return questions.map(question => {
        const industryVariation = getIndustryQuestionVariation(selectedIndustry, question.id);
        if (industryVariation) {
          return {
            ...question,
            question: industryVariation.question,
            description: industryVariation.description,
            options: industryVariation.options
          };
        }
        return question;
      });
    }
    
    return [];
  };

  const assessmentQuestions = getQuestionsForAssessment();

  const submitAssessment = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/assessments", data);
      return response.json();
    },
    onSuccess: (assessment: Assessment) => {
      onComplete(assessment);
    },
    onError: (error: Error) => {
      console.error('Assessment submission failed:', error.message || "Failed to submit assessment. Please try again.");
    },
  });

  const currentQuestionData = assessmentQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;

  const handleAnswerSelect = (value: string) => {
    setResponses({
      ...responses,
      [currentQuestionData.id]: parseInt(value),
    });
  };

  const handleNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowContactForm(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (showIndustrySelection) {
      setShowAssessmentTypeSelection(true);
      setShowIndustrySelection(false);
    } else if (showAssessmentTypeSelection) {
      resetAssessment();
      onBack();
    } else {
      if (assessmentType === 'detailed') {
        setShowIndustrySelection(true);
      } else {
        setShowAssessmentTypeSelection(true);
      }
      setCurrentQuestion(0);
    }
  };

  const handleAssessmentTypeSelect = (type: 'detailed' | 'quick') => {
    // Reset previous assessment data when selecting a new type
    setResponses({});
    setCurrentQuestion(0);
    setOrganizationName("");
    setContactEmail("");
    setShowContactForm(false);
    
    setAssessmentType(type);
    setShowAssessmentTypeSelection(false);
    
    if (type === 'detailed') {
      setShowIndustrySelection(true);
    } else {
      // For quick assessment, skip industry selection and use default
      setSelectedIndustry("Other");
      setShowIndustrySelection(false);
    }
  };

  const canGoNext = responses[currentQuestionData?.id];
  const canGoPrevious = currentQuestion > 0;

  const handleSubmit = () => {
    if (!organizationName || !contactEmail) {
      alert("Please provide your organization name and contact email.");
      return;
    }

    submitAssessment.mutate({
      organizationName,
      contactEmail,
      industry: selectedIndustry,
      responses,
    });
  };

  const generateDemoSample = () => {
    const demoResponses: Record<string, number> = {};
    
    // Generate realistic demo responses that create a moderate to good readiness score
    assessmentQuestions.forEach((question: Question) => {
      // Create a realistic distribution with slight bias toward positive responses
      const randomValue = Math.random();
      let response: number;
      
      if (randomValue < 0.1) response = 1; // 10% - Poor
      else if (randomValue < 0.25) response = 2; // 15% - Below Average
      else if (randomValue < 0.5) response = 3; // 25% - Average
      else if (randomValue < 0.8) response = 4; // 30% - Good
      else response = 5; // 20% - Excellent
      
      demoResponses[question.id] = response;
    });

    setResponses(demoResponses);
    setOrganizationName("Technology Solutions, Inc.");
    setContactEmail("contact@example.com");
    setShowContactForm(true);
    
    // Demo sample generated
  };

  const getDimensionProgress = () => {
    const dimensionQuestions = assessmentQuestions.filter((q: Question) => q.dimension === currentQuestionData.dimension);
    const dimensionResponses = dimensionQuestions.filter(q => responses[q.id]);
    return `${dimensionResponses.length}/${dimensionQuestions.length}`;
  };

  const handleIndustrySelect = (industry: string) => {
    setSelectedIndustry(industry);
    setShowIndustrySelection(false);
    setCurrentQuestion(0);
    setResponses({}); // Reset responses when changing industry
    setOrganizationName("");
    setContactEmail("");
    setShowContactForm(false);
  };

  if (showContactForm) {
    return (
      <Card className="max-w-2xl mx-auto animate-slide-up hover-lift">
        <CardContent className="p-8">
          <div className="text-center mb-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900 mb-2 animate-slide-up">Almost Done!</h2>
            <p className="text-slate-600 animate-slide-up stagger-delay-1">Please provide your contact information to receive your results.</p>
          </div>

          <div className="space-y-4 animate-slide-up stagger-delay-2">
            <div className="animate-slide-in-left stagger-delay-2">
              <Label htmlFor="organizationName">Organization Name</Label>
              <Input
                id="organizationName"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                placeholder="Enter your organization name"
                className="transition-all focus:scale-105 hover-lift"
              />
            </div>
            <div className="animate-slide-in-right stagger-delay-3">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="Enter your email address"
                className="transition-all focus:scale-105 hover-lift"
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-8 animate-fade-in stagger-delay-4">
            <Button 
              variant="outline" 
              onClick={() => setShowContactForm(false)}
              className="hover-lift button-press"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Questions
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={submitAssessment.isPending}
              className="hover-glow hover-lift button-press animate-pulse-gentle"
            >
              {submitAssessment.isPending ? "Submitting..." : "Submit Assessment"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show assessment type selection first
  if (showAssessmentTypeSelection) {
    return (
      <section>
        <AssessmentTypeSelection 
          onSelectType={handleAssessmentTypeSelect}
          onBack={onBack}
        />
      </section>
    );
  }

  // Show industry selection for detailed assessments
  if (showIndustrySelection) {
    return (
      <section>
        <IndustrySelection 
          onIndustrySelect={handleIndustrySelect}
          selectedIndustry={selectedIndustry}
        />
        
        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            onClick={() => {
              setShowAssessmentTypeSelection(true);
              setShowIndustrySelection(false);
              setSelectedIndustry("");
              setResponses({});
              setCurrentQuestion(0);
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Assessment Type
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section>
      {/* Progress Header */}
      <Card className="mb-8 animate-slide-up hover-lift">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4 animate-fade-in">
            <div className="flex flex-col animate-slide-in-left">
              <h2 className="text-2xl font-bold text-slate-900">AI Readiness Assessment</h2>
              {selectedIndustry && hasIndustryVariations(selectedIndustry) && (
                <p className="text-sm text-primary font-medium animate-slide-up stagger-delay-1">
                  {selectedIndustry} Industry - Specialized Questions
                </p>
              )}
              {selectedIndustry && !hasIndustryVariations(selectedIndustry) && (
                <p className="text-sm text-slate-600">
                  {selectedIndustry} - General Assessment
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={generateDemoSample}
                className="text-xs bg-[#cd0000] text-[#f5f5f4] border-[#cd0000] hover:bg-[#b30000] hover:text-[#f5f5f4]"
              >
                <Zap className="mr-1 h-3 w-3" />
                Demo Sample
              </Button>
              <span className="text-sm text-slate-500">
                Question {currentQuestion + 1} of {assessmentQuestions.length}
              </span>
            </div>
          </div>
          
          <Progress value={progress} className="mb-4 bg-gray-200" />
          
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Technology Infrastructure', keys: ['technologyInfrastructure'] },
              { label: 'Data Quality', keys: ['dataQuality'] }, 
              { label: 'Team Literacy', keys: ['teamLiteracy'] },
              { label: 'System Integration', keys: ['systemIntegration'] },
              { label: 'Budget', keys: ['budget', 'budgetResources'] },
              { label: 'Security', keys: ['dataSecurity', 'security', 'securityPrivacy'] }
            ].map((dimension, index) => {
              // Check all possible keys for this dimension
              const isCurrentDimension = dimension.keys.includes(currentQuestionData.dimension);
              const dimensionQuestions = assessmentQuestions.filter((q: Question) => 
                dimension.keys.includes(q.dimension)
              );
              const dimensionResponses = dimensionQuestions.filter((q: Question) => responses[q.id]);
              const progress = `${dimensionResponses.length}/${dimensionQuestions.length}`;
              
              return (
                <span
                  key={`${dimension.label}-${index}`}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isCurrentDimension
                      ? 'text-white'
                      : dimensionQuestions.length === 0
                      ? 'bg-gray-300 text-gray-700'
                      : dimensionResponses.length === dimensionQuestions.length
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                  style={isCurrentDimension ? { backgroundColor: '#cd0000' } : {}}
                >
                  {dimension.label} ({progress})
                </span>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="hover-lift animate-slide-up stagger-delay-1">
        <CardContent className="p-8">
          <div className="mb-6 animate-fade-in">
            <div className="flex items-center mb-4 animate-slide-in-left">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 bg-transparent animate-bounce-subtle stagger-delay-1">
                {getIconComponent(currentQuestionData.icon)}
              </div>
              <span className="text-sm font-medium text-white px-3 py-1 rounded-full animate-slide-in-right stagger-delay-1" style={{ backgroundColor: '#cd0000' }}>
                {currentQuestionData.dimensionLabel}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3 animate-slide-up stagger-delay-2">
              {currentQuestionData.question}
            </h3>
            <p className="text-slate-600 animate-slide-up stagger-delay-3">
              {currentQuestionData.description}
            </p>
          </div>

          <RadioGroup
            value={responses[currentQuestionData.id]?.toString() || ""}
            onValueChange={handleAnswerSelect}
            className="animate-slide-up stagger-delay-4"
          >
            {currentQuestionData.options.map((option, index) => (
              <div 
                key={index} 
                className={`flex items-center space-x-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all hover-lift hover-scale animate-slide-in-left stagger-delay-${Math.min(index + 1, 6)}`}
              >
                <RadioGroupItem value={option.value.toString()} id={`option-${index}`} className="hover-scale" />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  <div className="font-medium text-slate-900">{option.text}</div>
                  <div className="text-sm text-slate-600">{option.description}</div>
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between items-center mt-8 animate-fade-in stagger-delay-6">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              className="hover-lift button-press"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {currentQuestion === 0 ? 'Back' : 'Previous Question'}
            </Button>
            <div className="flex items-center gap-3">
              {!canGoNext && (
                <span className="text-sm text-slate-500 animate-pulse-gentle">Please select an answer to continue</span>
              )}
              <Button 
                onClick={handleNext}
                disabled={!canGoNext}
                className={`hover-lift button-press ${canGoNext ? 'hover-glow animate-pulse-gentle' : ''}`}
              >
                {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
