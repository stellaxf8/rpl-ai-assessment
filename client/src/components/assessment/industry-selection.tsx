import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Factory, Heart, Banknote, Code, GraduationCap, Building, Users, Briefcase, Newspaper, Home, Truck, Zap, Wheat, HelpCircle, HardHat } from "lucide-react";

interface IndustrySelectionProps {
  onIndustrySelect: (industry: string) => void;
  selectedIndustry?: string;
}

const industries = [
  {
    id: 'Agriculture',
    name: 'Agriculture & Food',
    icon: Wheat,
    description: 'Farming, food production, agricultural technology, and food services',
    hasSpecializations: false,
    aiApplications: ['Crop monitoring', 'Yield prediction', 'Supply chain optimization']
  },
  {
    id: 'B2B Sales & Distribution',
    name: 'B2B Sales & Distribution',
    icon: Briefcase,
    description: 'Companies selling products or services to other businesses, wholesalers, and distributors',
    hasSpecializations: true,
    aiApplications: ['Lead scoring', 'Sales forecasting', 'Account intelligence']
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
    id: 'Construction',
    name: 'Construction',
    icon: HardHat,
    description: 'General contractors, builders, trades, and construction management firms',
    hasSpecializations: true,
    aiApplications: ['Project scheduling', 'Safety monitoring', 'Cost estimation']
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
    id: 'Energy',
    name: 'Energy & Utilities',
    icon: Zap,
    description: 'Power generation, utilities, renewable energy, and energy services',
    hasSpecializations: false,
    aiApplications: ['Grid optimization', 'Predictive maintenance', 'Energy forecasting']
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
    id: 'Government',
    name: 'Government & Public Sector',
    icon: Building,
    description: 'Government agencies, municipalities, and public organizations',
    hasSpecializations: false,
    aiApplications: ['Citizen services', 'Data analysis', 'Process automation']
  },
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
    id: 'Media',
    name: 'Media & Entertainment',
    icon: Newspaper,
    description: 'Publishing, broadcasting, content creation, and entertainment',
    hasSpecializations: false,
    aiApplications: ['Content generation', 'Audience analytics', 'Content recommendation']
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
    id: 'Real Estate',
    name: 'Real Estate',
    icon: Home,
    description: 'Property management, real estate agencies, and construction',
    hasSpecializations: false,
    aiApplications: ['Property valuation', 'Market analysis', 'Customer matching']
  },
  {
    id: 'Retail & B2C Sales',
    name: 'Retail & B2C Sales',
    icon: Building2,
    description: 'Online and offline retail, consumer goods, and marketplace platforms selling to end consumers',
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
    id: 'Transportation',
    name: 'Transportation & Logistics',
    icon: Truck,
    description: 'Shipping, logistics, transportation services, and fleet management',
    hasSpecializations: false,
    aiApplications: ['Route optimization', 'Fleet management', 'Demand prediction']
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
        <h2 className="text-3xl font-extrabold mb-4 tracking-tight" style={{ 
          color: '#cd0000',
          fontFamily: '"Inter", "Arial Nova Light", "Arial", sans-serif'
        }}>
          Select Your Industry
        </h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Choose your industry for a tailored assessment with relevant questions and specialized insights.
        </p>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 items-start">
        {industries.map((industry) => {
          const Icon = industry.icon;
          const isSelected = localSelectedIndustry === industry.id;

          return (
            <Card
              key={industry.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-[#cd0000] hover:scale-105 h-20 sm:h-24 rounded-xl border-2 ${
                isSelected 
                  ? 'ring-2 ring-primary bg-primary/5' 
                  : ''
              }`}
              onClick={() => handleIndustryClick(industry.id)}
            >
              <CardContent className="p-2 h-full">
                <div className="flex flex-col items-center text-center space-y-1 h-full justify-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-[#2a2c3700] text-[#cd0000]">
                    <Icon className="h-4 w-4" />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-sm text-slate-600 leading-tight">{industry.name}</h3>
                    {industry.hasSpecializations && (
                      <Badge variant="secondary" className="text-xs mt-1">
                        Specialized
                      </Badge>
                    )}
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