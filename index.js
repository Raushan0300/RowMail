const express = require("express");
// const cookieParser = require('cookie-parser');
const cors = require("cors");
const dotenv = require("dotenv");
const next = require("next");

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev, dir: "./client" });
const handle = nextApp.getRequestHandler();

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
// app.use(cookieParser());

const PORT = process.env.PORT;

require("./connection");

nextApp.prepare().then(() => {
  app.use("/_next", express.static("client/.next/static"));

  // Handle all other routes with Next.js
  app.get("*", (req, res) => {
    return handle(req, res);
  });
});

// app.get('/', (req, res)=>{
//     res.send('Hello World');
// })

app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/inbox"));
app.use("/api", require("./routes/email"));
app.use("/api", require("./routes/user"));
app.use("/api", require("./routes/markRead"));
app.use("/api", require("./routes/getUserPic"));
app.use("/api", require("./routes/send"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
