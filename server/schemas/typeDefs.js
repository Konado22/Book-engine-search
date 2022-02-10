const { gql } = require('apollo-server-express');
const typeDefs = gql`
type Book{
authors: [String]
description: String!
bookId: String!
image: String!
link: String!
title: String!}

type User {
username: String!
email: String!
password: String!
savedBooks: [Book]}

type withAuth {
token: ID!
user:User
}

type Query {
userProfile: User
}

type Mutations {
createUser(username: String!, email: String!, password: String!): withAuth
login(username: String!, password: String!): withAuth
saveBook(bookData:Book):{User}
deleteBook(bookId: Book):{User}
}`
module.exports = typeDefs;