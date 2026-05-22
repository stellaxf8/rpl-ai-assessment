import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, AlertCircle, Clock, Zap, Globe, Filter } from "lucide-react";
import type { TrendAnalysis } from "@/lib/types";
import { useState } from "react";

interface TrendAnalysisProps {
  industry?: string;
}

export function TrendAnalysisComponent({ industry }: TrendAnalysisProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("all");

  const generateTrendAnalysis = (): TrendAnalysis => {
    const trends = [
      {
        id: 'generative-ai-enterprise',
        title: 'Generative AI Enterprise Adoption',
        category: 'Technology' as const,
        impact: 'High' as const,
        timeframe: 'Immediate' as const,
        description: 'Large language models and generative AI tools are being rapidly adopted across enterprises for content creation, code generation, and customer service automation.',
        relevanceScore: 95,
        industries: ['Technology', 'Finance', 'Healthcare', 'Retail & B2C Sales', 'B2B Sales & Distribution', 'Manufacturing', 'Education']
      },
      {
        id: 'ai-governance-frameworks',
        title: 'AI Governance and Ethics Frameworks',
        category: 'Regulation' as const,
        impact: 'High' as const,
        timeframe: '6 months' as const,
        description: 'Organizations are implementing comprehensive AI governance frameworks to ensure responsible AI development and deployment, driven by regulatory requirements and ethical considerations.',
        relevanceScore: 88,
        industries: ['Finance', 'Healthcare', 'Government', 'Technology']
      },
      {
        id: 'edge-ai-computing',
        title: 'Edge AI and Distributed Computing',
        category: 'Technology' as const,
        impact: 'Medium' as const,
        timeframe: '1 year' as const,
        description: 'AI processing is moving closer to data sources with edge computing solutions, reducing latency and improving privacy for real-time applications.',
        relevanceScore: 78,
        industries: ['Manufacturing', 'Healthcare', 'Retail & B2C Sales', 'Technology']
      },
      {
        id: 'ai-as-a-service',
        title: 'AI-as-a-Service Market Expansion',
        category: 'Market' as const,
        impact: 'High' as const,
        timeframe: 'Immediate' as const,
        description: 'Cloud providers and specialized vendors are offering increasingly sophisticated AI services, making advanced AI capabilities accessible to organizations of all sizes.',
        relevanceScore: 92,
        industries: ['Technology', 'Retail & B2C Sales', 'B2B Sales & Distribution', 'Finance', 'Education', 'Non-profit']
      },
      {
        id: 'multimodal-ai',
        title: 'Multimodal AI Systems',
        category: 'Technology' as const,
        impact: 'Medium' as const,
        timeframe: '1 year' as const,
        description: 'AI systems that can process and understand multiple data types (text, images, audio, video) simultaneously are becoming more sophisticated and commercially viable.',
        relevanceScore: 82,
        industries: ['Healthcare', 'Retail & B2C Sales', 'Education', 'Technology']
      },
      {
        id: 'ai-security-threats',
        title: 'AI-Powered Cybersecurity Threats',
        category: 'Technology' as const,
        impact: 'High' as const,
        timeframe: 'Immediate' as const,
        description: 'Cybercriminals are leveraging AI for more sophisticated attacks, driving the need for AI-powered security solutions and new defense strategies.',
        relevanceScore: 90,
        industries: ['Finance', 'Healthcare', 'Government', 'Technology']
      },
      {
        id: 'explainable-ai',
        title: 'Explainable AI Requirements',
        category: 'Regulation' as const,
        impact: 'Medium' as const,
        timeframe: '6 months' as const,
        description: 'Regulatory bodies and industries are demanding greater transparency in AI decision-making, leading to increased focus on explainable AI technologies.',
        relevanceScore: 85,
        industries: ['Finance', 'Healthcare', 'Government']
      },
      {
        id: 'ai-talent-shortage',
        title: 'AI Talent Shortage Crisis',
        category: 'Market' as const,
        impact: 'High' as const,
        timeframe: 'Immediate' as const,
        description: 'Severe shortage of qualified AI professionals is driving up salaries and forcing organizations to invest heavily in training and retention programs.',
        relevanceScore: 93,
        industries: ['Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Retail & B2C Sales', 'B2B Sales & Distribution']
      },
      {
        id: 'sustainable-ai',
        title: 'Sustainable AI and Green Computing',
        category: 'Technology' as const,
        impact: 'Medium' as const,
        timeframe: '2+ years' as const,
        description: 'Growing focus on reducing the environmental impact of AI systems through efficient algorithms, green data centers, and sustainable computing practices.',
        relevanceScore: 72,
        industries: ['Technology', 'Manufacturing', 'Government']
      },
      {
        id: 'ai-democratization',
        title: 'AI Democratization and No-Code Solutions',
        category: 'Application' as const,
        impact: 'Medium' as const,
        timeframe: '1 year' as const,
        description: 'Low-code and no-code AI platforms are making AI development accessible to non-technical users, accelerating adoption across all business functions.',
        relevanceScore: 87,
        industries: ['Retail & B2C Sales', 'B2B Sales & Distribution', 'Education', 'Non-profit', 'Technology']
      },
      {
        id: 'quantum-ai',
        title: 'Quantum-Enhanced AI Computing',
        category: 'Technology' as const,
        impact: 'Low' as const,
        timeframe: '2+ years' as const,
        description: 'Quantum computing is beginning to show promise for specific AI applications, particularly in optimization and machine learning acceleration.',
        relevanceScore: 65,
        industries: ['Technology', 'Finance', 'Healthcare']
      },
      {
        id: 'ai-regulation-compliance',
        title: 'Global AI Regulation Harmonization',
        category: 'Regulation' as const,
        impact: 'High' as const,
        timeframe: '2+ years' as const,
        description: 'International efforts to create unified AI governance standards and cross-border compliance frameworks are gaining momentum.',
        relevanceScore: 89,
        industries: ['Finance', 'Healthcare', 'Technology', 'Government']
      }
    ];

    return {
      trends,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
  };

  const trendAnalysis = generateTrendAnalysis();
  const categories = ['all', 'Technology', 'Market', 'Regulation', 'Application'];
  const timeframes = ['all', 'Immediate', '6 months', '1 year', '2+ years'];

  const filteredTrends = trendAnalysis.trends.filter(trend => {
    const categoryMatch = selectedCategory === 'all' || trend.category === selectedCategory;
    const timeframeMatch = selectedTimeframe === 'all' || trend.timeframe === selectedTimeframe;
    const industryMatch = !industry || trend.industries.includes(industry);
    
    return categoryMatch && timeframeMatch && industryMatch;
  });

  const getImpactColor = (impact: 'High' | 'Medium' | 'Low') => {
    switch (impact) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Technology': return <Zap className="h-4 w-4" />;
      case 'Market': return <TrendingUp className="h-4 w-4" />;
      case 'Regulation': return <AlertCircle className="h-4 w-4" />;
      case 'Application': return <Globe className="h-4 w-4" />;
      default: return <TrendingUp className="h-4 w-4" />;
    }
  };

  const getTimeframeColor = (timeframe: string) => {
    switch (timeframe) {
      case 'Immediate': return 'text-red-600';
      case '6 months': return 'text-orange-600';
      case '1 year': return 'text-blue-600';
      case '2+ years': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const highImpactTrends = filteredTrends.filter(t => t.impact === 'High').length;
  const immediateTrends = filteredTrends.filter(t => t.timeframe === 'Immediate').length;
  const avgRelevance = Math.round(filteredTrends.reduce((sum, t) => sum + t.relevanceScore, 0) / filteredTrends.length);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          AI Trend Analysis & Market Intelligence
        </CardTitle>
        <CardDescription>
          Stay ahead with the latest AI trends, emerging technologies, and market developments
          {industry && ` tailored for ${industry}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-red-600">{highImpactTrends}</div>
              <div className="text-xs text-muted-foreground">High Impact Trends</div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-orange-600">{immediateTrends}</div>
              <div className="text-xs text-muted-foreground">Immediate Impact</div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-blue-600">{filteredTrends.length}</div>
              <div className="text-xs text-muted-foreground">Total Trends</div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-green-600">{avgRelevance}%</div>
              <div className="text-xs text-muted-foreground">Avg Relevance</div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Category Filter
            </label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    <div className="flex items-center gap-2">
                      {category !== 'all' && getCategoryIcon(category)}
                      {category === 'all' ? 'All Categories' : category}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Timeframe Filter
            </label>
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeframes.map((timeframe) => (
                  <SelectItem key={timeframe} value={timeframe}>
                    {timeframe === 'all' ? 'All Timeframes' : timeframe}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Trend Analysis Tabs */}
        <Tabs defaultValue="trends" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trends">Current Trends</TabsTrigger>
            <TabsTrigger value="impact">Impact Analysis</TabsTrigger>
            <TabsTrigger value="recommendations">Strategic Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="mt-6 space-y-4">
            {filteredTrends.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="space-y-3">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto" />
                  <div>
                    <h3 className="font-medium">No trends match your filters</h3>
                    <p className="text-sm text-muted-foreground">Try adjusting your category or timeframe filters</p>
                  </div>
                </div>
              </Card>
            ) : (
              filteredTrends
                .sort((a, b) => b.relevanceScore - a.relevanceScore)
                .map((trend) => (
                  <Card key={trend.id} className={`border-l-4 ${
                    trend.impact === 'High' ? 'border-l-red-500' : 
                    trend.impact === 'Medium' ? 'border-l-yellow-500' : 
                    'border-l-green-500'
                  }`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {getCategoryIcon(trend.category)}
                            {trend.title}
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant={getImpactColor(trend.impact)}>
                              {trend.impact} Impact
                            </Badge>
                            <Badge variant="outline">
                              {trend.category}
                            </Badge>
                            <span className={`text-sm font-medium ${getTimeframeColor(trend.timeframe)}`}>
                              {trend.timeframe}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{trend.relevanceScore}%</div>
                          <div className="text-xs text-muted-foreground">Relevance</div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {trend.description}
                      </p>
                      
                      <div>
                        <h5 className="text-sm font-medium mb-2">Relevant Industries</h5>
                        <div className="flex flex-wrap gap-1">
                          {trend.industries.map((ind, i) => (
                            <Badge 
                              key={i} 
                              variant={ind === industry ? "default" : "secondary"} 
                              className="text-xs"
                            >
                              {ind}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </TabsContent>

          <TabsContent value="impact" className="mt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Impact Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {(['High', 'Medium', 'Low'] as const).map((impact) => {
                    const count = filteredTrends.filter(t => t.impact === impact).length;
                    const percentage = filteredTrends.length > 0 ? (count / filteredTrends.length) * 100 : 0;
                    
                    return (
                      <div key={impact} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{impact} Impact</span>
                          <span>{count} trends ({Math.round(percentage)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              impact === 'High' ? 'bg-red-500' : 
                              impact === 'Medium' ? 'bg-yellow-500' : 
                              'bg-green-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Timeline Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {(['Immediate', '6 months', '1 year', '2+ years'] as const).map((timeframe) => {
                    const count = filteredTrends.filter(t => t.timeframe === timeframe).length;
                    const percentage = filteredTrends.length > 0 ? (count / filteredTrends.length) * 100 : 0;
                    
                    return (
                      <div key={timeframe} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{timeframe}</span>
                          <span>{count} trends ({Math.round(percentage)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="mt-6 space-y-4">
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-green-800">Strategic Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 text-green-800">Immediate Actions (Next 3 months)</h4>
                  <ul className="space-y-2 text-sm text-green-700">
                    {filteredTrends.filter(t => t.timeframe === 'Immediate' && t.impact === 'High').slice(0, 3).map((trend, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-600 mt-2" />
                        <span>Address {trend.title.toLowerCase()} through strategic planning and pilot programs</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-green-800">Medium-term Strategy (6-12 months)</h4>
                  <ul className="space-y-2 text-sm text-green-700">
                    {filteredTrends.filter(t => (t.timeframe === '6 months' || t.timeframe === '1 year') && t.impact !== 'Low').slice(0, 3).map((trend, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-600 mt-2" />
                        <span>Prepare for {trend.title.toLowerCase()} by building capabilities and partnerships</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-green-800">Long-term Vision (2+ years)</h4>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-600 mt-2" />
                      <span>Invest in emerging technologies with transformative potential</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-600 mt-2" />
                      <span>Build research partnerships and innovation capabilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-600 mt-2" />
                      <span>Establish thought leadership in sustainable AI practices</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Last Updated */}
        <div className="text-xs text-muted-foreground text-center">
          Last updated: {trendAnalysis.lastUpdated}
        </div>
      </CardContent>
    </Card>
  );
}