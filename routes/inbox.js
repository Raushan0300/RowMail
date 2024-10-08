const express = require("express");
const router = express.Router();

const { authenticatedToken } = require("../controllers/authToken");
const { listMessage } = require("../controllers/listMessage");

router.get("/inbox", authenticatedToken, async (req, res) => {
  try {
    const {pageToken} = req.query;
    const emails = await listMessage(pageToken);
    return res.json(emails);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
});

module.exports = router;
