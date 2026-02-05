import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

// Parse .env.local
const envContent = readFileSync('.env.local', 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  line = line.replace(/\r/g, '');
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim();
  }
});

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

async function createTestToken() {
  // First create a test order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      email: 'test@example.com',
      stripe_session_id: 'test_session_' + Date.now(),
      amount_cents: 1299,
      currency: 'eur',
      status: 'completed'
    })
    .select()
    .single();

  if (orderError) {
    console.log('Error creating order:', orderError.message);
    return;
  }

  console.log('Created order:', order.id);

  // Create download token
  const token = 'TEST_TOKEN_' + Math.random().toString(36).substring(2, 15);
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 72);

  const { error: tokenError } = await supabase
    .from('download_tokens')
    .insert({
      order_id: order.id,
      token: token,
      max_downloads: 5,
      expires_at: expiresAt.toISOString()
    });

  if (tokenError) {
    console.log('Error creating token:', tokenError.message);
    return;
  }

  console.log('\n✅ Test token created!');
  console.log('\n📥 Download URL:');
  console.log(`http://localhost:3000/api/download?token=${token}`);
}

createTestToken();
