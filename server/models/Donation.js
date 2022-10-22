const {Schema, model} = require('mongoose')

const donationSchema = new Schema (
    {
        user: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        post: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],
        amount: {
            type: Number,
            required: true
        }
    }
)

const Donation = model('Donation', donationSchema)

module.exports = Donation