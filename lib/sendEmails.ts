"use server";

import nodemailer from "nodemailer";
const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;
const SITE_MAIL_RECIEVER = process.env.SITE_MAIL_RECIEVER;

interface EmailOptions {
  sendTo?: string;
  subject: string;
  text: string;
  html?: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: SMTP_SERVER_HOST,
  port: 587,
  secure: true,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
});

export async function sendMail({ sendTo, subject, text, html }: EmailOptions) {
  try {
    await transporter.verify();
  } catch (error) {
    console.error("Something Went Wrong", error);
    return;
  }

  const info = await transporter.sendMail({
    from: SMTP_SERVER_USERNAME,
    to: sendTo,
    subject,
    text,
    html,
  });
  console.log("Message Sent", info.messageId);
  console.log("Mail sent to", sendTo);
  return info;
}
