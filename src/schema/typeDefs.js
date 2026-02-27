export const typeDefs = `#graphql
type Post {
    id: ID!
    title: String!
    body: String!
}

type PostsData {
    data: [Post]
}

# input types
input PaginateInput {
    page: Int
    limit: Int 
}

input PaginateOptions {
    paginate: PaginateInput
}

input CreatePostInput {
    title: String!
    body: String!
}

input UpdatePostInput {
    title: String
    body: String
}


type Query {
    posts(options: PaginateOptions ) : PostsData

    post(id: ID!): Post
}


type Mutation{
    createPost(input: CreatePostInput!): Post

    updatePost(id:ID!, input: UpdatePostInput!): Post

}



`
