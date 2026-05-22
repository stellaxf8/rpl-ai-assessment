import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, CheckCircle, Clock, Play, Star, TrendingUp, User, Award } from "lucide-react";
import type { DimensionScores, LearningPath } from "@/lib/types";

interface LearningPathProps {
  scores: DimensionScores;
  organizationSize: string;
}

export function PersonalizedLearningPath({ scores, organizationSize }: LearningPathProps) {
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const generateLearningPath = (): LearningPath => {
    const overallScore = (Object.values(scores).reduce((sum, score) => sum + score, 0) / 6) * 20;
    const currentLevel = overallScore < 40 ? 'Beginner' : overallScore < 70 ? 'Intermediate' : 'Advanced';
    
    // Identify weakest areas for targeted learning
    const dimensionEntries = Object.entries(scores).sort(([,a], [,b]) => a - b);
    const weakestAreas = dimensionEntries.slice(0, 3).map(([dim]) => dim);
    
    const allModules = [
      // Beginner Level
      {
        moduleId: 'ai-fundamentals',
        title: 'AI Fundamentals for Business Leaders',
        difficulty: 'Beginner' as const,
        estimatedTime: '2 hours',
        type: 'Concept' as const,
        relevantDimensions: ['teamLiteracy'],
        description: 'Understanding core AI concepts and business applications'
      },
      {
        moduleId: 'data-basics',
        title: 'Data Quality and Management Basics',
        difficulty: 'Beginner' as const,
        estimatedTime: '1.5 hours',
        type: 'Guide' as const,
        relevantDimensions: ['dataQuality'],
        description: 'Essential data preparation for AI initiatives'
      },
      {
        moduleId: 'ai-strategy',
        title: 'Building Your AI Strategy',
        difficulty: 'Beginner' as const,
        estimatedTime: '3 hours',
        type: 'Interactive' as const,
        relevantDimensions: ['budget', 'teamLiteracy'],
        description: 'Framework for developing organizational AI strategy'
      },
      {
        moduleId: 'cloud-basics',
        title: 'Cloud Infrastructure for AI',
        difficulty: 'Beginner' as const,
        estimatedTime: '2.5 hours',
        type: 'Guide' as const,
        relevantDimensions: ['technologyInfrastructure'],
        description: 'Understanding cloud platforms and AI infrastructure'
      },
      
      // Intermediate Level
      {
        moduleId: 'ml-implementation',
        title: 'Machine Learning Implementation Guide',
        difficulty: 'Intermediate' as const,
        estimatedTime: '4 hours',
        type: 'Guide' as const,
        relevantDimensions: ['technologyInfrastructure', 'teamLiteracy'],
        description: 'Practical ML model development and deployment'
      },
      {
        moduleId: 'data-pipelines',
        title: 'Building AI-Ready Data Pipelines',
        difficulty: 'Intermediate' as const,
        estimatedTime: '3.5 hours',
        type: 'Interactive' as const,
        relevantDimensions: ['dataQuality', 'systemIntegration'],
        description: 'Designing and implementing robust data infrastructure'
      },
      {
        moduleId: 'ai-ethics',
        title: 'AI Ethics and Governance',
        difficulty: 'Intermediate' as const,
        estimatedTime: '2 hours',
        type: 'Concept' as const,
        relevantDimensions: ['security', 'teamLiteracy'],
        description: 'Responsible AI practices and governance frameworks'
      },
      {
        moduleId: 'integration-patterns',
        title: 'AI System Integration Patterns',
        difficulty: 'Intermediate' as const,
        estimatedTime: '3 hours',
        type: 'Guide' as const,
        relevantDimensions: ['systemIntegration', 'technologyInfrastructure'],
        description: 'Best practices for integrating AI into existing systems'
      },
      {
        moduleId: 'roi-measurement',
        title: 'Measuring AI ROI and Impact',
        difficulty: 'Intermediate' as const,
        estimatedTime: '2.5 hours',
        type: 'Case Study' as const,
        relevantDimensions: ['budget'],
        description: 'Frameworks for quantifying AI business value'
      },
      
      // Advanced Level
      {
        moduleId: 'ai-architecture',
        title: 'Enterprise AI Architecture Design',
        difficulty: 'Advanced' as const,
        estimatedTime: '5 hours',
        type: 'Interactive' as const,
        relevantDimensions: ['technologyInfrastructure', 'systemIntegration'],
        description: 'Designing scalable enterprise AI architectures'
      },
      {
        moduleId: 'advanced-security',
        title: 'Advanced AI Security and Privacy',
        difficulty: 'Advanced' as const,
        estimatedTime: '4 hours',
        type: 'Guide' as const,
        relevantDimensions: ['security'],
        description: 'Advanced security measures for AI systems'
      },
      {
        moduleId: 'ai-transformation',
        title: 'Leading AI Transformation',
        difficulty: 'Advanced' as const,
        estimatedTime: '6 hours',
        type: 'Case Study' as const,
        relevantDimensions: ['teamLiteracy', 'budget'],
        description: 'Managing organization-wide AI transformation'
      },
      {
        moduleId: 'emerging-tech',
        title: 'Emerging AI Technologies and Trends',
        difficulty: 'Advanced' as const,
        estimatedTime: '3 hours',
        type: 'Concept' as const,
        relevantDimensions: ['technologyInfrastructure'],
        description: 'Staying ahead with cutting-edge AI developments'
      }
    ];

    // Generate personalized recommendations
    const recommendedNext = allModules
      .filter(module => {
        // Include modules relevant to weak areas
        const isRelevantToWeakAreas = module.relevantDimensions.some(dim => weakestAreas.includes(dim));
        // Include modules at appropriate difficulty level
        const isAppropriateLevel = 
          (currentLevel === 'Beginner' && (module.difficulty === 'Beginner' || module.difficulty === 'Intermediate')) ||
          (currentLevel === 'Intermediate' && module.difficulty !== 'Beginner') ||
          (currentLevel === 'Advanced');
        
        return (isRelevantToWeakAreas || isAppropriateLevel) && !completedModules.includes(module.moduleId);
      })
      .sort((a, b) => {
        // Prioritize by relevance to weak areas and difficulty level
        const aRelevance = a.relevantDimensions.filter(dim => weakestAreas.includes(dim)).length;
        const bRelevance = b.relevantDimensions.filter(dim => weakestAreas.includes(dim)).length;
        
        if (aRelevance !== bRelevance) return bRelevance - aRelevance;
        
        const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      })
      .slice(0, 6); // Top 6 recommendations

    const progressPercentage = (completedModules.length / allModules.length) * 100;

    return {
      userId: 'current-user',
      currentLevel,
      completedModules,
      recommendedNext,
      progressPercentage
    };
  };

  const learningPath = generateLearningPath();

  const toggleModuleCompletion = (moduleId: string) => {
    if (completedModules.includes(moduleId)) {
      setCompletedModules(prev => prev.filter(id => id !== moduleId));
    } else {
      setCompletedModules(prev => [...prev, moduleId]);
    }
  };

  const getDifficultyColor = (difficulty: 'Beginner' | 'Intermediate' | 'Advanced') => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
    }
  };

  const getTypeIcon = (type: 'Concept' | 'Guide' | 'Case Study' | 'Interactive') => {
    switch (type) {
      case 'Concept': return <BookOpen className="h-4 w-4" />;
      case 'Guide': return <TrendingUp className="h-4 w-4" />;
      case 'Case Study': return <Star className="h-4 w-4" />;
      case 'Interactive': return <Play className="h-4 w-4" />;
    }
  };

  const getEstimatedTotalTime = () => {
    return learningPath.recommendedNext.reduce((total, module) => {
      const hours = parseFloat(module.estimatedTime.split(' ')[0]);
      return total + hours;
    }, 0);
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'secondary';
      case 'Intermediate': return 'default';
      case 'Advanced': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Personalized Learning Path
        </CardTitle>
        <CardDescription>
          Customized learning recommendations based on your AI readiness assessment results
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Learning Progress Overview */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-center space-y-1">
              <div className="flex items-center justify-center gap-1">
                <User className="h-5 w-5 text-blue-500" />
                <Badge variant={getLevelBadgeColor(learningPath.currentLevel)}>
                  {learningPath.currentLevel}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">Current Level</div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-green-600">{completedModules.length}</div>
              <div className="text-xs text-muted-foreground">Completed Modules</div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-blue-600">{learningPath.recommendedNext.length}</div>
              <div className="text-xs text-muted-foreground">Recommended Next</div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="text-center space-y-1">
              <div className="text-lg font-bold text-purple-600">{getEstimatedTotalTime()}h</div>
              <div className="text-xs text-muted-foreground">Est. Time</div>
            </div>
          </Card>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Learning Progress</span>
            <span className="text-sm text-muted-foreground">
              {Math.round(learningPath.progressPercentage)}%
            </span>
          </div>
          <Progress value={learningPath.progressPercentage} className="h-2" />
        </div>

        {/* Learning Path Tabs */}
        <Tabs defaultValue="recommended" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recommended">Recommended for You</TabsTrigger>
            <TabsTrigger value="progress">Your Progress</TabsTrigger>
            <TabsTrigger value="certificates">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="recommended" className="mt-6 space-y-4">
            <div className="space-y-1">
              <h4 className="font-medium">Personalized Recommendations</h4>
              <p className="text-sm text-muted-foreground">
                Based on your assessment, these modules will help strengthen your weakest areas and advance your AI knowledge.
              </p>
            </div>
            
            {learningPath.recommendedNext.map((module, index) => (
              <Card key={module.moduleId} className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {getTypeIcon(module.type)}
                        {module.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={getDifficultyColor(module.difficulty)}>
                          {module.difficulty}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {module.estimatedTime}
                        </Badge>
                        <Badge variant="secondary">{module.type}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-muted-foreground">
                        #{index + 1}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {module.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Relevant to:</span>
                      {module.relevantDimensions.map((dim, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {dim.replace(/([A-Z])/g, ' $1').trim().split(' ').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button
                      variant={completedModules.includes(module.moduleId) ? "secondary" : "default"}
                      size="sm"
                      onClick={() => toggleModuleCompletion(module.moduleId)}
                    >
                      {completedModules.includes(module.moduleId) ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Start Learning
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="progress" className="mt-6 space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-green-600">{completedModules.length}</div>
                  <div className="text-sm text-muted-foreground">Modules Completed</div>
                  <Progress value={(completedModules.length / 14) * 100} className="h-2" />
                </div>
              </Card>
              
              <Card className="p-4 text-center">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-blue-600">
                    {completedModules.length * 3} {/* Estimate 3 hours average */}
                  </div>
                  <div className="text-sm text-muted-foreground">Hours Learned</div>
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-xs">Keep learning!</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 text-center">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.ceil(completedModules.length / 3)}
                  </div>
                  <div className="text-sm text-muted-foreground">Skill Areas</div>
                  <div className="flex items-center justify-center gap-1">
                    <TrendingUp className="h-4 w-4 text-purple-500" />
                    <span className="text-xs">Multi-disciplinary</span>
                  </div>
                </div>
              </Card>
            </div>

            {completedModules.length > 0 && (
              <Card className="border-green-200 bg-green-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Completed Modules
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-2">
                    {completedModules.map((moduleId) => (
                      <div key={moduleId} className="flex items-center gap-2 text-sm text-green-700">
                        <CheckCircle className="h-4 w-4" />
                        <span>{moduleId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="certificates" className="mt-6 space-y-4">
            <div className="text-center space-y-4">
              <Award className="h-16 w-16 text-yellow-500 mx-auto" />
              <div>
                <h3 className="font-medium">Earn AI Readiness Certificates</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Complete learning modules to earn certificates and showcase your AI expertise
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className={completedModules.length >= 3 ? "border-yellow-200 bg-yellow-50" : ""}>
                <CardContent className="pt-6 text-center">
                  <Award className={`h-12 w-12 mx-auto mb-3 ${completedModules.length >= 3 ? "text-yellow-500" : "text-gray-300"}`} />
                  <h4 className="font-medium">AI Foundations</h4>
                  <p className="text-xs text-muted-foreground">Complete 3 beginner modules</p>
                  <Progress value={(Math.min(completedModules.length, 3) / 3) * 100} className="h-2 mt-2" />
                </CardContent>
              </Card>

              <Card className={completedModules.length >= 6 ? "border-yellow-200 bg-yellow-50" : ""}>
                <CardContent className="pt-6 text-center">
                  <Award className={`h-12 w-12 mx-auto mb-3 ${completedModules.length >= 6 ? "text-yellow-500" : "text-gray-300"}`} />
                  <h4 className="font-medium">AI Practitioner</h4>
                  <p className="text-xs text-muted-foreground">Complete 6 mixed-level modules</p>
                  <Progress value={(Math.min(completedModules.length, 6) / 6) * 100} className="h-2 mt-2" />
                </CardContent>
              </Card>

              <Card className={completedModules.length >= 10 ? "border-yellow-200 bg-yellow-50" : ""}>
                <CardContent className="pt-6 text-center">
                  <Award className={`h-12 w-12 mx-auto mb-3 ${completedModules.length >= 10 ? "text-yellow-500" : "text-gray-300"}`} />
                  <h4 className="font-medium">AI Leader</h4>
                  <p className="text-xs text-muted-foreground">Complete 10+ modules including advanced</p>
                  <Progress value={(Math.min(completedModules.length, 10) / 10) * 100} className="h-2 mt-2" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Learning Tips */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-blue-800 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Learning Tips for {organizationSize.split(' ')[0]} Organizations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-blue-700">
            {organizationSize.includes('Small') ? (
              <>
                <div>• Focus on practical, immediately applicable modules first</div>
                <div>• Consider team-based learning to share knowledge efficiently</div>
                <div>• Prioritize cost-effective AI solutions and quick wins</div>
              </>
            ) : (
              <>
                <div>• Build a comprehensive AI learning program across departments</div>
                <div>• Establish internal AI champions and mentorship programs</div>
                <div>• Invest in advanced modules for strategic competitive advantage</div>
              </>
            )}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}