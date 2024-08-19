const express = require('express');
const router = express.Router();

const { authenticatedToken } = require('../controllers/authToken');
const { listMessage } = require('../controllers/listMessage');

router.get('/inbox', authenticatedToken, async(req, res) => {
    try {
        const emails = await listMessage();
        res.json(emails);
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');
    }
});

module.exports = router;