require('dotenv').config();

process.env.NODE_ENV = "script";

import { sendEmailMsg } from "../helpers/mail";
import * as _ from 'lodash';

const bccEmails = [
  "pachachura.arthur@gmail.com",
  "vedanshpatel9@gmail.com"
]

const fromEmail = {
  email: "aap160030@utdallas.edu",
  name: "Arthur Pachachura"
}

const ccEmails = [{
  email: "vxp170009@utdallas.edu",
  name: "Vedansh Patel"
}, {
  email: "ces160130@utdallas.edu",
  name: "Cameron Steele"
}]

const replyTo = fromEmail;

const subject = "IEEEUTD IT Committee - Sign up for IEEEUTD/Makerspace Project Beta";

const bodyHtml = `<p>Hello!</p><br>

<p>You are receiving this email because you signed up for IEEEUTD IT committee emails either this or last semester. IEEEUTD and Makerspace are proud to announce <b>IEEEUTD/Makerspace Projects</b>, a new cooperation between the two organizations where students build software and hardware that will be used by students like you.</p><br>

<p>Starting two weeks from today, we will be running a Beta project for 4 weeks: <b>building a digital, interactive events board for the UTD Makerspace</b> (located in SPN 2.220). We are looking for a team of about 6 people in any major and with any interest, including web development, creative design, project management, software development, data science, and more. <b>If you are interested, please take 10 minutes to sign up and add your resume at <a href="https://forms.gle/4zpbcknCNvMh7N5j9">https://forms.gle/4zpbcknCNvMh7N5j9</a>.</b></p><br>

<p>Please email us back if you have any questions about the project - we would be happy to provide additional details. Thank you!</p>`

const summary = "";

async function run() {
  try {

    let bccEmailsUnique = _(bccEmails)
    .map(email => email.toLowerCase().trim())
    .uniq()
    .value();

    await sendEmailMsg({
      to: replyTo,
      from: fromEmail,
      cc: ccEmails,
      bcc: bccEmailsUnique,
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
