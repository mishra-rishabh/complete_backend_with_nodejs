const express = require("express");
const axios = require("axios");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");

async function startServer() {
    const app = express();
    
    const server = new ApolloServer({
        typeDefs: `
            type Todo {
                id: ID!
                title: String!
                completed: Boolean
                user: User
            }

            type User {
                id: ID!
                name: String!
                username: String!
                email: String!
                phone: String!
                website: String!
            }

            type Query {
                getTodos: [Todo]
                getAllUsers: [User]
                getUser(id: ID!): User
            }
        `,

        resolvers: {
            Todo: {
                user: async (todo) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data
            },

            Query: {
                getTodos: async () => (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,

                getAllUsers: async () => (await axios.get("https://jsonplaceholder.typicode.com/users")).data,

                getUser: async (parent, {id}) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data,
            },
        },
    });

    
    await server.start();
    
    app.use(cors());
    app.use(express.json());
    
    app.use("/graphql", expressMiddleware(server));
    
    app.listen(8000, () => {
        console.log("server started at port 8000...");
    });
}

startServer();