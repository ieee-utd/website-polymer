if (!process.env.SENDGRID_API_KEY)
{
  console.warn("WARNING: SENDGRID_API_KEY environment variable not set. Mail system will be disabled.")
} else if (!process.env.MAIL_HOSTNAME)
{
  console.error("Please set MAIL_HOSTNAME environment variable.")
  process.exit(1);
}

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export function sendEmailMsg(msg: any) {
  return new Promise((resolve, reject) => {
    if (!process.env.SENDGRID_API_KEY) {
      return resolve();
      //Mail system did not send anything, but we quitely ignore the error
    }

    sgMail.send(msg)
    .then(() => { resolve() })
    .catch(reject)
  })
}

export async function sendEmail(subject: string, bodyHtml: string, toEmail: string, summary: string, fromName?: string) {
  const msg = {
    to: toEmail,
    from: {
      email: 'noreply@ieeeutd.org',
      name: fromName || "IEEEUTD Member Portal"
    },
    subject: subject,
    templateId: 'd-f696f336b80340d797d355dc94bbed33',
    dynamic_template_data: {
      origin: process.env.MAIL_HOSTNAME,
      emailto: toEmail,
      body: bodyHtml,
      subject: subject,
      summary: summary
    },
  };
  await sendEmailMsg(msg);
}

export function sendSigninCompleteEmail(email: string, firstName: string, lastName: string, eventTitle: string, eventLocation: string)
{
  var html = ``

  return sendEmail("IEEEUTD Member Account - ACTION REQUIRED", html, email, "Your IEEEUTD Member account has been created and needs your activation.", "IEEEUTD Team");
}
export function sendConfirmAccountEmail(email: string, token: string, firstName: string, lastName: string)
{
  var html = `Hello ${firstName} ${lastName},
  <br><br>
  <b>Your IEEEUTD Member account has been created and needs your activation.</b><br><br>
  Please go to <a href="${process.env.MAIL_HOSTNAME}/member/confirm/${token}">${process.env.MAIL_HOSTNAME}/member/confirm/${token}</a> to complete registration.
  `

  return sendEmail("IEEEUTD Member Account - ACTION REQUIRED", html, email, "Your IEEEUTD Member account has been created and needs your activation.");
}
export function sendResetPasswordEmail(email: string, token: string, firstName: string, lastName: string)
{
  var html = `Hello ${firstName} ${lastName},
  <br><br>
  <b>You recently requested a password reset.</b><br><br>
  Please go to <a href="${process.env.MAIL_HOSTNAME}/member/reset-password/${token}">${process.env.MAIL_HOSTNAME}/member/reset-password/${token}</a> to complete registration.
  `

  return sendEmail("IEEEUTD Member Account - Password Reset", html, email, "Your IEEEUTD Member account has been created and needs your activation.");
}
