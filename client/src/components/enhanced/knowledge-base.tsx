import { BookOpen, Brain, Lightbulb, TrendingUp, ExternalLink, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface KnowledgeBaseProps {
  userScore: number;
}

const aiConcepts = [
  {
    term: "Machine Learning",
    definition: "A method of teaching computers to learn and make decisions from data without being explicitly programmed for every task.",
    relevance: "Foundation for most AI applications in business",
    difficulty: "Beginner"
  },
  {
    term: "Natural Language Processing",
    definition: "Technology that helps computers understand, interpret, and respond to human language in a valuable way.",
    relevance: "Powers chatbots, document analysis, and customer service automation",
    difficulty: "Intermediate"
  },
  {
    term: "Predictive Analytics",
    definition: "Using historical data and AI to forecast future trends, behaviors, and outcomes.",
    relevance: "Improves business forecasting and decision-making",
    difficulty: "Beginner"
  },
  {
    term: "Computer Vision",
    definition: "AI technology that enables computers to interpret and understand visual information from images and videos.",
    relevance: "Useful for quality control, security, and automation",
    difficulty: "Advanced"
  }
];

const caseStudies = [
  {
    title: "Manufacturing Efficiency Boost",
    company: "Global Auto Parts Manufacturer",
    industry: "Manufacturing",
    challenge: "High defect rates and inefficient quality control processes",
    solution: "Implemented computer vision AI for real-time quality inspection",
    results: "35% reduction in defects, 50% faster inspection times, $2M annual savings",
    readinessScore: 72
  },
  {
    title: "Customer Service Automation",
    company: "Regional Bank",
    industry: "Financial Services",
    challenge: "Long customer wait times and repetitive support inquiries",
    solution: "Deployed AI chatbot with natural language processing capabilities",
    results: "60% reduction in support tickets, 24/7 availability, 90% customer satisfaction",
    readinessScore: 68
  },
  {
    title: "Inventory Optimization",
    company: "E-commerce Retailer",
    industry: "Retail & B2C Sales",
    challenge: "Frequent stockouts and excess inventory carrying costs",
    solution: "Predictive analytics for demand forecasting and inventory management",
    results: "25% reduction in stockouts, 30% lower inventory costs, 15% revenue increase",
    readinessScore: 85
  }
];

const implementationGuides = [
  {
    title: "AI Implementation Checklist",
    description: "Step-by-step guide to planning your AI initiative",
    type: "Guide",
    duration: "15 min read"
  },
  {
    title: "Data Preparation Best Practices",
    description: "How to organize and clean your data for AI success",
    type: "Best Practices",
    duration: "20 min read"
  },
  {
    title: "Building an AI-Ready Team",
    description: "Training and hiring strategies for AI implementation",
    type: "Strategy",
    duration: "25 min read"
  },
  {
    title: "ROI Measurement Framework",
    description: "How to measure and prove the value of AI investments",
    type: "Framework",
    duration: "30 min read"
  }
];

export default function KnowledgeBase({ userScore }: KnowledgeBaseProps) {
  const getRelevantCaseStudies = () => {
    // Show case studies with similar or slightly higher readiness scores
    return caseStudies.filter(study => 
      study.readinessScore >= userScore - 15 && study.readinessScore <= userScore + 20
    );
  };

  const getRecommendedReading = () => {
    if (userScore >= 80) return implementationGuides.slice(2, 4); // Advanced topics
    if (userScore >= 60) return implementationGuides.slice(1, 3); // Intermediate topics
    return implementationGuides.slice(0, 2); // Foundational topics
  };

  const relevantCaseStudies = getRelevantCaseStudies();
  const recommendedReading = getRecommendedReading();

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-primary" />
          AI Knowledge Center
        </h3>

        {/* AI Concepts Glossary */}
        <div className="mb-8">
          <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
            <Brain className="mr-2 h-4 w-4 text-primary" />
            Essential AI Concepts
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            {aiConcepts.map((concept, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-slate-900">{concept.term}</h5>
                  <Badge variant={
                    concept.difficulty === "Beginner" ? "secondary" :
                    concept.difficulty === "Intermediate" ? "default" : "destructive"
                  }>
                    {concept.difficulty}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 mb-2">{concept.definition}</p>
                <p className="text-xs text-slate-500 italic">{concept.relevance}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Relevant Case Studies */}
        <div className="mb-8">
          <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
            <TrendingUp className="mr-2 h-4 w-4 text-primary" />
            Success Stories Similar to Your Organization
          </h4>
          <div className="space-y-4">
            {relevantCaseStudies.map((study, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h5 className="font-medium text-slate-900">{study.title}</h5>
                    <p className="text-sm text-slate-600">{study.company} • {study.industry}</p>
                  </div>
                  <Badge variant="outline">
                    Readiness Score: {study.readinessScore}
                  </Badge>
                </div>
                
                <div className="grid md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="font-medium text-slate-900 mb-1">Challenge:</div>
                    <div className="text-slate-600">{study.challenge}</div>
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 mb-1">Solution:</div>
                    <div className="text-slate-600">{study.solution}</div>
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 mb-1">Results:</div>
                    <div className="text-slate-600">{study.results}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Implementation Guides */}
        <div className="mb-8">
          <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
            <Lightbulb className="mr-2 h-4 w-4 text-primary" />
            Recommended Reading for Your Level
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            {recommendedReading.map((guide, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-medium text-slate-900">{guide.title}</h5>
                  <ExternalLink className="h-4 w-4 text-slate-400" />
                </div>
                <p className="text-sm text-slate-600 mb-3">{guide.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{guide.type}</Badge>
                  <span className="text-xs text-slate-500">{guide.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border-t border-slate-200 pt-6">
          <h4 className="font-semibold text-slate-900 mb-4">Additional Resources</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              AI Readiness Workbook
            </Button>
            <Button variant="outline" className="w-full">
              <BookOpen className="mr-2 h-4 w-4" />
              Industry Benchmarks
            </Button>
            <Button variant="outline" className="w-full">
              <ExternalLink className="mr-2 h-4 w-4" />
              Expert Webinars
            </Button>
          </div>
        </div>

        {/* Learning Path Recommendation */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h5 className="font-medium text-slate-900 mb-2">Your Personalized Learning Path</h5>
          <p className="text-sm text-slate-600 mb-3">
            {userScore >= 80 
              ? "Focus on advanced implementation strategies and optimization techniques."
              : userScore >= 60
              ? "Build foundational knowledge while exploring practical applications for your industry."
              : "Start with AI fundamentals and data preparation best practices."
            }
          </p>
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-slate-700">Estimated learning time: {userScore >= 80 ? "2-3 weeks" : userScore >= 60 ? "4-6 weeks" : "6-8 weeks"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}