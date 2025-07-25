import { Puzzle, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface IntegrationReadinessProps {
  scores: {
    technologyInfrastructure: number;
    systemIntegration: number;
  };
}

const integrationSystems = [
  { name: "CRM Systems", icon: "👥", systems: ["Salesforce", "HubSpot", "Microsoft Dynamics"] },
  { name: "ERP Systems", icon: "🏢", systems: ["SAP", "Oracle NetSuite", "Microsoft Dynamics 365"] },
  { name: "Data Warehouses", icon: "🗄️", systems: ["Snowflake", "AWS Redshift", "Google BigQuery"] },
  { name: "Business Intelligence", icon: "📊", systems: ["Tableau", "Power BI", "Looker"] },
  { name: "Communication Tools", icon: "💬", systems: ["Slack", "Microsoft Teams", "Zoom"] },
  { name: "Project Management", icon: "📋", systems: ["Jira", "Asana", "Monday.com"] }
];

export default function IntegrationReadiness({ scores }: IntegrationReadinessProps) {
  const avgIntegrationScore = (scores.technologyInfrastructure + scores.systemIntegration) / 2;
  
  const getReadinessLevel = (score: number) => {
    if (score >= 4.0) return { level: "High", color: "text-green-600", bgColor: "bg-green-50", icon: CheckCircle };
    if (score >= 3.0) return { level: "Medium", color: "text-yellow-600", bgColor: "bg-yellow-50", icon: Clock };
    return { level: "Low", color: "text-red-600", bgColor: "bg-red-50", icon: AlertCircle };
  };

  const readiness = getReadinessLevel(avgIntegrationScore);
  const IconComponent = readiness.icon;

  const getIntegrationComplexity = (systemType: string) => {
    // Simulate complexity assessment based on scores
    const baseComplexity = {
      "CRM Systems": scores.systemIntegration * 0.8,
      "ERP Systems": scores.systemIntegration * 0.9,
      "Data Warehouses": scores.technologyInfrastructure * 0.85,
      "Business Intelligence": (scores.technologyInfrastructure + scores.systemIntegration) / 2 * 0.9,
      "Communication Tools": scores.systemIntegration * 0.7,
      "Project Management": scores.systemIntegration * 0.6
    };
    
    return baseComplexity[systemType as keyof typeof baseComplexity] || 3.0;
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
          <Puzzle className="mr-2 h-5 w-5 text-primary" />
          Integration Readiness Assessment
        </h3>

        {/* Overall Readiness */}
        <div className={`${readiness.bgColor} p-4 rounded-lg mb-6`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <IconComponent className={`${readiness.color} mr-3 h-6 w-6`} />
              <div>
                <div className="font-semibold text-slate-900">
                  {readiness.level} Integration Readiness
                </div>
                <div className="text-sm text-slate-600">
                  {avgIntegrationScore >= 4.0 
                    ? "Ready for complex integrations with minimal friction"
                    : avgIntegrationScore >= 3.0
                    ? "Can handle standard integrations with some preparation"
                    : "Requires significant infrastructure improvements before integration"
                  }
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-900">
                {avgIntegrationScore.toFixed(1)}/5
              </div>
              <div className="text-sm text-slate-600">Overall Score</div>
            </div>
          </div>
        </div>

        {/* System-Specific Readiness */}
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-900">Popular Business Systems Compatibility:</h4>
          {integrationSystems.map((system, index) => {
            const systemScore = getIntegrationComplexity(system.name);
            const systemReadiness = getReadinessLevel(systemScore);
            const SystemIcon = systemReadiness.icon;
            
            return (
              <div key={index} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <span className="text-xl mr-3">{system.icon}</span>
                    <div>
                      <div className="font-medium text-slate-900">{system.name}</div>
                      <div className="text-sm text-slate-600">
                        {system.systems.join(", ")}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <SystemIcon className={`${systemReadiness.color} mr-2 h-4 w-4`} />
                    <span className={`text-sm font-medium ${systemReadiness.color}`}>
                      {systemReadiness.level}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-1 mr-3">
                    <Progress value={(systemScore / 5) * 100} className="h-2" />
                  </div>
                  <span className="text-sm text-slate-600">{systemScore.toFixed(1)}/5</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Integration Recommendations */}
        <div className="mt-6 border-t border-slate-200 pt-6">
          <h4 className="font-semibold text-slate-900 mb-3">Integration Strategy Recommendations:</h4>
          <div className="space-y-3">
            {avgIntegrationScore >= 4.0 ? (
              <>
                <div className="flex items-start">
                  <CheckCircle className="text-green-600 mr-2 h-4 w-4 mt-0.5" />
                  <span className="text-sm text-slate-700">Ready for real-time API integrations</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-600 mr-2 h-4 w-4 mt-0.5" />
                  <span className="text-sm text-slate-700">Can implement complex data synchronization</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-600 mr-2 h-4 w-4 mt-0.5" />
                  <span className="text-sm text-slate-700">Support for microservices architecture</span>
                </div>
              </>
            ) : avgIntegrationScore >= 3.0 ? (
              <>
                <div className="flex items-start">
                  <Clock className="text-yellow-600 mr-2 h-4 w-4 mt-0.5" />
                  <span className="text-sm text-slate-700">Start with batch data integrations</span>
                </div>
                <div className="flex items-start">
                  <Clock className="text-yellow-600 mr-2 h-4 w-4 mt-0.5" />
                  <span className="text-sm text-slate-700">Implement API gateway for better control</span>
                </div>
                <div className="flex items-start">
                  <Clock className="text-yellow-600 mr-2 h-4 w-4 mt-0.5" />
                  <span className="text-sm text-slate-700">Phase integration rollout over 6-12 months</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start">
                  <AlertCircle className="text-red-600 mr-2 h-4 w-4 mt-0.5" />
                  <span className="text-sm text-slate-700">Focus on infrastructure modernization first</span>
                </div>
                <div className="flex items-start">
                  <AlertCircle className="text-red-600 mr-2 h-4 w-4 mt-0.5" />
                  <span className="text-sm text-slate-700">Consider cloud migration before AI integration</span>
                </div>
                <div className="flex items-start">
                  <AlertCircle className="text-red-600 mr-2 h-4 w-4 mt-0.5" />
                  <span className="text-sm text-slate-700">Develop API strategy and governance framework</span>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}