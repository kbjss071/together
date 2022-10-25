const {Schema, model} = require('mongoose')

const postSchema = new Schema (
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true,
        },
        comment: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
        donation: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Donation'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)

const Post = model('Post', postSchema)

module.exports = Post