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

const securityCategories = [
  {
    name: "Data Protection & Privacy",
    fullName: "Data Protection & Privacy Management",
    description: "Comprehensive data privacy and protection practices",
    requirements: ["Data classification", "Privacy controls", "Data minimization", "Breach response"],
    icon: "🛡️",
    industries: ["all"]
  },
  {
    name: "Access Control & Authentication",
    fullName: "Access Control & Identity Management",
    description: "Secure access controls and identity management systems",
    requirements: ["Multi-factor authentication", "Role-based access", "Identity verification", "Session management"],
    icon: "🔐",
    industries: ["all"]
  },
  {
    name: "Security Monitoring & Incident Response",
    fullName: "Security Monitoring & Incident Response",
    description: "Continuous monitoring and rapid incident response capabilities",
    requirements: ["Threat detection", "Incident response plan", "Security logging", "Monitoring tools"],
    icon: "🔍",
    industries: ["all"]
  },
  {
    name: "Data Encryption & Security",
    fullName: "Data Encryption & Security Controls",
    description: "Comprehensive data encryption and security controls",
    requirements: ["Data encryption", "Secure communications", "Key management", "Security protocols"],
    icon: "🔒",
    industries: ["all"]
  }
];

// Function to get security categories (all categories are universal)
const getSecurityCategories = () => {
  return securityCategories;
};

export default function ComplianceAssessment({ scores, industry }: ComplianceAssessmentProps) {
  const avgSecurityScore = (scores.security + scores.dataQuality) / 2;
  const securityAssessmentCategories = getSecurityCategories();
  
  const getComplianceLevel = (score: number) => {
    if (score >= 4.0) return { 
      level: "Strong Security Posture", 
      color: "text-green-600", 
      bgColor: "bg-green-50", 
      icon: CheckCircle,
      description: "Robust security practices with strong data protection capabilities"
    };
    if (score >= 2.5) return { 
      level: "Moderate Security Level", 
      color: "text-yellow-600", 
      bgColor: "bg-yellow-50", 
      icon: AlertTriangle,
      description: "Good security foundation with areas for improvement"
    };
    return { 
      level: "Security Improvement Needed", 
      color: "text-red-600", 
      bgColor: "bg-red-50", 
      icon: XCircle,
      description: "Significant security enhancements required for AI implementation"
    };
  };

  const getCategoryScore = (category: string) => {
    // Calculate category-specific scores based on security and data quality
    const baseScore = avgSecurityScore;
    const variations = {
      "Data Protection & Privacy": baseScore * 1.0,           // Standard baseline for privacy
      "Access Control & Authentication": baseScore * 0.98,    // Slightly lower due to complexity
      "Security Monitoring & Incident Response": baseScore * 1.05,  // Slightly higher if good security practices
      "Data Encryption & Security": baseScore * 0.96         // Slightly lower due to technical requirements
    };
    
    return Math.min(5, variations[category as keyof typeof variations] || baseScore);
  };

  const overallCompliance = getComplianceLevel(avgSecurityScore);
  const OverallIcon = overallCompliance.icon;

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-900 mb-6 flex items-center">
          <Shield className="mr-2 h-5 w-5 text-primary" />
          Data Security & Privacy Readiness Assessment
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
                {avgSecurityScore.toFixed(1)}/5
              </div>
              <div className="text-sm text-slate-600">Security Score</div>
            </div>
          </div>
        </div>

        {/* Security Category Assessment */}
        <div className="space-y-4">
          <h4 className="text-base sm:text-lg font-semibold text-slate-900">Security Assessment Categories:</h4>
          {securityAssessmentCategories.map((category, index) => {
            const categoryScore = getCategoryScore(category.name);
            const categoryCompliance = getComplianceLevel(categoryScore);
            const CategoryIcon = categoryCompliance.icon;
            
            return (
              <div key={index} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <span className="text-xl mr-3">{category.icon}</span>
                    <div>
                      <div className="text-sm sm:text-base font-medium text-slate-900">{category.fullName}</div>
                      <div className="text-xs sm:text-sm text-slate-600">{category.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <CategoryIcon className={`${categoryCompliance.color} mr-2 h-4 w-4`} />
                    <span className={`text-sm font-medium ${categoryCompliance.color}`}>
                      {categoryCompliance.level}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="flex-1 mr-3">
                    <Progress 
                      value={(categoryScore / 5) * 100} 
                      className="h-2 bg-gray-200" 
                      dynamicColor={true}
                    />
                  </div>
                  <span className="text-sm text-slate-600">{categoryScore.toFixed(1)}/5</span>
                </div>

                {/* Key Requirements */}
                <div className="space-y-1">
                  <div className="text-xs sm:text-sm font-medium text-slate-900">Key Areas:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {category.requirements.map((req, reqIndex) => (
                      <div key={reqIndex} className="flex items-center text-xs sm:text-sm text-slate-600">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          categoryScore >= 4.0 ? 'bg-green-500' : 
                          categoryScore >= 3.0 ? 'bg-yellow-500' : 'bg-red-500'
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
          <h4 className="text-base sm:text-lg font-semibold text-slate-900 mb-3">Security Action Plan:</h4>
          <div className="space-y-3">
            {avgSecurityScore >= 4.0 ? (
              <>
                <div className="flex items-start">
                  <CheckCircle className="text-green-600 mr-2 h-4 w-4 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700">Maintain current security standards through regular assessments</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-600 mr-2 h-4 w-4 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700">Implement continuous monitoring for security posture</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-600 mr-2 h-4 w-4 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700">Consider advanced security automation tools</span>
                </div>
              </>
            ) : avgSecurityScore >= 3.0 ? (
              <>
                <div className="flex items-start">
                  <AlertTriangle className="text-yellow-600 mr-2 h-4 w-4 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700">Conduct comprehensive security gap analysis</span>
                </div>
                <div className="flex items-start">
                  <AlertTriangle className="text-yellow-600 mr-2 h-4 w-4 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700">Implement missing security controls and policies</span>
                </div>
                <div className="flex items-start">
                  <AlertTriangle className="text-yellow-600 mr-2 h-4 w-4 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700">Establish security awareness training program for staff</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start">
                  <XCircle className="text-red-600 mr-2 h-4 w-4 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700">Immediate security assessment and remediation required</span>
                </div>
                <div className="flex items-start">
                  <XCircle className="text-red-600 mr-2 h-4 w-4 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700">Engage security specialists before AI implementation</span>
                </div>
                <div className="flex items-start">
                  <XCircle className="text-red-600 mr-2 h-4 w-4 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700">Implement foundational security and data governance</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Risk Warning */}
        {avgSecurityScore < 3.0 && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <XCircle className="text-red-600 mr-2 h-5 w-5 mt-0.5" />
              <div className="text-sm">
                <div className="font-medium text-red-800 mb-1">Security Risk Warning</div>
                <div className="text-red-700">
                  AI implementation with current security posture may result in data breaches, 
                  privacy violations, and reputational damage. Strengthen security measures before proceeding.
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}