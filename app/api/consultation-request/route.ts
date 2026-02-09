import { NextRequest, NextResponse } from 'next/server';
import { createConsultationRequest } from '@/lib/supabase';
import { sendConsultationConfirmation, sendAdminNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, phone } = body;

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Моля, въведете валидно име' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Моля, въведете валиден имейл адрес' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Моля, опишете въпроса си (минимум 10 символа)' },
        { status: 400 }
      );
    }

    // Optional phone validation
    if (phone && typeof phone !== 'string') {
      return NextResponse.json(
        { error: 'Невалиден телефонен номер' },
        { status: 400 }
      );
    }

    // Store in database
    const { success, error: dbError } = await createConsultationRequest(
      name,
      email,
      message,
      phone
    );

    if (!success) {
      console.error('Failed to create consultation:', dbError);
      return NextResponse.json(
        { error: 'Нещо се обърка. Моля, опитайте отново.' },
        { status: 500 }
      );
    }

    // Send confirmation email to customer (don't fail if email fails)
    await sendConsultationConfirmation(name, email, message);

    // Send notification to admin (optional, don't fail if it fails)
    await sendAdminNotification(name, email, phone, message);

    return NextResponse.json(
      {
        success: true,
        message: 'Запитването е получено успешно! Ще получиш отговор до 24 часа.'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Consultation request error:', error);
    return NextResponse.json(
      { error: 'Възникна грешка при обработката на заявката' },
      { status: 500 }
    );
  }
}
