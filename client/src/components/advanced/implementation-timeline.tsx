import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, Users, DollarSign, Clock, AlertCircle, CheckCircle, BarChart3 } from "lucide-react";
import type { DimensionScores } from "@/lib/types";

interface ImplementationTimelineProps {
  scores: DimensionScores;
  organizationSize: string;
  budget: string;
}

interface TimelinePhase {
  id: string;
  name: string;
  duration: number; // weeks
  startWeek: number;
  dependencies: string[];
  resources: {
    team: string[];
    budget: number;
    tools: string[];
  };
  deliverables: string[];
  risks: {
    level: 'Low' | 'Medium' | 'High';
    description: string;
    mitigation: string;
  }[];
}

export function ImplementationTimeline({ scores, organizationSize, budget }: ImplementationTimelineProps) {
  const generateTimeline = (): TimelinePhase[] => {
    const overallScore = (Object.values(scores).reduce((sum, score) => sum + score, 0) / 6) * 20;
    const isComplexOrg = organizationSize.includes('Large') || organizationSize.includes('Enterprise');
    const hasHighBudget = budget.includes('$1M') || budget.includes('$250K');
    
    // Adjust timeline based on current readiness and organization complexity
    const baseTimeMultiplier = overallScore < 40 ? 1.5 : overallScore < 70 ? 1.2 : 1.0;
    const orgMultiplier = isComplexOrg ? 1.3 : 1.0;
    
    const phases: TimelinePhase[] = [
      {
        id: 'assessment',
        name: 'Assessment & Planning',
        duration: Math.ceil(4 * baseTimeMultiplier),
        startWeek: 0,
        dependencies: [],
        resources: {
          team: ['Project Manager', 'AI Consultant', 'Business Analyst'],
          budget: hasHighBudget ? 75000 : 50000,
          tools: ['Assessment Tools', 'Project Management Software']
        },
        deliverables: [
          'Comprehensive AI readiness assessment',
          'Strategic AI implementation plan',
          'Risk assessment and mitigation strategies',
          'Budget allocation and timeline',
          'Success metrics definition'
        ],
        risks: [
          {
            level: 'Medium',
            description: 'Incomplete stakeholder alignment',
            mitigation: 'Regular stakeholder meetings and clear communication protocols'
          }
        ]
      },
      {
        id: 'infrastructure',
        name: 'Infrastructure Setup',
        duration: Math.ceil(6 * baseTimeMultiplier * orgMultiplier),
        startWeek: Math.ceil(2 * baseTimeMultiplier), // Can start after 2 weeks of planning
        dependencies: ['assessment'],
        resources: {
          team: ['Cloud Architect', 'DevOps Engineer', 'Security Specialist'],
          budget: hasHighBudget ? 150000 : 100000,
          tools: ['Cloud Platforms', 'Security Tools', 'Monitoring Systems']
        },
        deliverables: [
          'AI-ready cloud infrastructure',
          'Data pipeline architecture',
          'Security and compliance framework',
          'Monitoring and logging systems',
          'Development and testing environments'
        ],
        risks: [
          {
            level: 'High',
            description: 'Infrastructure complexity and integration challenges',
            mitigation: 'Phased rollout and extensive testing protocols'
          },
          {
            level: 'Medium',
            description: 'Security vulnerabilities',
            mitigation: 'Regular security audits and compliance checks'
          }
        ]
      },
      {
        id: 'team-training',
        name: 'Team Training & Upskilling',
        duration: Math.ceil(8 * baseTimeMultiplier),
        startWeek: Math.ceil(4 * baseTimeMultiplier),
        dependencies: ['assessment'],
        resources: {
          team: ['Training Coordinator', 'AI Experts', 'Change Management Specialist'],
          budget: hasHighBudget ? 100000 : 60000,
          tools: ['Learning Management System', 'Training Materials', 'Certification Programs']
        },
        deliverables: [
          'AI literacy training program',
          'Role-specific skill development',
          'Certification tracking system',
          'Knowledge base and documentation',
          'Change management strategy'
        ],
        risks: [
          {
            level: 'Medium',
            description: 'Resistance to change and slow adoption',
            mitigation: 'Comprehensive change management and incentive programs'
          }
        ]
      },
      {
        id: 'pilot-projects',
        name: 'Pilot Project Implementation',
        duration: Math.ceil(12 * baseTimeMultiplier),
        startWeek: Math.ceil(8 * baseTimeMultiplier),
        dependencies: ['infrastructure', 'team-training'],
        resources: {
          team: ['AI Engineers', 'Data Scientists', 'Business Analysts', 'QA Specialists'],
          budget: hasHighBudget ? 200000 : 120000,
          tools: ['AI/ML Platforms', 'Development Tools', 'Testing Frameworks']
        },
        deliverables: [
          '2-3 production-ready AI pilots',
          'Performance metrics and KPIs',
          'User feedback and adoption metrics',
          'ROI measurement framework',
          'Scalability assessment'
        ],
        risks: [
          {
            level: 'High',
            description: 'Technical implementation challenges',
            mitigation: 'Agile development methodology and regular technical reviews'
          },
          {
            level: 'Medium',
            description: 'Data quality and availability issues',
            mitigation: 'Data preparation and quality assurance processes'
          }
        ]
      },
      {
        id: 'integration',
        name: 'System Integration & Optimization',
        duration: Math.ceil(8 * baseTimeMultiplier * orgMultiplier),
        startWeek: Math.ceil(16 * baseTimeMultiplier),
        dependencies: ['pilot-projects'],
        resources: {
          team: ['Integration Specialists', 'System Architects', 'Performance Engineers'],
          budget: hasHighBudget ? 120000 : 80000,
          tools: ['Integration Platforms', 'API Management', 'Performance Monitoring']
        },
        deliverables: [
          'Seamless system integrations',
          'API ecosystem and documentation',
          'Performance optimization',
          'Automated workflows',
          'Integration testing suite'
        ],
        risks: [
          {
            level: 'Medium',
            description: 'Legacy system compatibility issues',
            mitigation: 'Thorough compatibility testing and incremental integration'
          }
        ]
      },
      {
        id: 'scaling',
        name: 'Scaling & Governance',
        duration: Math.ceil(10 * baseTimeMultiplier * orgMultiplier),
        startWeek: Math.ceil(22 * baseTimeMultiplier),
        dependencies: ['integration'],
        resources: {
          team: ['AI Governance Team', 'Operations Manager', 'Compliance Officer'],
          budget: hasHighBudget ? 150000 : 90000,
          tools: ['Governance Platforms', 'Monitoring Tools', 'Compliance Software']
        },
        deliverables: [
          'Organization-wide AI deployment',
          'AI governance framework',
          'Compliance and audit procedures',
          'Continuous improvement processes',
          'Success measurement dashboard'
        ],
        risks: [
          {
            level: 'Medium',
            description: 'Governance and compliance gaps',
            mitigation: 'Regular audits and continuous governance improvements'
          }
        ]
      }
    ];

    return phases;
  };

  const phases = generateTimeline();
  const totalDuration = Math.max(...phases.map(p => p.startWeek + p.duration));
  const totalBudget = phases.reduce((sum, phase) => sum + phase.resources.budget, 0);

  const getPhaseProgress = (phase: TimelinePhase) => {
    // Simulate current progress based on phase dependencies
    if (phase.dependencies.length === 0) return 100; // Planning always complete in this demo
    if (phase.id === 'infrastructure') return 75;
    if (phase.id === 'team-training') return 60;
    if (phase.id === 'pilot-projects') return 30;
    return 0;
  };

  const getWeekDate = (week: number) => {
    const today = new Date();
    const futureDate = new Date(today.getTime() + week * 7 * 24 * 60 * 60 * 1000);
    return futureDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getRiskColor = (level: 'Low' | 'Medium' | 'High') => {
    switch (level) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Implementation Timeline & Resource Planning
        </CardTitle>
        <CardDescription>
          Detailed project timeline with resource allocation and risk management
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Timeline Overview */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-blue-600 flex items-center justify-center gap-1">
                <Clock className="h-5 w-5" />
                {Math.ceil(totalDuration / 4)} months
              </div>
              <div className="text-xs text-muted-foreground">Total Duration</div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
                <DollarSign className="h-5 w-5" />
                ${(totalBudget / 1000).toFixed(0)}K
              </div>
              <div className="text-xs text-muted-foreground">Total Investment</div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-purple-600 flex items-center justify-center gap-1">
                <Users className="h-5 w-5" />
                {phases.length}
              </div>
              <div className="text-xs text-muted-foreground">Project Phases</div>
            </div>
          </Card>
        </div>

        {/* Phase Timeline */}
        <div className="space-y-4">
          <h4 className="font-medium">Phase Breakdown</h4>
          
          {phases.map((phase, index) => {
            const progress = getPhaseProgress(phase);
            const isActive = progress > 0 && progress < 100;
            const isComplete = progress === 100;
            
            return (
              <Card key={phase.id} className={`border-l-4 ${
                isComplete ? 'border-l-green-500' : 
                isActive ? 'border-l-blue-500' : 
                'border-l-gray-300'
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {isComplete ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : isActive ? (
                        <Clock className="h-5 w-5 text-blue-500" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                      )}
                      Phase {index + 1}: {phase.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {phase.duration} weeks
                      </Badge>
                      <Badge variant="secondary">
                        {getWeekDate(phase.startWeek)} - {getWeekDate(phase.startWeek + phase.duration)}
                      </Badge>
                    </div>
                  </div>
                  
                  {(isActive || isComplete) && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Resources */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="font-medium mb-2 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Team ({phase.resources.team.length})
                      </h5>
                      <div className="space-y-1">
                        {phase.resources.team.map((member, i) => (
                          <Badge key={i} variant="outline" className="text-xs mr-1">
                            {member}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-2 flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Budget
                      </h5>
                      <div className="text-lg font-semibold text-green-600">
                        ${phase.resources.budget.toLocaleString()}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-2">Key Tools</h5>
                      <div className="space-y-1">
                        {phase.resources.tools.slice(0, 2).map((tool, i) => (
                          <Badge key={i} variant="secondary" className="text-xs block w-fit">
                            {tool}
                          </Badge>
                        ))}
                        {phase.resources.tools.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{phase.resources.tools.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <h5 className="font-medium mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Key Deliverables ({phase.deliverables.length})
                    </h5>
                    <div className="grid md:grid-cols-2 gap-2">
                      {phase.deliverables.map((deliverable, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                          {deliverable}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Risks */}
                  <div>
                    <h5 className="font-medium mb-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Risk Assessment ({phase.risks.length})
                    </h5>
                    <div className="space-y-2">
                      {phase.risks.map((risk, i) => (
                        <div key={i} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">{risk.description}</span>
                            <Badge className={getRiskColor(risk.level)}>
                              {risk.level} Risk
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            <strong>Mitigation:</strong> {risk.mitigation}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Critical Path */}
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-orange-800">Critical Path Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-orange-700">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span><strong>Longest Path:</strong> Assessment → Infrastructure → Pilot Projects → Integration → Scaling ({totalDuration} weeks)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span><strong>Parallel Activities:</strong> Team Training can run alongside Infrastructure Setup to save 4-6 weeks</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span><strong>Budget Distribution:</strong> 35% Infrastructure, 30% Development, 20% Training, 15% Governance</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button className="flex-1">
            <Calendar className="h-4 w-4 mr-2" />
            Export Timeline
          </Button>
          <Button variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Resource Planning
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}