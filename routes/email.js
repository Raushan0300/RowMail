const express = require("express");
const { google } = require("googleapis");
const router = express.Router();

const { authenticatedToken } = require("../controllers/authToken");
const { oAuth2Client } = require("../controllers/googleOAuth2Client");
const { emailContent } = require("../controllers/decodeEmail");

router.get("/email/:id", authenticatedToken, async (req, res) => {
  const id = req.params.id;
  try {
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
    const email = await gmail.users.messages.get({
      userId: "me",
      id,
    });
    const emailData = emailContent(email.data);

    let attachments = [];

    // Check if the email has parts (this is where attachments usually reside)
    const parts = email.data.payload.parts;

    if (parts) {
      for (const part of parts) {
        if (part.filename && part.body.attachmentId) {
          // If there's an attachment, retrieve it
          const attachment = await gmail.users.messages.attachments.get({
            userId: "me",
            messageId: id,
            id: part.body.attachmentId,
          });

          // Push attachment details (base64 encoded)
          attachments.push({
            filename: part.filename,
            mimeType: part.mimeType,
            data: attachment.data.data, // base64 encoded
          });
        }
      }
    };
    
    return res
      .status(200)
      .json({
        from: email.data.payload.headers.find(
          (header) => header.name === "From"
        ).value,
        to: email.data.payload.headers.find(
          (header) => header.name === "To"
        ).value,
        subject: email.data.payload.headers.find(
          (header) => header.name === "Subject"
        ).value,
        date: email.data.internalDate,
        labelIds: email.data.labelIds,
        emailData,
        attachments,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
});

module.exports = router;
