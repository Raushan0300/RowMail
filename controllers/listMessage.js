const { google } = require("googleapis");

const { oAuth2Client } = require("./googleOAuth2Client");

const listMessage = async (pageToken=null) => {
  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
  const res = await gmail.users.messages.list({
    userId: "me",
    labelIds: ["INBOX"],
    maxResults: 100,
    pageToken: pageToken,
  });
  const messages = res.data.messages || [];
  const nextPageToken = res.data.nextPageToken || null;
  const emailDetails = await Promise.all(
    messages.map(async (messages) => {
      const msg = await gmail.users.messages.get({
        userId: "me",
        id: messages.id,
      });
      return msg.data;
    })
  );

  const emailData = emailDetails.map((email) => {
    const emailData = {};
    emailData.id = email.id;
    emailData.snippet = email.snippet;
    emailData.date = email.internalDate;
    emailData.from = email.payload.headers
      .find((header) => header.name === "From")
      ?.value.match(/^(.*)\s*<(.*)>$/)?.[1];
    emailData.email = email.payload.headers
      .find((header) => header.name === "From")
      ?.value.match(/^(.*)\s*<(.*)>$/)?.[2];
    emailData.labelIds = email.labelIds;
    emailData.payload = email.payload;
    return emailData;
  });
  // emailData.nextPageToken = nextPageToken;

  return {emails: emailData, nextPageToken};
};

module.exports = { listMessage };
