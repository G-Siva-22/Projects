import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/blog/PostForm';
import { createPost } from '../services/postService';
import { toast } from 'react-toastify';

const CreatePostPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (postData) => {
    setIsSubmitting(true);
    try {
      const response = await createPost(postData);
      toast.success('Post created successfully!');
      navigate(`/posts/${response.post.post_id}`);
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error(error.message || 'Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create a New Post</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Share your knowledge, ideas, and stories with the community
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <PostForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
};

export default CreatePostPage;