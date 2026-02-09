import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.EMAIL_FROM || 'AI Ebook <noreply@aidohod.com>';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

interface SendPurchaseEmailParams {
  to: string;
  downloadToken: string;
  orderAmount: string;
}

export async function sendPurchaseConfirmation({
  to,
  downloadToken,
  orderAmount,
}: SendPurchaseEmailParams): Promise<boolean> {
  const downloadUrl = `${BASE_URL}/api/download?token=${downloadToken}`;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: 'Вашата книга е готова за изтегляне! 📚',
      html: getPurchaseEmailTemplate(downloadUrl, orderAmount),
    });

    if (error) {
      console.error('Error sending email:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Failed to send email:', err);
    return false;
  }
}

function getPurchaseEmailTemplate(downloadUrl: string, amount: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0891b2 0%, #3b82f6 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                Благодарим за покупката! 🎉
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Здравей,
              </p>
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Твоята поръчка за <strong>"Как да превърнеш AI в реален доход"</strong> е успешно обработена.
              </p>

              <!-- Order Summary -->
              <table width="100%" style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <tr>
                  <td style="padding: 15px;">
                    <p style="color: #6b7280; font-size: 14px; margin: 0 0 5px 0;">Сума на поръчката:</p>
                    <p style="color: #111827; font-size: 24px; font-weight: bold; margin: 0;">${amount}</p>
                  </td>
                </tr>
              </table>

              <!-- Download Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${downloadUrl}" style="display: inline-block; background: linear-gradient(135deg, #0891b2 0%, #3b82f6 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 18px; font-weight: bold;">
                      📥 Изтегли книгата
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 20px 0;">
                <strong>Важно:</strong> Линкът за изтегляне е валиден 72 часа и може да бъде използван до 5 пъти.
              </p>

              <!-- What's Next -->
              <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 15px 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                <h3 style="color: #065f46; margin: 0 0 10px 0; font-size: 16px;">Какво следва?</h3>
                <ul style="color: #374151; font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.8;">
                  <li>Изтегли PDF файла</li>
                  <li>Запази го на удобно място</li>
                  <li>Започни да учиш и прилагай веднага!</li>
                </ul>
              </div>

              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
                Ако имаш въпроси, просто отговори на този имейл или пиши на
                <a href="mailto:contact@aidohod.com" style="color: #0891b2;">contact@aidohod.com</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1e293b; padding: 30px; text-align: center;">
              <p style="color: #94a3b8; font-size: 14px; margin: 0 0 10px 0;">
                AI в Реален Доход
              </p>
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                © 2026 Всички права запазени
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

export async function sendConsultationConfirmation(
  name: string,
  email: string,
  message: string
): Promise<boolean> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Консултацията е получена 📞',
      html: getConsultationEmailTemplate(name, message),
    });

    if (error) {
      console.error('Resend email error:', error);
      return false;
    }

    console.log('Consultation confirmation email sent');
    return true;
  } catch (error) {
    console.error('Send consultation email error:', error);
    return false;
  }
}

function getConsultationEmailTemplate(name: string, message: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #06b6d4 0%, #2563eb 100%); padding: 40px 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
        Благодарим за запитването! ✅
      </h1>
    </div>

    <!-- Content -->
    <div style="padding: 40px 30px;">
      <p style="font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 20px;">
        Здравей <strong>${name}</strong>,
      </p>

      <p style="font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 20px;">
        Получихме твоето запитване за AI консултация. Ето какво каза:
      </p>

      <!-- Message Box -->
      <div style="background-color: #f3f4f6; border-left: 4px solid #06b6d4; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
        <p style="font-size: 14px; line-height: 1.6; color: #4b5563; margin: 0; font-style: italic;">
          "${message}"
        </p>
      </div>

      <p style="font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 20px;">
        <strong>Какво следва?</strong>
      </p>

      <ul style="font-size: 16px; line-height: 1.8; color: #374151; margin-bottom: 30px;">
        <li>Ще получиш персонализиран отговор в рамките на <strong>24 часа</strong> (работни дни)</li>
        <li>Отговорът ще включва конкретни стъпки и примери за твоята ситуация</li>
        <li>Ако имаш спешен въпрос, отговори на този имейл</li>
      </ul>

      <!-- CTA Box -->
      <div style="background: linear-gradient(135deg, #ecfeff 0%, #dbeafe 100%); padding: 25px; border-radius: 8px; text-align: center; margin-bottom: 30px;">
        <p style="font-size: 14px; color: #0c4a6e; margin: 0 0 15px 0;">
          💡 <strong>Искаш неограничена поддръжка?</strong>
        </p>
        <p style="font-size: 14px; color: #0c4a6e; margin: 0 0 20px 0;">
          Купувачите на електронната книга получават безлимитни консултации + пълен достъп до всички стратегии за печелене с AI.
        </p>
        <a href="${BASE_URL}/#pricing" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 16px;">
          Виж офертата →
        </a>
      </div>

      <p style="font-size: 14px; line-height: 1.6; color: #6b7280; margin-bottom: 10px;">
        Поздрави,<br>
        <strong>AI Ebook Екип</strong>
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f9fafb; padding: 20px 30px; border-top: 1px solid #e5e7eb; text-align: center;">
      <p style="font-size: 12px; color: #9ca3af; margin: 0;">
        © ${new Date().getFullYear()} AI Ebook. Всички права запазени.
      </p>
    </div>

  </div>
</body>
</html>
`;
}

export async function sendAdminNotification(
  name: string,
  email: string,
  phone: string | undefined,
  message: string
): Promise<boolean> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: 'contact@aidohod.com',
      subject: `🔔 Ново запитване за консултация от ${name}`,
      html: `
        <h2>Ново запитване за консултация</h2>
        <p><strong>Име:</strong> ${name}</p>
        <p><strong>Имейл:</strong> ${email}</p>
        <p><strong>Телефон:</strong> ${phone || 'Не е посочен'}</p>
        <p><strong>Съобщение:</strong></p>
        <blockquote style="background: #f3f4f6; padding: 15px; border-left: 4px solid #06b6d4;">
          ${message}
        </blockquote>
        <p><em>Отговори на ${email} в рамките на 24 часа.</em></p>
      `,
    });

    return !error;
  } catch {
    return false;
  }
}

