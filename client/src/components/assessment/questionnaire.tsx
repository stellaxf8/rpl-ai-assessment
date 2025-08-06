import { useState } from "react";
import { ArrowLeft, ArrowRight, Server, Database, Users, Puzzle, DollarSign, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
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
  const iconClass = iconName === 'Server' ? "text-slate-900" : "text-primary";
  return <IconComponent className={iconClass} />;
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
  const { toast } = useToast();

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
      toast({
        title: "Assessment Complete!",
        description: "Your AI readiness assessment has been submitted successfully.",
      });
      onComplete(assessment);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit assessment. Please try again.",
        variant: "destructive",
      });
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
    setAssessmentType(type);
    setShowAssessmentTypeSelection(false);
    
    if (type === 'detailed') {
      setShowIndustrySelection(true);
    } else {
      // For quick assessment, skip industry selection and go straight to questions
      setShowIndustrySelection(false);
      setCurrentQuestion(0);
    }
  };

  const canGoNext = responses[currentQuestionData?.id];
  const canGoPrevious = currentQuestion > 0;

  const handleSubmit = () => {
    if (!organizationName || !contactEmail) {
      toast({
        title: "Missing Information",
        description: "Please provide your organization name and contact email.",
        variant: "destructive",
      });
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
    setOrganizationName("Demo Technology Solutions Inc.");
    setContactEmail("demo@example.com");
    setShowContactForm(true);
    
    toast({
      title: "Demo Sample Generated",
      description: "Random responses have been generated for demonstration purposes.",
    });
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
  };

  if (showContactForm) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Almost Done!</h2>
            <p className="text-slate-600">Please provide your contact information to receive your results.</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="organizationName">Organization Name</Label>
              <Input
                id="organizationName"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                placeholder="Enter your organization name"
              />
            </div>
            <div>
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-8">
            <Button 
              variant="outline" 
              onClick={() => setShowContactForm(false)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Questions
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={submitAssessment.isPending}
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
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-slate-900">AI Readiness Assessment</h2>
              {selectedIndustry && hasIndustryVariations(selectedIndustry) && (
                <p className="text-sm text-primary font-medium">
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
          
          <Progress value={progress} className="mb-4" />
          
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Technology Infrastructure', key: 'technologyInfrastructure' },
              { label: 'Data Quality', key: 'dataQuality' }, 
              { label: 'Team Literacy', key: 'teamLiteracy' },
              { label: 'System Integration', key: 'systemIntegration' },
              { label: 'Budget', key: 'budget' },
              { label: 'Security', key: 'security' }
            ].map((dimension) => {
              const isCurrentDimension = currentQuestionData.dimension === dimension.key;
              const dimensionQuestions = assessmentQuestions.filter((q: Question) => q.dimension === dimension.key);
              const dimensionResponses = dimensionQuestions.filter((q: Question) => responses[q.id]);
              const progress = `${dimensionResponses.length}/${dimensionQuestions.length}`;
              
              return (
                <span
                  key={dimension.key}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isCurrentDimension
                      ? 'bg-blue-100 text-blue-800'
                      : dimensionResponses.length === dimensionQuestions.length
                      ? 'bg-green-100 text-green-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {dimension.label} ({progress})
                </span>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card>
        <CardContent className="p-8">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                {getIconComponent(currentQuestionData.icon)}
              </div>
              <span className="text-sm font-medium text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
                {currentQuestionData.dimensionLabel}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              {currentQuestionData.question}
            </h3>
            <p className="text-slate-600">
              {currentQuestionData.description}
            </p>
          </div>

          <RadioGroup
            value={responses[currentQuestionData.id]?.toString() || ""}
            onValueChange={handleAnswerSelect}
          >
            {currentQuestionData.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <RadioGroupItem value={option.value.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  <div className="font-medium text-slate-900">{option.text}</div>
                  <div className="text-sm text-slate-600">{option.description}</div>
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between items-center mt-8">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {currentQuestion === 0 ? 'Back to Overview' : 'Previous Question'}
            </Button>
            <div className="flex items-center gap-3">
              {!canGoNext && (
                <span className="text-sm text-slate-500">Please select an answer to continue</span>
              )}
              <Button 
                onClick={handleNext}
                disabled={!canGoNext}
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
