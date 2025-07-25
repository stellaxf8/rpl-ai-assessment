import { CheckCircle, CircleAlert, Share, FileText, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Assessment } from "@shared/schema";
import ScoreChart from "@/components/charts/score-chart";
import RadarChart from "@/components/charts/radar-chart";

interface ResultsProps {
  assessment: Assessment;
  onGenerateReport: () => void;
  onRetakeAssessment: () => void;
}

const dimensionConfig = {
  technologyInfrastructure: {
    label: "Technology Infrastructure",
    icon: "🖥️",
    color: "bg-blue-100 text-primary",
    barColor: "bg-primary",
  },
  dataQuality: {
    label: "Data Quality & Access",
    icon: "🗄️",
    color: "bg-green-100 text-success",
    barColor: "bg-success",
  },
  teamLiteracy: {
    label: "Team AI Literacy",
    icon: "👥",
    color: "bg-purple-100 text-secondary",
    barColor: "bg-secondary",
  },
  systemIntegration: {
    label: "System Integration",
    icon: "🧩",
    color: "bg-orange-100 text-warning",
    barColor: "bg-warning",
  },
  budget: {
    label: "Budget & Resources",
    icon: "💰",
    color: "bg-yellow-100 text-yellow-600",
    barColor: "bg-yellow-600",
  },
  security: {
    label: "Security & Privacy",
    icon: "🔒",
    color: "bg-red-100 text-error",
    barColor: "bg-error",
  },
};

export default function Results({ assessment, onGenerateReport, onRetakeAssessment }: ResultsProps) {
  const { overallScore, scores } = assessment;

  const getReadinessLevel = (score: number) => {
    if (score >= 80) return { label: "Excellent", color: "bg-green-100 text-green-800" };
    if (score >= 65) return { label: "Good", color: "bg-blue-100 text-blue-800" };
    if (score >= 50) return { label: "Fair", color: "bg-yellow-100 text-yellow-800" };
    return { label: "Needs Improvement", color: "bg-red-100 text-red-800" };
  };

  const readinessLevel = getReadinessLevel(overallScore);

  const getRecommendations = () => {
    const dimensionEntries = Object.entries(scores as any);
    const lowScoring = dimensionEntries.filter(([_, score]) => (score as number) < 3.5);
    const highScoring = dimensionEntries.filter(([_, score]) => (score as number) >= 4.0);

    return { lowScoring, highScoring };
  };

  const { lowScoring, highScoring } = getRecommendations();

  return (
    <section>
      {/* Overall Score Card */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Your AI Readiness Score</h2>
            <p className="text-slate-600">Based on your responses across 6 key dimensions</p>
          </div>
          
          <div className="flex items-center justify-center mb-8">
            <ScoreChart score={overallScore} />
          </div>

          <div className="text-center">
            <div className={`inline-flex items-center px-4 py-2 rounded-full font-medium ${readinessLevel.color}`}>
              <CheckCircle className="mr-2 h-4 w-4" />
              {readinessLevel.label} AI Readiness Level
            </div>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              {overallScore >= 80 
                ? "Excellent! Your organization is well-prepared for AI implementation."
                : overallScore >= 65
                ? "Your organization shows strong potential for AI implementation with some areas for improvement."
                : overallScore >= 50
                ? "Your organization has a foundation for AI, but several areas need attention before implementation."
                : "Significant preparation is needed before implementing AI solutions."
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Dimension Breakdown */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Radar Chart */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Readiness Dimensions</h3>
            <RadarChart scores={scores as any} />
          </CardContent>
        </Card>

        {/* Scores Breakdown */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Detailed Scores</h3>
            <div className="space-y-4">
              {Object.entries(scores as any).map(([dimension, score]) => {
                const config = dimensionConfig[dimension as keyof typeof dimensionConfig];
                const scoreValue = score as number;
                const percentage = (scoreValue / 5) * 100;

                return (
                  <div key={dimension} className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${config.color}`}>
                        <span className="text-sm">{config.icon}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">{config.label}</div>
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
                      <div className="w-16 h-2 bg-slate-200 rounded-full mr-3">
                        <div 
                          className={`h-2 rounded-full ${config.barColor}`} 
                          style={{ width: `${percentage}%` }}
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

      {/* Recommendations */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <h3 className="text-xl font-semibold text-slate-900 mb-6">Recommendations</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Priority Recommendations */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
                <CircleAlert className="text-warning mr-2 h-5 w-5" />
                Priority Actions
              </h4>
              <div className="space-y-3">
                {lowScoring.length > 0 ? lowScoring.map(([dimension, _]) => {
                  const config = dimensionConfig[dimension as keyof typeof dimensionConfig];
                  return (
                    <div key={dimension} className="border-l-4 border-warning bg-orange-50 p-3 rounded-r">
                      <div className="font-medium text-slate-900">Improve {config.label}</div>
                      <div className="text-sm text-slate-600">Focus on strengthening this area for better AI readiness</div>
                    </div>
                  );
                }) : (
                  <div className="border-l-4 border-green-500 bg-green-50 p-3 rounded-r">
                    <div className="font-medium text-slate-900">All Areas Performing Well</div>
                    <div className="text-sm text-slate-600">Continue maintaining current standards</div>
                  </div>
                )}
              </div>
            </div>

            {/* Strengths to Leverage */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
                <CheckCircle className="text-success mr-2 h-5 w-5" />
                Strengths to Leverage
              </h4>
              <div className="space-y-3">
                {highScoring.length > 0 ? highScoring.map(([dimension, _]) => {
                  const config = dimensionConfig[dimension as keyof typeof dimensionConfig];
                  return (
                    <div key={dimension} className="border-l-4 border-success bg-green-50 p-3 rounded-r">
                      <div className="font-medium text-slate-900">{config.label}</div>
                      <div className="text-sm text-slate-600">Strong foundation to build upon</div>
                    </div>
                  );
                }) : (
                  <div className="border-l-4 border-blue-500 bg-blue-50 p-3 rounded-r">
                    <div className="font-medium text-slate-900">Balanced Foundation</div>
                    <div className="text-sm text-slate-600">Work on improving all areas uniformly</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="text-center space-x-4">
        <Button onClick={onGenerateReport} size="lg">
          <FileText className="mr-2 h-5 w-5" />
          Generate Full Report
        </Button>
        <Button variant="outline" size="lg">
          <Share className="mr-2 h-5 w-5" />
          Share Results
        </Button>
        <Button variant="ghost" onClick={onRetakeAssessment}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Retake Assessment
        </Button>
      </div>
    </section>
  );
}
