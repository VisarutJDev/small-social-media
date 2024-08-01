import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8080'; // Update with your Golang API URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function setAuthorizationAPI(token: string) {
  api.interceptors.request.use((config) => {
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });
}

api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

interface AuthResponse {
  token: string;
}

export interface Post {
  id?: string;
  title: string;
  content: string;
  author?: string;
}

interface PostResponse {
  data: Post[];
}

export const register = (username: string, password: string) => 
  api.post<AuthResponse>('/register', { username, password });

export const login = (username: string, password: string) => 
  api.post<AuthResponse>('/login', { username, password });

export const createPost = (title: string, content: string, author: string) => 
  api.post<Post>('/posts', { title, content, author });

export const getPosts = () => 
  api.get<PostResponse>('/posts');

export const updatePost = (id: string, title: string, content: string, author: string) => 
  api.put<Post>(`/posts/${id}`, { title, content, author });

export const deletePost = (id: string) => 
  api.delete<Post>(`/posts/${id}`);
