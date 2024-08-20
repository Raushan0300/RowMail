const express = require('express');
const {google} = require('googleapis');
const router = express.Router();

const { authenticatedToken } = require('../controllers/authToken');
const {oAuth2Client} = require('../controllers/googleOAuth2Client');

router.get('/email/:id', authenticatedToken, async(req, res)=>{
    const id = req.params.id;
    try {
        const gmail=google.gmail({version: 'v1', auth: oAuth2Client});
        const email=await gmail.users.messages.get({
            userId: 'me',
            id
        });
        return res.json(email.data);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Something went wrong');
    }
})

module.exports = router;