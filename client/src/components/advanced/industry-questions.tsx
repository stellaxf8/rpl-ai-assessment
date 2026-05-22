import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, AlertCircle, CheckCircle, Building2, Building } from "lucide-react";
import type { IndustryQuestionSet } from "@/lib/types";

interface IndustryQuestionsProps {
  onIndustryChange?: (industry: string) => void;
}

export function IndustryQuestions({ onIndustryChange }: IndustryQuestionsProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [showQuestions, setShowQuestions] = useState(false);

  const industryQuestionSets: IndustryQuestionSet[] = [
    {
      industry: 'Healthcare',
      questions: [
        {
          id: 'healthcare_1',
          question: 'How does your organization handle patient data privacy and HIPAA compliance?',
          dimension: 'security',
          industrySpecific: true
        },
        {
          id: 'healthcare_2', 
          question: 'What is your experience with electronic health records (EHR) integration?',
          dimension: 'systemIntegration',
          industrySpecific: true
        },
        {
          id: 'healthcare_3',
          question: 'How advanced are your clinical decision support systems?',
          dimension: 'technologyInfrastructure',
          industrySpecific: true
        },
        {
          id: 'healthcare_4',
          question: 'What is your current capability for medical imaging analysis?',
          dimension: 'dataQuality',
          industrySpecific: true
        },
        {
          id: 'healthcare_5',
          question: 'How prepared is your staff for AI-assisted diagnostics and treatment?',
          dimension: 'teamLiteracy',
          industrySpecific: true
        }
      ]
    },
    {
      industry: 'Manufacturing',
      questions: [
        {
          id: 'manufacturing_1',
          question: 'How sophisticated is your current IoT sensor network and data collection?',
          dimension: 'dataQuality',
          industrySpecific: true
        },
        {
          id: 'manufacturing_2',
          question: 'What is your experience with predictive maintenance systems?',
          dimension: 'technologyInfrastructure', 
          industrySpecific: true
        },
        {
          id: 'manufacturing_3',
          question: 'How integrated are your ERP, MES, and SCADA systems?',
          dimension: 'systemIntegration',
          industrySpecific: true
        },
        {
          id: 'manufacturing_4',
          question: 'What is your current level of production process automation?',
          dimension: 'technologyInfrastructure',
          industrySpecific: true
        },
        {
          id: 'manufacturing_5',
          question: 'How prepared is your workforce for Industry 4.0 technologies?',
          dimension: 'teamLiteracy',
          industrySpecific: true
        }
      ]
    },
    {
      industry: 'B2B Sales & Distribution',
      questions: [
        {
          id: 'b2b_1',
          question: 'How advanced is your CRM and sales automation technology?',
          dimension: 'technologyInfrastructure',
          industrySpecific: true
        },
        {
          id: 'b2b_2',
          question: 'How well connected are your CRM, ERP, marketing, and quoting systems?',
          dimension: 'systemIntegration',
          industrySpecific: true
        },
        {
          id: 'b2b_3',
          question: 'How complete and reliable is your customer and pipeline data?',
          dimension: 'dataQuality',
          industrySpecific: true
        },
        {
          id: 'b2b_4',
          question: 'What is your current use of lead scoring or sales forecasting tools?',
          dimension: 'technologyInfrastructure',
          industrySpecific: true
        },
        {
          id: 'b2b_5',
          question: 'How comfortable are your sales teams with data-driven and AI-assisted selling?',
          dimension: 'teamLiteracy',
          industrySpecific: true
        }
      ]
    },
    {
      industry: 'Retail & B2C Sales',
      questions: [
        {
          id: 'retail_1',
          question: 'How advanced is your customer data platform and personalization?',
          dimension: 'dataQuality',
          industrySpecific: true
        },
        {
          id: 'retail_2',
          question: 'What is your current omnichannel integration capability?',
          dimension: 'systemIntegration',
          industrySpecific: true
        },
        {
          id: 'retail_3',
          question: 'How sophisticated are your inventory management and demand forecasting systems?',
          dimension: 'technologyInfrastructure',
          industrySpecific: true
        },
        {
          id: 'retail_4',
          question: 'What is your experience with recommendation engines and AI-powered marketing?',
          dimension: 'teamLiteracy',
          industrySpecific: true
        },
        {
          id: 'retail_5',
          question: 'How prepared are you for real-time pricing and dynamic merchandising?',
          dimension: 'budget',
          industrySpecific: true
        }
      ]
    },
    {
      industry: 'Construction',
      questions: [
        {
          id: 'construction_1',
          question: 'How advanced is your project management and scheduling technology?',
          dimension: 'technologyInfrastructure',
          industrySpecific: true
        },
        {
          id: 'construction_2',
          question: 'How well connected are your estimating, accounting, and field systems?',
          dimension: 'systemIntegration',
          industrySpecific: true
        },
        {
          id: 'construction_3',
          question: 'How well do you capture and use job site data for decision making?',
          dimension: 'dataQuality',
          industrySpecific: true
        },
        {
          id: 'construction_4',
          question: 'What is your current use of safety monitoring technology on job sites?',
          dimension: 'security',
          industrySpecific: true
        },
        {
          id: 'construction_5',
          question: 'How prepared are your project managers and site teams for AI-assisted tools?',
          dimension: 'teamLiteracy',
          industrySpecific: true
        }
      ]
    },
    {
      industry: 'Finance',
      questions: [
        {
          id: 'finance_1',
          question: 'How advanced are your fraud detection and risk management systems?',
          dimension: 'security',
          industrySpecific: true
        },
        {
          id: 'finance_2',
          question: 'What is your current algorithmic trading and quantitative analysis capability?',
          dimension: 'technologyInfrastructure',
          industrySpecific: true
        },
        {
          id: 'finance_3',
          question: 'How integrated are your core banking systems with modern APIs?',
          dimension: 'systemIntegration',
          industrySpecific: true
        },
        {
          id: 'finance_4',
          question: 'What is your experience with regulatory compliance automation (SOX, Basel III)?',
          dimension: 'security',
          industrySpecific: true
        },
        {
          id: 'finance_5',
          question: 'How prepared is your team for AI-driven customer service and advisory?',
          dimension: 'teamLiteracy',
          industrySpecific: true
        }
      ]
    },
    {
      industry: 'Technology',
      questions: [
        {
          id: 'technology_1',
          question: 'How mature is your DevOps and MLOps infrastructure?',
          dimension: 'technologyInfrastructure',
          industrySpecific: true
        },
        {
          id: 'technology_2',
          question: 'What is your current capability for real-time data processing and analytics?',
          dimension: 'dataQuality',
          industrySpecific: true
        },
        {
          id: 'technology_3',
          question: 'How advanced are your API ecosystem and microservices architecture?',
          dimension: 'systemIntegration',
          industrySpecific: true
        },
        {
          id: 'technology_4',
          question: 'What is your experience with AI model deployment and scaling?',
          dimension: 'teamLiteracy',
          industrySpecific: true
        },
        {
          id: 'technology_5',
          question: 'How prepared are you for edge computing and distributed AI systems?',
          dimension: 'budget',
          industrySpecific: true
        }
      ]
    },
    {
      industry: 'Education',
      questions: [
        {
          id: 'education_1',
          question: 'How advanced is your learning management system and student data analytics?',
          dimension: 'dataQuality',
          industrySpecific: true
        },
        {
          id: 'education_2',
          question: 'What is your current capability for personalized learning and adaptive assessments?',
          dimension: 'technologyInfrastructure',
          industrySpecific: true
        },
        {
          id: 'education_3',
          question: 'How integrated are your student information systems with academic platforms?',
          dimension: 'systemIntegration',
          industrySpecific: true
        },
        {
          id: 'education_4',
          question: 'What is your experience with FERPA compliance and student privacy protection?',
          dimension: 'security',
          industrySpecific: true
        },
        {
          id: 'education_5',
          question: 'How prepared is your faculty for AI-enhanced teaching and research?',
          dimension: 'teamLiteracy',
          industrySpecific: true
        }
      ]
    }
  ];

  const industrySpecifics = {
    Healthcare: {
      keyFocus: ['Patient Safety', 'HIPAA Compliance', 'Clinical Decision Support', 'Medical Imaging'],
      commonUseCases: ['Diagnostic Assistance', 'Drug Discovery', 'Patient Monitoring', 'Treatment Optimization'],
      regulations: ['HIPAA', 'FDA', '21 CFR Part 11', 'GDPR'],
      challenges: ['Data Privacy', 'Regulatory Approval', 'Clinical Validation', 'Integration with EHR']
    },
    Manufacturing: {
      keyFocus: ['Predictive Maintenance', 'Quality Control', 'Supply Chain Optimization', 'Safety Systems'],
      commonUseCases: ['Defect Detection', 'Process Optimization', 'Demand Forecasting', 'Equipment Monitoring'],
      regulations: ['ISO 9001', 'ISO 14001', 'OSHA', 'Industry 4.0 Standards'],
      challenges: ['Legacy Systems', 'Operational Technology Security', 'Workforce Training', 'ROI Measurement']
    },
    Construction: {
      keyFocus: ['Project Scheduling', 'Site Safety', 'Cost Estimation', 'Subcontractor Coordination'],
      commonUseCases: ['AI-powered scheduling', 'Safety monitoring', 'Predictive cost analytics', 'Drone site surveys'],
      regulations: ['OSHA', 'Building Codes', 'AIA Contracts', 'LEED Standards'],
      challenges: ['Fragmented project data', 'Workforce technology adoption', 'Subcontractor coordination', 'Estimating accuracy']
    },
    'Retail & B2C Sales': {
      keyFocus: ['Customer Experience', 'Inventory Management', 'Pricing Optimization', 'Marketing Automation'],
      commonUseCases: ['Recommendation Engines', 'Demand Forecasting', 'Fraud Detection', 'Chatbots'],
      regulations: ['PCI DSS', 'GDPR', 'CCPA', 'Consumer Protection Laws'],
      challenges: ['Data Integration', 'Real-time Processing', 'Seasonality', 'Customer Privacy']
    },
    'B2B Sales & Distribution': {
      keyFocus: ['Lead Intelligence', 'Pipeline Management', 'Account Health Monitoring', 'Sales Forecasting'],
      commonUseCases: ['Lead Scoring', 'Opportunity Forecasting', 'Churn Prediction', 'Automated Outreach'],
      regulations: ['GDPR', 'CAN-SPAM', 'CCPA', 'Data Protection Laws'],
      challenges: ['CRM data quality', 'Long sales cycles', 'Multi-stakeholder buying', 'Territory management']
    },
    Finance: {
      keyFocus: ['Risk Management', 'Fraud Detection', 'Algorithmic Trading', 'Regulatory Compliance'],
      commonUseCases: ['Credit Scoring', 'Market Analysis', 'Portfolio Optimization', 'Robo-Advisory'],
      regulations: ['SOX', 'Basel III', 'MiFID II', 'Dodd-Frank'],
      challenges: ['Model Explainability', 'Regulatory Approval', 'Data Quality', 'Bias Prevention']
    },
    Technology: {
      keyFocus: ['Product Innovation', 'Development Acceleration', 'System Optimization', 'User Experience'],
      commonUseCases: ['Code Generation', 'Testing Automation', 'Performance Optimization', 'User Analytics'],
      regulations: ['Data Protection Laws', 'Software Standards', 'Open Source Compliance'],
      challenges: ['Technical Debt', 'Scalability', 'Model Deployment', 'Continuous Integration']
    },
    Education: {
      keyFocus: ['Personalized Learning', 'Student Analytics', 'Administrative Efficiency', 'Research Enhancement'],
      commonUseCases: ['Adaptive Learning', 'Plagiarism Detection', 'Student Support', 'Curriculum Optimization'],
      regulations: ['FERPA', 'COPPA', 'State Privacy Laws', 'Accessibility Standards'],
      challenges: ['Digital Divide', 'Faculty Training', 'Student Privacy', 'Technology Integration']
    }
  };

  const handleIndustrySelect = (industry: string) => {
    setSelectedIndustry(industry);
    setShowQuestions(true);
    onIndustryChange?.(industry);
  };

  const selectedQuestionSet = industryQuestionSets.find(set => set.industry === selectedIndustry);
  const selectedSpecifics = selectedIndustry ? industrySpecifics[selectedIndustry as keyof typeof industrySpecifics] : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Industry-Specific Assessment
        </CardTitle>
        <CardDescription>
          Get tailored questions and insights specific to your industry sector
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Industry Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Select Your Industry</label>
          <Select value={selectedIndustry} onValueChange={handleIndustrySelect}>
            <SelectTrigger>
              <SelectValue placeholder="Choose your industry sector" />
            </SelectTrigger>
            <SelectContent>
              {industryQuestionSets.map((set) => (
                <SelectItem key={set.industry} value={set.industry}>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    {set.industry}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedIndustry && selectedSpecifics && (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Industry Overview</TabsTrigger>
              <TabsTrigger value="questions">Specific Questions</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Key Focus Areas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedSpecifics.keyFocus.map((focus, i) => (
                        <Badge key={i} variant="default" className="mr-2 mb-1">
                          {focus}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      Common Use Cases
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedSpecifics.commonUseCases.map((useCase, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-orange-500" />
                      Regulatory Considerations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedSpecifics.regulations.map((regulation, i) => (
                        <Badge key={i} variant="outline" className="mr-2 mb-1">
                          {regulation}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      Industry Challenges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedSpecifics.challenges.map((challenge, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="questions" className="mt-6">
              {selectedQuestionSet && (
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    These questions are specifically designed for the {selectedIndustry} industry to assess AI readiness in context of your sector's unique requirements.
                  </div>
                  
                  {selectedQuestionSet.questions.map((question, index) => (
                    <Card key={question.id} className="border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">
                            Question {index + 1}
                          </CardTitle>
                          <Badge variant="secondary" className="ml-2">
                            {question.dimension.replace(/([A-Z])/g, ' $1').trim().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed">{question.question}</p>
                        <div className="mt-3">
                          <Badge variant="outline" className="text-xs">
                            Industry-Specific Question
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="recommendations" className="mt-6">
              <div className="space-y-4">
                <Card className="border-green-200 bg-green-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-green-800">
                      {selectedIndustry} AI Implementation Strategy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Recommended Starting Points</h4>
                      <ul className="space-y-2 text-sm text-green-700">
                        {selectedIndustry === 'Healthcare' && (
                          <>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Start with administrative automation and patient scheduling
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Implement clinical decision support systems
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Focus on medical imaging analysis pilots
                            </li>
                          </>
                        )}
                        {selectedIndustry === 'Manufacturing' && (
                          <>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Begin with predictive maintenance on critical equipment
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Implement quality control and defect detection
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Optimize supply chain and demand forecasting
                            </li>
                          </>
                        )}
                        {selectedIndustry === 'Construction' && (
                          <p className="text-sm text-blue-700">Construction AI focus: project scheduling optimization, site safety monitoring, and predictive cost analytics to reduce overruns.</p>
                        )}
                        {selectedIndustry === 'B2B Sales & Distribution' && (
                          <p className="text-sm text-blue-700">B2B Sales AI focus: lead scoring, sales forecasting, and account intelligence to shorten cycles and improve win rates.</p>
                        )}
                        {selectedIndustry === 'Retail & B2C Sales' && (
                          <>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Deploy customer recommendation engines
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Implement dynamic pricing and inventory optimization
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Enhance customer service with AI chatbots
                            </li>
                          </>
                        )}
                        {(selectedIndustry === 'Finance' || selectedIndustry === 'Technology' || selectedIndustry === 'Education') && (
                          <>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Assess current data infrastructure and quality
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Start with low-risk automation opportunities
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Build internal AI literacy and capabilities
                            </li>
                          </>
                        )}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Success Metrics</h4>
                      <div className="grid md:grid-cols-2 gap-3 text-sm text-green-700">
                        <div>• Time to market improvement</div>
                        <div>• Operational cost reduction</div>
                        <div>• Quality metrics enhancement</div>
                        <div>• Customer satisfaction increase</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}

        {!selectedIndustry && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <Building2 className="h-12 w-12 text-blue-500 mx-auto" />
                <div>
                  <h3 className="font-medium text-blue-800">Select Your Industry</h3>
                  <p className="text-sm text-blue-600 mt-1">
                    Choose your industry to access tailored questions and recommendations specific to your sector's AI implementation challenges and opportunities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}