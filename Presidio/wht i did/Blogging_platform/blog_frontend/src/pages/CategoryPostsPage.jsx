import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import PostCard from '../components/blog/PostCard';
import { getPostsByCategory } from '../services/postService';
import { toast } from 'react-toastify';

const CategoryPostsPage = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      setLoading(true);
      try {
        const data = await getPostsByCategory(slug);
        setPosts(data || []);
        
        // Assuming the first post has the category info
        if (data && data.length > 0 && data[0].categories) {
          const categoryInfo = data[0].categories.find(cat => cat.slug === slug);
          setCategory(categoryInfo);
        }
      } catch (error) {
        console.error('Error fetching category posts:', error);
        toast.error('Failed to load posts for this category');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryPosts();
  }, [slug]);

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
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {category ? category.name : slug} Posts
        </h1>
        {category && category.description && (
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {category.description}
          </p>
        )}
        <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-md inline-block">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this category
        </div>
      </div>
      
      {posts.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No Posts Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            There are no posts in this category yet.
          </p>
          <Link to="/" className="btn btn-primary inline-block">
            Browse All Posts
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.post_id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPostsPage;