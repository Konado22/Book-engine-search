const {Book, User} = require('../models')
const {signToken} = require('../utils/auth')
const {AuthenticationError} = require('apollo-server-express')
//querries
const resolvers ={
    Query: {
        userProfile: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select(
                    "-__v -password"
                );
                return userData;
        }
        throw new AuthenticationError("Login required")}
        
    },
    Mutations: {
        createUser: async (parent, args) => {
            const userBody = {email: args.email,
            password: args.password,
            username: args.username}
            const newUser = await User.create(userBody)
            const token = signToken(newUser)
            return {newUser, token}
        },
        login: async (parent, args) => {
            const loggedInUser = await User.findOne({email: args.email})
            if (!loggedInUser) {
            throw new AuthenticationError("please login")
            }
            const isCorrectPassword = await loggedInUser.isCorrectPassword(args.password)

            if (!isCorrectPassword){
                throw new AuthenticationError("incorrect login credentials please try again")
            }
            const token = signToken(loggedInUser)
            return {token, loggedInUser}

        },
        saveBook: async (parent, args, context) =>{
            const updatedUser = await User.findByIdAndUpdate(
                {_id:context.user._id}, 
                {$push: {savedBooks: args.bookData}}
                )
                return updatedUser
        },
        deleteBook: async (parent, args, context) => {
const updatedUser = await User.findByIdAndUpdate({
    _id: context.user._id
}, 
{$pull: {savedBooks: args.bookData}})
return updatedUser
}
    }
}
module.exports = resolvers;