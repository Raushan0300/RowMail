const express = require('express');
const { google } = require('googleapis');
const router = express.Router();

const { oAuth2Client } = require('../controllers/googleOAuth2Client');
const { authenticatedToken } = require('../controllers/authToken');

router.post('/markRead', authenticatedToken, async (req, res) => {
    const messageId = req.body.messageId;
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    try {
        await gmail.users.messages.modify({
            userId: 'me',
            id: messageId,
            requestBody: {
                removeLabelIds: ['UNREAD'],
            },
        });
        res.status(200).send(`Message ${messageId} marked as read.`);
    } catch (error) {
        console.error(`Failed to mark message ${messageId} as read:`, error);
        res.status(500).send(`Failed to mark message ${messageId} as read: ${error}`);
    }
});


module.exports = router;