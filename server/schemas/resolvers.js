const {Book, User} = require('../models')
const { authMiddleware } = require('../../utils/auth');
//querries
const resolvers ={
    Query: {},
    Mutations: {
        createUser: async () => {
            const newUser = await User.create(args)
            return newUser
        },
        login: async () => {

        },
    getSingleUser: async () =>{
        const getSingleUser = await User.findOne(
            {authMiddleware}
        )
    }}
}
module.exports = resolvers;