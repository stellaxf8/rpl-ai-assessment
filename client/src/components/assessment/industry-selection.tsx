import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Factory, Heart, Banknote, Code, GraduationCap, Building, Users, Briefcase, Newspaper, Home, Truck, Zap, Wheat, HelpCircle } from "lucide-react";

interface IndustrySelectionProps {
  onIndustrySelect: (industry: string) => void;
  selectedIndustry?: string;
}

const industries = [
  {
    id: 'Healthcare',
    name: 'Healthcare',
    icon: Heart,
    description: 'Hospitals, clinics, medical practices, and health services',
    hasSpecializations: true,
    aiApplications: ['Medical imaging', 'Diagnostic support', 'Patient care optimization']
  },
  {
    id: 'Manufacturing',
    name: 'Manufacturing',
    icon: Factory,
    description: 'Production facilities, industrial operations, and supply chain',
    hasSpecializations: true,
    aiApplications: ['Predictive maintenance', 'Quality control', 'Production optimization']
  },
  {
    id: 'Finance',
    name: 'Financial Services',
    icon: Banknote,
    description: 'Banks, insurance, investment firms, and fintech companies',
    hasSpecializations: true,
    aiApplications: ['Fraud detection', 'Risk assessment', 'Algorithmic trading']
  },
  {
    id: 'Retail',
    name: 'Retail & E-commerce',
    icon: Building2,
    description: 'Online and offline retail, consumer goods, and marketplace platforms',
    hasSpecializations: true,
    aiApplications: ['Personalization', 'Demand forecasting', 'Inventory optimization']
  },
  {
    id: 'Technology',
    name: 'Technology',
    icon: Code,
    description: 'Software companies, tech startups, and IT service providers',
    hasSpecializations: false,
    aiApplications: ['Product enhancement', 'Development automation', 'User experience']
  },
  {
    id: 'Education',
    name: 'Education',
    icon: GraduationCap,
    description: 'Schools, universities, training organizations, and edtech',
    hasSpecializations: true,
    aiApplications: ['Personalized learning', 'Student analytics', 'Administrative automation']
  },
  {
    id: 'Government',
    name: 'Government & Public Sector',
    icon: Building,
    description: 'Government agencies, municipalities, and public organizations',
    hasSpecializations: false,
    aiApplications: ['Citizen services', 'Data analysis', 'Process automation']
  },
  {
    id: 'Non-profit',
    name: 'Non-profit',
    icon: Users,
    description: 'Charitable organizations, NGOs, and social impact entities',
    hasSpecializations: false,
    aiApplications: ['Donor analytics', 'Program optimization', 'Impact measurement']
  },
  {
    id: 'Consulting',
    name: 'Consulting',
    icon: Briefcase,
    description: 'Professional services, consulting firms, and advisory services',
    hasSpecializations: false,
    aiApplications: ['Client insights', 'Knowledge management', 'Process improvement']
  },
  {
    id: 'Media',
    name: 'Media & Entertainment',
    icon: Newspaper,
    description: 'Publishing, broadcasting, content creation, and entertainment',
    hasSpecializations: false,
    aiApplications: ['Content generation', 'Audience analytics', 'Content recommendation']
  },
  {
    id: 'Real Estate',
    name: 'Real Estate',
    icon: Home,
    description: 'Property management, real estate agencies, and construction',
    hasSpecializations: false,
    aiApplications: ['Property valuation', 'Market analysis', 'Customer matching']
  },
  {
    id: 'Transportation',
    name: 'Transportation & Logistics',
    icon: Truck,
    description: 'Shipping, logistics, transportation services, and fleet management',
    hasSpecializations: false,
    aiApplications: ['Route optimization', 'Fleet management', 'Demand prediction']
  },
  {
    id: 'Energy',
    name: 'Energy & Utilities',
    icon: Zap,
    description: 'Power generation, utilities, renewable energy, and energy services',
    hasSpecializations: false,
    aiApplications: ['Grid optimization', 'Predictive maintenance', 'Energy forecasting']
  },
  {
    id: 'Agriculture',
    name: 'Agriculture & Food',
    icon: Wheat,
    description: 'Farming, food production, agricultural technology, and food services',
    hasSpecializations: false,
    aiApplications: ['Crop monitoring', 'Yield prediction', 'Supply chain optimization']
  },
  {
    id: 'Other',
    name: 'Other Industry',
    icon: HelpCircle,
    description: 'Industries not listed above or multi-industry organizations',
    hasSpecializations: false,
    aiApplications: ['Custom solutions', 'Cross-industry applications', 'General AI tools']
  }
];

export default function IndustrySelection({ onIndustrySelect }: IndustrySelectionProps) {
  const [localSelectedIndustry, setLocalSelectedIndustry] = useState<string>("");

  const handleIndustryClick = (industryId: string) => {
    setLocalSelectedIndustry(industryId);
    // Auto-scroll to bottom to show the "Start Detailed Assessment" button
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Select Your <span style={{ color: '#cd0000' }}>Industry</span></h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Choose your primary industry to receive a tailored AI readiness assessment with industry-specific questions and benchmarks.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        {industries.map((industry) => {
          const Icon = industry.icon;
          const isSelected = localSelectedIndustry === industry.id;

          return (
            <Card
              key={industry.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected 
                  ? 'ring-2 ring-primary bg-primary/5' 
                  : 'hover:bg-slate-50'
              }`}
              onClick={() => handleIndustryClick(industry.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-[#2a2c3700] text-[#cd0000]">
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-slate-900">{industry.name}</h3>
                      {industry.hasSpecializations && (
                        <Badge variant="secondary" className="text-xs">
                          Specialized
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                      {industry.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {localSelectedIndustry && (
        <div className="text-center">
          <Button 
            onClick={() => onIndustrySelect(localSelectedIndustry)}
            size="lg"
            className="px-12 py-4 text-lg bg-[#cd0000] text-white hover:bg-[#b30000] shadow-lg hover-lift button-press"
          >
            Start Detailed Assessment
          </Button>
        </div>
      )}
      
    </div>
  );
}