const express = require('express');
const {google} = require('googleapis');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get('/', (req, res)=>{
    res.send('Hello World');
})


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})