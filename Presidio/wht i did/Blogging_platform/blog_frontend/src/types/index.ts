// User types
export interface User {
  userId: number;
  username: string;
  email: string;
  role: string;
  full_name?: string;
  bio?: string;
  profile_image?: string;
}

export interface UserProfile extends User {
  created_at: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  full_name?: string;
  bio?: string;
}

// Post types
export interface Post {
  post_id: number;
  author_id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  thumbnail?: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
  published_at?: string;
  is_featured: boolean;
  view_count: number;
  author?: User;
  categories?: Category[];
  likes_count?: number;
  comments_count?: number;
  isLiked?: boolean;
  isSaved?: boolean;
}

export interface PostInput {
  title: string;
  content: string;
  category_id?: number;
  slug?: string;
  excerpt?: string;
  thumbnail?: string;
}

// Category types
export interface Category {
  category_id: number;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
}

export interface CategoryInput {
  name: string;
  slug: string;
  description?: string;
}

// Comment types
export interface Comment {
  comment_id: number;
  post_id: number;
  user_id: number;
  content: string;
  created_at: string;
  is_approved: boolean;
  user?: User;
}

export interface CommentInput {
  comment_text: string;
}

// Like type
export interface Like {
  like_id: number;
  post_id: number;
  user_id: number;
  liked_at: string;
}

// Saved post type
export interface SavedPost {
  user_id: number;
  post_id: number;
  saved_at: string;
  post?: Post;
}

// Error type
export interface ApiError {
  status: number;
  message: string;
}