// Meta Conversions API (server-side) helper
// Sends events directly to Meta's servers for reliable tracking

import crypto from 'crypto';

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const API_VERSION = 'v21.0';

function hashSHA256(value: string): string {
  return crypto.createHash('sha256').update(value.toLowerCase().trim()).digest('hex');
}

interface CAPIEventParams {
  eventName: 'InitiateCheckout' | 'Purchase';
  email?: string;
  value?: number;
  currency?: string;
  sourceUrl?: string;
  eventId?: string; // For deduplication with client-side pixel
  userAgent?: string;
  ip?: string;
}

export async function sendCAPIEvent(params: CAPIEventParams): Promise<boolean> {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.warn('Meta CAPI: Missing PIXEL_ID or ACCESS_TOKEN');
    return false;
  }

  const userData: Record<string, string> = {};
  if (params.email) {
    userData.em = hashSHA256(params.email);
  }
  if (params.ip) {
    userData.client_ip_address = params.ip;
  }
  if (params.userAgent) {
    userData.client_user_agent = params.userAgent;
  }

  const eventData: Record<string, unknown> = {
    event_name: params.eventName,
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: params.sourceUrl || process.env.NEXT_PUBLIC_BASE_URL,
    user_data: userData,
  };

  if (params.eventId) {
    eventData.event_id = params.eventId;
  }

  if (params.value !== undefined) {
    eventData.custom_data = {
      currency: params.currency || 'EUR',
      value: params.value,
      content_name: 'AI Ebook',
      content_type: 'product',
    };
  }

  try {
    const url = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [eventData] }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Meta CAPI error:', error);
      return false;
    }

    console.log(`Meta CAPI: ${params.eventName} event sent successfully`);
    return true;
  } catch (error) {
    console.error('Meta CAPI fetch error:', error);
    return false;
  }
}
