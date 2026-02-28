# GraphQL Posts API

A Node.js GraphQL API with CRUD operations for posts, built with Apollo Server and PostgreSQL.

---

## Tech Stack

- **Node.js**
- **GraphQL** — Apollo Server
- **PostgreSQL** — raw `pg` client, no ORM

---

## Project Structure

```
graphql-task/
├── src/
│   ├── db/
│   │   └── pool.js
│   ├── schema/
│   │   └── typeDefs.js
│   ├── resolvers/
│   │   └── postResolvers.js
│   └── index.js
├── .env
├── .gitignore
└── package.json
```

---

## Getting Started

### 1. Install Dependencies

```bash
npm i
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URI=postgresql://[user[:password]@][netloc][:port]/[dbname]
```

**Example:**
```env
DATABASE_URI=postgresql://postgres:yourpassword@localhost:5432/posts_db
```

> ⚠️ Never commit your `.env` file to GitHub.

### 3. Set Up the Database

Open **pgAdmin** and create a new database, then run the following SQL:

#### Create Table

```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL
);
```

#### Seed Dummy Data

```sql
INSERT INTO posts (title, body) VALUES
  ('First Post', 'This is the body of the first post'),
  ('Second Post', 'This is the body of the second post'),
  ('Third Post', 'This is the body of the third post'),
  ('Fourth Post', 'This is the body of the fourth post'),
  ('Fifth Post', 'This is the body of the fifth post'),
  ('Sixth Post', 'This is the body of the sixth post'),
  ('Seventh Post', 'This is the body of the seventh post'),
  ('Eighth Post', 'This is the body of the eighth post'),
  ('Ninth Post', 'This is the body of the ninth post'),
  ('Tenth Post', 'This is the body of the tenth post'),
  ('Eleventh Post', 'This is the body of the eleventh post'),
  ('Twelfth Post', 'This is the body of the twelfth post');
```

### 4. Run the Server

```bash
npm run dev
```

Server will start at:

```
http://localhost:4000/
```

Apollo Sandbox will open automatically in your browser for testing.

---

## API Operations

### 1. Fetch All Posts (Paginated)

```graphql
query fetchPosts($page: Int!, $limit: Int!) {
  posts(options: { paginate: { page: $page, limit: $limit } }) {
    data {
      id
      title
      body
    }
  }
}
```

**Variables:**
```json
{
  "page": 1,
  "limit": 10
}
```

---

### 2. Fetch Single Post

```graphql
query fetchPost($id: ID!) {
  post(id: $id) {
    id
    title
    body
  }
}
```

**Variables:**
```json
{
  "id": "1"
}
```

---

### 3. Create a Post

```graphql
mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    title
    body
  }
}
```

**Variables:**
```json
{
  "input": {
    "title": "New Post",
    "body": "New post body"
  }
}
```

---

### 4. Update a Post

```graphql
mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
  updatePost(id: $id, input: $input) {
    id
    title
    body
  }
}
```

**Variables:**
```json
{
  "id": "1",
  "input": {
    "title": "Updated Title",
    "body": "Updated Body"
  }
}
```

---

## Pagination

This API uses **offset-based pagination**. Pass `page` and `limit` to control results:

| Variable | Description | Example |
|---|---|---|
| `page` | Page number | `1` |
| `limit` | Results per page | `10` |

Page 1 returns rows 1–10, page 2 returns rows 11–20, and so on.