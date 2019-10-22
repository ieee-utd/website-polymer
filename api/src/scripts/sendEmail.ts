require('dotenv').config();

process.env.NODE_ENV = "script";

import { sendEmailMsg } from "../helpers/mail";
import * as _ from 'lodash';

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
  "kem170000@utdallas.edu",
  "hcs170630@utdallas.edu",
  "zas180005@utdallas.edu",
  "affankhurram1@gmail.com",
  "atg180001@utdallas.edu",
  "cmf180003@utdallas.edu",
  "Shery.gaziani@gmail.com",
  "msj170000@utdallas.edu",
  "axt170013@utdallas.edu",
  "Gvv180000@utdallas.edu",
  "Ssm180011@utdallas.edu",
  "smm171130@utdallas.edu",
  "Lashialwis@gmail.com",
  "eee190001@utdallas.edu",
  "Qnl190000@utdallas.edu",
  "Wajiha0hashmi@gmail.com",
  "henry.anderson523@gmail.com",
  "gdf140030@utdallas.edu",
  "zas180004@utdallas.edu",
  "pxz180004@utdallas.edu",
  "alazard57@gmail.com",
  "Axj180047@utdallas.edu",
  "cjiang2002@gmail.com",
  "isa180003@utdallas.edu",
  "vincentyi@yandex.com",
  "lkd170030@utdallas.edu",
  "EWW170000@UTDALLAS.edu",
  "rreshmiranjith@gmail.com",
  "jdp180005@utdallas.edu",
  "gwl180001@utdallas.edu",
  "hxt190008@utdallas.edu",
  "Rrr180003@utdallas.edu",
  "ishpreet@utdallas.edu",
  "nrd180001@utdallas.edu",
  "axa180100@utdallas.edu",
  "nxr190005@utdallas.edu",
  "ary180001@utdallas.edu",
  "Hns18003@utdallas.edu",
  "sxs170015@utdallas.edu",
  "SXN180074@utdallas.edu",
  "Htk180000@utdallas.edu",
  "alk160130@utdallas.edu",
  "Raq180002@utdallas.edu",
  "Mts180001@utdallas.edu",
  "cvh180001@utdallas.edu",
  "Jxl180015@utdallas.edu",
  "vumvp13@gmail.com",
  "Gaa150130@utdallas.edu",
  "Tad180002@utdallas.edu",
  "Angela.glass.avg@gmail.com",
  "kxs171530@utdallas.edu",
  "fcdolisy@gmail.com",
  "JET180002@UTDALLAS.edu",
  "dtp180003@utdallas.edu",
  "Max.irby@utdallas.edu",
  "khh180001@utdallas.edu",
  "mhq180002@utdallas.edu",
  "oeo180000@utdallas.edu",
  "CXC190002@utdallas.edu",
  "rtd180003@utdallas.edu",
  "ZAR170000@utdallas.edu",
  "psk180003@utdallas.edu",
  "EXZ190000@utdallas.edu",
  "Rkg180003@utdallas.edu",
  "pxk171430@utdallas.edu",
  "gab180001@utdallas.edu",
  "Prl180000@utdallas.edu",
  "knk190001@utdallas.edu",
  "saaket.poray@utdallas.edu",
  "harshasrikara@gmail.com"
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
