import { Shield, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ComplianceAssessmentProps {
  scores: {
    security: number;
    dataQuality: number;
  };
  industry?: string;
}

const complianceFrameworks = [
  {
    name: "GDPR",
    fullName: "General Data Protection Regulation",
    description: "EU data protection and privacy regulation",
    requirements: ["Data encryption", "Consent management", "Right to deletion", "Data breach notification"],
    icon: "🇪🇺",
    industries: ["all"] // Applies to all industries that handle EU data
  },
  {
    name: "HIPAA",
    fullName: "Health Insurance Portability and Accountability Act",
    description: "US healthcare data protection standard",
    requirements: ["PHI encryption", "Access controls", "Audit trails", "Business associate agreements"],
    icon: "🏥",
    industries: ["Healthcare"]
  },
  {
    name: "SOX",
    fullName: "Sarbanes-Oxley Act",
    description: "Financial reporting and data integrity requirements",
    requirements: ["Financial data controls", "Audit trails", "Change management", "Access controls"],
    icon: "💼",
    industries: ["Finance", "Financial Services"]
  },
  {
    name: "PIPEDA",
    fullName: "Personal Information Protection and Electronic Documents Act",
    description: "Canadian federal privacy law governing personal information",
    requirements: ["Privacy policies", "Consent mechanisms", "Breach notifications", "Data minimization"],
    icon: "🇨🇦",
    industries: ["all"] // Applies to all Canadian organizations
  },

  {
    name: "PCI DSS",
    fullName: "Payment Card Industry Data Security Standard",
    description: "Security standard for organizations handling credit card data",
    requirements: ["Secure network", "Cardholder data protection", "Access controls", "Regular monitoring"],
    icon: "💳",
    industries: ["Retail", "Finance", "Financial Services", "E-commerce"]
  },
  {
    name: "FERPA",
    fullName: "Family Educational Rights and Privacy Act",
    description: "US federal law protecting student education records",
    requirements: ["Student data privacy", "Consent management", "Access controls", "Audit trails"],
    icon: "🎓",
    industries: ["Education"]
  },
  {
    name: "ISO 27001",
    fullName: "Information Security Management",
    description: "International security management standard",
    requirements: ["Risk assessment", "Security policies", "Incident response", "Regular audits"],
    icon: "🔒",
    industries: ["all"] // Universal security standard
  }
];

// Function to filter frameworks based on industry
const getRelevantFrameworks = (industry?: string) => {
  if (!industry) {
    // If no industry specified, return universal frameworks
    return complianceFrameworks.filter(framework => 
      framework.industries.includes("all")
    );
  }

  return complianceFrameworks.filter(framework => 
    framework.industries.includes("all") || 
    framework.industries.includes(industry) ||
    framework.industries.some(ind => industry.toLowerCase().includes(ind.toLowerCase()))
  );
};

export default function ComplianceAssessment({ scores, industry }: ComplianceAssessmentProps) {
  const avgComplianceScore = (scores.security + scores.dataQuality) / 2;
  const relevantFrameworks = getRelevantFrameworks(industry);
  
  const getComplianceLevel = (score: number) => {
    if (score >= 4.0) return { 
      level: "Compliant", 
      color: "text-green-600", 
      bgColor: "bg-green-50", 
      icon: CheckCircle,
      description: "Meets most regulatory requirements with minimal gaps"
    };
    if (score >= 3.0) return { 
      level: "Partially Compliant", 
      color: "text-yellow-600", 
      bgColor: "bg-yellow-50", 
      icon: AlertTriangle,
      description: "Some compliance gaps that need addressing"
    };
    return { 
      level: "Non-Compliant", 
      color: "text-red-600", 
      bgColor: "bg-red-50", 
      icon: XCircle,
      description: "Significant compliance gaps requiring immediate attention"
    };
  };

  const getFrameworkScore = (framework: string) => {
    // Calculate framework-specific scores based on security and data quality
    const baseScore = avgComplianceScore;
    const variations = {
      "GDPR": baseScore * 0.95,      // Slightly lower due to strict data requirements
      "HIPAA": baseScore * 0.9,      // Lower due to healthcare-specific requirements
      "SOX": baseScore * 1.05,       // Slightly higher as more focused on financial controls
      "PIPEDA": baseScore * 0.97,    // Canadian privacy law, moderate requirements
      "PCI DSS": baseScore * 0.92,   // Payment security, moderate requirements
      "FERPA": baseScore * 0.94,     // Education privacy, moderate requirements
      "ISO 27001": baseScore         // Standard baseline
    };
    
    return Math.min(5, variations[framework as keyof typeof variations] || baseScore);
  };

  const overallCompliance = getComplianceLevel(avgComplianceScore);
  const OverallIcon = overallCompliance.icon;

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
          <Shield className="mr-2 h-5 w-5 text-primary" />
          Regulatory Compliance Assessment
        </h3>

        {/* Overall Compliance Status */}
        <div className={`${overallCompliance.bgColor} p-4 rounded-lg mb-6`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <OverallIcon className={`${overallCompliance.color} mr-3 h-6 w-6`} />
              <div>
                <div className="font-semibold text-slate-900">
                  {overallCompliance.level}
                </div>
                <div className="text-sm text-slate-600">
                  {overallCompliance.description}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-900">
                {avgComplianceScore.toFixed(1)}/5
              </div>
              <div className="text-sm text-slate-600">Compliance Score</div>
            </div>
          </div>
        </div>

        {/* Framework-Specific Assessment */}
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-900">Regulatory Framework Readiness:</h4>
          {relevantFrameworks.map((framework, index) => {
            const frameworkScore = getFrameworkScore(framework.name);
            const frameworkCompliance = getComplianceLevel(frameworkScore);
            const FrameworkIcon = frameworkCompliance.icon;
            
            return (
              <div key={index} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <span className="text-xl mr-3">{framework.icon}</span>
                    <div>
                      <div className="font-medium text-slate-900">{framework.fullName}</div>
                      <div className="text-sm text-slate-600">{framework.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FrameworkIcon className={`${frameworkCompliance.color} mr-2 h-4 w-4`} />
                    <span className={`text-sm font-medium ${frameworkCompliance.color}`}>
                      {frameworkCompliance.level}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="flex-1 mr-3">
                    <Progress value={(frameworkScore / 5) * 100} className="h-2 bg-gray-200" />
                  </div>
                  <span className="text-sm text-slate-600">{frameworkScore.toFixed(1)}/5</span>
                </div>

                {/* Key Requirements */}
                <div className="space-y-1">
                  <div className="text-sm font-medium text-slate-900">Key Requirements:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {framework.requirements.map((req, reqIndex) => (
                      <div key={reqIndex} className="flex items-center text-sm text-slate-600">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          frameworkScore >= 4.0 ? 'bg-green-500' : 
                          frameworkScore >= 3.0 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        {req}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compliance Action Plan */}
        <div className="mt-6 border-t border-slate-200 pt-6">
          <h4 className="font-semibold text-slate-900 mb-3">Compliance Action Plan:</h4>
          <div className="space-y-3">
            {avgComplianceScore >= 4.0 ? (
              <>
                <div className="flex items-start">
                  <CheckCircle className="text-green-600 mr-2 h-4 w-4 mt-0.5" />
                  <span className="text-sm text-slate-700">Maintain current compliance standards through regular audits</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-600 mr-2 h-4 w-4 mt-0.5" />
                  <span className="text-sm text-slate-700">Implement continuous monitoring for compliance drift</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-600 mr-2 h-4 w-4 mt-0.5" />
                  <span className="text-sm text-slate-700">Consider advanced compliance automation tools</span>
                </div>
              </>
            ) : avgComplianceScore >= 3.0 ? (
              <>
                <div className="flex items-start">
                  <AlertTriangle className="text-yellow-600 mr-2 h-4 w-4 mt-0.5" />
                  <span className="text-sm text-slate-700">Conduct comprehensive compliance gap analysis</span>
                </div>
                <div className="flex items-start">
                  <AlertTriangle className="text-yellow-600 mr-2 h-4 w-4 mt-0.5" />
                  <span className="text-sm text-slate-700">Implement missing security controls and policies</span>
                </div>
                <div className="flex items-start">
                  <AlertTriangle className="text-yellow-600 mr-2 h-4 w-4 mt-0.5" />
                  <span className="text-sm text-slate-700">Establish compliance training program for staff</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start">
                  <XCircle className="text-red-600 mr-2 h-4 w-4 mt-0.5" />
                  <span className="text-sm text-slate-700">Immediate compliance assessment and remediation required</span>
                </div>
                <div className="flex items-start">
                  <XCircle className="text-red-600 mr-2 h-4 w-4 mt-0.5" />
                  <span className="text-sm text-slate-700">Engage compliance specialists before AI implementation</span>
                </div>
                <div className="flex items-start">
                  <XCircle className="text-red-600 mr-2 h-4 w-4 mt-0.5" />
                  <span className="text-sm text-slate-700">Implement foundational security and data governance</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Risk Warning */}
        {avgComplianceScore < 3.0 && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <XCircle className="text-red-600 mr-2 h-5 w-5 mt-0.5" />
              <div className="text-sm">
                <div className="font-medium text-red-800 mb-1">Compliance Risk Warning</div>
                <div className="text-red-700">
                  AI implementation with current compliance posture may result in regulatory violations, 
                  financial penalties, and reputational damage. Address compliance gaps before proceeding.
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}