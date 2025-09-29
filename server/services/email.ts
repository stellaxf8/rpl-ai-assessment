import * as brevo from '@getbrevo/brevo';
import type { Assessment } from '@shared/schema';

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY || '');

export interface SendEmailOptions {
  to: string;
  subject: string;
  htmlContent: string;
  pdfBase64?: string;
  pdfFilename?: string;
}

export async function sendEmail(options: SendEmailOptions): Promise<void> {
  const sendSmtpEmail = new brevo.SendSmtpEmail();
  
  sendSmtpEmail.subject = options.subject;
  sendSmtpEmail.htmlContent = options.htmlContent;
  sendSmtpEmail.sender = { 
    name: 'Red Pill Labs', 
    email: 'noreply@redpilllabs.com' // You'll need to verify this in Brevo
  };
  sendSmtpEmail.to = [{ email: options.to }];

  if (options.pdfBase64 && options.pdfFilename) {
    sendSmtpEmail.attachment = [{
      content: options.pdfBase64,
      name: options.pdfFilename
    }];
  }

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`Email sent successfully to ${options.to}`);
  } catch (error) {
    console.error('Error sending email via Brevo:', error);
    throw new Error('Failed to send email');
  }
}

export function generateAssessmentEmailHTML(assessment: Assessment, organizationName: string): string {
  const { overallScore } = assessment;
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #cd0000; color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f8f9fa; padding: 30px 20px; border-radius: 0 0 8px 8px; }
    .score-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; text-align: center; border: 2px solid #e9ecef; }
    .score-number { font-size: 48px; font-weight: bold; color: #cd0000; margin: 10px 0; }
    .button { display: inline-block; background: #cd0000; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #6c757d; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Your AI Readiness Assessment Report</h1>
      <p>Comprehensive Analysis for ${organizationName}</p>
    </div>
    
    <div class="content">
      <h2>Thank you for completing the assessment!</h2>
      
      <p>Your organization has been evaluated across 6 key dimensions of AI readiness. The detailed report is attached to this email as a PDF.</p>
      
      <div class="score-box">
        <p style="margin: 0; color: #6c757d; font-size: 14px;">Overall AI Readiness Score</p>
        <div class="score-number">${overallScore}</div>
        <p style="margin: 0; color: #6c757d;">out of 100</p>
      </div>
      
      <h3>What's included in your report:</h3>
      <ul>
        <li>Executive summary with overall readiness assessment</li>
        <li>Priority action items for immediate implementation</li>
        <li>Detailed analysis of all 6 readiness dimensions</li>
        <li>Personalized recommendations based on your scores</li>
      </ul>
      
      <p><strong>Next Steps:</strong></p>
      <p>Review the attached PDF report to understand your organization's AI readiness and the recommended path forward. Our team at Red Pill Labs is here to help you implement these recommendations.</p>
      
      <div style="text-align: center;">
        <a href="mailto:info@redpilllabs.com" class="button">Contact Us for Consultation</a>
      </div>
    </div>
    
    <div class="footer">
      <p><strong>Red Pill Labs</strong></p>
      <p>Email: info@redpilllabs.com | Phone: 1-866-745-5733</p>
      <p style="font-size: 12px; color: #adb5bd; margin-top: 20px;">
        This email was sent because you completed an AI Readiness Assessment on our platform.
        We respect your privacy and will never share your information with third parties.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}
