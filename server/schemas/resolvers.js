const { AuthenticationError } = require('apollo-server-express');
const { User, Comment, Donation, Post } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async(parent, args, context) => {
            if(context.user) {
                const user = await User.findById(context.user_id).populate({
                    path: '',
                    populate: ''
                })

                return user
            }
            throw new AuthenticationError('Not logged in')
        },
        posts: async(parent, { _id }) => {
            return await User.findById(_id).populate('Post')
        },
        comments: async (parent, {_id}) => {
            return await User.findById(_id).populate('Comment')
        },
        donations: async (parent, {_id}) => {
            return await User.findById(_id).populate('Donation')
        }
    },

    Mutation: {
        login: async(parent, {username, password}) => {
            const user = await User.findOne({username});

            if(!user) {
                throw new AuthenticationError('No username found.')
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw){
                throw new AuthenticationError('Incorrect credentials')
            }

            const token = signToken(user);

            return {token, user}
        },
        addUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {token, user}
        },
        addPost: async(parent, args, context) => {
            if(context.user) {
                const post = await Post.create(args)

                return await User.findByIdAndUpdate(context.user._id, args, { $push: {post: post}})
            }

            throw new AuthenticationError('Not logged in')
        },
        addComment: async(parent, args, context) => {
            if(context.user){
                const comment = await Comment.create(args)

                return await User.findByIdAndUpdate(context.user._id, args, {$push: {comment: comment}})
            }

            throw new AuthenticationError('Not logged in')
        },
        addDonation: async(parent, args, context) => {
            if(context.user){
                const donation = await Donation.create(args)

                return await User.findByIdAndUpdate(context.user._id, args, { $push: {donation: donation}})
            }

            throw new AuthenticationError
        },
        updatePost: async(parent, {_id, title, content}) => {
            return await Post.findByIdAndUpdate(_id, {title: title}, {content: content}, {new: true})
        },
        updateComment: async(parent, {_id, content}) => {
            return await Comment.findByIdAndUpdate(_id, {content: content}, {new: true})
        }
    }
}

module.exports = resolvers