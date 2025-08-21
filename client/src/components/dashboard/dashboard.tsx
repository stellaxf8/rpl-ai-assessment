import { BarChart3, TrendingUp, AlertCircle, CheckCircle, Users, Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Results from "@/components/assessment/results";
import { Assessment } from "@shared/schema";

interface DashboardProps {
  completedAssessment: Assessment | null;
  onStartAssessment: () => void;
}

export default function Dashboard({ completedAssessment, onStartAssessment }: DashboardProps) {
  if (!completedAssessment) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Dashboard</h1>
          <p className="text-lg text-slate-600 mb-8">
            Complete an assessment to view your AI readiness dashboard
          </p>
        </div>

        {/* Empty State */}
        <div className="max-w-2xl mx-auto">
          <Card className="text-center py-12">
            <CardContent>
              <BarChart3 className="h-16 w-16 text-slate-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No Assessment Data Available
              </h3>
              <p className="text-slate-600 mb-6">
                Take your first AI readiness assessment to unlock personalized insights and recommendations.
              </p>
              <Button onClick={onStartAssessment} size="lg">
                Start Assessment
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="opacity-60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                <span style={{color: '#cd0000'}}>AI Readiness</span> Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-400">--</div>
              <p className="text-sm text-slate-500">Complete assessment to see score</p>
            </CardContent>
          </Card>

          <Card className="opacity-60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Priority Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-slate-500">
                Areas needing attention will appear here
              </div>
            </CardContent>
          </Card>

          <Card className="opacity-60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-slate-500">
                Your AI readiness strengths will be highlighted here
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show full results when assessment is completed
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4"><span style={{color: '#cd0000'}}>AI Readiness</span> Dashboard</h1>
        <p className="text-lg text-slate-600 mb-2">
          Organization: {completedAssessment.organizationName}
        </p>
        <Badge variant="outline" className="mb-6">
          Assessment completed on {new Date(completedAssessment.createdAt).toLocaleDateString()}
        </Badge>
      </div>

      {/* Dashboard Content */}
      <Results 
        assessment={completedAssessment}
        onRetakeAssessment={() => {}} // Dashboard view doesn't need retake functionality
        showRetakeButton={false}
      />
    </div>
  );
}