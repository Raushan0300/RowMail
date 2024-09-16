const express = require("express");
const { google } = require("googleapis");
const router = express.Router();

const { oAuth2Client } = require("../controllers/googleOAuth2Client");
const { authenticatedToken } = require("../controllers/authToken");

router.post("/send", authenticatedToken, async (req, res) => {
  const { to, subject, body } = req.body.email;

  if (!to || !subject || !body) {
    return res
      .status(400)
      .send("Missing required fields: to, subject, or body.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(to)) {
    return res.status(400).send("Invalid email address.");
  }

  if (!req.user || !req.user.name || !req.user.email) {
    return res.status(400).send("Invalid user information.");
  }

  const emailContent = [
    `From: "${req.user.name}" <${req.user.email}>`,
    `To: ${to}`,
    `Subject: ${subject}`,
    "",
    body,
  ].join("\n");

  const raw = Buffer.from(emailContent)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  try {
    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw,
      },
    });
    return res.status(200).send(`Message sent to ${to}.`);
  } catch (error) {
    console.error(`Failed to send message to ${to}:`, error);
    return res
      .status(500)
      .send(`Failed to send message to ${to}: ${error.message}`);
  }
});

module.exports = router;
