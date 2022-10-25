const { AuthenticationError } = require('apollo-server-express');
const { User, Comment, Donation, Post } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
        user: async(parent, args, context) => {
            if(context.user) {
                const user = await User.findById(context.user_id).populate({
                    path: '',
                    populate: ''
                })
            }
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
        addPost: async() => {

        },
        addComment: async() => {

        },
        addDonation: async() => {

        },
        updatePost: async() => {

        },
        updateComment: async() => {
            
        }
    }
}