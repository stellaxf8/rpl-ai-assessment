import { CheckCircle, CircleAlert, Share, FileText, RotateCcw, Brain, Target, BookOpen, TrendingUp, Scale, Code, Calendar, Users, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Assessment, DimensionScores } from "@shared/schema";
import ScoreChart from "@/components/charts/score-chart";
import RadarChart from "@/components/charts/radar-chart";
import IndustryBenchmark from "@/components/enhanced/industry-benchmark";
import IntegrationReadiness from "@/components/enhanced/integration-readiness";
import ComplianceAssessment from "@/components/enhanced/compliance-assessment";
import BusinessDevelopment from "@/components/enhanced/business-development";


// Import remaining advanced features
import { AIMaturityRoadmap } from "@/components/advanced/ai-maturity-roadmap";
import { ImplementationTimeline } from "@/components/advanced/implementation-timeline";
import { SmartRecommendationsComponent } from "@/components/advanced/smart-recommendations";
import { TrendAnalysisComponent } from "@/components/advanced/trend-analysis";
import { RegulatoryComplianceTrackerComponent } from "@/components/advanced/regulatory-compliance";

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
    barColor: "bg-green-500",
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
    barColor: "bg-yellow-500",
  },
  security: {
    label: "Security & Privacy",
    icon: "🔒",
    color: "bg-red-100 text-error",
    barColor: "bg-error",
  },
};

export default function Results({ assessment, onGenerateReport, onRetakeAssessment, showRetakeButton = true }: ResultsProps) {
  const { overallScore, scores, organizationName, contactEmail } = assessment;
  const typedScores = scores as DimensionScores;

  const getReadinessLevel = (score: number) => {
    if (score >= 80) return { label: "Excellent", color: "bg-green-100 text-green-800" };
    if (score >= 65) return { label: "Good", color: "bg-blue-100 text-blue-800" };
    if (score >= 50) return { label: "Fair", color: "bg-yellow-100 text-yellow-800" };
    return { label: "Needs Improvement", color: "bg-red-100 text-red-800" };
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
            <h2 className="text-3xl font-bold text-slate-900 mb-2">AI Strategy Platform</h2>
            <p className="text-slate-600">Complete AI readiness assessment and strategic planning suite for {organizationName}</p>
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
              Your comprehensive AI strategy platform with 9 advanced features to guide your AI transformation journey.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabbed Interface for Advanced Features */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:grid-cols-6 mb-6 bg-slate-100 p-2 rounded-xl border shadow-sm h-auto">
          <TabsTrigger 
            value="overview" 
            className="flex items-center gap-1 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-slate-200 data-[state=active]:hover:bg-primary/90"
          >
            <Target className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="roadmap" 
            className="flex items-center gap-1 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-slate-200 data-[state=active]:hover:bg-primary/90"
          >
            <Calendar className="h-4 w-4" />
            Roadmap
          </TabsTrigger>
          <TabsTrigger 
            value="timeline" 
            className="flex items-center gap-1 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-slate-200 data-[state=active]:hover:bg-primary/90"
          >
            <Calendar className="h-4 w-4" />
            Timeline
          </TabsTrigger>
          <TabsTrigger 
            value="recommendations" 
            className="flex items-center gap-1 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-slate-200 data-[state=active]:hover:bg-primary/90"
          >
            <Brain className="h-4 w-4" />
            Smart Recs
          </TabsTrigger>
          <TabsTrigger 
            value="trends" 
            className="flex items-center gap-1 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-slate-200 data-[state=active]:hover:bg-primary/90"
          >
            <TrendingUp className="h-4 w-4" />
            Trends
          </TabsTrigger>
          <TabsTrigger 
            value="compliance" 
            className="flex items-center gap-1 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-slate-200 data-[state=active]:hover:bg-primary/90"
          >
            <Scale className="h-4 w-4" />
            Compliance
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab - Original Assessment Results */}
        <TabsContent value="overview" className="space-y-8">
          {/* Dimension Breakdown */}
          <div className="grid lg:grid-cols-2 gap-8">
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

                    // Determine bar color based on dimension
                    let barColorClass = 'bg-primary';
                    if (dimension === 'technologyInfrastructure') barColorClass = 'bg-blue-500';
                    else if (dimension === 'dataQuality') barColorClass = 'bg-purple-500';
                    else if (dimension === 'teamLiteracy') barColorClass = 'bg-green-500';
                    else if (dimension === 'systemIntegration') barColorClass = 'bg-orange-500';
                    else if (dimension === 'budget') barColorClass = 'bg-yellow-500';
                    else if (dimension === 'security') barColorClass = 'bg-red-500';

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
                          <div className="w-16 h-2 bg-slate-200 rounded-full mr-3 overflow-hidden">
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

          {/* Enhanced Analytics */}
          <IndustryBenchmark userScore={overallScore} industry="Technology" />
          <IntegrationReadiness scores={{ technologyInfrastructure: typedScores.technologyInfrastructure, systemIntegration: typedScores.systemIntegration }} />
          <ComplianceAssessment scores={{ security: typedScores.security, dataQuality: typedScores.dataQuality }} />
          <BusinessDevelopment scores={{
            overallScore: overallScore,
            technologyInfrastructure: typedScores.technologyInfrastructure,
            dataQuality: typedScores.dataQuality,
            teamLiteracy: typedScores.teamLiteracy,
            systemIntegration: typedScores.systemIntegration,
            budget: typedScores.budget,
            security: typedScores.security
          }} />
        </TabsContent>

        {/* AI Maturity Roadmap */}
        <TabsContent value="roadmap" className="space-y-6">
          <AIMaturityRoadmap 
            overallScore={overallScore}
            organizationSize="Medium Enterprise"
            budget="$250K - $1M"
          />
        </TabsContent>

        {/* Implementation Timeline */}
        <TabsContent value="timeline" className="space-y-6">
          <ImplementationTimeline 
            scores={typedScores}
            organizationSize="Medium Enterprise"
            budget="$250K - $1M"
          />
        </TabsContent>

        {/* Smart Recommendations */}
        <TabsContent value="recommendations" className="space-y-6">
          <SmartRecommendationsComponent 
            scores={typedScores}
            organizationSize="Medium Enterprise"
            budget="$250K - $1M"
          />
        </TabsContent>

        {/* Trend Analysis */}
        <TabsContent value="trends" className="space-y-6">
          <TrendAnalysisComponent industry="Technology" />
        </TabsContent>

        {/* Regulatory Compliance */}
        <TabsContent value="compliance" className="space-y-6">
          <RegulatoryComplianceTrackerComponent 
            industry="Technology"
            region="United States"
          />
        </TabsContent>


      </Tabs>

      {/* Action Buttons */}
      <div className="text-center space-x-4 mt-8">
        {onGenerateReport && (
          <Button onClick={onGenerateReport} size="lg">
            <FileText className="mr-2 h-5 w-5" />
            Generate Full Report
          </Button>
        )}
        <Button variant="outline" size="lg">
          <Share className="mr-2 h-5 w-5" />
          Share Results
        </Button>
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
