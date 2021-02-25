import nodemailer from 'nodemailer';
import config from 'config';

const fromMailId = config.get('fromMailId');
const fromMailName = config.get('fromMailName');
const mailHost = config.get('mailHost');
const smtpPassword = config.get('smtpPassword');
const smtpUser = config.get('smtpUser');

let sendMail = async (userId, content) => {
  let transporter = nodemailer.createTransport({
    host: mailHost,
    port: 25,
    secure: false,
    tls: { rejectUnauthorized: false },
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });

  let info = await transporter.sendMail({
    from: `"${fromMailName}" <${fromMailId}>`,
    to: userId,
    ...content,
  });

  console.log(`Message sent: ${info.messageId}`);
};

export default sendMail;
