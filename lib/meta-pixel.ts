// Meta Pixel client-side tracking helpers
// These call fbq() which is loaded via the script in layout.tsx

type FbqStandardEvent =
  | 'PageView'
  | 'ViewContent'
  | 'AddToCart'
  | 'InitiateCheckout'
  | 'Lead'
  | 'Purchase'
  | 'Contact';

interface FbqParams {
  content_name?: string;
  content_type?: string;
  content_ids?: string[];
  currency?: string;
  value?: number;
  [key: string]: unknown;
}

declare global {
  interface Window {
    fbq: (action: string, event: string, params?: FbqParams) => void;
  }
}

function fbq(event: FbqStandardEvent, params?: FbqParams) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', event, params);
  }
}

function fbqCustom(event: string, params?: FbqParams) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', event, params);
  }
}

export function trackViewContent() {
  fbq('ViewContent', {
    content_name: 'AI Ebook Landing Page',
    content_type: 'product',
    currency: 'EUR',
    value: 15,
  });
}

// User clicked "Buy" button — modal opened
export function trackAddToCart() {
  fbq('AddToCart', {
    content_name: 'AI Ebook',
    content_type: 'product',
    currency: 'EUR',
    value: 15,
  });
}

// User submitted email and is heading to Stripe
export function trackInitiateCheckout() {
  fbq('InitiateCheckout', {
    content_name: 'AI Ebook',
    content_type: 'product',
    currency: 'EUR',
    value: 15,
  });
}

// User submitted their email (useful for Lead campaigns)
export function trackLead() {
  fbq('Lead', {
    content_name: 'AI Ebook Email Capture',
    currency: 'EUR',
    value: 15,
  });
}

export function trackPurchase() {
  fbq('Purchase', {
    content_name: 'AI Ebook',
    content_type: 'product',
    currency: 'EUR',
    value: 15,
  });
}

// User clicked contact email
export function trackContact() {
  fbq('Contact');
}

// Scroll depth milestones (25%, 50%, 75%, 100%)
export function trackScrollDepth(percent: number) {
  fbqCustom('ScrollDepth', { percent });
}
