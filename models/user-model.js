const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    aadharNumber: {
        type: String,
        required: true,
    },
    pin: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});


module.exports = mongoose.model('User', userSchema, 'users');