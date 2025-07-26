import { BookOpen, Brain, Lightbulb, TrendingUp, ExternalLink, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const aiConcepts = [
  // Beginner Level
  {
    term: "Machine Learning",
    definition: "A method of teaching computers to learn and make decisions from data without being explicitly programmed for every task.",
    relevance: "Foundation for most AI applications in business",
    difficulty: "Beginner"
  },
  {
    term: "Predictive Analytics",
    definition: "Using historical data and AI to forecast future trends, behaviors, and outcomes.",
    relevance: "Improves business forecasting and decision-making",
    difficulty: "Beginner"
  },
  {
    term: "Robotic Process Automation (RPA)",
    definition: "Software robots that automate repetitive, rule-based tasks typically performed by humans.",
    relevance: "Immediate productivity gains through task automation",
    difficulty: "Beginner"
  },
  // Intermediate Level
  {
    term: "Natural Language Processing",
    definition: "Technology that helps computers understand, interpret, and respond to human language in a valuable way.",
    relevance: "Powers chatbots, document analysis, and customer service automation",
    difficulty: "Intermediate"
  },
  {
    term: "Artificial Neural Networks",
    definition: "Computing systems inspired by biological neural networks that learn from data patterns.",
    relevance: "Core technology behind most modern AI applications",
    difficulty: "Intermediate"
  },
  {
    term: "Data Mining",
    definition: "Process of discovering patterns and insights from large datasets using AI and statistical methods.",
    relevance: "Uncovers business insights and opportunities from existing data",
    difficulty: "Intermediate"
  },
  // Advanced Level
  {
    term: "Computer Vision",
    definition: "AI technology that enables computers to interpret and understand visual information from images and videos.",
    relevance: "Useful for quality control, security, and automation",
    difficulty: "Advanced"
  },
  {
    term: "Deep Learning",
    definition: "Advanced machine learning using artificial neural networks with multiple layers to model complex patterns.",
    relevance: "Powers image recognition, speech processing, and complex decision-making",
    difficulty: "Advanced"
  },
  {
    term: "Large Language Models (LLMs)",
    definition: "Advanced AI systems trained on vast amounts of text data to understand and generate human-like language responses.",
    relevance: "Powers conversational AI, content generation, and intelligent document processing",
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
    readinessScore: 72,
    implementation: "6 months",
    technologies: ["Computer Vision", "Edge Computing", "IoT Sensors"]
  },
  {
    title: "Customer Service Automation",
    company: "Regional Bank",
    industry: "Financial Services",
    challenge: "Long customer wait times and repetitive support inquiries",
    solution: "Deployed AI chatbot with natural language processing capabilities",
    results: "60% reduction in support tickets, 24/7 availability, 90% customer satisfaction",
    readinessScore: 68,
    implementation: "4 months",
    technologies: ["Natural Language Processing", "Machine Learning", "API Integration"]
  },
  {
    title: "Inventory Optimization",
    company: "E-commerce Retailer",
    industry: "Retail",
    challenge: "Frequent stockouts and excess inventory carrying costs",
    solution: "Predictive analytics for demand forecasting and inventory management",
    results: "25% reduction in stockouts, 30% lower inventory costs, 15% revenue increase",
    readinessScore: 85,
    implementation: "8 months",
    technologies: ["Predictive Analytics", "Machine Learning", "Data Warehousing"]
  },
  {
    title: "Healthcare Diagnosis Support",
    company: "Regional Medical Center",
    industry: "Healthcare",
    challenge: "Inconsistent diagnostic accuracy and long patient wait times",
    solution: "AI-powered diagnostic imaging analysis and patient triage system",
    results: "20% improvement in diagnostic accuracy, 40% faster patient processing",
    readinessScore: 76,
    implementation: "12 months",
    technologies: ["Computer Vision", "Deep Learning", "Medical Imaging AI"]
  },
  {
    title: "Supply Chain Optimization",
    company: "Food Distribution Company",
    industry: "Logistics",
    challenge: "Inefficient route planning and high fuel costs",
    solution: "AI-powered route optimization and demand prediction system",
    results: "30% reduction in fuel costs, 25% faster deliveries, improved customer satisfaction",
    readinessScore: 71,
    implementation: "5 months",
    technologies: ["Route Optimization", "Predictive Analytics", "GPS Integration"]
  },
  {
    title: "Fraud Detection Enhancement",
    company: "Credit Union",
    industry: "Financial Services",
    challenge: "Rising fraud losses and false positive alerts",
    solution: "Machine learning fraud detection with behavioral analysis",
    results: "50% reduction in fraud losses, 70% fewer false positives",
    readinessScore: 82,
    implementation: "6 months",
    technologies: ["Machine Learning", "Behavioral Analytics", "Real-time Processing"]
  }
];

const implementationGuides = [
  // Beginner Level
  {
    title: "AI Implementation Checklist",
    description: "Step-by-step guide to planning your AI initiative",
    type: "Guide",
    duration: "15 min read",
    level: "Beginner"
  },
  // Intermediate Level
  {
    title: "Data Preparation Best Practices",
    description: "How to organize and clean your data for AI success",
    type: "Best Practices",
    duration: "20 min read",
    level: "Intermediate"
  },
  {
    title: "Vendor Selection Guide",
    description: "How to evaluate and choose AI solution providers",
    type: "Guide",
    duration: "22 min read",
    level: "Intermediate"
  },
  {
    title: "Building an AI-Ready Team",
    description: "Training and hiring strategies for AI implementation",
    type: "Strategy",
    duration: "25 min read",
    level: "Intermediate"
  },
  // Advanced Level
  {
    title: "ROI Measurement Framework",
    description: "How to measure and prove the value of AI investments",
    type: "Framework",
    duration: "30 min read",
    level: "Advanced"
  },
  {
    title: "AI Ethics and Governance",
    description: "Establishing responsible AI practices and oversight",
    type: "Governance",
    duration: "35 min read",
    level: "Advanced"
  }
];

export default function KnowledgeCenter() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-3 flex items-center">
          <BookOpen className="mr-3 h-8 w-8 text-primary" />
          AI Knowledge Center
        </h1>
        <p className="text-xl text-slate-600">
          Comprehensive resources to help you understand and implement AI in your organization
        </p>
      </div>

      {/* AI Concepts Glossary */}
      <section className="mb-12">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center">
              <Brain className="mr-2 h-6 w-6 text-primary" />
              Essential AI Concepts
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiConcepts.map((concept, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-slate-900">{concept.term}</h3>
                    <Badge variant={
                      concept.difficulty === "Beginner" ? "secondary" :
                      concept.difficulty === "Intermediate" ? "default" : "destructive"
                    }>
                      {concept.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-3 leading-relaxed">{concept.definition}</p>
                  <p className="text-xs text-slate-500 italic">{concept.relevance}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Case Studies */}
      <section className="mb-12">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center">
              <TrendingUp className="mr-2 h-6 w-6 text-primary" />
              Real-World Success Stories
            </h2>
            <div className="grid lg:grid-cols-2 gap-6">
              {caseStudies.map((study, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-slate-900 text-lg">{study.title}</h3>
                      <p className="text-sm text-slate-600">{study.company} • {study.industry}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant="outline">
                        Score: {study.readinessScore}
                      </Badge>
                      <span className="text-xs text-slate-500">{study.implementation}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-sm">
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
                    <div>
                      <div className="font-medium text-slate-900 mb-2">Technologies Used:</div>
                      <div className="flex flex-wrap gap-1">
                        {study.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Implementation Guides */}
      <section className="mb-12">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center">
              <Lightbulb className="mr-2 h-6 w-6 text-primary" />
              Implementation Guides & Resources
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {implementationGuides.map((guide, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-slate-900">{guide.title}</h3>
                    <ExternalLink className="h-4 w-4 text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{guide.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Badge variant="outline">{guide.type}</Badge>
                      <Badge variant={
                        guide.level === "Beginner" ? "secondary" :
                        guide.level === "Intermediate" ? "default" : "destructive"
                      }>
                        {guide.level}
                      </Badge>
                    </div>
                    <span className="text-xs text-slate-500">{guide.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Additional Resources */}
      <section>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Additional Resources</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
                <Download className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">AI Readiness Workbook</span>
                <span className="text-xs text-slate-500 mt-1">Comprehensive planning tool</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
                <BookOpen className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Industry Benchmarks</span>
                <span className="text-xs text-slate-500 mt-1">Compare against peers</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
                <ExternalLink className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Expert Webinars</span>
                <span className="text-xs text-slate-500 mt-1">Live learning sessions</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
                <TrendingUp className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">ROI Calculator</span>
                <span className="text-xs text-slate-500 mt-1">Estimate your returns</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}