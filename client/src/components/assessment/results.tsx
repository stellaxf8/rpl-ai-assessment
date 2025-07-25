import { CheckCircle, CircleAlert, Share, FileText, RotateCcw, Brain, Target, BookOpen, TrendingUp, Scale, Code, Calendar, Users, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Assessment } from "@shared/schema";
import ScoreChart from "@/components/charts/score-chart";
import RadarChart from "@/components/charts/radar-chart";
import IndustryBenchmark from "@/components/enhanced/industry-benchmark";
import IntegrationReadiness from "@/components/enhanced/integration-readiness";
import ComplianceAssessment from "@/components/enhanced/compliance-assessment";
import BusinessDevelopment from "@/components/enhanced/business-development";

// Import all 9 new advanced features
import { AIMaturityRoadmap } from "@/components/advanced/ai-maturity-roadmap";
import { AIReadinessSimulator } from "@/components/advanced/ai-readiness-simulator";
import { ImplementationTimeline } from "@/components/advanced/implementation-timeline";
import { IndustryQuestions } from "@/components/advanced/industry-questions";
import { SmartRecommendationsComponent } from "@/components/advanced/smart-recommendations";
import { PersonalizedLearningPath } from "@/components/advanced/learning-path";
import { APIIntegration } from "@/components/advanced/api-integration";
import { TrendAnalysisComponent } from "@/components/advanced/trend-analysis";
import { RegulatoryComplianceTrackerComponent } from "@/components/advanced/regulatory-compliance";

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
  const { overallScore, scores, organizationName, contactEmail } = assessment;

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
        <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="roadmap" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Roadmap
          </TabsTrigger>
          <TabsTrigger value="simulator" className="flex items-center gap-1">
            <Brain className="h-4 w-4" />
            Simulator
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="industry" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Industry
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-1">
            <Brain className="h-4 w-4" />
            Smart Recs
          </TabsTrigger>
          <TabsTrigger value="learning" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            Learning
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-1">
            <Scale className="h-4 w-4" />
            Compliance
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-1">
            <Code className="h-4 w-4" />
            API
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

          {/* Enhanced Analytics */}
          <IndustryBenchmark userScore={overallScore} industry="Technology" />
          <IntegrationReadiness scores={{ technologyInfrastructure: scores.technologyInfrastructure, systemIntegration: scores.systemIntegration }} />
          <ComplianceAssessment scores={{ security: scores.security, dataQuality: scores.dataQuality }} />
          <BusinessDevelopment scores={{
            overallScore: overallScore,
            technologyInfrastructure: scores.technologyInfrastructure,
            dataQuality: scores.dataQuality,
            teamLiteracy: scores.teamLiteracy,
            systemIntegration: scores.systemIntegration,
            budget: scores.budget,
            security: scores.security
          }} />
        </TabsContent>

        {/* AI Maturity Roadmap */}
        <TabsContent value="roadmap" className="space-y-6">
          <AIMaturityRoadmap 
            scores={scores} 
            currentLevel={readinessLevel.label} 
          />
        </TabsContent>

        {/* AI Readiness Simulator */}
        <TabsContent value="simulator" className="space-y-6">
          <AIReadinessSimulator 
            currentScores={scores}
            organizationSize="Medium Enterprise"
          />
        </TabsContent>

        {/* Implementation Timeline */}
        <TabsContent value="timeline" className="space-y-6">
          <ImplementationTimeline 
            scores={scores}
            organizationSize="Medium Enterprise"
            budget="$250K - $1M"
          />
        </TabsContent>

        {/* Industry-Specific Questions */}
        <TabsContent value="industry" className="space-y-6">
          <IndustryQuestions />
        </TabsContent>

        {/* Smart Recommendations */}
        <TabsContent value="recommendations" className="space-y-6">
          <SmartRecommendationsComponent 
            scores={scores}
            organizationSize="Medium Enterprise"
            budget="$250K - $1M"
          />
        </TabsContent>

        {/* Personalized Learning Path */}
        <TabsContent value="learning" className="space-y-6">
          <PersonalizedLearningPath 
            scores={scores}
            organizationSize="Medium Enterprise"
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

        {/* API Integration */}
        <TabsContent value="api" className="space-y-6">
          <APIIntegration 
            organizationName={organizationName || "Your Organization"}
            assessmentId={`assessment-${Date.now()}`}
          />
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="text-center space-x-4 mt-8">
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
