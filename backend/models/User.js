const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true , match: [/.+@.+\..+/, 'Please enter a valid email'] },
    phoneNumber: { type: String, required: true , match: [/^\d{10}$/, 'Please enter a valid phone number'] },
    password: { type: String, required: true, minlength: 6 },
    favorites: [
        {
            idMeal: {
                type: String, 
                required: true,
            },
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
