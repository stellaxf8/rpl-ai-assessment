import { Server, Database, Users, Puzzle, DollarSign, Shield, ArrowRight } from "lucide-react";
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
    title: "Security & Privacy",
    description: "Assess security frameworks, compliance, and privacy protection measures.",
    color: "bg-red-100 text-error",
  },
];

export default function Overview({ onStartAssessment }: OverviewProps) {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Assess Your <span style={{ color: '#cd0000' }}>AI Readiness</span></h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Comprehensive evaluation across 6 key dimensions to determine your organization's readiness for AI implementation
        </p>
      </div>
      {/* Why AI Readiness Assessment is Crucial */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-8 mb-12">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Why AI Readiness Assessment is <span style={{ color: '#cd0000' }}>Crucial</span></h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-[#cd0000]">Avoid Costly Mistakes</h4>
            <p className="text-slate-700 mb-4">
              Organizations that rush into AI implementation without proper assessment face a 67% failure rate. Understanding your readiness prevents wasted resources and ensures successful AI adoption.
            </p>
            
            <h4 className="text-lg font-semibold mb-3 text-[#cd0000]">Maximize ROI</h4>
            <p className="text-slate-700">
              Companies with high AI readiness see 3x better returns on their AI investments. A thorough assessment identifies the most impactful AI opportunities for your specific situation.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3 text-[#cd0000]">Strategic Planning</h4>
            <p className="text-slate-700 mb-4">
              Gain clear insights into what needs to be addressed before implementing AI solutions. Create a roadmap that aligns with your organizational capabilities and goals.
            </p>
            
            <h4 className="text-lg font-semibold mb-3 text-[#cd0000]">Competitive Advantage</h4>
            <p className="text-slate-700">
              Organizations that properly assess and prepare for AI adoption are 5x more likely to achieve competitive advantages through AI implementation within 18 months.
            </p>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {dimensions.map((dimension, index) => {
          const IconComponent = dimension.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${dimension.color}`}>
                    <IconComponent className="text-xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#cd0000]">{dimension.title}</h3>
                </div>
                <p className="text-slate-600">{dimension.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="text-center">
        <Button 
          onClick={onStartAssessment}
          size="lg"
          className="text-lg px-8 py-4"
        >
          Start Assessment
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <p className="text-slate-500 mt-3">Takes approximately 10-15 minutes</p>
      </div>
    </section>
  );
}
