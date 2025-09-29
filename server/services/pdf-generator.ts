import puppeteer from 'puppeteer';
import type { Assessment, DimensionScores } from '@shared/schema';
import { dimensionConfig } from '@shared/dimension-config';

interface ActionItem {
  title: string;
  action: string;
  urgency: string;
  score: number;
  icon: string;
  priority: number;
}

export async function generateAssessmentPDF(assessment: Assessment): Promise<Buffer> {
  const { overallScore, scores, organizationName, industry } = assessment;
  const typedScores = scores as DimensionScores;

  // Generate action items (same logic as frontend)
  const topActionItems = getTopActionItems(typedScores);

  const htmlContent = generatePDFHTML(assessment, typedScores, topActionItems);

  // Launch headless browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  try {
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });

    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
}

function getScoreLevel(score: number): 'high' | 'medium' | 'low' {
  if (score >= 4.0) return 'high';
  if (score >= 2.5) return 'medium';
  return 'low';
}

function getTopActionItems(typedScores: DimensionScores): ActionItem[] {
  const allDimensions = Object.entries(typedScores)
    .map(([dimension, score]) => ({
      dimension: dimension as keyof typeof dimensionConfig,
      score: score as number,
      config: dimensionConfig[dimension as keyof typeof dimensionConfig]
    }))
    .sort((a, b) => a.score - b.score);

  const top3Lowest = allDimensions.slice(0, 3);

  return top3Lowest.map((item, index) => {
    const level = getScoreLevel(item.score);
    const urgency = index === 0 ? "Critical" : index === 1 ? "High" : "Medium";
    
    const actionItems = {
      technologyInfrastructure: {
        high: "Upgrade to AI-optimized cloud instances and implement GPU computing",
        medium: "Audit current infrastructure and plan scalable AI computing resources",
        low: "Establish foundational cloud infrastructure with AI-ready capabilities"
      },
      dataQuality: {
        high: "Implement advanced data governance policies and automated quality monitoring",
        medium: "Create data quality framework and establish data access protocols",
        low: "Start with basic data inventory and implement data cleansing processes"
      },
      teamLiteracy: {
        high: "Develop AI leadership program and establish centers of excellence",
        medium: "Launch comprehensive AI training program for key staff members",
        low: "Begin with AI fundamentals training and hire AI-experienced personnel"
      },
      systemIntegration: {
        high: "Design sophisticated AI integration architecture with existing systems",
        medium: "Map current system dependencies and plan integration points",
        low: "Document existing systems and establish API standards"
      },
      budget: {
        high: "Allocate dedicated AI transformation budget with multi-year planning",
        medium: "Secure additional budget for AI infrastructure and training",
        low: "Develop business case and seek approval for AI investment funding"
      },
      dataSecurity: {
        high: "Enhance AI-specific security controls and advanced privacy-preserving techniques",
        medium: "Strengthen cybersecurity framework and implement privacy compliance with data anonymization",
        low: "Establish foundational security controls, privacy compliance, and data protection capabilities"
      }
    };

    return {
      title: item.config.label,
      action: actionItems[item.dimension][level],
      urgency,
      score: item.score,
      icon: item.config.icon,
      priority: index + 1
    };
  });
}

function generatePDFHTML(assessment: Assessment, typedScores: DimensionScores, topActionItems: ActionItem[]): string {
  const { overallScore, organizationName } = assessment;
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #1e293b; }
    .container { padding: 40px; }
    .header { 
      background: #cd0000; 
      color: white; 
      padding: 30px; 
      border-radius: 8px; 
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .header h1 { font-size: 28px; margin-bottom: 8px; }
    .header-left { flex: 1; }
    .header-right { text-align: right; }
    .section { margin-bottom: 30px; page-break-inside: avoid; }
    .section-title { 
      font-size: 20px; 
      font-weight: 700; 
      color: #1e293b; 
      margin-bottom: 16px; 
      border-bottom: 3px solid #cd0000; 
      padding-bottom: 8px; 
    }
    .summary-box { 
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); 
      padding: 24px; 
      border-radius: 12px; 
      border: 1px solid #e2e8f0; 
    }
    .metrics { 
      display: grid; 
      grid-template-columns: repeat(3, 1fr); 
      gap: 20px; 
      margin-bottom: 20px; 
    }
    .metric { 
      text-align: center; 
      padding: 16px; 
      background: white; 
      border-radius: 8px; 
      box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
    }
    .metric-value { 
      font-size: 32px; 
      font-weight: bold; 
      margin-bottom: 8px; 
    }
    .metric-label { 
      font-size: 12px; 
      color: #64748b; 
      font-weight: 600; 
    }
    .action-item { 
      border: 1px solid #e2e8f0; 
      border-radius: 12px; 
      padding: 20px; 
      background: #f8fafc; 
      margin-bottom: 16px;
      page-break-inside: avoid;
    }
    .action-header { 
      display: flex; 
      align-items: flex-start; 
      margin-bottom: 12px; 
    }
    .action-priority { 
      font-size: 24px; 
      font-weight: bold; 
      margin-right: 16px; 
    }
    .action-title { 
      font-weight: 700; 
      font-size: 16px; 
      color: #1e293b; 
      margin-bottom: 8px; 
    }
    .action-meta { 
      display: flex; 
      align-items: center; 
      margin-bottom: 8px; 
      font-size: 12px; 
    }
    .urgency-badge { 
      padding: 2px 8px; 
      border-radius: 4px; 
      font-weight: 500; 
      margin-right: 8px; 
    }
    .dimensions-grid { 
      display: grid; 
      grid-template-columns: repeat(2, 1fr); 
      gap: 20px; 
    }
    .dimension-card { 
      border: 1px solid #e2e8f0; 
      border-radius: 8px; 
      padding: 16px; 
      background: white;
      page-break-inside: avoid;
    }
    .dimension-header { 
      font-weight: 700; 
      font-size: 16px; 
      color: #1e293b; 
      margin-bottom: 8px; 
    }
    .dimension-score { 
      font-size: 24px; 
      font-weight: bold; 
      margin-bottom: 8px; 
    }
    .footer { 
      border-top: 1px solid #e2e8f0; 
      padding-top: 16px; 
      text-align: center; 
      margin-top: 30px; 
    }
    .contact-cta { 
      color: #cd0000; 
      font-weight: bold; 
      font-size: 16px; 
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="header-left">
        <h1>AI Readiness Assessment Report</h1>
        <p style="margin: 4px 0; opacity: 0.9; font-size: 14px;">Comprehensive analysis and strategic recommendations</p>
        <p style="margin: 4px 0; opacity: 0.9; font-size: 14px; font-weight: 500;">Organization: ${organizationName}</p>
      </div>
      <div class="header-right">
        <div style="font-size: 18px; font-weight: bold;">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        <div style="opacity: 0.9; font-size: 12px;">Assessment Date</div>
      </div>
    </div>
    
    <!-- Executive Summary -->
    <div class="section">
      <h2 class="section-title">Executive Summary</h2>
      <div class="summary-box">
        <div class="metrics">
          <div class="metric">
            <div class="metric-value" style="color: ${overallScore >= 80 ? '#16a34a' : overallScore >= 50 ? '#ca8a04' : '#dc2626'};">${overallScore}</div>
            <div class="metric-label">OVERALL SCORE</div>
            <div style="font-size: 10px; color: #94a3b8;">out of 100</div>
          </div>
          <div class="metric">
            <div class="metric-value" style="font-size: 24px; color: ${overallScore >= 80 ? '#16a34a' : overallScore >= 65 ? '#ca8a04' : '#dc2626'};">
              ${overallScore >= 80 ? "Excellent" : overallScore >= 65 ? "Good" : overallScore >= 50 ? "Fair" : "Poor"}
            </div>
            <div class="metric-label">READINESS LEVEL</div>
            <div style="font-size: 10px; color: #94a3b8;">AI implementation readiness</div>
          </div>
          <div class="metric">
            <div class="metric-value" style="color: #ca8a04;">
              ${Math.max(Object.values(typedScores).filter((score: any) => score < 3.9).length, 1)}
            </div>
            <div class="metric-label">GROWTH OPPORTUNITIES</div>
            <div style="font-size: 10px; color: #94a3b8;">for acceleration</div>
          </div>
        </div>
        <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #cd0000;">
          <p style="color: #374151; line-height: 1.6; font-size: 14px; font-weight: 500;">
            ${overallScore >= 80 ? "Your organization demonstrates excellent AI readiness with strong capabilities across all dimensions. You're well-positioned for successful AI implementation with minimal preparation required." : 
              overallScore >= 65 ? "Your organization shows good AI readiness with strong potential for successful implementation. Focus on addressing the identified improvement areas to maximize your AI initiative's success." :
              overallScore >= 50 ? "Your organization has a fair foundation for AI implementation. While basic capabilities are in place, significant improvement in several areas will be needed before proceeding with AI initiatives." :
              "Your organization currently has limited AI readiness. Substantial preparation and capability building will be required across multiple dimensions before AI implementation can be successful."}
          </p>
        </div>
      </div>
    </div>

    <!-- Priority Action Items -->
    <div class="section">
      <h2 class="section-title">Priority Action Items</h2>
      ${topActionItems.map((item, index) => `
        <div class="action-item">
          <div class="action-header">
            <span class="action-priority" style="color: ${
              index === 0 ? '#ef4444' : index === 1 ? '#f59e0b' : '#3b82f6'
            };">${item.priority}</span>
            <div style="flex: 1;">
              <div class="action-title">${item.title}</div>
              <div class="action-meta">
                <span class="urgency-badge" style="color: ${
                  item.urgency === 'Critical' ? '#dc2626' :
                  item.urgency === 'High' ? '#ca8a04' :
                  '#2563eb'
                }; background: ${
                  item.urgency === 'Critical' ? '#fef2f2' :
                  item.urgency === 'High' ? '#fffbeb' :
                  '#eff6ff'
                };">${item.urgency} Priority</span>
                <span style="color: #64748b;">Score: ${item.score.toFixed(1)}/5</span>
              </div>
              <p style="font-size: 13px; color: #374151; line-height: 1.5;">
                ${item.action}
              </p>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Dimension Analysis -->
    <div class="section">
      <h2 class="section-title">Detailed Dimension Analysis</h2>
      <div class="dimensions-grid">
        ${Object.entries(typedScores).map(([dimension, score]) => {
          const config = dimensionConfig[dimension as keyof typeof dimensionConfig];
          const scoreValue = score as number;
          const level = getScoreLevel(scoreValue);
          return `
            <div class="dimension-card">
              <div class="dimension-header">${config?.label || dimension}</div>
              <div class="dimension-score" style="color: ${
                scoreValue >= 4.0 ? '#16a34a' : scoreValue >= 2.5 ? '#ca8a04' : '#dc2626'
              };">${scoreValue.toFixed(1)}<span style="font-size: 14px; color: #64748b;">/5</span></div>
              <p style="font-size: 13px; color: #374151; line-height: 1.5; margin-bottom: 8px;">
                ${config?.recommendations[level]?.action || 'Continue building capabilities in this area.'}
              </p>
              <div style="color: #6b7280; font-size: 11px; line-height: 1.4; font-style: italic;">
                ${config?.recommendations[level]?.examples || ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <p class="contact-cta">Need help implementing these recommendations? Email us at info@redpilllabs.com or call us Toll Free @ 1-866-745-5733</p>
    </div>
  </div>
</body>
</html>
  `;
}
