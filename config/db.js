
const mongoose = require('mongoose');

// Create the connection to database
const db = mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log(`Connect to mongo`)
}).catch((err) => {
    console.log(err)
});

module.exports = db;