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
        addPost: async(parent, {title, content}, context) => {
            if(context.user) {
                const post = await Post.create({title, content})

                return await User.findByIdAndUpdate(context.user._id, args, { $push: {post: post}})
            }

            throw new AuthenticationError('Not logged in')
        },
        addComment: async(parent, {postId, content}, context) => {
            if(context.user){
                const comment = await Comment.create({content: content})

                await Post.findByIdAndUpdate(postId, {$push: {comment: comment}})

                return await User.findByIdAndUpdate(context.user._id, {$push: {comment: comment}})
            }

            throw new AuthenticationError('Not logged in')
        },
        addDonation: async(parent, {postId, amount}, context) => {
            if(context.user){
                const donation = await Donation.create({amount: amount})

                await Post.findByIdAndUpdate(postId, {$push: {donation: donation}})

                return await User.findByIdAndUpdate(context.user._id, { $push: {donation: donation}})
            }

            throw new AuthenticationError('Not logged in')
        },
        updatePost: async(parent, {_id, title, content}, context) => {
            if(context.user){
                
                return await Post.findByIdAndUpdate(_id, {title: title}, {content: content}, {new: true})
            }

            throw new AuthenticationError('Not logged in')
        },
        updateComment: async(parent, {_id, content}, context) => {
            if(context.user){

                return await Comment.findByIdAndUpdate(_id, {content: content}, {new: true})
            }

            throw new AuthenticationError('Not logged in')
        }
    }
}

module.exports = resolvers