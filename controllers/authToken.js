const jwt = require("jsonwebtoken");

const User = require("../models/Users");
const { oAuth2Client } = require("./googleOAuth2Client");

const authenticatedToken = async (req, res, next) => {
  const authTokenHeader = req.headers["authorization"];
  const token = authTokenHeader && authTokenHeader.split(" ")[1];

  if (!token) return res.status(401).send("Access Denied");

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(403).send("Invalid Token");
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(403).send("Unauthorized");
    oAuth2Client.setCredentials({
      access_token: user.accessToken,
      refresh_token: user.refreshToken,
    });
    req.user = user;
    next();
  });
};

module.exports = { authenticatedToken };
