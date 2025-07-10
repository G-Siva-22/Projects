import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ChevronLeft } from 'lucide-react';
import PostCard from '../components/blog/PostCard';
import { toast } from 'react-toastify';
import api from '../utils/api';

const SavedPostsPage = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      setLoading(true);
      try {
        const response = await api.get('/saved-posts/all');
        console.log('Saved posts:', response);
        setSavedPosts(response.savedPosts || []);
      } catch (error) {
        console.error('Error fetching saved posts:', error);
        toast.error('Failed to load saved posts');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPosts();
  }, []);

  const handlePostUpdate = async () => {
    try {
      const response = await api.get('/saved-posts');
      setSavedPosts(response.savedPosts || []);
    } catch (error) {
      console.error('Error refreshing saved posts:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 mb-4 hover:underline">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Home
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Saved Posts</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Access your reading list of saved articles
        </p>
      </div>
      
      {savedPosts.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
          <Bookmark className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No Saved Posts Yet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You haven't saved any posts to your reading list.
          </p>
          <Link to="/" className="btn btn-primary inline-block">
            Browse Articles
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedPosts.map((savedPost) => (
            <PostCard 
              key={savedPost.post_id} 
              post={savedPost.Post || savedPost} 
              onUpdate={handlePostUpdate} 
              isSaved={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPostsPage;