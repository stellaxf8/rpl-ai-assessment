import { Assessment } from "../shared/schema";

export interface CRMConfig {
  type: 'salesforce' | 'hubspot' | 'pipedrive' | 'zoho' | 'dynamics' | 'custom';
  credentials: Record<string, string>;
}

export interface CRMSyncResult {
  success: boolean;
  recordId?: string;
  error?: string;
}

export class CRMIntegrationService {
  
  async testConnection(config: CRMConfig): Promise<boolean> {
    try {
      switch (config.type) {
        case 'salesforce':
          return await this.testSalesforceConnection(config.credentials);
        case 'hubspot':
          return await this.testHubspotConnection(config.credentials);
        case 'pipedrive':
          return await this.testPipedriveConnection(config.credentials);
        case 'zoho':
          return await this.testZohoConnection(config.credentials);
        case 'dynamics':
          return await this.testDynamicsConnection(config.credentials);
        case 'custom':
          return await this.testCustomConnection(config.credentials);
        default:
          return false;
      }
    } catch (error) {
      console.error('CRM connection test failed:', error);
      return false;
    }
  }

  async syncAssessment(assessment: Assessment, config: CRMConfig): Promise<CRMSyncResult> {
    try {
      const payload = this.transformAssessmentData(assessment);
      
      switch (config.type) {
        case 'salesforce':
          return await this.syncToSalesforce(payload, config.credentials);
        case 'hubspot':
          return await this.syncToHubspot(payload, config.credentials);
        case 'pipedrive':
          return await this.syncToPipedrive(payload, config.credentials);
        case 'zoho':
          return await this.syncToZoho(payload, config.credentials);
        case 'dynamics':
          return await this.syncToDynamics(payload, config.credentials);
        case 'custom':
          return await this.syncToCustom(payload, config.credentials);
        default:
          return { success: false, error: 'Unsupported CRM type' };
      }
    } catch (error) {
      console.error('CRM sync failed:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  private transformAssessmentData(assessment: Assessment) {
    const scores = assessment.scores as any;
    
    return {
      organization_name: assessment.organizationName,
      contact_email: assessment.contactEmail,
      industry: assessment.industry,
      overall_score: assessment.overallScore,
      assessment_date: assessment.createdAt,
      dimension_scores: {
        technology_infrastructure: scores.technologyInfrastructure,
        data_quality: scores.dataQuality,
        team_literacy: scores.teamLiteracy,
        system_integration: scores.systemIntegration,
        budget: scores.budget,
        data_security: scores.dataSecurity,
        ai_governance: scores.aiGovernance
      },
      readiness_level: this.getReadinessLevel(assessment.overallScore),
      recommendations: this.generateRecommendations(scores),
      priority_areas: this.identifyPriorityAreas(scores)
    };
  }

  private getReadinessLevel(score: number): string {
    if (score >= 80) return "Excellent";
    if (score >= 65) return "Good";
    if (score >= 50) return "Fair";
    return "Needs Improvement";
  }

  private generateRecommendations(scores: any): string[] {
    const recommendations = [];
    
    if (scores.technologyInfrastructure < 3.0) {
      recommendations.push("Upgrade technology infrastructure for AI readiness");
    }
    if (scores.dataQuality < 3.0) {
      recommendations.push("Implement data governance and quality framework");
    }
    if (scores.teamLiteracy < 3.0) {
      recommendations.push("Invest in AI training and education programs");
    }
    if (scores.systemIntegration < 3.0) {
      recommendations.push("Develop system integration strategy for AI tools");
    }
    if (scores.budget < 3.0) {
      recommendations.push("Allocate dedicated budget for AI initiatives");
    }
    if (scores.dataSecurity < 3.0) {
      recommendations.push("Strengthen data security and privacy frameworks");
    }
    if (scores.aiGovernance < 3.0) {
      recommendations.push("Establish AI governance and ethics policies");
    }
    
    return recommendations;
  }

  private identifyPriorityAreas(scores: any): string[] {
    const areas = Object.entries(scores)
      .filter(([_, score]) => (score as number) < 3.0)
      .sort(([, a], [, b]) => (a as number) - (b as number))
      .map(([dimension]) => this.formatDimensionName(dimension));
    
    return areas.slice(0, 3); // Top 3 priority areas
  }

  private formatDimensionName(dimension: string): string {
    const names: Record<string, string> = {
      technologyInfrastructure: "Technology Infrastructure",
      dataQuality: "Data Quality & Access",
      teamLiteracy: "Team AI Literacy",
      systemIntegration: "System Integration",
      budget: "Budget & Resources",
      dataSecurity: "Data Security & Privacy",
      aiGovernance: "AI Governance & Ethics"
    };
    return names[dimension] || dimension;
  }

  // CRM-specific implementation methods
  private async testSalesforceConnection(credentials: Record<string, string>): Promise<boolean> {
    // Implementation would use Salesforce REST API
    // For now, simulate connection test
    const { 'API Token': token, 'Instance URL': instanceUrl } = credentials;
    return token?.length > 10 && instanceUrl?.includes('salesforce.com');
  }

  private async testHubspotConnection(credentials: Record<string, string>): Promise<boolean> {
    // Implementation would use HubSpot API
    const { 'API Key': apiKey } = credentials;
    return apiKey?.length > 20;
  }

  private async testPipedriveConnection(credentials: Record<string, string>): Promise<boolean> {
    // Implementation would use Pipedrive API
    const { 'API Token': token, 'Company Domain': domain } = credentials;
    return token?.length > 10 && domain?.length > 3;
  }

  private async testZohoConnection(credentials: Record<string, string>): Promise<boolean> {
    // Implementation would use Zoho CRM API
    const { 'Client ID': clientId, 'Client Secret': clientSecret, 'Refresh Token': refreshToken } = credentials;
    return clientId?.length > 10 && clientSecret?.length > 10 && refreshToken?.length > 10;
  }

  private async testDynamicsConnection(credentials: Record<string, string>): Promise<boolean> {
    // Implementation would use Microsoft Dynamics 365 API
    const { 'Organization URL': orgUrl, 'Client ID': clientId, 'Client Secret': clientSecret } = credentials;
    return orgUrl?.includes('dynamics.com') && clientId?.length > 10 && clientSecret?.length > 10;
  }

  private async testCustomConnection(credentials: Record<string, string>): Promise<boolean> {
    // Implementation would test custom webhook/API endpoint
    const { 'Webhook URL': webhookUrl, 'API Key': apiKey } = credentials;
    return webhookUrl?.startsWith('http') && apiKey?.length > 5;
  }

  private async syncToSalesforce(data: any, credentials: Record<string, string>): Promise<CRMSyncResult> {
    // Implementation would create/update Salesforce lead/opportunity
    // For demo, simulate successful sync
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, recordId: `SF_${Date.now()}` };
  }

  private async syncToHubspot(data: any, credentials: Record<string, string>): Promise<CRMSyncResult> {
    // Implementation would create/update HubSpot contact/deal
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, recordId: `HS_${Date.now()}` };
  }

  private async syncToPipedrive(data: any, credentials: Record<string, string>): Promise<CRMSyncResult> {
    // Implementation would create/update Pipedrive person/deal
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, recordId: `PD_${Date.now()}` };
  }

  private async syncToZoho(data: any, credentials: Record<string, string>): Promise<CRMSyncResult> {
    // Implementation would create/update Zoho lead/contact
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, recordId: `ZO_${Date.now()}` };
  }

  private async syncToDynamics(data: any, credentials: Record<string, string>): Promise<CRMSyncResult> {
    // Implementation would create/update Dynamics lead/opportunity
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, recordId: `DY_${Date.now()}` };
  }

  private async syncToCustom(data: any, credentials: Record<string, string>): Promise<CRMSyncResult> {
    // Implementation would send POST request to custom webhook
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, recordId: `CUSTOM_${Date.now()}` };
  }
}

export const crmService = new CRMIntegrationService();