import { useState } from "react";
import { MessageSquare } from "lucide-react";
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
    dataSecurity: number;
  };
}

export default function BusinessDevelopment({ scores }: BusinessDevelopmentProps) {
  const { toast } = useToast();
  const [isConsultationRequested, setIsConsultationRequested] = useState(false);


  const handleScheduleConsultation = () => {
    setIsConsultationRequested(true);
    toast({
      title: "Consultation Request Received",
      description: "Our AI specialists will contact you within 1-2 business days to schedule your free consultation.",
    });
  };



  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-6">Get Started with AI Implementation</h3>

        {/* Consultation Scheduling */}
        <div className="flex justify-center">
          <Button 
            variant="default" 
            size="lg"
            className="h-auto p-6"
            onClick={handleScheduleConsultation}
            disabled={isConsultationRequested}
          >
            <div className="flex items-center">
              <MessageSquare className="mr-3 h-6 w-6" />
              <div>
                <div className="font-semibold text-lg">
                  {isConsultationRequested ? "Consultation Requested" : "Schedule Free Consultation"}
                </div>
                {isConsultationRequested && (
                  <div className="text-sm opacity-90">
                    We'll contact you within 1-2 business days
                  </div>
                )}
              </div>
            </div>
          </Button>
        </div>


      </CardContent>
    </Card>
  );
}