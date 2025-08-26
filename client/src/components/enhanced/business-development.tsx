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
    window.open('https://www.redpilllabs.com/contact-us', '_blank');
  };



  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-base sm:text-xl font-semibold text-slate-900 mb-6 text-center">Contact our AI experts today to get personalized guidance</h3>

        {/* Consultation Scheduling */}
        <div className="flex justify-center">
          <Button 
            variant="default" 
            size="lg"
            className="h-auto p-6 hover-lift button-press"
            onClick={handleScheduleConsultation}
          >
            <div className="flex items-center">
              <MessageSquare className="mr-3 h-6 w-6" />
              <div className="font-semibold text-lg">Schedule a Consultation</div>
            </div>
          </Button>
        </div>


      </CardContent>
    </Card>
  );
}