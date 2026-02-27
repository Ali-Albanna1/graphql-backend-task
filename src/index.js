import { ApolloServer } from "@apollo/server";

import { startStandaloneServer } from "@apollo/server/standalone";


import{typeDefs} from './schema/typeDefs.js'
import {resolvers} from './resolvers/postResolvers.js'


// server setup 
const server = new ApolloServer({

    // typeDefs  description of the relationship and data types (schema) 
    typeDefs,
     
    // resolvers functions determine how to respond to query's returning data (handle queries)
    resolvers
})


// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const {url} = await startStandaloneServer(server, {
    listen: { port: 4000},

})

console.log(`🚀  Server ready at: ${url}`)