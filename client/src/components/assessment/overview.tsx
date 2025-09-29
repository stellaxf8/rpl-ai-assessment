import { Server, Database, Users, Puzzle, DollarSign, Shield, Brain, ArrowRight, AlertTriangle, Trophy, TrendingUp, ChevronUp } from "lucide-react";
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
    <section className="relative overflow-hidden">
      {/* Hero Section with improved spacing and typography */}
      <div className="text-center mb-12 sm:mb-16 lg:mb-20 animate-fade-in">
        <h1 className="sm:text-4xl lg:text-5xl xl:text-6xl font-bold animate-slide-up animate-fade-in tracking-tight text-[#cd0000] mt-[12px] mb-[12px] text-[32px]" style={{ 
          color: '#cd0000',
          fontFamily: '"Inter", system-ui, sans-serif',
          letterSpacing: '-0.02em'
        }}>Discover Your AI Readiness in Minutes</h1>
        <p className="text-[22px] text-slate-600 max-w-4xl mx-auto animate-slide-up animate-fade-in px-4 font-light">Uncover strengths, identify gaps, and get a tailored roadmap for AI success.</p>
      </div>
      {/* Modern CTA Button */}
      <div className="text-center mb-12 sm:mb-14 animate-fade-in animate-slide-up">
        <div className="inline-flex flex-col items-center gap-4">
          <Button 
            onClick={onStartAssessment}
            size="lg"
            className="text-base sm:text-3xl lg:text-4xl px-4 sm:px-16 md:px-20 lg:px-24 py-3 sm:py-10 lg:py-12 bg-[#cd0000] hover:bg-[#b30000] text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border-0 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center">
              Get Your Free AI Readiness Report
              <ArrowRight className="ml-2 h-5 w-5 sm:h-7 sm:w-7 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
          
        </div>
      </div>
      {/* Modern Dimensions Section */}
      <div className="text-center mb-8 sm:mb-12 animate-fade-in animate-slide-up">
        <h2 className="text-xl sm:text-3xl font-bold text-slate-800 mb-4">
          Assessment Dimensions
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          We evaluate six critical areas of AI readiness
        </p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 mb-16 sm:mb-20">
        {dimensions.map((dimension, index) => {
          const IconComponent = dimension.icon;
          return (
            <Card 
              key={index} 
              className="border border-slate-200/60 rounded-2xl p-3 sm:p-6 bg-white/80 backdrop-blur-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 group animate-slide-up animate-fade-in"
            >
              <CardContent className="p-0">
                <div className="flex flex-col items-center text-center space-y-2 sm:space-y-4">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-slate-100 transition-colors duration-300">
                    <IconComponent className="w-5 h-5 sm:w-8 sm:h-8 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-lg font-bold text-slate-800 mb-1 sm:mb-2">{dimension.title}</h3>
                    <p className="hidden sm:block text-xs sm:text-sm text-slate-600 leading-relaxed">{dimension.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {/* Bottom CTA Button */}
      <div className="text-center mb-12">
        <Button 
          onClick={onStartAssessment}
          size="lg"
          className="text-base sm:text-lg px-4 sm:px-8 py-3 sm:py-6 bg-[#cd0000] hover:bg-[#b30000] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 border-0 relative overflow-hidden group"
        >
          Get Your Free AI Readiness Report
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Button>
      </div>
      
    </section>
  );
}
