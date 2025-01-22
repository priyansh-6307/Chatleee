const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        Email: {
            type: String,
            required: true,
            unique: true, 
        },
        Username: {
            type: String,
            required: true,
            unique: true, 
        },
        Password: {
            type: String,
            required: true,
        },
        contacts: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
                username: String,
            },
        ],
        lastLoggedIn: { 
            type: Date,
        },
        isActive:{
            type:Boolean,
            default:false
        }
    },
    {
        timestamps: true, 
    }
);

module.exports = mongoose.model("user", userSchema);
