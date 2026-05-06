import { TrendingUp, Award, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface IndustryBenchmarkProps {
  userScore: number;
  industry: string;
}

const industryData = {
  "Manufacturing": { avgScore: 58, topPerformer: 85, challenges: ["Legacy systems integration", "Data silos", "Skills gap"] },
  "Construction": { avgScore: 52, topPerformer: 78, challenges: ["Fragmented project data", "Workforce adoption", "Estimating accuracy"] },
  "Healthcare": { avgScore: 62, topPerformer: 88, challenges: ["HIPAA compliance", "Patient data privacy", "System interoperability"] },
  "Financial Services": { avgScore: 71, topPerformer: 92, challenges: ["Regulatory compliance", "Data security", "Real-time processing"] },
  "Retail & Sales": { avgScore: 65, topPerformer: 89, challenges: ["Customer data integration", "Inventory optimization", "Omnichannel consistency"] },
  "Technology": { avgScore: 78, topPerformer: 95, challenges: ["Scaling AI infrastructure", "Model governance", "Talent retention"] },
  "Other": { avgScore: 61, topPerformer: 87, challenges: ["Technology infrastructure", "Data quality", "Change management"] }
};

export default function IndustryBenchmark({ userScore, industry }: IndustryBenchmarkProps) {
  const benchmark = industryData[industry as keyof typeof industryData] || industryData["Other"];
  const isAboveAverage = userScore > benchmark.avgScore;
  const percentile = Math.round((userScore / benchmark.topPerformer) * 100);

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-primary" />
          Industry Benchmark Analysis
        </h3>
        
        <div className="space-y-6">
          {/* Score Comparison */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-slate-900">{userScore}</div>
                <div className="text-sm text-slate-600">Your Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-600">{benchmark.avgScore}</div>
                <div className="text-sm text-slate-600">Industry Average</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{benchmark.topPerformer}</div>
                <div className="text-sm text-slate-600">Top Performers</div>
              </div>
            </div>
          </div>

          {/* Performance Indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {isAboveAverage ? (
                <>
                  <Award className="text-green-600 mr-2 h-5 w-5" />
                  <span className="text-green-800 font-medium">Above Industry Average</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="text-orange-600 mr-2 h-5 w-5" />
                  <span className="text-orange-800 font-medium">Below Industry Average</span>
                </>
              )}
            </div>
            <span className="text-slate-600">{percentile}th percentile</span>
          </div>

          {/* Progress to Top Performer */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-900">Progress to Top Performer</span>
              <span className="text-sm text-slate-600">{percentile}%</span>
            </div>
            <Progress value={percentile} className="h-2 bg-gray-200" dynamicColor={true} />
          </div>

          {/* Common Industry Challenges */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Common {industry} Industry Challenges:</h4>
            <ul className="space-y-2">
              {benchmark.challenges.map((challenge, index) => (
                <li key={index} className="flex items-center text-slate-700">
                  <div className="w-2 h-2 bg-slate-400 rounded-full mr-3"></div>
                  {challenge}
                </li>
              ))}
            </ul>
          </div>

          {/* Next Level Insights */}
          <div className="border-t border-slate-200 pt-4">
            <h4 className="font-semibold text-slate-900 mb-2">Path to Excellence:</h4>
            <p className="text-slate-700 text-sm">
              {userScore < benchmark.avgScore 
                ? `Focus on reaching industry average first. A ${benchmark.avgScore - userScore} point improvement would position you competitively.`
                : userScore < benchmark.topPerformer - 10
                ? `You're performing well. Target the top 20% by improving ${benchmark.topPerformer - userScore} more points.`
                : "You're among the industry leaders! Focus on maintaining excellence and innovation."
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}