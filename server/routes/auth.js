const express = require('express');
const { google } = require('googleapis');
const jwt = require('jsonwebtoken');
const router = express.Router();

// const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URIS);
const {oAuth2Client} = require('../controllers/googleOAuth2Client');
const User = require('../models/Users');

router.get('/auth', (req, res)=>{
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/gmail.readonly',
            'https://www.googleapis.com/auth/gmail.send',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
          ],
    });
    res.redirect(authUrl);
});

router.get('/auth/callback', async(req, res)=>{
    const code = req.query.code;

    try {
        const {tokens}=await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);

        const oauth2 = google.oauth2({auth: oAuth2Client, version: 'v2'});
        const {data}= await oauth2.userinfo.get();

        const user = await User.findOneAndUpdate(
            {googleId: data.id},
            {
                googleId: data.id,
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
            },
            {upsert: true, new: true}
        );

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.cookie('token', token, {
            httpOnly: true,
            secure:process.env.NODE_ENV === 'production',
            sameSite: 'none',
            path: '/',
            domain: '.raushan.xyz',
        });
        res.redirect(`${process.env.CLIENT_URL}`);
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');
    }
});

module.exports = router;