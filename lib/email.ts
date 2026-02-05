import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.EMAIL_FROM || 'AI Ebook <noreply@aiebook.bg>';
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
                <a href="mailto:support@aiebook.bg" style="color: #0891b2;">support@aiebook.bg</a>
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

// Refund confirmation email
export async function sendRefundConfirmation(to: string, amount: string): Promise<boolean> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: 'Възстановяване на средства - потвърждение',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #f4f4f4; padding: 40px;">
  <table width="600" style="background: white; border-radius: 12px; margin: 0 auto; padding: 40px;">
    <tr>
      <td>
        <h1 style="color: #1e293b;">Възстановяване на средства</h1>
        <p style="color: #374151; font-size: 16px;">
          Сумата от <strong>${amount}</strong> беше успешно възстановена по вашата карта.
        </p>
        <p style="color: #6b7280; font-size: 14px;">
          Средствата ще се появят в сметката ви в рамките на 5-10 работни дни.
        </p>
        <p style="color: #374151; font-size: 16px; margin-top: 30px;">
          Благодарим ви и се надяваме да ви видим отново!
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    return !error;
  } catch {
    return false;
  }
}
