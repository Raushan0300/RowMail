const express = require("express");
const { google } = require("googleapis");
const multer = require("multer");
const MailComposer = require("nodemailer/lib/mail-composer");
const router = express.Router();

const { oAuth2Client } = require("../controllers/googleOAuth2Client");
const { authenticatedToken } = require("../controllers/authToken");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/send", authenticatedToken, upload.array('attachments'), async (req, res) => {
  const { to, cc, bcc, subject, body } = req.body;

  if (!to || !subject || !body) {
    return res.status(400).send("Missing required fields: to, subject, or body.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(to)) {
    return res.status(400).send("Invalid email address.");
  }

  const mail = new MailComposer({
    to,
    cc,
    bcc,
    subject,
    text: body,
    textEncoding: "base64",
    attachments: req.files.map(file => ({
      filename: file.originalname,
      content: file.buffer.toString("base64"),
      encoding: "base64",
    })),
  });

  mail.compile().build(async(err, rawMessage)=>{
    if(err){
      console.error(`Failed to compile message:`, err);
      return res.status(500).send(`Failed to compile message: ${err.message}`);
    }
    const encodedMessage = Buffer.from(rawMessage)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  try {
    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });
    return res.status(200).send(`Message sent to ${to}.`);
  } catch (error) {
    console.error(`Failed to send message to ${to}:`, error);
    return res.status(500).send(`Failed to send message to ${to}: ${error.message}`);
  }

  })
});

module.exports = router;