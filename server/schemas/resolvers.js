const {Book, User} = require('../models')
const { authMiddleware } = require('../../utils/auth');
//querries
const resolvers ={
    Query: {
        userProfile: async (parent, args) => {
            
        }
    },
    Mutations: {
        createUser: async (parent, args) => {
            const newUser = await User.create(args)
            return newUser
        },
        login: async (parent, args) => {
            const login = await User.findOne({email: args.email})

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