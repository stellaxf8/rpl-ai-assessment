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
        <h2 className="text-3xl font-extrabold mb-4 tracking-tight" style={{ 
          background: 'linear-gradient(135deg, #0f172a 0%, #374151 30%, #cd0000 70%, #ef4444 100%)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontFamily: '"Inter", "Arial Nova Light", "Arial", sans-serif',
          textShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
          Choose Your Assessment Type
        </h2>
        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Select the assessment type that best fits your time and requirements
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
        {/* Quick Assessment */}
        <Card 
          className="cursor-pointer border-2 border-slate-300 animate-slide-up animate-fade-in hover:border-[#cd0000] hover:shadow-xl transition-all duration-300 hover-lift rounded-xl"
          onClick={() => onSelectType('quick')}
        >
          <CardHeader className="text-center pb-2 md:pb-4">
            <div className="w-14 h-14 md:w-18 md:h-18 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-sm">
              <Zap style={{ color: '#cd0000' }} className="h-6 w-6 md:h-8 md:w-8" />
            </div>
            <CardTitle className="text-xl md:text-2xl font-bold">Quick Assessment</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-2 md:space-y-4">
            <div className="space-y-1.5 md:space-y-2 text-sm md:text-base text-slate-600">
              <p>• 15 core questions</p>
              <p>• 5-7 minutes to complete</p>
              <p>• General AI readiness overview</p>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Assessment */}
        <Card 
          className="cursor-pointer border-2 border-slate-300 animate-slide-up animate-fade-in hover:border-[#cd0000] hover:shadow-xl transition-all duration-300 hover-lift rounded-xl"
          onClick={() => onSelectType('detailed')}
        >
          <CardHeader className="text-center pb-2 md:pb-4">
            <div className="w-14 h-14 md:w-18 md:h-18 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-sm">
              <Clock style={{ color: '#cd0000' }} className="h-6 w-6 md:h-8 md:w-8" />
            </div>
            <CardTitle className="text-xl md:text-2xl font-bold">Detailed Assessment</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-2 md:space-y-4">
            <div className="space-y-1.5 md:space-y-2 text-sm md:text-base text-slate-600">
              <p>• 30 industry-tailored questions</p>
              <p>• 10-15 minutes to complete</p>
              <p>• Industry-specific insights</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="text-center">
        <Button variant="outline" onClick={onBack} className="hover:bg-slate-50 hover:border-slate-400 hover:scale-105 transition-all duration-200">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
    </div>
  );
}