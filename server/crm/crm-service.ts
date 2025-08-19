import { CrmProvider, CrmContact, CrmConfig } from "@shared/schema";

export interface CrmService {
  createContact(contact: Omit<CrmContact, 'id' | 'provider' | 'createdAt'>): Promise<CrmContact>;
  updateContact(contactId: string, updates: Partial<CrmContact>): Promise<CrmContact>;
  getContact(contactId: string): Promise<CrmContact | null>;
  searchContacts(email: string): Promise<CrmContact[]>;
}

export class SalesforceCrmService implements CrmService {
  constructor(private config: CrmConfig) {}

  async createContact(contact: Omit<CrmContact, 'id' | 'provider' | 'createdAt'>): Promise<CrmContact> {
    if (!this.config.apiKey || !this.config.apiUrl) {
      throw new Error('Salesforce API configuration missing');
    }

    try {
      const salesforceContact = {
        FirstName: contact.firstName || '',
        LastName: contact.lastName || contact.company,
        Email: contact.email,
        Company: contact.company,
        Industry: contact.industry,
        AI_Readiness_Score__c: contact.assessmentScore,
        AI_Readiness_Level__c: contact.readinessLevel,
        Description: contact.notes || `AI Readiness Assessment completed with score: ${contact.assessmentScore}`,
        LeadSource: 'AI Readiness Assessment'
      };

      const response = await fetch(`${this.config.apiUrl}/services/data/v58.0/sobjects/Contact/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(salesforceContact),
      });

      if (!response.ok) {
        throw new Error(`Salesforce API error: ${response.statusText}`);
      }

      const result = await response.json();
      
      return {
        id: result.id,
        provider: 'salesforce',
        ...contact,
        createdAt: new Date(),
      };
    } catch (error) {
      console.error('Salesforce CRM integration error:', error);
      throw error;
    }
  }

  async updateContact(contactId: string, updates: Partial<CrmContact>): Promise<CrmContact> {
    if (!this.config.apiKey || !this.config.apiUrl) {
      throw new Error('Salesforce API configuration missing');
    }

    const salesforceUpdates: any = {};
    if (updates.firstName) salesforceUpdates.FirstName = updates.firstName;
    if (updates.lastName) salesforceUpdates.LastName = updates.lastName;
    if (updates.email) salesforceUpdates.Email = updates.email;
    if (updates.company) salesforceUpdates.Company = updates.company;
    if (updates.industry) salesforceUpdates.Industry = updates.industry;
    if (updates.assessmentScore) salesforceUpdates.AI_Readiness_Score__c = updates.assessmentScore;
    if (updates.readinessLevel) salesforceUpdates.AI_Readiness_Level__c = updates.readinessLevel;
    if (updates.notes) salesforceUpdates.Description = updates.notes;

    const response = await fetch(`${this.config.apiUrl}/services/data/v58.0/sobjects/Contact/${contactId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(salesforceUpdates),
    });

    if (!response.ok) {
      throw new Error(`Salesforce API error: ${response.statusText}`);
    }

    // Return updated contact
    const existing = await this.getContact(contactId);
    return { ...existing!, ...updates };
  }

  async getContact(contactId: string): Promise<CrmContact | null> {
    if (!this.config.apiKey || !this.config.apiUrl) {
      throw new Error('Salesforce API configuration missing');
    }

    const response = await fetch(`${this.config.apiUrl}/services/data/v58.0/sobjects/Contact/${contactId}`, {
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Salesforce API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      id: data.Id,
      provider: 'salesforce',
      firstName: data.FirstName,
      lastName: data.LastName,
      email: data.Email,
      company: data.Company,
      industry: data.Industry,
      assessmentScore: data.AI_Readiness_Score__c || 0,
      readinessLevel: data.AI_Readiness_Level__c || 'Unknown',
      createdAt: new Date(data.CreatedDate),
      notes: data.Description,
    };
  }

  async searchContacts(email: string): Promise<CrmContact[]> {
    if (!this.config.apiKey || !this.config.apiUrl) {
      throw new Error('Salesforce API configuration missing');
    }

    const query = `SELECT Id, FirstName, LastName, Email, Company, Industry, AI_Readiness_Score__c, AI_Readiness_Level__c, CreatedDate, Description FROM Contact WHERE Email = '${email}'`;
    const response = await fetch(`${this.config.apiUrl}/services/data/v58.0/query?q=${encodeURIComponent(query)}`, {
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Salesforce API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return data.records.map((record: any) => ({
      id: record.Id,
      provider: 'salesforce',
      firstName: record.FirstName,
      lastName: record.LastName,
      email: record.Email,
      company: record.Company,
      industry: record.Industry,
      assessmentScore: record.AI_Readiness_Score__c || 0,
      readinessLevel: record.AI_Readiness_Level__c || 'Unknown',
      createdAt: new Date(record.CreatedDate),
      notes: record.Description,
    }));
  }
}

export class HubSpotCrmService implements CrmService {
  constructor(private config: CrmConfig) {}

  async createContact(contact: Omit<CrmContact, 'id' | 'provider' | 'createdAt'>): Promise<CrmContact> {
    if (!this.config.apiKey) {
      throw new Error('HubSpot API key missing');
    }

    try {
      const hubspotContact = {
        properties: {
          firstname: contact.firstName || '',
          lastname: contact.lastName || contact.company,
          email: contact.email,
          company: contact.company,
          industry: contact.industry,
          ai_readiness_score: contact.assessmentScore.toString(),
          ai_readiness_level: contact.readinessLevel,
          notes_last_contacted: contact.notes || `AI Readiness Assessment completed with score: ${contact.assessmentScore}`,
          hs_lead_status: 'NEW',
          lifecyclestage: 'lead'
        }
      };

      const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hubspotContact),
      });

      if (!response.ok) {
        throw new Error(`HubSpot API error: ${response.statusText}`);
      }

      const result = await response.json();
      
      return {
        id: result.id,
        provider: 'hubspot',
        ...contact,
        createdAt: new Date(),
      };
    } catch (error) {
      console.error('HubSpot CRM integration error:', error);
      throw error;
    }
  }

  async updateContact(contactId: string, updates: Partial<CrmContact>): Promise<CrmContact> {
    if (!this.config.apiKey) {
      throw new Error('HubSpot API key missing');
    }

    const hubspotUpdates: any = { properties: {} };
    if (updates.firstName) hubspotUpdates.properties.firstname = updates.firstName;
    if (updates.lastName) hubspotUpdates.properties.lastname = updates.lastName;
    if (updates.email) hubspotUpdates.properties.email = updates.email;
    if (updates.company) hubspotUpdates.properties.company = updates.company;
    if (updates.industry) hubspotUpdates.properties.industry = updates.industry;
    if (updates.assessmentScore) hubspotUpdates.properties.ai_readiness_score = updates.assessmentScore.toString();
    if (updates.readinessLevel) hubspotUpdates.properties.ai_readiness_level = updates.readinessLevel;
    if (updates.notes) hubspotUpdates.properties.notes_last_contacted = updates.notes;

    const response = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hubspotUpdates),
    });

    if (!response.ok) {
      throw new Error(`HubSpot API error: ${response.statusText}`);
    }

    const existing = await this.getContact(contactId);
    return { ...existing!, ...updates };
  }

  async getContact(contactId: string): Promise<CrmContact | null> {
    if (!this.config.apiKey) {
      throw new Error('HubSpot API key missing');
    }

    const response = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`HubSpot API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      id: data.id,
      provider: 'hubspot',
      firstName: data.properties.firstname,
      lastName: data.properties.lastname,
      email: data.properties.email,
      company: data.properties.company,
      industry: data.properties.industry,
      assessmentScore: parseInt(data.properties.ai_readiness_score || '0'),
      readinessLevel: data.properties.ai_readiness_level || 'Unknown',
      createdAt: new Date(data.properties.createdate),
      notes: data.properties.notes_last_contacted,
    };
  }

  async searchContacts(email: string): Promise<CrmContact[]> {
    if (!this.config.apiKey) {
      throw new Error('HubSpot API key missing');
    }

    const response = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/search`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              {
                propertyName: 'email',
                operator: 'EQ',
                value: email
              }
            ]
          }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error(`HubSpot API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return data.results.map((record: any) => ({
      id: record.id,
      provider: 'hubspot',
      firstName: record.properties.firstname,
      lastName: record.properties.lastname,
      email: record.properties.email,
      company: record.properties.company,
      industry: record.properties.industry,
      assessmentScore: parseInt(record.properties.ai_readiness_score || '0'),
      readinessLevel: record.properties.ai_readiness_level || 'Unknown',
      createdAt: new Date(record.properties.createdate),
      notes: record.properties.notes_last_contacted,
    }));
  }
}

export class PipedriveCrmService implements CrmService {
  constructor(private config: CrmConfig) {}

  async createContact(contact: Omit<CrmContact, 'id' | 'provider' | 'createdAt'>): Promise<CrmContact> {
    if (!this.config.apiKey) {
      throw new Error('Pipedrive API key missing');
    }

    try {
      const pipedriveContact = {
        name: `${contact.firstName || ''} ${contact.lastName || contact.company}`.trim(),
        email: contact.email,
        org_name: contact.company,
        '9b3c8a8e8f7f4e4a8b2c1d5e6f7g8h9i': contact.assessmentScore, // Custom field for AI Readiness Score
        '1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p': contact.readinessLevel, // Custom field for AI Readiness Level
        visible_to: '3' // Visible to entire company
      };

      const response = await fetch(`https://api.pipedrive.com/v1/persons?api_token=${this.config.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pipedriveContact),
      });

      if (!response.ok) {
        throw new Error(`Pipedrive API error: ${response.statusText}`);
      }

      const result = await response.json();
      
      return {
        id: result.data.id.toString(),
        provider: 'pipedrive',
        ...contact,
        createdAt: new Date(),
      };
    } catch (error) {
      console.error('Pipedrive CRM integration error:', error);
      throw error;
    }
  }

  async updateContact(contactId: string, updates: Partial<CrmContact>): Promise<CrmContact> {
    if (!this.config.apiKey) {
      throw new Error('Pipedrive API key missing');
    }

    const pipedriveUpdates: any = {};
    if (updates.firstName || updates.lastName) {
      pipedriveUpdates.name = `${updates.firstName || ''} ${updates.lastName || ''}`.trim();
    }
    if (updates.email) pipedriveUpdates.email = updates.email;
    if (updates.company) pipedriveUpdates.org_name = updates.company;
    if (updates.assessmentScore) pipedriveUpdates['9b3c8a8e8f7f4e4a8b2c1d5e6f7g8h9i'] = updates.assessmentScore;
    if (updates.readinessLevel) pipedriveUpdates['1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p'] = updates.readinessLevel;

    const response = await fetch(`https://api.pipedrive.com/v1/persons/${contactId}?api_token=${this.config.apiKey}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pipedriveUpdates),
    });

    if (!response.ok) {
      throw new Error(`Pipedrive API error: ${response.statusText}`);
    }

    const existing = await this.getContact(contactId);
    return { ...existing!, ...updates };
  }

  async getContact(contactId: string): Promise<CrmContact | null> {
    if (!this.config.apiKey) {
      throw new Error('Pipedrive API key missing');
    }

    const response = await fetch(`https://api.pipedrive.com/v1/persons/${contactId}?api_token=${this.config.apiKey}`);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Pipedrive API error: ${response.statusText}`);
    }

    const result = await response.json();
    const data = result.data;
    
    const nameParts = data.name.split(' ');
    return {
      id: data.id.toString(),
      provider: 'pipedrive',
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      email: data.email?.[0]?.value || '',
      company: data.org_name || '',
      industry: data.industry || '',
      assessmentScore: data['9b3c8a8e8f7f4e4a8b2c1d5e6f7g8h9i'] || 0,
      readinessLevel: data['1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p'] || 'Unknown',
      createdAt: new Date(data.add_time),
      notes: data.notes || '',
    };
  }

  async searchContacts(email: string): Promise<CrmContact[]> {
    if (!this.config.apiKey) {
      throw new Error('Pipedrive API key missing');
    }

    const response = await fetch(`https://api.pipedrive.com/v1/persons/search?term=${encodeURIComponent(email)}&field=email&api_token=${this.config.apiKey}`);

    if (!response.ok) {
      throw new Error(`Pipedrive API error: ${response.statusText}`);
    }

    const result = await response.json();
    
    if (!result.data) {
      return [];
    }

    return result.data.items.map((item: any) => {
      const data = item.item;
      const nameParts = data.name.split(' ');
      return {
        id: data.id.toString(),
        provider: 'pipedrive',
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: data.email || '',
        company: data.organization?.name || '',
        industry: data.industry || '',
        assessmentScore: data['9b3c8a8e8f7f4e4a8b2c1d5e6f7g8h9i'] || 0,
        readinessLevel: data['1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p'] || 'Unknown',
        createdAt: new Date(data.add_time),
        notes: data.notes || '',
      };
    });
  }
}

export function createCrmService(config: CrmConfig): CrmService | null {
  if (!config.enabled || config.provider === 'none') {
    return null;
  }

  switch (config.provider) {
    case 'salesforce':
      return new SalesforceCrmService(config);
    case 'hubspot':
      return new HubSpotCrmService(config);
    case 'pipedrive':
      return new PipedriveCrmService(config);
    default:
      throw new Error(`Unsupported CRM provider: ${config.provider}`);
  }
}