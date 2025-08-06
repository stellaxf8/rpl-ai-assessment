import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, AlertTriangle, CheckCircle, Calendar, Globe, Scale } from "lucide-react";
import type { RegulatoryComplianceTracker } from "@shared/schema";
import { useState } from "react";

interface RegulatoryComplianceProps {
  industry?: string;
  region?: string;
}

export function RegulatoryComplianceTrackerComponent({ industry, region }: RegulatoryComplianceProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>(region || "all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const generateComplianceTracker = (): RegulatoryComplianceTracker => {
    const regulations = [
      {
        id: 'eu-ai-act',
        name: 'European Union AI Act',
        region: 'European Union',
        status: 'Active' as const,
        effectiveDate: '2024-08-01',
        description: 'Comprehensive regulation establishing rules for the development, deployment, and use of AI systems within the EU market.',
        requirements: [
          'Risk assessment and classification of AI systems',
          'Conformity assessments for high-risk AI systems',
          'Transparency obligations for AI systems interacting with humans',
          'Human oversight requirements for automated decision-making',
          'Data governance and quality management systems',
          'Accuracy, robustness, and cybersecurity measures'
        ],
        relevantIndustries: ['Finance', 'Healthcare', 'Technology', 'Government', 'Education', 'Retail'],
        complianceLevel: 'Critical' as const
      },
      {
        id: 'us-nist-ai-framework',
        name: 'NIST AI Risk Management Framework',
        region: 'United States',
        status: 'Active' as const,
        effectiveDate: '2023-01-26',
        description: 'Framework to help organizations design, develop, deploy, and use AI systems in a responsible and trustworthy manner.',
        requirements: [
          'AI governance and risk management processes',
          'Impact assessments for AI systems',
          'Bias detection and mitigation strategies',
          'Documentation and transparency practices',
          'Continuous monitoring and evaluation',
          'Stakeholder engagement protocols'
        ],
        relevantIndustries: ['Technology', 'Finance', 'Healthcare', 'Government', 'Manufacturing'],
        complianceLevel: 'Important' as const
      },
      {
        id: 'canada-aida',
        name: 'Artificial Intelligence and Data Act (AIDA)',
        region: 'Canada',
        status: 'Proposed' as const,
        effectiveDate: '2025-06-01',
        description: 'Proposed legislation to regulate AI systems and protect against harm from their development, deployment, and use.',
        requirements: [
          'Impact assessments for AI systems',
          'Risk mitigation measures',
          'Reporting obligations for AI incidents',
          'Transparency and explainability requirements',
          'Data protection and privacy safeguards',
          'Algorithmic accountability measures'
        ],
        relevantIndustries: ['Technology', 'Finance', 'Healthcare', 'Government'],
        complianceLevel: 'Important' as const
      },
      {
        id: 'canada-pipeda',
        name: 'Personal Information Protection and Electronic Documents Act (PIPEDA)',
        region: 'Canada',
        status: 'Active' as const,
        effectiveDate: '2001-01-01',
        description: 'Federal privacy law governing collection, use, and disclosure of personal information in commercial activities, with specific considerations for AI systems.',
        requirements: [
          'Consent for personal information collection and use',
          'Privacy policy transparency and accessibility',
          'Data breach notification requirements',
          'Individual access and correction rights',
          'Privacy impact assessments for AI systems',
          'Data minimization and purpose limitation'
        ],
        relevantIndustries: ['Technology', 'Finance', 'Healthcare', 'Retail', 'Education'],
        complianceLevel: 'Critical' as const
      },
      {
        id: 'uk-ai-white-paper',
        name: 'UK AI Regulation Framework',
        region: 'United Kingdom',
        status: 'Under Review' as const,
        effectiveDate: '2024-12-01',
        description: 'Principles-based approach to AI regulation, emphasizing existing regulators\' roles in overseeing AI within their sectors.',
        requirements: [
          'AI governance frameworks within organizations',
          'Risk assessment and management procedures',
          'Transparency and accountability measures',
          'Human oversight and intervention capabilities',
          'Bias prevention and fairness testing',
          'Continuous monitoring and audit trails'
        ],
        relevantIndustries: ['Finance', 'Healthcare', 'Technology', 'Education'],
        complianceLevel: 'Important' as const
      },
      {
        id: 'china-ai-regulations',
        name: 'China AI Algorithm Recommendation Regulations',
        region: 'China',
        status: 'Active' as const,
        effectiveDate: '2022-03-01',
        description: 'Regulations governing algorithmic recommendation services and AI systems used for content delivery and decision-making.',
        requirements: [
          'Algorithm transparency and disclosure',
          'User consent for algorithmic processing',
          'Bias prevention in recommendation systems',
          'Data security and privacy protection',
          'Regular algorithm audits and assessments',
          'User control over algorithmic recommendations'
        ],
        relevantIndustries: ['Technology', 'Retail', 'Education'],
        complianceLevel: 'Critical' as const
      },
      {
        id: 'singapore-model-ai-governance',
        name: 'Singapore Model AI Governance Framework',
        region: 'Singapore',
        status: 'Active' as const,
        effectiveDate: '2020-01-01',
        description: 'Voluntary framework providing guidance on responsible AI deployment and governance practices.',
        requirements: [
          'AI governance structure and policies',
          'Risk management and impact assessment',
          'Data management and quality assurance',
          'Model transparency and interpretability',
          'Human oversight and decision review',
          'Continuous monitoring and improvement'
        ],
        relevantIndustries: ['Finance', 'Healthcare', 'Technology', 'Government'],
        complianceLevel: 'Recommended' as const
      },
      {
        id: 'brazil-lgpd-ai',
        name: 'Brazil LGPD AI Data Protection Rules',
        region: 'Brazil',
        status: 'Active' as const,
        effectiveDate: '2020-09-18',
        description: 'Data protection law provisions specifically addressing automated decision-making and AI systems processing personal data.',
        requirements: [
          'Consent for automated decision-making',
          'Right to explanation for AI decisions',
          'Data minimization in AI processing',
          'Privacy by design in AI systems',
          'Data subject rights for AI processing',
          'Impact assessments for AI data processing'
        ],
        relevantIndustries: ['Finance', 'Healthcare', 'Retail', 'Technology'],
        complianceLevel: 'Critical' as const
      },
      {
        id: 'australia-ai-ethics',
        name: 'Australia AI Ethics Framework',
        region: 'Australia',
        status: 'Active' as const,
        effectiveDate: '2021-11-01',
        description: 'National framework promoting responsible AI development and deployment across government and industry.',
        requirements: [
          'Ethical AI design principles',
          'Human-centered AI development',
          'Fairness and non-discrimination measures',
          'Transparency and explainability',
          'Accountability and governance structures',
          'Privacy and security safeguards'
        ],
        relevantIndustries: ['Government', 'Healthcare', 'Finance', 'Technology'],
        complianceLevel: 'Recommended' as const
      },
      {
        id: 'india-ai-strategy',
        name: 'India National AI Strategy Compliance',
        region: 'India',
        status: 'Proposed' as const,
        effectiveDate: '2025-01-01',
        description: 'Emerging regulatory framework addressing AI governance, ethics, and safety standards for Indian markets.',
        requirements: [
          'AI system registration and certification',
          'Algorithmic transparency requirements',
          'Data localization for AI training',
          'Bias testing and fairness assessments',
          'Privacy protection in AI systems',
          'Regular compliance audits and reporting'
        ],
        relevantIndustries: ['Technology', 'Finance', 'Healthcare', 'Government'],
        complianceLevel: 'Important' as const
      },
      {
        id: 'japan-ai-governance',
        name: 'Japan AI Governance Guidelines',
        region: 'Japan',
        status: 'Active' as const,
        effectiveDate: '2023-06-01',
        description: 'Comprehensive guidelines for responsible AI development, focusing on human-centric AI and societal benefit.',
        requirements: [
          'Human-centric AI design principles',
          'Risk assessment and management',
          'Transparency and accountability measures',
          'Privacy and data protection compliance',
          'Continuous monitoring and evaluation',
          'Stakeholder engagement and consultation'
        ],
        relevantIndustries: ['Technology', 'Manufacturing', 'Healthcare', 'Government'],
        complianceLevel: 'Important' as const
      }
    ];

    return {
      regulations,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
  };

  const complianceTracker = generateComplianceTracker();
  const regions = ['all', ...Array.from(new Set(complianceTracker.regulations.map(r => r.region)))];
  const statuses = ['all', 'Active', 'Proposed', 'Under Review', 'Upcoming'];

  const filteredRegulations = complianceTracker.regulations.filter(regulation => {
    const regionMatch = selectedRegion === 'all' || regulation.region === selectedRegion;
    const statusMatch = selectedStatus === 'all' || regulation.status === selectedStatus;
    const industryMatch = !industry || regulation.relevantIndustries.includes(industry);
    
    return regionMatch && statusMatch && industryMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Proposed': return 'secondary';
      case 'Under Review': return 'outline';
      case 'Upcoming': return 'destructive';
      default: return 'secondary';
    }
  };

  const getComplianceLevelColor = (level: 'Critical' | 'Important' | 'Recommended') => {
    switch (level) {
      case 'Critical': return 'destructive';
      case 'Important': return 'default';
      case 'Recommended': return 'secondary';
    }
  };

  const criticalCount = filteredRegulations.filter(r => r.complianceLevel === 'Critical').length;
  const activeCount = filteredRegulations.filter(r => r.status === 'Active').length;
  const upcomingCount = filteredRegulations.filter(r => r.status === 'Proposed' || r.status === 'Upcoming').length;

  const getRegionFlag = (region: string) => {
    const flags: Record<string, string> = {
      'European Union': '🇪🇺',
      'United States': '🇺🇸',
      'Canada': '🇨🇦',
      'United Kingdom': '🇬🇧',
      'China': '🇨🇳',
      'Singapore': '🇸🇬',
      'Brazil': '🇧🇷',
      'Australia': '🇦🇺',
      'India': '🇮🇳',
      'Japan': '🇯🇵'
    };
    return flags[region] || '🌍';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scale className="h-5 w-5" />
          Regulatory Compliance Tracker
        </CardTitle>
        <CardDescription>
          Stay current with AI regulations and compliance requirements across global jurisdictions
          {industry && ` for ${industry}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
              <div className="text-xs text-muted-foreground">Critical Compliance</div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-green-600">{activeCount}</div>
              <div className="text-xs text-muted-foreground">Active Regulations</div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-orange-600">{upcomingCount}</div>
              <div className="text-xs text-muted-foreground">Upcoming Changes</div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-blue-600">{filteredRegulations.length}</div>
              <div className="text-xs text-muted-foreground">Total Regulations</div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Region Filter
            </label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {regions.slice(1).map((region) => (
                  <SelectItem key={region} value={region}>
                    <div className="flex items-center gap-2">
                      <span>{getRegionFlag(region)}</span>
                      {region}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Status Filter
            </label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === 'all' ? 'All Statuses' : status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Compliance Tabs */}
        <Tabs defaultValue="regulations" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="regulations">Current Regulations</TabsTrigger>
            <TabsTrigger value="compliance">Compliance Guide</TabsTrigger>
            <TabsTrigger value="calendar">Regulatory Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="regulations" className="mt-6 space-y-4">
            {filteredRegulations.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="space-y-3">
                  <Scale className="h-12 w-12 text-gray-400 mx-auto" />
                  <div>
                    <h3 className="font-medium">No regulations match your filters</h3>
                    <p className="text-sm text-muted-foreground">Try adjusting your region or status filters</p>
                  </div>
                </div>
              </Card>
            ) : (
              filteredRegulations
                .sort((a, b) => {
                  const levelOrder = { 'Critical': 3, 'Important': 2, 'Recommended': 1 };
                  return levelOrder[b.complianceLevel] - levelOrder[a.complianceLevel];
                })
                .map((regulation) => (
                  <Card key={regulation.id} className={`border-l-4 ${
                    regulation.complianceLevel === 'Critical' ? 'border-l-red-500' : 
                    regulation.complianceLevel === 'Important' ? 'border-l-yellow-500' : 
                    'border-l-green-500'
                  }`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            {regulation.name}
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant={getComplianceLevelColor(regulation.complianceLevel)}>
                              {regulation.complianceLevel}
                            </Badge>
                            <Badge variant={getStatusColor(regulation.status)}>
                              {regulation.status}
                            </Badge>
                            <span className="text-sm flex items-center gap-1">
                              <span>{getRegionFlag(regulation.region)}</span>
                              {regulation.region}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">Effective Date</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(regulation.effectiveDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {regulation.description}
                      </p>
                      
                      <div>
                        <h5 className="text-sm font-medium mb-2 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Key Requirements ({regulation.requirements.length})
                        </h5>
                        <div className="grid md:grid-cols-2 gap-2">
                          {regulation.requirements.map((requirement, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm">
                              <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                              <span>{requirement}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="text-sm font-medium mb-2">Relevant Industries</h5>
                        <div className="flex flex-wrap gap-1">
                          {regulation.relevantIndustries.map((ind, i) => (
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

          <TabsContent value="compliance" className="mt-6 space-y-4">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-blue-800">Compliance Implementation Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 text-blue-800">Phase 1: Assessment & Planning (1-2 months)</h4>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5" />
                      <span>Conduct comprehensive regulatory gap analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5" />
                      <span>Identify applicable regulations based on geography and industry</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5" />
                      <span>Establish compliance team and governance structure</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-blue-800">Phase 2: Implementation (3-6 months)</h4>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5" />
                      <span>Develop AI governance policies and procedures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5" />
                      <span>Implement technical controls and monitoring systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5" />
                      <span>Train staff on compliance requirements and procedures</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-blue-800">Phase 3: Monitoring & Maintenance (Ongoing)</h4>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5" />
                      <span>Regular compliance audits and assessments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5" />
                      <span>Continuous monitoring of regulatory changes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5" />
                      <span>Update policies and procedures as regulations evolve</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="mt-6 space-y-4">
            <div className="space-y-4">
              <h4 className="font-medium">Upcoming Regulatory Milestones</h4>
              
              {filteredRegulations
                .filter(r => r.status === 'Proposed' || r.status === 'Upcoming' || new Date(r.effectiveDate) > new Date())
                .sort((a, b) => new Date(a.effectiveDate).getTime() - new Date(b.effectiveDate).getTime())
                .map((regulation) => (
                  <Card key={regulation.id} className="border-l-4 border-l-orange-500">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h5 className="font-medium flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {regulation.name}
                          </h5>
                          <div className="flex items-center gap-2">
                            <span className="text-sm flex items-center gap-1">
                              <span>{getRegionFlag(regulation.region)}</span>
                              {regulation.region}
                            </span>
                            <Badge variant={getStatusColor(regulation.status)}>
                              {regulation.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-orange-600">
                            {new Date(regulation.effectiveDate).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {Math.ceil((new Date(regulation.effectiveDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Last Updated */}
        <div className="text-xs text-muted-foreground text-center">
          Last updated: {complianceTracker.lastUpdated} • Next update: Weekly
        </div>
      </CardContent>
    </Card>
  );
}