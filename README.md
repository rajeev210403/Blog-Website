# DevBlog - Share Your Knowledge

## Overview

DevBlog is a full-stack blogging platform that allows developers to share their knowledge and experiences. Users can sign up, log in, read ,Have a dashboard where they can post their blog, delete their post , and see the articles posted by them. The platform includes authentication, secure password storage, and a clean reponsive UI.

## 🚀 Features

1. Secure User authentication (JWT-based login and signup).
2. HomePage where the users can read all the blogs.
3. Dashboard for each user to post their blog, delete and also see the blogs posted by them.
4. Users can view the blog in detail.
5. Secure password storage using hashing.
6. Responsive UI with Next.js 14 and TypeScript.
7. Backend with Node.js, Express, and MongoDB.

## 🛠️ Tech Stack
**Frontend**:
   - NextJS (React framework for SSR and SSG)
   - TypeScript
   - Tailwind CSS
   - Shadcn/UI

**Backend**:
   - Node.js & Express.js
   - MongoDB & Mongoose
   - JWT (JSON Web Tokens) 
   - bcrypt.js 

## 📜 API Endpoints
**Authentication**:
   - POST /api/auth/signup - Registers a new user with email and password.
   - POST /api/auth/login - Authenticates a user and returns a session token.

**Posts**:
   - GET /api/posts - Fetch all posts
   - GET /api/posts/:id - Fetch a single post
   - GET /api/posts?author=userId - Retrieves posts by a specific author.
   - POST /api/posts - Allows authenticated users to post a new article.
   - DELETE /api/posts/:id - Delete a post (Only the author)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-link>
   cd devblog
2. Install Dependencies:
   ```bash
   npm install  # or yarn install
3. Setup Environment Variables
   Create a .env file in the root directory and add the following:
   ```bash
   MONGODB_URI=your database link
   JWT_SECRET=your_jwt_secret
   PORT=5000
4. Run the Backend Server:
   ```bash
   npm start  # Starts Express backend on port 5000
5. Run Frontend:
   ```bash
   npm run dev  # Starts Next.js frontend on port 3000
