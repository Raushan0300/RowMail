const express = require("express");
const { google } = require("googleapis");
const router = express.Router();
const crypto = require("crypto");

const { authenticatedToken } = require("../controllers/authToken");
const { oAuth2Client } = require("../controllers/googleOAuth2Client");

const getGravatarUrl = (email) => {
    const hash = crypto.createHash("md5").update(email.trim().toLowerCase()).digest("hex");
    return `https://www.gravatar.com/avatar/${hash}`;
};

router.get("/getUserPic", authenticatedToken, async (req, res) => {
    const email  = req.headers["email"];
    try {
            const people = google.people({ version: "v1", auth: oAuth2Client });
            const response = await people.people.get({
                resourceName: `people/${email}`,
                personFields: "photos",
            });
            console.log("Google People API response:", response.data);

            const profilePic = response.data.photos ? response.data.photos[0].url : null;

            if (profilePic) {
                return res.status(200).json({ profilePic });
            }

        }

     catch {
        // console.log("Error fetching message:", error);
        try{
            const gravatarUrl = getGravatarUrl(email);
                return res.status(200).json({ profilePic: gravatarUrl });
        } catch(error){
            console.log("Error fetching Gravatar URL:", error);
        return res.status(500).send("Something went wrong");
        }
    }
});

module.exports = router;