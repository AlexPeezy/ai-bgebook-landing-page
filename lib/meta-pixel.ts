// Meta Pixel client-side tracking helpers
// These call fbq() which is loaded via the script in layout.tsx

type FbqEvent = 'PageView' | 'ViewContent' | 'InitiateCheckout' | 'Purchase';

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
    fbq: (action: string, event: FbqEvent, params?: FbqParams) => void;
  }
}

function fbq(event: FbqEvent, params?: FbqParams) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', event, params);
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

export function trackInitiateCheckout() {
  fbq('InitiateCheckout', {
    content_name: 'AI Ebook',
    content_type: 'product',
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
