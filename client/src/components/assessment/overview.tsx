import { Server, Database, Users, Puzzle, DollarSign, Shield, Brain, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 animate-slide-up animate-fade-in"><span style={{ color: '#cd0000', fontFamily: 'Arial Black', fontWeight: 'bold' }}>AI Readiness</span> Assessment</h2>
        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto animate-slide-up animate-fade-in px-4">
          Comprehensive evaluation across 6 key dimensions to determine your organization's readiness for AI implementation
        </p>
      </div>
      
      {/* Start Assessment Button */}
      <div className="text-center mb-8 sm:mb-12 animate-fade-in animate-slide-up">
        <Button 
          onClick={onStartAssessment}
          size="lg"
          className="text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 shadow-lg hover-lift button-press w-full sm:w-auto"
        >
          Start Assessment
          <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
      
      {/* Why AI Readiness Assessment is Crucial */}
      <div className="bg-transparent border-2 rounded-xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12 shadow-lg animate-slide-up animate-fade-in" style={{ borderColor: '#cd0000' }}>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 text-center">Why <span style={{ color: '#cd0000', fontFamily: 'Arial Black', fontWeight: 'bold' }}>AI Readiness</span> Assessment is <span style={{ color: 'black', fontFamily: 'Arial Black' }}>Crucial</span></h3>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          <div className="space-y-3 md:space-y-6">
            <div>
              <h4 className="text-sm md:text-base lg:text-lg font-semibold mb-1 md:mb-2 lg:mb-3 text-[#cd0000]">Avoid Costly Mistakes</h4>
              <p className="text-xs md:text-sm lg:text-base text-slate-700">
                Organizations that rush into AI implementation without proper assessment face a 67% failure rate. Understanding your readiness prevents wasted resources and ensures successful AI adoption.
              </p>
            </div>
            
            <div className="md:hidden">
              <h4 className="text-sm font-semibold mb-1 text-[#cd0000]">Security & Compliance</h4>
              <p className="text-xs text-slate-700">
                AI systems introduce unique security risks and compliance challenges. Our assessment evaluates your security frameworks, data privacy measures, and regulatory readiness to ensure safe AI deployment.
              </p>
            </div>
            
            <div className="hidden md:block">
              <h4 className="text-base lg:text-lg font-semibold mb-2 lg:mb-3 text-[#cd0000]">Maximize ROI</h4>
              <p className="text-sm lg:text-base text-slate-700">
                Companies with high AI readiness see 3x better returns on their AI investments. A thorough assessment identifies the most impactful AI opportunities for your specific situation.
              </p>
            </div>
          </div>
          
          <div className="space-y-3 md:space-y-6">
            <div className="md:hidden">
              <h4 className="text-sm font-semibold mb-1 text-[#cd0000]">Maximize ROI</h4>
              <p className="text-xs text-slate-700">
                Companies with high AI readiness see 3x better returns on their AI investments. A thorough assessment identifies the most impactful AI opportunities for your specific situation.
              </p>
            </div>
            
            <div className="md:hidden">
              <h4 className="text-sm font-semibold mb-1 text-[#cd0000]">Competitive Advantage</h4>
              <p className="text-xs text-slate-700">
                Organizations that properly assess and prepare for AI adoption are 5x more likely to achieve competitive advantages through AI implementation within 18 months.
              </p>
            </div>
            
            <div className="hidden md:block">
              <h4 className="text-base lg:text-lg font-semibold mb-2 lg:mb-3 text-[#cd0000]">Security & Compliance</h4>
              <p className="text-sm lg:text-base text-slate-700">
                AI systems introduce unique security risks and compliance challenges. Our assessment evaluates your security frameworks, data privacy measures, and regulatory readiness to ensure safe AI deployment.
              </p>
            </div>
            
            <div className="hidden md:block">
              <h4 className="text-base lg:text-lg font-semibold mb-2 lg:mb-3 text-[#cd0000]">Competitive Advantage</h4>
              <p className="text-sm lg:text-base text-slate-700">
                Organizations that properly assess and prepare for AI adoption are 5x more likely to achieve competitive advantages through AI implementation within 18 months.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        {dimensions.map((dimension, index) => {
          const IconComponent = dimension.icon;
          return (
            <Card 
              key={index} 
              className={`border-slate-300 animate-slide-up animate-fade-in`}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mr-3 sm:mr-4 bg-[#f1f5f900] text-[#cd0000]`}>
                    <IconComponent className="text-lg sm:text-xl" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">{dimension.title}</h3>
                </div>
                <p className="text-sm sm:text-base text-slate-600">{dimension.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
