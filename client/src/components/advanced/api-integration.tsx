import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code, Database, Zap, CheckCircle, AlertCircle, Copy, ExternalLink } from "lucide-react";

interface APIIntegrationProps {
  organizationName: string;
  assessmentId?: string;
}

export function APIIntegration({ organizationName, assessmentId }: APIIntegrationProps) {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>("assessment");
  const [apiKey, setApiKey] = useState<string>("");
  const [testResponse, setTestResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiEndpoints = [
    {
      id: 'assessment',
      name: 'Assessment Submission',
      method: 'POST',
      path: '/api/assessments',
      description: 'Submit a completed AI readiness assessment',
      params: ['organizationName', 'contactEmail', 'responses', 'scores'],
      response: 'Assessment results with recommendations'
    },
    {
      id: 'recommendations',
      name: 'Smart Recommendations',
      method: 'GET',
      path: '/api/recommendations/{organizationId}',
      description: 'Get personalized AI implementation recommendations',
      params: ['organizationId', 'organizationSize?', 'budget?'],
      response: 'Prioritized list of recommendations'
    },
    {
      id: 'roadmap',
      name: 'AI Maturity Roadmap',
      method: 'GET',
      path: '/api/roadmap/{assessmentId}',
      description: 'Generate AI maturity roadmap based on assessment',
      params: ['assessmentId'],
      response: 'Detailed implementation roadmap'
    },
    {
      id: 'trends',
      name: 'Trend Analysis',
      method: 'GET',
      path: '/api/trends',
      description: 'Get latest AI trends and market intelligence',
      params: ['industry?', 'region?', 'category?'],
      response: 'Current AI trends and insights'
    },
    {
      id: 'compliance',
      name: 'Regulatory Compliance',
      method: 'GET',
      path: '/api/compliance',
      description: 'Get regulatory compliance requirements',
      params: ['region?', 'industry?'],
      response: 'Applicable regulations and requirements'
    },
    {
      id: 'learning-path',
      name: 'Learning Path',
      method: 'GET',
      path: '/api/learning-path/{userId}',
      description: 'Get personalized learning recommendations',
      params: ['userId', 'currentLevel?'],
      response: 'Customized learning modules and progress'
    }
  ];

  const generateApiKey = () => {
    const key = `ai-readiness-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setApiKey(key);
    // API key generated
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Code copied to clipboard
  };

  const testApiEndpoint = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockResponses = {
        assessment: {
          id: 'assessment-123',
          overallScore: 72,
          recommendations: ['Improve data quality', 'Enhance team training'],
          status: 'completed'
        },
        recommendations: {
          total: 8,
          highPriority: 3,
          recommendations: [
            { title: 'Cloud Infrastructure Upgrade', priority: 'High' },
            { title: 'AI Training Program', priority: 'Medium' }
          ]
        },
        roadmap: {
          phases: 3,
          totalDuration: '12-18 months',
          estimatedCost: { low: 150000, high: 300000 }
        },
        trends: {
          trends: 12,
          highImpact: 5,
          lastUpdated: new Date().toISOString().split('T')[0]
        },
        compliance: {
          regulations: 6,
          critical: 2,
          region: 'Global'
        },
        'learning-path': {
          currentLevel: 'Intermediate',
          recommendedModules: 6,
          estimatedTime: '24 hours'
        }
      };

      setTestResponse(mockResponses[selectedEndpoint as keyof typeof mockResponses]);
      // API test successful
    } catch (error) {
      console.error('API test failed: Unable to connect to the endpoint.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateCodeExample = (endpoint: any, language: string) => {
    const examples = {
      javascript: `
// ${endpoint.name} - JavaScript/Node.js
const response = await fetch('https://api.ai-readiness.com${endpoint.path}', {
  method: '${endpoint.method}',
  headers: {
    'Authorization': 'Bearer ${apiKey || 'your-api-key'}',
    'Content-Type': 'application/json'
  },
  ${endpoint.method === 'POST' ? `body: JSON.stringify({
    organizationName: "${organizationName}",
    contactEmail: "admin@${organizationName.toLowerCase().replace(/\s/g, '')}.com",
    responses: {},
    scores: {}
  })` : ''}
});

const data = await response.json();
console.log(data);`,

      python: `
# ${endpoint.name} - Python
import requests

url = "https://api.ai-readiness.com${endpoint.path}"
headers = {
    "Authorization": "Bearer ${apiKey || 'your-api-key'}",
    "Content-Type": "application/json"
}

${endpoint.method === 'POST' ? `data = {
    "organizationName": "${organizationName}",
    "contactEmail": "admin@${organizationName.toLowerCase().replace(/\s/g, '')}.com",
    "responses": {},
    "scores": {}
}

response = requests.${endpoint.method.toLowerCase()}(url, headers=headers, json=data)` : 
`response = requests.${endpoint.method.toLowerCase()}(url, headers=headers)`}

print(response.json())`,

      curl: `
# ${endpoint.name} - cURL
curl -X ${endpoint.method} "https://api.ai-readiness.com${endpoint.path}" \\
  -H "Authorization: Bearer ${apiKey || 'your-api-key'}" \\
  -H "Content-Type: application/json" \\
  ${endpoint.method === 'POST' ? `-d '{
    "organizationName": "${organizationName}",
    "contactEmail": "admin@${organizationName.toLowerCase().replace(/\s/g, '')}.com",
    "responses": {},
    "scores": {}
  }'` : ''}`.trim()
    };

    return examples[language as keyof typeof examples];
  };

  const selectedEndpointData = apiEndpoints.find(ep => ep.id === selectedEndpoint);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          API Integration Hub
        </CardTitle>
        <CardDescription>
          Integrate AI readiness assessment capabilities into your existing systems
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* API Key Management */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-blue-800 flex items-center gap-2">
              <Zap className="h-5 w-5" />
              API Authentication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">API Key</label>
              <div className="flex gap-2">
                <Input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key or generate a new one"
                  className="flex-1"
                />
                <Button onClick={generateApiKey} variant="outline">
                  Generate Key
                </Button>
              </div>
              <p className="text-xs text-blue-600">
                Keep your API key secure. Include it in the Authorization header for all requests.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* API Documentation Tabs */}
        <Tabs defaultValue="endpoints" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="examples">Code Examples</TabsTrigger>
            <TabsTrigger value="testing">API Testing</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          </TabsList>

          <TabsContent value="endpoints" className="mt-6 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Available API Endpoints</h4>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Database className="h-3 w-3" />
                  REST API v1
                </Badge>
              </div>
              
              {apiEndpoints.map((endpoint) => (
                <Card key={endpoint.id} className="border-l-4 border-l-green-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-lg">{endpoint.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant={endpoint.method === 'GET' ? 'secondary' : 'default'}>
                            {endpoint.method}
                          </Badge>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {endpoint.path}
                          </code>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedEndpoint(endpoint.id)}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Test
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{endpoint.description}</p>
                    
                    <div>
                      <h5 className="text-sm font-medium mb-2">Parameters</h5>
                      <div className="flex flex-wrap gap-1">
                        {endpoint.params.map((param, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {param}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium mb-1">Response</h5>
                      <p className="text-xs text-muted-foreground">{endpoint.response}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="examples" className="mt-6 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Select value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select endpoint" />
                  </SelectTrigger>
                  <SelectContent>
                    {apiEndpoints.map((endpoint) => (
                      <SelectItem key={endpoint.id} value={endpoint.id}>
                        {endpoint.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedEndpointData && (
                <Tabs defaultValue="javascript" className="w-full">
                  <TabsList>
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                  </TabsList>

                  {(['javascript', 'python', 'curl'] as const).map((lang) => (
                    <TabsContent key={lang} value={lang} className="mt-4">
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg capitalize">{lang} Example</CardTitle>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(generateCodeExample(selectedEndpointData, lang))}
                            >
                              <Copy className="h-4 w-4 mr-1" />
                              Copy
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <Textarea
                            value={generateCodeExample(selectedEndpointData, lang)}
                            readOnly
                            className="font-mono text-sm h-64 resize-none"
                          />
                        </CardContent>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>
              )}
            </div>
          </TabsContent>

          <TabsContent value="testing" className="mt-6 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">API Endpoint Testing</CardTitle>
                <CardDescription>Test API endpoints directly from this interface</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Endpoint</label>
                    <Select value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {apiEndpoints.map((endpoint) => (
                          <SelectItem key={endpoint.id} value={endpoint.id}>
                            {endpoint.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">API Key</label>
                    <Input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter API key"
                    />
                  </div>
                </div>

                <Button
                  onClick={testApiEndpoint}
                  disabled={isLoading || !apiKey}
                  className="w-full"
                >
                  {isLoading ? (
                    <>Testing Endpoint...</>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Test {selectedEndpointData?.name}
                    </>
                  )}
                </Button>

                {testResponse && (
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        API Response
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="text-sm bg-white p-3 rounded border overflow-auto">
                        {JSON.stringify(testResponse, null, 2)}
                      </pre>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="webhooks" className="mt-6 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Webhook Configuration</CardTitle>
                <CardDescription>Receive real-time notifications about assessment events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Webhook URL</label>
                    <Input
                      placeholder="https://your-domain.com/webhooks/ai-readiness"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Events to Subscribe</label>
                    <div className="mt-2 space-y-2">
                      {[
                        'assessment.completed',
                        'recommendation.generated',
                        'roadmap.created',
                        'compliance.updated'
                      ].map((event) => (
                        <div key={event} className="flex items-center gap-2">
                          <input type="checkbox" id={event} className="rounded" />
                          <label htmlFor={event} className="text-sm">{event}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Configure Webhook
                  </Button>
                </div>

                <Card className="border-amber-200 bg-amber-50">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                      <div className="text-sm text-amber-700">
                        <strong>Webhook Security:</strong> All webhook payloads are signed with HMAC-SHA256. 
                        Verify the signature using the webhook secret provided in your API settings.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Rate Limits and Usage */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-yellow-800">API Usage & Limits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-yellow-700">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <strong>Rate Limits:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• 1,000 requests per hour</li>
                  <li>• 10,000 requests per day</li>
                  <li>• Burst limit: 100 requests per minute</li>
                </ul>
              </div>
              <div>
                <strong>Response Formats:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• JSON (default)</li>
                  <li>• XML (via Accept header)</li>
                  <li>• CSV (for data exports)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}