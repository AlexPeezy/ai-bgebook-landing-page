import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    // Ping Supabase to keep the project alive
    const { count, error } = await supabaseAdmin
      .from('orders')
      .select('*', { count: 'exact', head: true });

    if (error) {
      return NextResponse.json(
        { status: 'error', supabase: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: 'ok',
      supabase: 'connected',
      orders: count,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      { status: 'error', message: String(err) },
      { status: 500 }
    );
  }
}
