import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Target, Clock, DollarSign, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import type { DimensionScores, SmartRecommendations } from "@/lib/types";
import { useState } from "react";

interface SmartRecommendationsProps {
  scores: DimensionScores;
  organizationSize: string;
  budget: string;
}

export function SmartRecommendationsComponent({ scores, organizationSize, budget }: SmartRecommendationsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const generateSmartRecommendations = (): SmartRecommendations => {
    const overallScore = (Object.values(scores).reduce((sum, score) => sum + score, 0) / 6) * 20;
    const isSmallOrg = organizationSize.includes('Small');
    const isLargeBudget = budget.includes('$1M') || budget.includes('$250K');
    
    const recommendations = [];

    // Technology Infrastructure Recommendations
    if (scores.technologyInfrastructure < 3) {
      recommendations.push({
        category: 'Technology Infrastructure',
        priority: 'High' as const,
        title: 'Cloud Infrastructure Modernization',
        description: isSmallOrg ? 
          'Start with cloud-first approach using managed services to minimize infrastructure overhead' :
          'Implement hybrid cloud architecture with auto-scaling capabilities for AI workloads',
        estimatedCost: isSmallOrg ? '$25K-$75K' : '$100K-$300K',
        timeline: isSmallOrg ? '2-4 months' : '4-8 months',
        prerequisites: ['Executive approval', 'Cloud strategy', 'Security assessment']
      });
    }

    if (scores.technologyInfrastructure < 4) {
      recommendations.push({
        category: 'Technology Infrastructure',
        priority: scores.technologyInfrastructure < 2 ? 'High' as const : 'Medium' as const,
        title: 'AI/ML Platform Implementation',
        description: 'Deploy comprehensive AI/ML platform with model training, deployment, and monitoring capabilities',
        estimatedCost: isLargeBudget ? '$150K-$400K' : '$50K-$150K',
        timeline: '3-6 months',
        prerequisites: ['Cloud infrastructure', 'Data pipeline', 'Technical team']
      });
    }

    // Data Quality Recommendations
    if (scores.dataQuality < 3) {
      recommendations.push({
        category: 'Data Management',
        priority: 'High' as const,
        title: 'Data Quality and Governance Framework',
        description: 'Establish data quality standards, validation processes, and governance policies for AI readiness',
        estimatedCost: isSmallOrg ? '$30K-$80K' : '$75K-$200K',
        timeline: '3-5 months',
        prerequisites: ['Data audit', 'Stakeholder alignment', 'Governance structure']
      });
    }

    if (scores.dataQuality < 4) {
      recommendations.push({
        category: 'Data Management',
        priority: 'Medium' as const,
        title: 'Real-time Data Pipeline Development',
        description: 'Build automated data pipelines for real-time AI model training and inference',
        estimatedCost: '$100K-$250K',
        timeline: '4-7 months',
        prerequisites: ['Data architecture', 'Pipeline tools', 'DevOps practices']
      });
    }

    // Team Literacy Recommendations
    if (scores.teamLiteracy < 3) {
      recommendations.push({
        category: 'Team Development',
        priority: 'High' as const,
        title: 'AI Literacy Training Program',
        description: 'Comprehensive training program covering AI fundamentals, use cases, and hands-on workshops',
        estimatedCost: isSmallOrg ? '$15K-$40K' : '$50K-$150K',
        timeline: '2-4 months',
        prerequisites: ['Training needs assessment', 'Learning platform', 'Internal champions']
      });
    }

    if (scores.teamLiteracy < 4) {
      recommendations.push({
        category: 'Team Development',
        priority: 'Medium' as const,
        title: 'AI Center of Excellence',
        description: 'Establish dedicated AI team to drive initiatives and support organization-wide AI adoption',
        estimatedCost: '$200K-$500K annually',
        timeline: '2-3 months setup',
        prerequisites: ['Executive sponsorship', 'Hiring plan', 'Clear mandate']
      });
    }

    // System Integration Recommendations
    if (scores.systemIntegration < 3) {
      recommendations.push({
        category: 'System Integration',
        priority: 'High' as const,
        title: 'API Strategy and Integration Platform',
        description: 'Develop API-first architecture and integration platform for seamless AI system connectivity',
        estimatedCost: isSmallOrg ? '$40K-$100K' : '$100K-$300K',
        timeline: '3-6 months',
        prerequisites: ['System audit', 'Integration architecture', 'API standards']
      });
    }

    // Budget Planning Recommendations
    if (scores.budget < 3) {
      recommendations.push({
        category: 'Financial Planning',
        priority: 'Medium' as const,
        title: 'AI ROI Framework and Budget Planning',
        description: 'Develop comprehensive AI investment framework with ROI metrics and budget allocation strategy',
        estimatedCost: '$20K-$50K',
        timeline: '1-2 months',
        prerequisites: ['Financial analysis', 'Stakeholder input', 'Business case development']
      });
    }

    // Security Recommendations
    if (scores.security < 3) {
      recommendations.push({
        category: 'Security & Compliance',
        priority: 'High' as const,
        title: 'AI Security and Privacy Framework',
        description: 'Implement comprehensive security measures for AI systems including data protection and model security',
        estimatedCost: isSmallOrg ? '$35K-$90K' : '$75K-$200K',
        timeline: '2-4 months',
        prerequisites: ['Security assessment', 'Compliance requirements', 'Risk analysis']
      });
    }

    // Quick Wins based on organization profile
    if (overallScore < 50) {
      recommendations.push({
        category: 'Quick Wins',
        priority: 'Medium' as const,
        title: 'AI-Powered Process Automation',
        description: 'Identify and automate 3-5 repetitive business processes using existing AI tools',
        estimatedCost: '$10K-$30K',
        timeline: '1-2 months',
        prerequisites: ['Process mapping', 'Tool selection', 'Change management']
      });
    }

    // Advanced recommendations for higher maturity
    if (overallScore > 60) {
      recommendations.push({
        category: 'Innovation',
        priority: 'Low' as const,
        title: 'AI Innovation Lab',
        description: 'Establish innovation lab for experimental AI projects and emerging technology evaluation',
        estimatedCost: '$150K-$400K',
        timeline: '4-6 months',
        prerequisites: ['Innovation strategy', 'Dedicated space', 'Research partnerships']
      });
    }

    return {
      organizationSize: organizationSize as any,
      budget: budget as any,
      recommendations
    };
  };

  const recommendations = generateSmartRecommendations();
  const categories = ['all', ...new Set(recommendations.recommendations.map(r => r.category))];
  
  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations.recommendations 
    : recommendations.recommendations.filter(r => r.category === selectedCategory);

  const getPriorityColor = (priority: 'High' | 'Medium' | 'Low') => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Technology Infrastructure': return <Target className="h-4 w-4" />;
      case 'Data Management': return <Brain className="h-4 w-4" />;
      case 'Team Development': return <TrendingUp className="h-4 w-4" />;
      case 'System Integration': return <CheckCircle className="h-4 w-4" />;
      case 'Financial Planning': return <DollarSign className="h-4 w-4" />;
      case 'Security & Compliance': return <AlertTriangle className="h-4 w-4" />;
      case 'Quick Wins': return <Clock className="h-4 w-4" />;
      case 'Innovation': return <Brain className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const highPriorityCount = recommendations.recommendations.filter(r => r.priority === 'High').length;
  const totalEstimatedCost = recommendations.recommendations.reduce((sum, rec) => {
    const costRange = rec.estimatedCost.replace(/[$K,]/g, '').split('-');
    const avgCost = (parseInt(costRange[0]) + parseInt(costRange[1] || costRange[0])) / 2;
    return sum + (avgCost * 1000);
  }, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Smart AI Recommendations
        </CardTitle>
        <CardDescription>
          Personalized recommendations based on your organization size, budget, and current AI readiness
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-red-600">{highPriorityCount}</div>
              <div className="text-xs text-muted-foreground">High Priority</div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-blue-600">{recommendations.recommendations.length}</div>
              <div className="text-xs text-muted-foreground">Total Recommendations</div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="text-center space-y-1">
              <div className="text-lg font-bold text-green-600">${Math.round(totalEstimatedCost / 1000)}K</div>
              <div className="text-xs text-muted-foreground">Est. Investment</div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-purple-600">{categories.length - 1}</div>
              <div className="text-xs text-muted-foreground">Focus Areas</div>
            </div>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Filter by Category</label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.slice(1).map((category) => (
                <SelectItem key={category} value={category}>
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(category)}
                    {category}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Organization Context */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-blue-800">Personalization Context</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-700">Organization Size:</span>
              <Badge variant="outline">{organizationSize}</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-700">Budget Range:</span>
              <Badge variant="outline">{budget}</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-700">Recommendations tailored for:</span>
              <Badge variant="secondary">
                {organizationSize.includes('Small') ? 'Agility & Cost-efficiency' : 'Scale & Enterprise needs'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations List */}
        <div className="space-y-4">
          <h4 className="font-medium">
            {selectedCategory === 'all' ? 'All Recommendations' : `${selectedCategory} Recommendations`}
            <span className="ml-2 text-sm text-muted-foreground">
              ({filteredRecommendations.length})
            </span>
          </h4>
          
          {filteredRecommendations.map((recommendation, index) => (
            <Card key={index} className={`border-l-4 ${
              recommendation.priority === 'High' ? 'border-l-red-500' : 
              recommendation.priority === 'Medium' ? 'border-l-yellow-500' : 
              'border-l-green-500'
            }`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getCategoryIcon(recommendation.category)}
                      {recommendation.title}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant={getPriorityColor(recommendation.priority)}>
                        {recommendation.priority} Priority
                      </Badge>
                      <Badge variant="outline">{recommendation.category}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {recommendation.description}
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Investment:</span>
                      <span>{recommendation.estimatedCost}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Timeline:</span>
                      <span>{recommendation.timeline}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium mb-2">Prerequisites</h5>
                    <div className="flex flex-wrap gap-1">
                      {recommendation.prerequisites.map((prereq, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {prereq}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Plan */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-green-800 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Recommended Action Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-green-700">
              <strong>Phase 1 (Next 3 months):</strong> Focus on {highPriorityCount} high-priority recommendations, 
              starting with foundational elements like infrastructure and team training.
            </div>
            <div className="text-sm text-green-700">
              <strong>Phase 2 (3-6 months):</strong> Implement medium-priority items and begin pilot projects 
              to demonstrate value and build momentum.
            </div>
            <div className="text-sm text-green-700">
              <strong>Phase 3 (6+ months):</strong> Scale successful pilots and pursue innovation opportunities 
              to establish competitive advantage.
            </div>
          </CardContent>
        </Card>

        {/* Export Options */}
        <div className="flex gap-3">
          <Button className="flex-1">
            <Brain className="h-4 w-4 mr-2" />
            Generate Implementation Plan
          </Button>
          <Button variant="outline">
            Export Recommendations
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}