import { useState } from "react";
import { Database, CheckCircle, AlertTriangle, Settings, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Assessment } from "@shared/schema";

interface CRMIntegrationProps {
  assessment: Assessment;
}

const supportedCRMs = [
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Sync assessment data to Salesforce leads and opportunities",
    icon: "🔵",
    fields: ["API Token", "Instance URL"],
    popular: true
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Create contacts and deals with assessment insights",
    icon: "🟠", 
    fields: ["API Key"],
    popular: true
  },
  {
    id: "pipedrive",
    name: "Pipedrive",
    description: "Add assessment results to your Pipedrive pipeline",
    icon: "🟢",
    fields: ["API Token", "Company Domain"],
    popular: true
  },
  {
    id: "zoho",
    name: "Zoho CRM",
    description: "Integrate with Zoho CRM leads and contacts",
    icon: "🟣",
    fields: ["Client ID", "Client Secret", "Refresh Token"],
    popular: false
  },
  {
    id: "dynamics",
    name: "Microsoft Dynamics 365",
    description: "Sync to Dynamics 365 Customer Engagement",
    icon: "🔷",
    fields: ["Organization URL", "Client ID", "Client Secret"],
    popular: false
  },
  {
    id: "custom",
    name: "Custom API",
    description: "Connect via webhook or custom API integration",
    icon: "⚙️",
    fields: ["Webhook URL", "API Key"],
    popular: false
  }
];

export default function CRMIntegration({ assessment }: CRMIntegrationProps) {
  const [selectedCRM, setSelectedCRM] = useState<string>("");
  const [credentials, setCredentials] = useState<Record<string, string>>({});
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "success" | "error">("idle");
  const { toast } = useToast();

  const handleCRMSelect = (crmId: string) => {
    setSelectedCRM(crmId);
    setCredentials({});
    setConnectionStatus("idle");
  };

  const handleCredentialChange = (field: string, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  const testConnection = async () => {
    if (!selectedCRM || !credentials) return;
    
    setIsConnecting(true);
    
    try {
      // Simulate API call to test CRM connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, simulate success for valid-looking credentials
      const hasValidCredentials = Object.values(credentials).every(val => val.length > 5);
      
      if (hasValidCredentials) {
        setConnectionStatus("success");
        toast({
          title: "Connection Successful",
          description: `Successfully connected to ${supportedCRMs.find(c => c.id === selectedCRM)?.name}`,
        });
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      setConnectionStatus("error");
      toast({
        title: "Connection Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const syncTocrm = async () => {
    if (connectionStatus !== "success") return;
    
    setIsConnecting(true);
    
    try {
      // Simulate syncing assessment data to CRM
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Assessment Synced",
        description: `Assessment results have been synced to your ${supportedCRMs.find(c => c.id === selectedCRM)?.name} account`,
      });
    } catch (error) {
      toast({
        title: "Sync Failed",
        description: "Failed to sync assessment data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case "success": return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "error": return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default: return <Settings className="h-5 w-5 text-gray-400" />;
    }
  };

  const selectedCRMData = supportedCRMs.find(crm => crm.id === selectedCRM);

  return (
    <Card className="mt-8">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Database className="h-6 w-6 text-blue-600" />
          <div>
            <h3 className="text-xl font-semibold text-slate-900">CRM Integration</h3>
            <p className="text-slate-600">Sync your assessment results directly to your CRM system</p>
          </div>
        </div>

        {/* CRM Selection */}
        <div className="mb-6">
          <Label className="text-sm font-medium text-slate-700 mb-3 block">
            Select Your CRM System
          </Label>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {supportedCRMs.map((crm) => (
              <div
                key={crm.id}
                className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedCRM === crm.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                } ${crm.popular ? "ring-2 ring-yellow-200" : ""}`}
                onClick={() => handleCRMSelect(crm.id)}
              >
                {crm.popular && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-medium">
                    Popular
                  </div>
                )}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{crm.icon}</span>
                  <h4 className="font-medium text-slate-900">{crm.name}</h4>
                </div>
                <p className="text-sm text-slate-600">{crm.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Configuration Section */}
        {selectedCRM && selectedCRMData && (
          <div className="border-t pt-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{selectedCRMData.icon}</span>
              <h4 className="text-lg font-semibold text-slate-900">
                Configure {selectedCRMData.name} Integration
              </h4>
              {getConnectionIcon()}
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {selectedCRMData.fields.map((field) => (
                <div key={field}>
                  <Label htmlFor={field} className="text-sm font-medium text-slate-700">
                    {field}
                  </Label>
                  <Input
                    id={field}
                    type={field.toLowerCase().includes('secret') || field.toLowerCase().includes('token') ? 'password' : 'text'}
                    placeholder={`Enter your ${field.toLowerCase()}`}
                    value={credentials[field] || ""}
                    onChange={(e) => handleCredentialChange(field, e.target.value)}
                    className="mt-1"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={testConnection}
                disabled={isConnecting || !Object.values(credentials).every(val => val.length > 0)}
                variant="outline"
              >
                {isConnecting ? "Testing..." : "Test Connection"}
              </Button>

              {connectionStatus === "success" && (
                <Button
                  onClick={syncTocrm}
                  disabled={isConnecting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isConnecting ? "Syncing..." : (
                    <>
                      Sync Assessment Data
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Data Preview */}
        {selectedCRM && (
          <div className="border-t pt-6 mt-6">
            <h4 className="text-lg font-semibold text-slate-900 mb-4">Assessment Data Preview</h4>
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-slate-700">Organization:</p>
                  <p className="text-slate-900">{assessment.organizationName}</p>
                </div>
                <div>
                  <p className="font-medium text-slate-700">Industry:</p>
                  <p className="text-slate-900">{assessment.industry}</p>
                </div>
                <div>
                  <p className="font-medium text-slate-700">Overall AI Readiness Score:</p>
                  <p className="text-slate-900 font-semibold">{assessment.overallScore}%</p>
                </div>
                <div>
                  <p className="font-medium text-slate-700">Assessment Date:</p>
                  <p className="text-slate-900">
                    {new Date(assessment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="font-medium text-slate-700 mb-2">Contact Information:</p>
                <p className="text-slate-900">{assessment.contactEmail}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}