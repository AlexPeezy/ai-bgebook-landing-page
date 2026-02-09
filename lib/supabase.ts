import { createClient } from '@supabase/supabase-js';

// Database types
export interface Order {
  id: string;
  email: string;
  stripe_session_id: string;
  amount_cents: number;
  currency: string;
  status: 'pending' | 'completed';
  created_at: string;
}

export interface DownloadToken {
  id: string;
  order_id: string;
  token: string;
  download_count: number;
  max_downloads: number;
  expires_at: string;
  created_at: string;
}

export interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'pending' | 'responded';
  is_buyer: boolean;
  created_at: string;
  responded_at?: string;
}

// Create Supabase client (server-side with service role)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Create order after successful payment
export async function createOrder(data: {
  email: string;
  stripeSessionId: string;
  amountCents: number;
  currency: string;
}): Promise<Order | null> {
  const { data: order, error } = await supabaseAdmin
    .from('orders')
    .insert({
      email: data.email,
      stripe_session_id: data.stripeSessionId,
      amount_cents: data.amountCents,
      currency: data.currency,
      status: 'completed',
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating order:', error);
    return null;
  }

  return order;
}

// Create download token for an order
export async function createDownloadToken(orderId: string): Promise<string | null> {
  const token = generateSecureToken();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 72); // 72 hour expiry

  const { error } = await supabaseAdmin
    .from('download_tokens')
    .insert({
      order_id: orderId,
      token,
      max_downloads: 5,
      expires_at: expiresAt.toISOString(),
    });

  if (error) {
    console.error('Error creating download token:', error);
    return null;
  }

  return token;
}

// Validate and use download token
export async function validateDownloadToken(token: string): Promise<{
  valid: boolean;
  orderId?: string;
  error?: string;
}> {
  const { data, error } = await supabaseAdmin
    .from('download_tokens')
    .select('*')
    .eq('token', token)
    .single();

  if (error || !data) {
    return { valid: false, error: 'Invalid token' };
  }

  if (new Date(data.expires_at) < new Date()) {
    return { valid: false, error: 'Token expired' };
  }

  if (data.download_count >= data.max_downloads) {
    return { valid: false, error: 'Download limit reached' };
  }

  // Increment download count
  await supabaseAdmin
    .from('download_tokens')
    .update({ download_count: data.download_count + 1 })
    .eq('id', data.id);

  return { valid: true, orderId: data.order_id };
}

// Check if order already exists (idempotency)
export async function orderExists(stripeSessionId: string): Promise<boolean> {
  const { data } = await supabaseAdmin
    .from('orders')
    .select('id')
    .eq('stripe_session_id', stripeSessionId)
    .single();

  return !!data;
}

// Create consultation request
export async function createConsultationRequest(
  name: string,
  email: string,
  message: string,
  phone?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabaseAdmin
      .from('consultations')
      .insert({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone?.trim() || null,
        message: message.trim(),
        status: 'pending',
        is_buyer: false,
      });

    if (error) {
      console.error('Supabase insert error:', error);
      return { success: false, error: 'Failed to save consultation request' };
    }

    return { success: true };
  } catch (error) {
    console.error('Create consultation error:', error);
    return { success: false, error: 'Internal server error' };
  }
}

// Get pending consultations count for an email
export async function getPendingConsultationsCount(email: string): Promise<number> {
  try {
    const { count } = await supabaseAdmin
      .from('consultations')
      .select('*', { count: 'exact', head: true })
      .eq('email', email.toLowerCase().trim())
      .eq('status', 'pending');

    return count || 0;
  } catch (error) {
    console.error('Get consultations count error:', error);
    return 0;
  }
}

// Generate secure random token
function generateSecureToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}
