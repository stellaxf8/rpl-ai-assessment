import { Clock, Zap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AssessmentTypeSelectionProps {
  onSelectType: (type: 'detailed' | 'quick') => void;
  onBack: () => void;
}

export default function AssessmentTypeSelection({ onSelectType, onBack }: AssessmentTypeSelectionProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Choose Your Assessment <span style={{ color: '#cd0000' }}>Type</span></h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Select the assessment type that best fits your time and requirements
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Quick Assessment */}
        <Card className="cursor-pointer border-2 border-slate-300 animate-slide-up stagger-delay-1">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap style={{ color: '#cd0000' }} className="h-8 w-8" />
            </div>
            <CardTitle className="text-xl">Quick Assessment</CardTitle>
            <CardDescription className="text-base">
              Essential evaluation for immediate insights
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="space-y-2 text-sm text-slate-600">
              <p>• 15 core questions</p>
              <p>• 5-7 minutes to complete</p>
              <p>• General AI readiness overview</p>
              <p>• Basic recommendations</p>
            </div>
            <Button 
              onClick={() => onSelectType('quick')}
              className="w-full hover-glow hover-lift button-press"
              size="lg"
            >
              Start Quick Assessment
            </Button>
          </CardContent>
        </Card>

        {/* Detailed Assessment */}
        <Card className="cursor-pointer border-2 border-slate-300 animate-slide-up stagger-delay-2">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock style={{ color: '#cd0000' }} className="h-8 w-8" />
            </div>
            <CardTitle className="text-xl">Detailed Assessment</CardTitle>
            <CardDescription className="text-base">
              Comprehensive industry-specific analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="space-y-2 text-sm text-slate-600">
              <p>• 30 industry-tailored questions</p>
              <p>• 10-15 minutes to complete</p>
              <p>• Industry-specific insights</p>
              <p>• Detailed recommendations & benchmarks</p>
            </div>
            <Button 
              onClick={() => onSelectType('detailed')}
              className="w-full hover-glow hover-lift button-press"
              size="lg"
            >
              Start Detailed Assessment
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
    </div>
  );
}