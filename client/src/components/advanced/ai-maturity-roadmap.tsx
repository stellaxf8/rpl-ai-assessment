import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, DollarSign, Target, CheckCircle } from "lucide-react";
import type { AIMaturityRoadmap } from "@/lib/types";

interface AIMaturityRoadmapProps {
  overallScore: number;
  organizationSize: string;
  budget: string;
}

export function AIMaturityRoadmap({ overallScore, organizationSize, budget }: AIMaturityRoadmapProps) {
  // Generate roadmap based on assessment score
  const generateRoadmap = (): AIMaturityRoadmap => {
    const currentLevel = overallScore < 25 ? 'Beginner' : 
                        overallScore < 50 ? 'Developing' : 
                        overallScore < 75 ? 'Advancing' : 'Leading';
    
    const targetLevel = currentLevel === 'Beginner' ? 'Developing' :
                       currentLevel === 'Developing' ? 'Advancing' :
                       currentLevel === 'Advancing' ? 'Leading' : 'Transformative';

    const budgetMultiplier = budget === 'Under $50K' ? 0.5 : 
                            budget === '$50K-$250K' ? 1 : 
                            budget === '$250K-$1M' ? 2 : 3;

    const sizeMultiplier = organizationSize === 'Small (1-50)' ? 0.7 : 
                          organizationSize === 'Medium (51-250)' ? 1 : 
                          organizationSize === 'Large (251-1000)' ? 1.5 : 2;

    const baseCost = 50000 * budgetMultiplier * sizeMultiplier;

    if (currentLevel === 'Beginner') {
      return {
        currentLevel,
        targetLevel,
        timeline: {
          phase1: {
            name: "Foundation Building",
            duration: "3-4 months",
            milestones: [
              "AI strategy development",
              "Data infrastructure assessment",
              "Team training initiation",
              "Pilot project selection"
            ],
            resources: ["AI consultant", "Data engineer", "Training budget"]
          },
          phase2: {
            name: "Pilot Implementation",
            duration: "4-6 months",
            milestones: [
              "First AI pilot deployment",
              "Data quality improvements",
              "Staff upskilling completion",
              "ROI measurement framework"
            ],
            resources: ["AI development team", "Cloud infrastructure", "Change management"]
          },
          phase3: {
            name: "Scale & Optimize",
            duration: "6-8 months",
            milestones: [
              "Multi-department AI adoption",
              "Advanced analytics implementation",
              "Process automation rollout",
              "Governance framework establishment"
            ],
            resources: ["Expanded AI team", "Advanced tools", "Continuous training"]
          }
        },
        totalDuration: "13-18 months",
        estimatedCost: {
          low: Math.round(baseCost * 0.8),
          high: Math.round(baseCost * 1.2)
        }
      };
    } else if (currentLevel === 'Developing') {
      return {
        currentLevel,
        targetLevel,
        timeline: {
          phase1: {
            name: "Capability Enhancement",
            duration: "2-3 months",
            milestones: [
              "Advanced AI tool integration",
              "Cross-functional AI team formation",
              "Data pipeline optimization",
              "Security framework enhancement"
            ],
            resources: ["Senior AI architect", "DevOps engineer", "Security specialist"]
          },
          phase2: {
            name: "Advanced Implementation",
            duration: "4-5 months",
            milestones: [
              "Machine learning model deployment",
              "Real-time analytics implementation",
              "Automated decision systems",
              "Performance monitoring setup"
            ],
            resources: ["ML engineers", "Analytics platform", "Monitoring tools"]
          },
          phase3: {
            name: "Innovation & Leadership",
            duration: "4-6 months",
            milestones: [
              "AI innovation lab establishment",
              "Industry-specific AI solutions",
              "External partnership development",
              "Thought leadership initiatives"
            ],
            resources: ["Innovation team", "R&D budget", "Industry partnerships"]
          }
        },
        totalDuration: "10-14 months",
        estimatedCost: {
          low: Math.round(baseCost * 1.2),
          high: Math.round(baseCost * 1.8)
        }
      };
    } else {
      return {
        currentLevel,
        targetLevel,
        timeline: {
          phase1: {
            name: "Strategic Positioning",
            duration: "2-3 months",
            milestones: [
              "AI center of excellence creation",
              "Advanced research initiatives",
              "Industry leadership positioning",
              "Next-gen technology adoption"
            ],
            resources: ["Chief AI Officer", "Research team", "Innovation budget"]
          },
          phase2: {
            name: "Market Leadership",
            duration: "3-4 months",
            milestones: [
              "Proprietary AI solution development",
              "Market-leading AI capabilities",
              "Competitive advantage establishment",
              "Customer experience transformation"
            ],
            resources: ["Advanced AI team", "Cutting-edge infrastructure", "Market research"]
          },
          phase3: {
            name: "Ecosystem Innovation",
            duration: "4-6 months",
            milestones: [
              "AI ecosystem creation",
              "Industry standard setting",
              "Global expansion",
              "Sustainable AI practices"
            ],
            resources: ["Executive leadership", "Global team", "Sustainability experts"]
          }
        },
        totalDuration: "9-13 months",
        estimatedCost: {
          low: Math.round(baseCost * 1.5),
          high: Math.round(baseCost * 2.5)
        }
      };
    }
  };

  const roadmap = generateRoadmap();
  const progressPercentage = (overallScore / 100) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          AI Maturity Roadmap
        </CardTitle>
        <CardDescription>
          Your personalized path from {roadmap.currentLevel} to {roadmap.targetLevel} level
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Current Maturity Level</span>
            <Badge variant={roadmap.currentLevel === 'Beginner' ? 'destructive' : 
                           roadmap.currentLevel === 'Developing' ? 'secondary' : 
                           roadmap.currentLevel === 'Advancing' ? 'default' : 'default'}>
              {roadmap.currentLevel}
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Beginner</span>
            <span>Developing</span>
            <span>Advancing</span>
            <span>Leading</span>
          </div>
        </div>

        {/* Timeline Overview */}
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="font-medium">Total Timeline</span>
            </div>
            <span className="text-sm">{roadmap.totalDuration}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="font-medium">Estimated Investment</span>
            </div>
            <span className="text-sm">
              ${roadmap.estimatedCost.low.toLocaleString()} - ${roadmap.estimatedCost.high.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Phase Breakdown */}
        <div className="space-y-4">
          <h4 className="font-medium">Implementation Phases</h4>
          
          {Object.entries(roadmap.timeline).map(([key, phase], index) => (
            <Card key={key} className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Phase {index + 1}: {phase.name}
                  </CardTitle>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {phase.duration}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h5 className="font-medium mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Key Milestones
                  </h5>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {phase.milestones.map((milestone, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        {milestone}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium mb-2">Required Resources</h5>
                  <div className="flex flex-wrap gap-1">
                    {phase.resources.map((resource, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {resource}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Next Steps */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-green-800">Recommended Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-green-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Schedule stakeholder alignment meeting
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Develop detailed project charter
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Identify and secure initial budget
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Begin Phase 1 planning activities
              </li>
            </ul>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}