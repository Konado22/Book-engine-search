const {Book, User} = require('../models')
const { authMiddleware } = require('../../utils/auth');
//querries
const resolvers ={
    Query: {
        userProfile: async () => {
            
        }
    },
    Mutations: {
        createUser: async () => {
            const newUser = await User.create(args)
            return newUser
        },
        login: async () => {

        },
        saveBook: async () =>{

        },
        deleteBook: async () => {

        }
    }
}
module.exports = resolvers;