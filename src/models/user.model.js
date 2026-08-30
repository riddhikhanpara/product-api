const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 8);
});

userSchema.methods.checkPassword = async function (plain) {
    return bcrypt.compare(plain, this.password);
};

userSchema.set('toJSON', {
    transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        return ret;
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
