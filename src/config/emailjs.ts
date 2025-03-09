// Security types
type RateLimitEntry = {
  count: number;
  timestamp: number;
};

// Rate limiting implementation
class RateLimiter {
  private static instance: RateLimiter;
  private rateLimitMap: Map<string, RateLimitEntry>;
  private readonly maxRequests: number;
  private readonly timeoutMinutes: number;

  private constructor() {
    this.rateLimitMap = new Map();
    this.maxRequests = Number(import.meta.env.VITE_MAX_REQUESTS_PER_IP) || 5;
    this.timeoutMinutes = Number(import.meta.env.VITE_REQUEST_TIMEOUT_MINUTES) || 15;
  }

  public static getInstance(): RateLimiter {
    if (!RateLimiter.instance) {
      RateLimiter.instance = new RateLimiter();
    }
    return RateLimiter.instance;
  }

  public checkRateLimit(identifier: string): boolean {
    const now = Date.now();
    const entry = this.rateLimitMap.get(identifier);

    if (!entry) {
      this.rateLimitMap.set(identifier, { count: 1, timestamp: now });
      return true;
    }

    const timeoutMs = this.timeoutMinutes * 60 * 1000;
    if (now - entry.timestamp > timeoutMs) {
      this.rateLimitMap.set(identifier, { count: 1, timestamp: now });
      return true;
    }

    if (entry.count >= this.maxRequests) {
      return false;
    }

    entry.count += 1;
    this.rateLimitMap.set(identifier, entry);
    return true;
  }

  public clearOldEntries(): void {
    const now = Date.now();
    const timeoutMs = this.timeoutMinutes * 60 * 1000;
    
    for (const [key, entry] of this.rateLimitMap.entries()) {
      if (now - entry.timestamp > timeoutMs) {
        this.rateLimitMap.delete(key);
      }
    }
  }
}

// Input validation
export const validateInput = (input: string): string => {
  // Remove any potentially dangerous characters
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[^\w\s@.-]/g, '') // Remove special characters except for email-safe ones
    .trim();
};

// EmailJS configuration
export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_IDS: {
    CUSTOMER_RESPONSE: import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID,
    AGENT_NOTIFICATION: import.meta.env.VITE_EMAILJS_AGENT_TEMPLATE_ID
  },
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  AGENT_EMAIL: import.meta.env.VITE_AGENT_EMAIL,
  EMAIL_TEMPLATES: {
    CUSTOMER: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f01a91; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1>Property Appraisal Request Received</h1>
        </div>
        
        <div style="padding: 20px; background: white; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <p>Dear {{firstName}} {{lastName}},</p>
          
          <p>Thank you for requesting a property appraisal with HayesWinckle. We have received your request and one of our experienced property specialists will be in touch within the next 24 hours.</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #f01a91; margin-top: 0;">Your Appraisal Request Details:</h3>
            <ul style="list-style-type: none; padding-left: 0;">
              <li><strong>Property Address:</strong> {{address}}</li>
              <li><strong>Property Type:</strong> {{propertyType}}</li>
              <li><strong>Reason for Appraisal:</strong> {{appraisalReason}}</li>
            </ul>
          </div>
          
          <p>What happens next:</p>
          <ol>
            <li>Our local property expert will review your property details</li>
            <li>We will contact you to arrange a convenient time for the appraisal</li>
            <li>We will provide you with a comprehensive property valuation</li>
          </ol>
          
          <p>If you have any immediate questions, please contact us:</p>
          <ul style="list-style-type: none; padding-left: 0;">
            <li>📞 03 9111 9111</li>
            <li>✉️ uj.walia@hayeswinckle.com.au</li>
          </ul>
          
          <p style="margin-top: 20px;">Best regards,<br>
          <strong>Ujwal Walia</strong><br>
          Licensed Real Estate Agent<br>
          <strong>HayesWinckle</strong></p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
          <p>This is an automated response to confirm we've received your appraisal request.</p>
        </div>
      </div>
    `,
    AGENT: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f01a91; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1>New Property Appraisal Request</h1>
        </div>
        
        <div style="padding: 20px; background: white; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <p><strong>You have received a new property appraisal request!</strong></p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #f01a91; margin-top: 0;">Customer Details:</h3>
            <ul style="list-style-type: none; padding-left: 0;">
              <li><strong>Name:</strong> {{firstName}} {{lastName}}</li>
              <li><strong>Email:</strong> {{email}}</li>
              <li><strong>Phone:</strong> {{phone}}</li>
              <li><strong>Property Address:</strong> {{address}}</li>
              <li><strong>Property Type:</strong> {{propertyType}}</li>
              <li><strong>Reason for Appraisal:</strong> {{appraisalReason}}</li>
              <li><strong>Submission Date:</strong> {{submission_date}}</li>
            </ul>
            
            <h3 style="color: #f01a91;">Additional Information:</h3>
            <p>{{message}}</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #f01a91; margin-top: 0;">Technical Information:</h3>
            <ul style="list-style-type: none; padding-left: 0;">
              <li><strong>User Agent:</strong> {{user_agent}}</li>
              <li><strong>Fingerprint:</strong> {{ip_fingerprint}}</li>
            </ul>
          </div>
          
          <div style="margin-top: 20px;">
            <a href="mailto:{{email}}?subject=Property Appraisal Request - HayesWinckle" 
               style="display: inline-block; padding: 10px 20px; background-color: #f01a91; color: white; text-decoration: none; border-radius: 5px; margin-right: 10px;">
              Reply to Customer
            </a>
            <a href="tel:{{phone}}" 
               style="display: inline-block; padding: 10px 20px; background-color: #f01a91; color: white; text-decoration: none; border-radius: 5px;">
              Call Customer
            </a>
          </div>
        </div>
      </div>
    `
  }
};

// Add email template interface for type safety
export interface EmailTemplateData extends Record<string, unknown> {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyType: string;
  address: string;
  appraisalReason: string;
  message?: string;
  to_email: string;
  inquiry_type?: string;
  submission_date?: string;
  user_agent?: string;
  ip_fingerprint?: string;
}

// Security utilities
export const SecurityUtils = {
  rateLimiter: RateLimiter.getInstance(),
  validateInput,
  
  // Generate a simple fingerprint for rate limiting
  generateFingerprint(): string {
    const userAgent = navigator.userAgent;
    const screenRes = `${window.screen.width}x${window.screen.height}`;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return btoa(`${userAgent}-${screenRes}-${timeZone}`);
  },

  // Clean form data
  sanitizeFormData<T extends Record<string, unknown>>(data: T): T {
    const sanitized = { ...data };
    for (const key in sanitized) {
      if (typeof sanitized[key] === 'string') {
        sanitized[key] = validateInput(sanitized[key] as string) as T[Extract<keyof T, string>];
      }
    }
    return sanitized;
  }
}; 