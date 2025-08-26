import { Server, Database, Users, Puzzle, DollarSign, Shield, Brain, ArrowRight, AlertTriangle, Trophy, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import backgroundImage from "@assets/BG_1756165033231.png";

interface OverviewProps {
  onStartAssessment: () => void;
}

const dimensions = [
  {
    icon: Server,
    title: "Technology Infrastructure",
    description: "Evaluate your current tech stack, cloud readiness, and computational capabilities.",
    color: "bg-slate-100 text-slate-900",
  },
  {
    icon: Database,
    title: "Data Quality & Access",
    description: "Assess data availability, quality, governance, and accessibility for AI projects.",
    color: "bg-green-100 text-success",
  },
  {
    icon: Users,
    title: "Team AI Literacy",
    description: "Measure your team's AI knowledge, skills, and readiness for adoption.",
    color: "bg-purple-100 text-secondary",
  },
  {
    icon: Puzzle,
    title: "System Integration",
    description: "Review existing software compatibility and integration capabilities.",
    color: "bg-orange-100 text-warning",
  },
  {
    icon: DollarSign,
    title: "Budget & Resources",
    description: "Evaluate financial readiness and resource allocation for AI initiatives.",
    color: "bg-yellow-100 text-slate-900",
  },
  {
    icon: Shield,
    title: "Data Security & Privacy",
    description: "Assess cybersecurity frameworks, data protection, and regulatory compliance.",
    color: "bg-red-100 text-error",
  },
];

export default function Overview({ onStartAssessment }: OverviewProps) {
  return (
    <section>
      <div className="text-center mb-8 sm:mb-12 animate-fade-in">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 animate-slide-up animate-fade-in"><span style={{ color: 'black', fontFamily: 'Arial Black', fontWeight: 'bold' }}>AI Readiness</span> Assessment</h2>
        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto animate-slide-up animate-fade-in px-4">
          Is your organization ready for AI Implementation?
        </p>
      </div>
      
      {/* Start Assessment Button */}
      <div className="text-center mb-8 sm:mb-12 animate-fade-in animate-slide-up">
        <Button 
          onClick={onStartAssessment}
          size="lg"
          className="text-2xl sm:text-3xl px-16 sm:px-24 py-8 sm:py-10 shadow-2xl hover-lift button-press w-full sm:w-auto bg-[#cd0000] hover:bg-[#b30000] font-bold transform hover:scale-105 transition-all duration-300"
        >
          Start Assessment
          <ArrowRight className="ml-4 h-8 w-8 sm:h-10 sm:w-10" />
        </Button>
      </div>
      
      {/* Why AI Readiness Assessment is Crucial */}
      <div className="bg-transparent border-2 rounded-xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12 shadow-lg animate-slide-up animate-fade-in border-gray-300">
        <h3 className="text-xl sm:text-2xl font-medium text-slate-900 mb-4 sm:mb-6 text-center">Why <span style={{ color: 'black', fontFamily: 'Arial Black', fontWeight: 'bold' }}>AI Readiness</span> Assessment is <span style={{ color: 'black', fontFamily: 'Arial Black' }}>Crucial</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <AlertTriangle className="w-6 h-6 mr-3 text-[#cd0000]" />
              <h4 className="text-lg font-semibold text-black">Avoid Costly Mistakes</h4>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-[#cd0000] mb-2">52%</div>
            <p className="text-sm md:text-base text-slate-700">
              of AI projects fail to reach production due to inadequate planning.
            </p>
            <p className="text-xs text-slate-500 mt-1">Source: Gartner 2024</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <Trophy className="w-6 h-6 mr-3 text-[#cd0000]" />
              <h4 className="text-lg font-semibold text-black">Competitive Advantage</h4>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-[#cd0000] mb-2">80%</div>
            <p className="text-sm md:text-base text-slate-700">
              more effective at managing uncertainty when combining organizational and AI learning.
            </p>
            <p className="text-xs text-slate-500 mt-1">Source: MIT Sloan 2024</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <Shield className="w-6 h-6 mr-3 text-[#cd0000]" />
              <h4 className="text-lg font-semibold text-black">Security & Compliance</h4>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-[#cd0000] mb-2">77%</div>
            <p className="text-sm md:text-base text-slate-700">
              of companies experienced security breaches in their AI systems this year.
            </p>
            <p className="text-xs text-slate-500 mt-1">Source: Cisco 2024</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <TrendingUp className="w-6 h-6 mr-3 text-[#cd0000]" />
              <h4 className="text-lg font-semibold text-black">Maximize ROI</h4>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-[#cd0000] mb-2">23%</div>
            <p className="text-sm md:text-base text-slate-700">
              of organizations see significant revenue increases (&gt;5%) from AI investments.
            </p>
            <p className="text-xs text-slate-500 mt-1">Source: McKinsey 2024</p>
          </div>
        </div>
      </div>
      
      {/* 6 Key Evaluation Dimensions Section */}
      <div className="text-center mb-4 sm:mb-6 animate-fade-in animate-slide-up">
        <h3 className="text-sm sm:text-base font-medium text-slate-600">
          Key Evaluation Dimensions
        </h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-8 sm:mb-12">
        {dimensions.map((dimension, index) => {
          const IconComponent = dimension.icon;
          return (
            <Card 
              key={index} 
              className={`border-none animate-slide-up animate-fade-in`}
            >
              <CardContent className="p-2 sm:p-3 lg:p-4">
                <div className="flex items-center text-left">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center mr-2 sm:mr-2 lg:mr-3 bg-[#f1f5f900] text-[#cd0000]`}>
                    <IconComponent className="text-sm sm:text-base lg:text-lg" />
                  </div>
                  <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-slate-600">{dimension.title}</h3>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
