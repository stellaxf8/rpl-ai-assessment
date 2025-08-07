import { CheckCircle, FileText, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Assessment, DimensionScores } from "@shared/schema";
import ScoreChart from "@/components/charts/score-chart";
import RadarChart from "@/components/charts/radar-chart";
import IndustryBenchmark from "@/components/enhanced/industry-benchmark";
import IntegrationReadiness from "@/components/enhanced/integration-readiness";
import ComplianceAssessment from "@/components/enhanced/compliance-assessment";
import BusinessDevelopment from "@/components/enhanced/business-development";

interface ResultsProps {
  assessment: Assessment;
  onGenerateReport?: () => void;
  onRetakeAssessment?: () => void;
  showRetakeButton?: boolean;
}

const dimensionConfig = {
  technologyInfrastructure: {
    label: "Technology Infrastructure",
    icon: "🖥️",
    color: "bg-blue-100 text-primary",
    barColor: "bg-blue-500",
    recommendations: {
      high: "Consider upgrading to AI-optimized compute instances for better performance.",
      medium: "Evaluate current infrastructure capabilities and plan for AI-specific resources.",
      low: "Significant infrastructure investment needed before AI implementation."
    }
  },
  dataQuality: {
    label: "Data Quality & Access",
    icon: "🗄️",
    color: "bg-green-100 text-success",
    barColor: "bg-success",
    recommendations: {
      high: "Leverage existing data governance to accelerate AI projects.",
      medium: "Implement data quality framework and establish clear access protocols.",
      low: "Priority focus on data governance and quality standards required."
    }
  },
  teamLiteracy: {
    label: "Team AI Literacy",
    icon: "👥",
    color: "bg-purple-100 text-secondary",
    barColor: "bg-green-500",
    recommendations: {
      high: "Leverage this strong foundation to drive AI initiatives across the organization.",
      medium: "Invest in targeted AI training programs for key team members.",
      low: "Comprehensive AI education and training program needed."
    }
  },
  systemIntegration: {
    label: "System Integration",
    icon: "🧩",
    color: "bg-orange-100 text-warning",
    barColor: "bg-warning",
    recommendations: {
      high: "Ready for complex AI integrations with existing systems.",
      medium: "Review integration capabilities and plan for AI system compatibility.",
      low: "System integration strategy and API development required."
    }
  },
  budget: {
    label: "Budget & Resources",
    icon: "💰",
    color: "bg-yellow-100 text-yellow-600",
    barColor: "bg-yellow-500",
    recommendations: {
      high: "Well-positioned to fund comprehensive AI initiatives.",
      medium: "Allocate additional resources for AI infrastructure and training.",
      low: "Develop comprehensive budget plan for AI implementation."
    }
  },
  dataSecurity: {
    label: "Data Security & Privacy",
    icon: "🔒",
    color: "bg-red-100 text-error",
    barColor: "bg-error",
    recommendations: {
      high: "Strong data security framework ready for AI data protection needs.",
      medium: "Enhance data protection protocols for AI-specific requirements.",
      low: "Implement comprehensive data security framework before AI deployment."
    }
  },
};

export default function Results({ assessment, onGenerateReport, onRetakeAssessment, showRetakeButton = true }: ResultsProps) {
  const { overallScore, scores, organizationName, contactEmail, industry } = assessment;
  const typedScores = scores as DimensionScores;

  const getReadinessLevel = (score: number) => {
    if (score >= 80) return { label: "Excellent", color: "bg-green-100 text-green-800" };
    if (score >= 65) return { label: "Good", color: "bg-blue-100 text-blue-800" };
    if (score >= 50) return { label: "Fair", color: "bg-yellow-100 text-yellow-800" };
    return { label: "Needs Improvement", color: "bg-red-100 text-red-800" };
  };

  const getScoreLevel = (score: number): 'high' | 'medium' | 'low' => {
    if (score >= 4.0) return 'high';
    if (score >= 2.5) return 'medium';
    return 'low';
  };

  const readinessLevel = getReadinessLevel(overallScore);

  const getRecommendations = () => {
    const dimensionEntries = Object.entries(typedScores);
    const lowScoring = dimensionEntries.filter(([_, score]) => score < 3.5);
    const highScoring = dimensionEntries.filter(([_, score]) => score >= 4.0);

    return { lowScoring, highScoring };
  };

  const { lowScoring, highScoring } = getRecommendations();

  return (
    <section>
      {/* Overall Score Card */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">AI Readiness Score</h2>
            <p className="text-slate-600">Complete AI readiness assessment for {organizationName}</p>
          </div>
          
          <div className="flex items-center justify-center mb-8">
            <ScoreChart score={overallScore} />
          </div>

          <div className="text-center">
            <div className={`inline-flex items-center px-4 py-2 rounded-full font-medium ${readinessLevel.color}`}>
              <CheckCircle className="mr-2 h-4 w-4" />
              {readinessLevel.label} AI Readiness Level
            </div>
            
          </div>
        </CardContent>
      </Card>
      {/* Assessment Results Overview */}
      <div className="space-y-8">
          {/* Dimension Breakdown */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Radar Chart */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">Readiness Dimensions</h3>
                <div className="h-80">
                  <RadarChart scores={scores as any} />
                </div>
              </CardContent>
            </Card>

            {/* Brief Scores Overview */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">Quick Overview</h3>
                <div className="space-y-4">
                  {Object.entries(scores as any).map(([dimension, score]) => {
                    const config = dimensionConfig[dimension as keyof typeof dimensionConfig];
                    const scoreValue = score as number;
                    const percentage = (scoreValue / 5) * 100;

                    // Determine bar color based on score value (dynamic)
                    let barColorClass = 'bg-red-500'; // Default to red for low scores
                    if (scoreValue >= 4.0) {
                      barColorClass = 'bg-green-600'; // High score: green (4.0+)
                    } else if (scoreValue >= 2.5) {
                      barColorClass = 'bg-yellow-500'; // Medium score: yellow (2.5-3.9)
                    } else {
                      barColorClass = 'bg-red-500'; // Low score: red (0.0-2.4)
                    }

                    return (
                      <div key={dimension} className="flex items-center justify-between">
                        <div className="flex items-center flex-1">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${config?.color || 'bg-gray-100'}`}>
                            <span className="text-sm">{config?.icon || '❓'}</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-slate-900">{config?.label || dimension}</div>
                            <div className="text-sm text-slate-600">
                              {scoreValue >= 4.0 
                                ? "Strong performance" 
                                : scoreValue >= 3.0 
                                ? "Room for improvement" 
                                : "Needs attention"
                              }
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center ml-4">
                          <div className="w-16 h-2 bg-gray-200 rounded-full mr-3 overflow-hidden">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${barColorClass}`} 
                              style={{ 
                                width: `${Math.max(0, Math.min(100, percentage))}%`
                              }}
                            />
                          </div>
                          <span className="font-semibold text-slate-900 min-w-[2rem]">
                            {scoreValue.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Dimension Analysis */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center">Detailed Dimension Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(scores as any).map(([dimension, score]) => {
                const config = dimensionConfig[dimension as keyof typeof dimensionConfig];
                const scoreValue = score as number;
                const level = getScoreLevel(scoreValue);
                const percentage = (scoreValue / 5) * 100;

                return (
                  <Card key={dimension} className="border border-slate-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <span>{config.icon}</span>
                          </div>
                          <h4 className="text-lg font-semibold text-slate-900">{config.label}</h4>
                        </div>
                        <div className="flex items-center">
                          <div className="w-20 mr-3">
                            <Progress 
                              value={percentage} 
                              className="h-3 bg-slate-200" 
                              dynamicColor={true}
                            />
                          </div>
                          <span className="font-bold text-slate-900">{scoreValue.toFixed(1)}/5</span>
                        </div>
                      </div>
                      <p className="text-slate-600 mb-3">
                        {level === 'high' 
                          ? "Strong performance in this area with good foundation for AI implementation."
                          : level === 'medium'
                          ? "Moderate performance with room for improvement before AI implementation."
                          : "Significant improvement needed in this area before AI implementation."
                        }
                      </p>
                      <div className={`p-3 rounded border-l-4 ${
                        level === 'high' ? 'border-green-500 bg-green-50' :
                        level === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                        'border-red-500 bg-red-50'
                      }`}>
                        <div className="font-medium text-slate-900">Recommendation:</div>
                        <div className="text-slate-700">{config.recommendations[level]}</div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Enhanced Analytics */}
          <IndustryBenchmark userScore={overallScore} industry={industry || "Technology"} />
          <IntegrationReadiness scores={{ technologyInfrastructure: typedScores.technologyInfrastructure, systemIntegration: typedScores.systemIntegration }} />
          <ComplianceAssessment scores={{ security: typedScores.dataSecurity, dataQuality: typedScores.dataQuality }} industry={industry} />
          <BusinessDevelopment scores={{
            overallScore: overallScore,
            technologyInfrastructure: typedScores.technologyInfrastructure,
            dataQuality: typedScores.dataQuality,
            teamLiteracy: typedScores.teamLiteracy,
            systemIntegration: typedScores.systemIntegration,
            budget: typedScores.budget,
            dataSecurity: typedScores.dataSecurity
          }} />
      </div>
      {/* Action Buttons */}
      <div className="text-center space-x-4 mt-8">
        {onGenerateReport && (
          <Button onClick={onGenerateReport} size="lg">
            <FileText className="mr-2 h-5 w-5" />
            Generate Report
          </Button>
        )}

        

        {showRetakeButton && onRetakeAssessment && (
          <Button variant="ghost" onClick={onRetakeAssessment}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Assessment
          </Button>
        )}
      </div>
    </section>
  );
}
