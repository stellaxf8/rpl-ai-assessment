import { Download, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Assessment } from "@shared/schema";

interface ReportProps {
  assessment: Assessment;
}

const dimensionConfig = {
  technologyInfrastructure: {
    label: "Technology Infrastructure",
    icon: "🖥️",
    recommendations: {
      high: "Consider upgrading to AI-optimized compute instances for better performance.",
      medium: "Evaluate current infrastructure capabilities and plan for AI-specific resources.",
      low: "Significant infrastructure investment needed before AI implementation."
    }
  },
  dataQuality: {
    label: "Data Quality & Access",
    icon: "🗄️",
    recommendations: {
      high: "Leverage existing data governance to accelerate AI projects.",
      medium: "Implement data quality framework and establish clear access protocols.",
      low: "Priority focus on data governance and quality standards required."
    }
  },
  teamLiteracy: {
    label: "Team AI Literacy",
    icon: "👥",
    recommendations: {
      high: "Leverage this strong foundation to drive AI initiatives across the organization.",
      medium: "Invest in targeted AI training programs for key team members.",
      low: "Comprehensive AI education and training program needed."
    }
  },
  systemIntegration: {
    label: "System Integration",
    icon: "🧩",
    recommendations: {
      high: "Ready for complex AI integrations with existing systems.",
      medium: "Review integration capabilities and plan for AI system compatibility.",
      low: "System integration strategy and API development required."
    }
  },
  budget: {
    label: "Budget & Resources",
    icon: "💰",
    recommendations: {
      high: "Well-positioned to fund comprehensive AI initiatives.",
      medium: "Allocate additional resources for AI infrastructure and training.",
      low: "Develop comprehensive budget plan for AI implementation."
    }
  },
  security: {
    label: "Security & Privacy",
    icon: "🔒",
    recommendations: {
      high: "Strong security framework ready for AI data protection needs.",
      medium: "Enhance security protocols for AI-specific requirements.",
      low: "Implement comprehensive security framework before AI deployment."
    }
  },
};

export default function Report({ assessment }: ReportProps) {
  const { organizationName, overallScore, scores, createdAt } = assessment;

  const getScoreLevel = (score: number): 'high' | 'medium' | 'low' => {
    if (score >= 4.0) return 'high';
    if (score >= 3.0) return 'medium';
    return 'low';
  };

  const getReadinessDescription = (score: number) => {
    if (score >= 80) return "Excellent AI readiness with strong capabilities across all dimensions.";
    if (score >= 65) return "Good AI readiness with strong potential for successful implementation.";
    if (score >= 50) return "Fair AI readiness with foundation in place but improvement needed.";
    return "Limited AI readiness requiring significant preparation before implementation.";
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  const roadmapPhases = [
    {
      phase: 1,
      title: "Foundation (0-3 months)",
      description: "Implement data governance framework and quality controls",
    },
    {
      phase: 2,
      title: "Infrastructure (3-6 months)", 
      description: "Optimize cloud infrastructure and implement AI-ready compute resources",
    },
    {
      phase: 3,
      title: "Pilot Projects (6-9 months)",
      description: "Launch pilot AI projects leveraging existing team expertise",
    },
    {
      phase: 4,
      title: "Scale (9-12 months)",
      description: "Expand successful AI implementations across the organization",
    },
  ];

  return (
    <section>
      <Card className="overflow-hidden">
        {/* Report Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">AI Readiness Assessment Report</h2>
              <p className="text-blue-100">Comprehensive analysis and recommendations</p>
              <p className="text-blue-100 mt-1">Organization: {organizationName}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{formatDate(createdAt)}</div>
              <div className="text-blue-100">Assessment Date</div>
            </div>
          </div>
        </div>

        {/* Report Content */}
        <CardContent className="p-8">
          {/* Executive Summary */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Executive Summary</h3>
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{overallScore}/100</div>
                  <div className="text-sm text-slate-600">Overall Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-1">
                    {overallScore >= 80 ? "Excellent" : overallScore >= 65 ? "Good" : overallScore >= 50 ? "Fair" : "Poor"}
                  </div>
                  <div className="text-sm text-slate-600">Readiness Level</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-warning mb-1">
                    {Object.values(scores as any).filter((score: any) => score < 3.5).length}
                  </div>
                  <div className="text-sm text-slate-600">Areas to Improve</div>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {getReadinessDescription(overallScore)} Focus on the lower-scoring dimensions to maximize AI implementation success.
              </p>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Detailed Dimension Analysis</h3>
            <div className="space-y-6">
              {Object.entries(scores as any).map(([dimension, score]) => {
                const config = dimensionConfig[dimension as keyof typeof dimensionConfig];
                const scoreValue = score as number;
                const level = getScoreLevel(scoreValue);
                const percentage = (scoreValue / 5) * 100;

                return (
                  <div key={dimension} className="border border-slate-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <span>{config.icon}</span>
                        </div>
                        <h4 className="text-lg font-semibold text-slate-900">{config.label}</h4>
                      </div>
                      <div className="flex items-center">
                        <div className="w-20 h-3 bg-slate-200 rounded-full mr-3">
                          <div 
                            className="h-3 bg-primary rounded-full" 
                            style={{ width: `${percentage}%` }}
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
                  </div>
                );
              })}
            </div>
          </div>

          {/* Implementation Roadmap */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Recommended Implementation Roadmap</h3>
            <div className="space-y-4">
              {roadmapPhases.map((phase) => (
                <div key={phase.phase} className="flex items-start">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm mr-4 mt-1">
                    {phase.phase}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">Phase {phase.phase}: {phase.title}</h4>
                    <p className="text-slate-600">{phase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-t border-slate-200 pt-6">
            <div className="text-center">
              <p className="text-slate-600 mb-4">Need help implementing these recommendations?</p>
              <Button>
                Schedule a Consultation
                <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Actions */}
      <div className="mt-8 text-center space-x-4">
        <Button variant="default" size="lg" className="bg-slate-900 hover:bg-slate-800">
          <Download className="mr-2 h-5 w-5" />
          Download PDF
        </Button>
        <Button variant="outline" size="lg">
          <Mail className="mr-2 h-5 w-5" />
          Email Report
        </Button>
      </div>
    </section>
  );
}
