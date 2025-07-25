import { Calculator, Calendar, MessageSquare, FileText, Users, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface BusinessDevelopmentProps {
  scores: {
    overallScore: number;
    technologyInfrastructure: number;
    dataQuality: number;
    teamLiteracy: number;
    systemIntegration: number;
    budget: number;
    security: number;
  };
}

export default function BusinessDevelopment({ scores }: BusinessDevelopmentProps) {
  const { toast } = useToast();

  const calculateImplementationCost = () => {
    const { overallScore, teamLiteracy, technologyInfrastructure } = scores;
    
    // Base cost calculation based on readiness level
    let baseCost = 50000; // Starting point for small-medium organization
    
    // Adjust based on infrastructure needs
    if (technologyInfrastructure < 3.0) baseCost += 75000; // Infrastructure upgrade
    if (teamLiteracy < 3.0) baseCost += 30000; // Training costs
    if (scores.security < 3.0) baseCost += 40000; // Security improvements
    
    // Complexity multiplier
    const complexityMultiplier = overallScore < 60 ? 1.5 : overallScore < 75 ? 1.2 : 1.0;
    
    return Math.round(baseCost * complexityMultiplier);
  };

  const getTimelineEstimate = () => {
    const { overallScore } = scores;
    
    if (overallScore >= 80) return "3-6 months";
    if (overallScore >= 60) return "6-12 months";
    return "12-18 months";
  };

  const getROIProjection = () => {
    const implementationCost = calculateImplementationCost();
    const annualROI = implementationCost * 2.5; // Conservative 2.5x ROI estimate
    
    return {
      yearOne: Math.round(annualROI * 0.3),
      yearTwo: Math.round(annualROI * 0.8),
      yearThree: Math.round(annualROI)
    };
  };

  const handleScheduleConsultation = () => {
    toast({
      title: "Consultation Request Received",
      description: "Our AI specialists will contact you within 24 hours to schedule your free consultation.",
    });
  };

  const handleRequestProposal = () => {
    toast({
      title: "Proposal Request Submitted",
      description: "We'll prepare a customized implementation proposal based on your assessment results.",
    });
  };

  const handleDownloadRoadmap = () => {
    toast({
      title: "Roadmap Generated",
      description: "Your personalized AI implementation roadmap is being prepared for download.",
    });
  };

  const implementationCost = calculateImplementationCost();
  const timeline = getTimelineEstimate();
  const roiProjection = getROIProjection();

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-primary" />
          Implementation Planning & Business Development
        </h3>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Cost Estimation */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Calculator className="text-primary mr-2 h-5 w-5" />
              <h4 className="font-semibold text-slate-900">Implementation Cost Estimate</h4>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-2">
              ${implementationCost.toLocaleString()}
            </div>
            <div className="text-sm text-slate-600 mb-4">
              Based on your current readiness level and infrastructure needs
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Base implementation:</span>
                <span className="text-slate-900">$50,000</span>
              </div>
              {scores.technologyInfrastructure < 3.0 && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Infrastructure upgrade:</span>
                  <span className="text-slate-900">$75,000</span>
                </div>
              )}
              {scores.teamLiteracy < 3.0 && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Training & education:</span>
                  <span className="text-slate-900">$30,000</span>
                </div>
              )}
              {scores.security < 3.0 && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Security enhancements:</span>
                  <span className="text-slate-900">$40,000</span>
                </div>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Calendar className="text-primary mr-2 h-5 w-5" />
              <h4 className="font-semibold text-slate-900">Implementation Timeline</h4>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-2">{timeline}</div>
            <div className="text-sm text-slate-600 mb-4">From planning to full deployment</div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                <span className="text-slate-700">Assessment & Planning (1-2 months)</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                <span className="text-slate-700">Infrastructure Setup (2-4 months)</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                <span className="text-slate-700">Training & Deployment (2-6 months)</span>
              </div>
            </div>
          </div>
        </div>

        {/* ROI Projection */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg mb-6">
          <h4 className="font-semibold text-slate-900 mb-4">Projected Return on Investment</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                ${roiProjection.yearOne.toLocaleString()}
              </div>
              <div className="text-sm text-slate-600">Year 1 Savings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                ${roiProjection.yearTwo.toLocaleString()}
              </div>
              <div className="text-sm text-slate-600">Year 2 Savings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                ${roiProjection.yearThree.toLocaleString()}
              </div>
              <div className="text-sm text-slate-600">Year 3 Savings</div>
            </div>
          </div>
          <div className="text-center mt-4 text-sm text-slate-600">
            Conservative estimates based on industry benchmarks for process automation and efficiency gains
          </div>
        </div>

        {/* Business Development Actions */}
        <div className="text-center">
          <Button 
            variant="default" 
            size="lg"
            className="h-auto p-6 flex items-center justify-center"
            onClick={handleScheduleConsultation}
          >
            <div className="mr-3">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-lg">Schedule Free Consultation</div>
              <div className="text-sm opacity-90">30-minute strategy session with our AI specialists</div>
            </div>
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-slate-600">
            <div>
              <div className="font-semibold text-slate-900">500+</div>
              <div>Successful Implementations</div>
            </div>
            <div>
              <div className="font-semibold text-slate-900">95%</div>
              <div>Client Satisfaction Rate</div>
            </div>
            <div>
              <div className="font-semibold text-slate-900">$2.5M</div>
              <div>Average Annual Savings</div>
            </div>
            <div>
              <div className="font-semibold text-slate-900">15 Years</div>
              <div>AI Implementation Experience</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}