import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, AlertTriangle, CheckCircle, Lightbulb } from "lucide-react";
import { DimensionScores } from "@shared/schema";

interface IndustryInsightsProps {
  industry: string;
  scores: DimensionScores;
  overallScore: number;
}

interface IndustryBenchmark {
  industry: string;
  averageScore: number;
  topPerformerScore: number;
  criticalAreas: string[];
  strengths: string[];
  recommendations: string[];
  industryTrends: string[];
}

const industryBenchmarks: Record<string, IndustryBenchmark> = {
  'Healthcare': {
    industry: 'Healthcare',
    averageScore: 72,
    topPerformerScore: 88,
    criticalAreas: ['Data Security & HIPAA Compliance', 'Patient Data Quality', 'Clinical System Integration'],
    strengths: ['Regulatory Framework', 'Data-Rich Environment', 'Process Standardization'],
    recommendations: [
      'Implement FHIR-compliant data standards for better interoperability',
      'Invest in AI-powered clinical decision support systems',
      'Establish robust patient data governance frameworks',
      'Develop predictive analytics for patient outcomes'
    ],
    industryTrends: [
      'AI-assisted diagnostics showing 15% improvement in accuracy',
      'Predictive maintenance reducing equipment downtime by 25%',
      'Automated clinical documentation saving 2+ hours daily per physician'
    ]
  },
  'Manufacturing': {
    industry: 'Manufacturing',
    averageScore: 69,
    topPerformerScore: 85,
    criticalAreas: ['IoT Data Integration', 'Real-time Analytics', 'Production System Connectivity'],
    strengths: ['Operational Data Abundance', 'Process Optimization Focus', 'Cost Efficiency Mindset'],
    recommendations: [
      'Deploy edge computing for real-time production insights',
      'Implement predictive maintenance across critical equipment',
      'Establish digital twin capabilities for process optimization',
      'Integrate supply chain data for demand forecasting'
    ],
    industryTrends: [
      'Predictive maintenance reducing unplanned downtime by 30%',
      'AI-driven quality control improving defect detection by 40%',
      'Smart scheduling optimization increasing throughput by 20%'
    ]
  },
  'Finance': {
    industry: 'Financial Services',
    averageScore: 76,
    topPerformerScore: 91,
    criticalAreas: ['Regulatory Compliance', 'Real-time Risk Assessment', 'Data Security'],
    strengths: ['Advanced Analytics Maturity', 'Data Quality Standards', 'Risk Management Framework'],
    recommendations: [
      'Enhance real-time fraud detection capabilities',
      'Implement explainable AI for regulatory compliance',
      'Develop customer behavior prediction models',
      'Automate regulatory reporting processes'
    ],
    industryTrends: [
      'AI fraud detection reducing false positives by 50%',
      'Algorithmic trading strategies outperforming by 12%',
      'Automated credit scoring improving approval times by 60%'
    ]
  },
  'Construction': {
    industry: 'Construction',
    averageScore: 55,
    topPerformerScore: 78,
    criticalAreas: ['Project Data Integration', 'Site Safety Technology', 'Estimating Accuracy'],
    strengths: ['Operational Discipline', 'Cost Awareness', 'Project-Based Learning'],
    recommendations: [
      'Connect estimating, scheduling, and accounting into a unified platform',
      'Deploy site safety monitoring using cameras and sensors',
      'Use historical project data to improve bid accuracy and resource planning',
      'Implement drone and IoT technology for real-time site visibility'
    ],
    industryTrends: [
      'AI-powered scheduling reducing project delays by 20%',
      'Automated safety monitoring cutting on-site incidents by 30%',
      'Predictive cost analytics improving bid accuracy by 15%'
    ]
  },
  'Retail & B2C Sales': {
    industry: 'Retail & B2C Sales',
    averageScore: 71,
    topPerformerScore: 87,
    criticalAreas: ['Omnichannel Data Integration', 'Real-time Personalization', 'Inventory Optimization'],
    strengths: ['Customer Data Richness', 'Digital Transformation Readiness', 'Performance Metrics Culture'],
    recommendations: [
      'Implement real-time personalization engines',
      'Deploy AI-driven demand forecasting for inventory',
      'Establish unified customer data platforms',
      'Optimize pricing strategies with dynamic AI models'
    ],
    industryTrends: [
      'AI personalization increasing conversion rates by 25%',
      'Demand forecasting reducing inventory costs by 18%',
      'Dynamic pricing optimization improving margins by 8%'
    ]
  },
  'B2B Sales & Distribution': {
    industry: 'B2B Sales & Distribution',
    averageScore: 61,
    topPerformerScore: 83,
    criticalAreas: ['CRM Data Quality', 'Sales Pipeline Visibility', 'Customer Account Intelligence'],
    strengths: ['Relationship Data Richness', 'Process Orientation', 'ROI Focus'],
    recommendations: [
      'Implement AI-powered lead scoring to prioritize sales efforts',
      'Deploy sales forecasting models using CRM and pipeline data',
      'Use account intelligence tools to identify expansion and churn risk',
      'Automate quoting and proposal generation to shorten sales cycles'
    ],
    industryTrends: [
      'AI lead scoring increasing sales conversion rates by 30%',
      'Predictive forecasting improving revenue accuracy by 25%',
      'Automated outreach tools reducing prospecting time by 40%'
    ]
  },
  'Education': {
    industry: 'Education',
    averageScore: 64,
    topPerformerScore: 82,
    criticalAreas: ['Learning Analytics Infrastructure', 'Data Privacy & Student Protection', 'Faculty AI Literacy'],
    strengths: ['Student-Centric Data', 'Continuous Improvement Culture', 'Educational Technology Adoption'],
    recommendations: [
      'Develop personalized learning path algorithms',
      'Implement student success prediction models',
      'Create AI-powered administrative automation',
      'Establish comprehensive learning analytics dashboards'
    ],
    industryTrends: [
      'Adaptive learning platforms improving outcomes by 20%',
      'AI tutoring systems providing 24/7 student support',
      'Predictive analytics reducing student dropout rates by 15%'
    ]
  }
};

export default function IndustryInsights({ industry, scores, overallScore }: IndustryInsightsProps) {
  const benchmark = industryBenchmarks[industry];
  
  // Fallback for industries without specific benchmarks
  if (!benchmark) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Industry Context
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-slate-600 mb-4">
              Industry-specific insights are being developed for {industry}.
            </p>
            <p className="text-sm text-slate-500">
              Your assessment results are compared against general AI readiness benchmarks.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const performanceLevel = overallScore >= benchmark.topPerformerScore ? 'top' :
                          overallScore >= benchmark.averageScore ? 'above-average' :
                          overallScore >= benchmark.averageScore - 10 ? 'average' : 'below-average';

  const performanceBadge = {
    'top': { color: 'bg-green-500', text: 'Top Performer', icon: CheckCircle },
    'above-average': { color: 'bg-blue-500', text: 'Above Average', icon: TrendingUp },
    'average': { color: 'bg-yellow-500', text: 'Industry Average', icon: Target },
    'below-average': { color: 'bg-red-500', text: 'Below Average', icon: AlertTriangle }
  }[performanceLevel];

  const PerformanceIcon = performanceBadge.icon;

  return (
    <div className="space-y-6">
      {/* Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            {benchmark.industry} Industry Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">{overallScore}</div>
              <div className="text-sm text-slate-600">Your Score</div>
            </div>
            <div className="text-center">
              <Badge className={`${performanceBadge.color} text-white px-3 py-1`}>
                <PerformanceIcon className="h-4 w-4 mr-1" />
                {performanceBadge.text}
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-700">{benchmark.averageScore}</div>
              <div className="text-sm text-slate-600">Industry Average</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{benchmark.topPerformerScore}</div>
              <div className="text-sm text-slate-600">Top Performers</div>
            </div>
          </div>

          <div className="relative">
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div 
                className="h-3 rounded-full bg-[#cd0000]"
                style={{ width: `${(overallScore / 100) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>0</span>
              <span>{benchmark.averageScore}</span>
              <span>{benchmark.topPerformerScore}</span>
              <span>100</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Industry Strengths & Critical Areas */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              Industry Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {benchmark.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-700">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <AlertTriangle className="h-5 w-5" />
              Critical Focus Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {benchmark.criticalAreas.map((area, index) => (
                <li key={index} className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-700">{area}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Industry-Specific Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            {benchmark.industry} AI Implementation Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {benchmark.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-sm text-slate-700">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Industry Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Current {benchmark.industry} AI Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {benchmark.industryTrends.map((trend, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border-l-4 border-purple-200 bg-purple-50">
                <TrendingUp className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-purple-800">{trend}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}