const express = require("express");
const { google } = require("googleapis");
const multer = require("multer");
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

  // Boundary for separating parts of the message
  const boundaryMixed = "foo_bar_baz";  // For attachments + body
  const boundaryAlternative = "alt_body_boundary";  // For text parts

  // Construct the message headers
  let messageParts = [
    `From: "${req.user.name}" <${req.user.email}>`,
    `To: ${to}`,
    cc ? `Cc: ${cc}` : null,
    bcc ? `Bcc: ${bcc}` : null,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${boundaryMixed}"`,
    "",  // Blank line to separate headers from body
    `--${boundaryMixed}`
  ].filter(Boolean);  // Remove any null values for Cc/Bcc if not provided

  // Add the body of the email (plain text in this case)
  messageParts.push(
    `Content-Type: multipart/alternative; boundary="${boundaryAlternative}"`,
    "",  // Blank line
    `--${boundaryAlternative}`,
    "Content-Type: text/plain; charset=\"UTF-8\"",
    "Content-Transfer-Encoding: 7bit",
    "",
    body,  // Email body content
    "",  // Blank line before next boundary
    `--${boundaryAlternative}--`,  // Close the alternative section
    `--${boundaryMixed}`  // Start attachment section
  );

  // Handle attachments if any
  if (req.files && req.files.length > 0) {
    req.files.forEach(file => {
      messageParts.push(
        `Content-Type: ${file.mimetype}; name="${file.originalname}"`,
        `Content-Disposition: attachment; filename="${file.originalname}"`,
        "Content-Transfer-Encoding: base64",
        "",
        file.buffer.toString("base64"),  // Base64-encoded attachment
        `--${boundaryMixed}`  // Next part
      );
    });
  }

  // Close the mixed boundary
  messageParts.push(`--${boundaryMixed}--`);

  // Join the message parts and encode the message
  const rawMessage = messageParts.join("\n");
  const encodedMessage = Buffer.from(rawMessage)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");  // Gmail-specific base64 encoding

  // Send the email via Gmail API
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
});

module.exports = router;