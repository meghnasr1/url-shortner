const mongoose = require('mongoose');

async function connectToMongoose(url) {
    try {
        await mongoose.connect(url);
        console.log('Connected to mongo db');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
    }
}

module.exports = {
    connectToMongoose,
};