const express = require('express');
const { authenticatedToken } = require('../controllers/authToken');
const router = express.Router();

router.get('/user', authenticatedToken, (req, res)=>{
    try {
        userInfo={
            name: req.user.name,
            email: req.user.email,
            profilePic: req.user.profilePic,
        };
        return res.status(200).json(userInfo);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Something went wrong');
    }
})

module.exports = router;