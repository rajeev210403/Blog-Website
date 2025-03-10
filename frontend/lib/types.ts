export interface User {
  _id: string;
  email: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  userId: string;
}