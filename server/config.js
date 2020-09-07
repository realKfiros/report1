const mongoose = require('mongoose');

const mongoUrl = process.env.DB_URL;
mongoose.connect(mongoUrl, {useNewUrlParser: true});

module.exports = {
    mongoose
};