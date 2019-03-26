require('dotenv').config();

process.env.NODE_ENV = "script";

import { sendEmailMsg } from "../helpers/mail";

const bccEmails = [
  "ajv170001@utdallas.edu",
  "yxl170011@utdallas.edu",
  "aak170002@utdallas.edu",
  "gxk180007@utdallas.edu",
  "utsabbhattarai26@gmail.com",
  "gtm180000@utdallas.edu",
  "axb175430@utdallas.edu",
  "jkb150230@utdallas.edu",
  "emh170030@utdallas.edu",
  "mjs150930@utdallas.edu",
  "jxk180021@utdallas.edu",
  "Afk160330@utdallas.edu",
  "Wsr160030@utdallas.edu",
  "Aqb170000@utdallas.edu",
  "mxk174030@utdallas.edu",
  "kxs171530@utdallas.edu",
  "ljp160130@utdallas.edu",
  "Mac170930@utdallas.edu",
  "Lu.Matthew.Y@gmail.com",
  "ams170002@utdallas.edu",
  "msj170000@utdallas.edu",
  "spl170030@utdallas.edu",
  "rreshmiranjith@gmail.com",
  "ZAR170000@utdallas.edu",
  "atn170001@utdallas.edu",
  "Ptg170030@utdallas.edu",
  "ncp170130@utdallas.edu",
  "jeg170330@utdallas.edu",
  "Adwaithmoothezhath@gmail.com",
  "Jmr180004@utdallas.edu",
  "jxt170630@utdallas.edu",
  "jas172430@utdallas.edu",
  "axa172532@utdallas.edu",
  "amv170330@utdallas.edu",
  "jpt170000@utdallas.edu",
  "axb175430@utdallas.com",
  "nithin.ksk94@gmail.com",
  "Asa170130@utdallas.edu",
  "henry.anderson523@gmail.com",
  "sxx150830@utdallas.edu",
  "Kxd170011@utdallas.edu",
  "rxb180021@utdallas.edu",
  "crc170001@utdallas.edu",
  "Bad180003@utdallas.edu",
  "mxv170830@utdallas.edu",
  "Sxs170027@utdallas.edu",
  "Kxd170004@utdallas.edu",
  "sxd170630@utdallas.edu",
  "Ntm180000@utdallas.edu",
  "pom170030@utdallas.edu",
  "jtb170930@utdallas.edu",
  "jxl180015@utdallas.edu",
  "kem170000@utdallas.edu"
]

const fromEmail = {
  email: "aap160030@utdallas.edu",
  name: "Arthur Pachachura"
}

const ccEmail = {
  email: "caleb.fung@utdallas.edu",
  name: "Caleb Fung"
}

const replyTo = fromEmail;

const subject = "IEEEUTD IT Committee - Workshop Reminder";

const bodyHtml = `<p>Hello everyone!<br><br>
Hope you all had a great spring break. This Thursday 7-9p, we will be running a workshop on NodeJS, a server platform great for web development. For details, please visit <a href="https://ieeeutd.org/e/JLM1xg">ieeeutd.org/e/JLM1xg</a>. We hope to see you all there!<br><br>
Before you come, please <a href="https://join.slack.com/t/ieee-utd/shared_invite/enQtNTg5NDc2MTIwMTMzLWNjYzZkZDI1NDBjNmFhYWNkZDM0Y2VhMWZmNjNlODBkYmE2YjA1ODk3ZDllNTUzZGU3YTNkMTI2MTk0ZGFkNzc">sign up for our Slack</a> so we can stay in touch and <a href="https://nodejs.org/en/download/">install NodeJS 10.x</a> on the laptop you plan to bring to the event.<br><br>
Please email us (or Slack us) back if you have any questions. Thank you!</p>`

const summary = "";

async function run() {
  try {
    await sendEmailMsg({
      to: replyTo,
      from: fromEmail,
      cc: ccEmail,
      bcc: bccEmails,
      replyTo: replyTo,
      subject: subject,
      templateId: 'd-f696f336b80340d797d355dc94bbed33',
      dynamic_template_data: {
        origin: process.env.MAIL_HOSTNAME,
        body: bodyHtml,
        subject: subject,
        summary: summary
      },
    })

    console.log("Email sent!")
  } catch (e) {
    console.error(e);
    console.error(e.response.body.errors)
  }
}

run();
