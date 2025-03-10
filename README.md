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
   cd simple-quiz-app
2. Install Dependencies:
   ```bash
   npm install
3. Run Application:
   ```bash
   npm run dev

## Assumptions
1. The user has an active internet connection to fetch the questions from the API.
2. Each question has a single correct answer.
3. The user’s email is required before starting the quiz.

## Challenges and Learnings

1. **Timer Syncronization**: Initially, keeping the timer synchronized with the user's quiz session was challenging. To address this, I ensured the timer logic is isolated and triggered every second while the quiz is active.
2. **Quiz Questions**:Managing the state for user answers, question navigation, and timer updates required careful consideration. I used React’s useState and useEffect hooks to handle all the state updates and side effects.
3. **Timer**:Ensuring smooth animations and responsiveness, I used Tailwind.
4. **Navigation**:
   - Users can navigate to specific questions via a navigation panel.
   - Question statuses are visually indicated for ease of use.
5. **End of Quiz Report**:
   - Displays each question, the user's answer, the correct answer, and incorrect options for comparison.
   - Includes detailed stats such as accuracy, correct answers, attempt rate, and questions attempted.
  
## Technologies Used:

- React Vite
- TypeScript
- Axios
- TailWind CSS

## How to Use:

- Enter your email address to start the quiz.
- Answer the questions or skip and revisit them using the navigation panel.
- Keep track of the timer at the top of the page.
- Submit the quiz or let it auto-submit when the timer ends.
- View the detailed quiz report and analyze your performance.

## Deployment:

- The application is hosted on Vercel
- **Live link**: https://quiz-app-brown-nine.vercel.app/
  

  
