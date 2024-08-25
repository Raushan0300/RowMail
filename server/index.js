const express = require('express');
// const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json());
// app.use(cookieParser());

const PORT = process.env.PORT;

require('./connection');

app.get('/', (req, res)=>{
    res.send('Hello World');
})

app.use('/', require('./routes/auth'));
app.use('/', require('./routes/inbox'));
app.use('/', require('./routes/email'));
app.use('/', require('./routes/user'));
app.use('/', require('./routes/markRead'));


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})