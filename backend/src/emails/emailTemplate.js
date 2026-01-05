export function createWelcomeEmailTemplate(name, clientURL) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Messenger</title>
</head>

<body style="margin:0; padding:0; background-color:#f2f4f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 30px 0;">
    <tr>
      <td align="center">

        <!-- MAIN CONTAINER -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#36D1DC,#5B86E5); padding:40px; text-align:center;">
              <img 
                src="https://img.freepik.com/free-vector/hand-drawn-message-element-vector-cute-sticker_53876-118344.jpg"
                alt="Messenger"
                width="90"
                height="90"
                style="border-radius:50%; background:#ffffff; padding:10px; margin-bottom:20px;"
              />
              <h1 style="margin:0; color:#ffffff; font-size:30px; font-weight:600;">
                Welcome to Messenger
              </h1>
              <p style="margin-top:10px; color:#eaf6ff; font-size:16px;">
                Real-time conversations, beautifully simple
              </p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:40px; color:#333333;">

              <p style="font-size:18px; margin-top:0;">
                Hi <strong>${name}</strong> 👋
              </p>

              <p style="font-size:15px; line-height:1.7; color:#555;">
                We’re excited to have you on board! Messenger helps you stay connected with the people who matter — faster, safer, and more fun.
              </p>

              <!-- FEATURE BOX -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc; border-radius:12px; margin:30px 0; padding:25px;">
                <tr>
                  <td>
                    <h3 style="margin-top:0; color:#5B86E5; font-size:18px;">
                      🚀 Get started in minutes
                    </h3>
                    <ul style="padding-left:18px; margin:0; color:#555; font-size:15px; line-height:1.8;">
                      <li>Customize your profile</li>
                      <li>Find friends & contacts</li>
                      <li>Start real-time chats</li>
                      <li>Share photos, videos & more</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <div style="text-align:center; margin:35px 0;">
                <a 
                  href="${clientURL}"
                  style="
                    background:linear-gradient(135deg,#36D1DC,#5B86E5);
                    color:#ffffff;
                    text-decoration:none;
                    padding:14px 36px;
                    border-radius:999px;
                    font-size:16px;
                    font-weight:600;
                    display:inline-block;
                  "
                >
                  Open Messenger →
                </a>
              </div>

              <p style="font-size:14px; color:#666; line-height:1.7;">
                If you ever need help, just reply to this email — we’re always happy to help.
              </p>

              <p style="margin-bottom:0; font-size:14px;">
                Cheers,<br />
                <strong>The Messenger Team</strong>
              </p>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f8fafc; padding:25px; text-align:center; font-size:12px; color:#999;">
              <p style="margin:0;">© 2025 Messenger. All rights reserved.</p>
              <p style="margin:10px 0 0 0;">
                <a href="#" style="color:#5B86E5; text-decoration:none; margin:0 8px;">Privacy</a>
                <a href="#" style="color:#5B86E5; text-decoration:none; margin:0 8px;">Terms</a>
                <a href="#" style="color:#5B86E5; text-decoration:none; margin:0 8px;">Support</a>
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
