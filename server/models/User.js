const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 5
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        post: [Post.Schema],
        donation: [Donation.Schema],
        comment: [Commment.Schema]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

//hash user password
userSchema.pre('save', async function (next) {
    if(this.isNew || this.isModified('password')){
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
})

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password){
    return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called count with the number of posts, comments, and donations
userSchema.virtual('postCount').get(function(){
    return this.post.length;
});
