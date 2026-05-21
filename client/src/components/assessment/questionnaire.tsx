import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Server, Database, Users, Puzzle, DollarSign, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { questions, Question } from "@/lib/assessment-data";
import { calculateDimensionScores, calculateOverallScore } from "@/lib/scoring";
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
  return <IconComponent className="text-black" />;
};

const formatQuestionDescription = (description: string) => {
  // Split description at "For example:" (case insensitive)
  const parts = description.split(/For example:/i);
  
  if (parts.length === 2) {
    const mainDescription = parts[0].trim();
    const example = parts[1].trim();
    
    return (
      <div>
        <p className="text-sm sm:text-base text-slate-600 mb-3">
          {mainDescription}
        </p>
        <p className="text-sm sm:text-base text-slate-600">
          <span className="font-bold">For Example:</span> {example}
        </p>
      </div>
    );
  }
  
  // If no "For example:" found, return original text
  return (
    <p className="text-sm sm:text-base text-slate-600">
      {description}
    </p>
  );
};

export default function Questionnaire({ onComplete, onBack }: QuestionnaireProps) {
  const [assessmentType, setAssessmentType] = useState<'detailed' | 'quick' | ''>("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [showAssessmentTypeSelection, setShowAssessmentTypeSelection] = useState(true);
  const [showIndustrySelection, setShowIndustrySelection] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});

  const selectedIndustryRef = useRef(selectedIndustry);
  useEffect(() => { selectedIndustryRef.current = selectedIndustry; }, [selectedIndustry]);

  // Reset function to clear all assessment state
  const resetAssessment = () => {
    setAssessmentType("");
    setSelectedIndustry("");
    setShowAssessmentTypeSelection(true);
    setShowIndustrySelection(false);
    setCurrentQuestion(0);
    setResponses({});
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

  const submitAssessment = (data: { industry: string; responses: Record<string, number> }) => {
    const scores = calculateDimensionScores(data.responses);
    const overallScore = calculateOverallScore(scores);
    const assessment: Assessment = {
      id: crypto.randomUUID(),
      organizationName: null,
      contactEmail: null,
      industry: data.industry,
      responses: data.responses,
      scores,
      overallScore,
      createdAt: new Date(),
    };
    onComplete(assessment);
  };

  const currentQuestionData = assessmentQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;

  const handleAnswerSelect = (value: string) => {
    setResponses({
      ...responses,
      [currentQuestionData.id]: parseInt(value),
    });
    
    // Desktop-only: scroll to question area after selection
    setTimeout(() => {
      const isDesktop = window.innerWidth >= 768; // md breakpoint
      if (isDesktop) {
        const questionArea = document.getElementById('question-area');
        if (questionArea) {
          questionArea.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }
      } else {
        // Mobile: scroll to next button as before
        const nextButton = document.querySelector('[data-next-button]');
        if (nextButton) {
          nextButton.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          });
        }
      }
    }, 200);
  };

  const handleNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      
      // Desktop-only: scroll to question area instead of top
      setTimeout(() => {
        const isDesktop = window.innerWidth >= 768; // md breakpoint
        if (isDesktop) {
          const questionArea = document.getElementById('question-area');
          if (questionArea) {
            questionArea.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start',
              inline: 'nearest'
            });
          }
        } else {
          // Mobile: jump to top as before
          window.scrollTo(0, 0);
        }
      }, 100);
    } else {
      // Submit assessment immediately after final question
      submitAssessment({
        industry: selectedIndustry,
        responses,
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      // Jump to top when going to previous question
      window.scrollTo(0, 0);
    } else if (showIndustrySelection) {
      setShowAssessmentTypeSelection(true);
      setShowIndustrySelection(false);
      // Jump to top when going back to assessment type selection
      window.scrollTo(0, 0);
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
      // Jump to top when navigating back
      window.scrollTo(0, 0);
    }
  };

  const handleAssessmentTypeSelect = (type: 'detailed' | 'quick') => {
    // Reset previous assessment data when selecting a new type
    setResponses({});
    setCurrentQuestion(0);
    
    setAssessmentType(type);
    setShowAssessmentTypeSelection(false);
    
    if (type === 'detailed') {
      setShowIndustrySelection(true);
    } else {
      // For quick assessment, skip industry selection and use default
      setSelectedIndustry("Other");
      setShowIndustrySelection(false);
    }
    
    // Jump to top when transitioning to next step
    window.scrollTo(0, 0);
  };

  const canGoNext = responses[currentQuestionData?.id];
  const canGoPrevious = currentQuestion > 0;

  const generateDemoSample = () => {
    const demoResponses: Record<string, number> = {};
    assessmentQuestions.forEach((question: Question) => {
      const randomValue = Math.random();
      let response: number;
      if (randomValue < 0.1) response = 1;
      else if (randomValue < 0.25) response = 2;
      else if (randomValue < 0.5) response = 3;
      else if (randomValue < 0.8) response = 4;
      else response = 5;
      demoResponses[question.id] = response;
    });
    setResponses(demoResponses);
    submitAssessment({
      industry: selectedIndustryRef.current || "Technology",
      responses: demoResponses,
    });
  };

  // Hidden keyboard shortcut for demo sample (Ctrl+Shift+F)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'F') {
        event.preventDefault();
        generateDemoSample();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
    
    // Jump to top when starting questions
    window.scrollTo(0, 0);
  };


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
              // Jump to top when going back to assessment type
              window.scrollTo(0, 0);
            }}
            className="hover-lift button-press"
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
      <Card className="mb-0 animate-slide-up animate-fade-in">
        <CardContent className="p-3 sm:p-6 pt-3 pb-3">
          <div className="flex flex-col gap-2 sm:gap-3 mb-3 sm:mb-4 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
              <div className="flex flex-col animate-slide-in-left">
                <h2 className="tracking-tight text-gray-600 font-semibold" style={{ 
                  fontSize: '20px',
                  fontFamily: '"Inter", "Arial Nova Light", "Arial", sans-serif'
                }}>AI Readiness Assessment</h2>
                {selectedIndustry && selectedIndustry !== 'Other' && (
                  <p className="text-xs sm:text-sm text-primary font-medium animate-slide-up stagger-delay-1">
                    {selectedIndustry} - Specialized Assessment
                  </p>
                )}
                {selectedIndustry && selectedIndustry === 'Other' && (
                  <p className="text-xs sm:text-sm text-slate-600">
                    {selectedIndustry} Industry - General Assessment
                  </p>
                )}
              </div>
              <div className="flex flex-row items-center justify-between sm:flex-col sm:items-end gap-2 sm:gap-2">
                <span className="text-xs sm:text-sm text-slate-500 order-2 sm:order-1">
                  Question {currentQuestion + 1} of {assessmentQuestions.length}
                </span>
{/* Demo Sample button hidden - use Ctrl+Shift+D shortcut instead */}
              </div>
            </div>
            <Progress value={progress} className="bg-gray-200" />
          </div>
          
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {[
              { label: 'Technology Infrastructure', short: 'Tech', keys: ['technologyInfrastructure'] },
              { label: 'Data Quality', short: 'Data', keys: ['dataQuality'] }, 
              { label: 'Team Literacy', short: 'Team', keys: ['teamLiteracy'] },
              { label: 'System Integration', short: 'Systems', keys: ['systemIntegration'] },
              { label: 'Budget', short: 'Budget', keys: ['budget', 'budgetResources'] },
              { label: 'Security', short: 'Security', keys: ['dataSecurity', 'security', 'securityPrivacy'] }
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
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
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
                  <span className="sm:hidden">{dimension.short} ({progress})</span>
                  <span className="hidden sm:inline">{dimension.label} ({progress})</span>
                </span>
              );
            })}
          </div>
        </CardContent>
      </Card>
      {/* Question Card */}
      <Card className="animate-slide-up animate-fade-in border-0 mt-0">
        <CardContent className="p-3 sm:p-6 lg:p-8 pt-3 pb-3">
          <div className="mb-4 sm:mb-6 animate-fade-in" id="question-area">
            <div className="flex items-center mb-2 sm:mb-3 animate-slide-in-left animate-fade-in">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mr-3 sm:mr-4 bg-slate-100 shadow-sm">
                {getIconComponent(currentQuestionData.icon)}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-white px-3 py-1.5 rounded-full animate-slide-in-right animate-fade-in shadow-sm" style={{ backgroundColor: '#cd0000' }}>
                {currentQuestionData.dimensionLabel}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 animate-slide-up animate-fade-in leading-tight">
              {currentQuestionData.question}
            </h3>
          </div>

          <RadioGroup
            value={responses[currentQuestionData.id]?.toString() || ""}
            onValueChange={handleAnswerSelect}
            className="animate-slide-up animate-fade-in"
          >
            {currentQuestionData.options.map((option, index) => (
              <div 
                key={index} 
                className={`flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 border border-slate-200 rounded-xl hover:bg-slate-50 hover:shadow-lg hover:border-slate-300 transition-all duration-200 animate-slide-in-left animate-fade-in hover:scale-[1.02]`}
              >
                <RadioGroupItem value={option.value.toString()} id={`option-${index}`} className="hover-scale flex-shrink-0" />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  <div className="text-sm sm:text-base font-semibold text-slate-900 leading-tight">{option.text}</div>
                  <div className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">{option.description}</div>
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 mt-4 sm:mt-8 animate-fade-in animate-slide-up">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              className="hover-lift button-press w-24 sm:w-auto order-2 sm:order-1 text-sm sm:text-base"
            >
              <ArrowLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="sm:hidden">{currentQuestion === 0 ? 'Back' : 'Previous'}</span>
              <span className="hidden sm:inline">{currentQuestion === 0 ? 'Back' : 'Previous Question'}</span>
            </Button>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 order-1 sm:order-2">
              <div className="h-4 sm:h-0">
                {!canGoNext && (
                  <span className="text-xs text-slate-500 text-center">Please select an answer to continue</span>
                )}
              </div>
              <Button 
                onClick={handleNext}
                disabled={!canGoNext}
                className="hover-lift button-press w-24 sm:w-auto text-sm sm:text-base"
                data-next-button
              >
                <span className="sm:hidden">{currentQuestion === assessmentQuestions.length - 1 ? 'Complete' : 'Next'}</span>
                <span className="hidden sm:inline">{currentQuestion === assessmentQuestions.length - 1 ? 'Complete Assessment' : 'Next Question'}</span>
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
