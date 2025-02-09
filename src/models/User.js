import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercaser: true, // sanitizer, that transforms email to lowercase 
        match: /\@[a-zA-Z]+.[a-zA-Z]+$/,
        minLength: 10,
    },
    password: {
        type: String,
        match: /^\w+$/,
        minLength: [6, 'Password should be at least 6 characters long!'],
        trim: true, // sanitizer that trims white spaces at frond and back of input
    },
});


// Check if password matches rePassword using virtual property, that's not saved in DB
userSchema.virtual('rePassword')
    .set(function(rePassword) {
        if(rePassword !== this.password) {
            throw new Error('Passwords do not match!');
        }
});

userSchema.pre('save', async function () {
    // TODO: update user bug

    this.password = await bcrypt.hash(this.password, 10);
});

const User = model('User', userSchema);

export default User;