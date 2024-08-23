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
        emailData,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
});

module.exports = router;
