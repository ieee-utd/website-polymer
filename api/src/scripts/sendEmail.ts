require('dotenv').config();

process.env.NODE_ENV = "script";

import { sendEmailMsg } from "../helpers/mail";
import * as _ from 'lodash';

import * as emailConfig from "./sendEmailConfig"; 

async function run() {
  try {
    let bccEmailsUnique = _(emailConfig.bccEmails)
    .map(email => {
      return email.toLowerCase().trim()
    })
    .uniq()
    .value();

    await sendEmailMsg({
      to: emailConfig.replyTo,
      from: emailConfig.fromEmail,
      cc: emailConfig.ccEmails,
      bcc: bccEmailsUnique,
      replyTo: emailConfig.replyTo,
      subject: emailConfig.subject,
      templateId: 'd-f696f336b80340d797d355dc94bbed33',
      dynamic_template_data: {
        origin: process.env.MAIL_HOSTNAME,
        body: emailConfig.bodyHtml,
        subject: emailConfig.subject,
        summary: emailConfig.summary
      },
    })

    console.log("Email sent!")
  } catch (e) {
    console.error(e);
    console.error(e.response.body.errors)
  }
}

run();
