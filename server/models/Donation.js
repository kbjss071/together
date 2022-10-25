const {Schema, model} = require('mongoose')

const donationSchema = new Schema (
    {
        amount: {
            type: Number,
            required: true
        }
    }
)

const Donation = model('Donation', donationSchema)

module.exports = Donation