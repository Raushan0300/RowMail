const mongoose = require('mongoose');

const Mongo_URI = process.env.MONGO_URI;

mongoose.connect(Mongo_URI).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log(err);
});

module.exports = mongoose;