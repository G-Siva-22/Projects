import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Heart, Bookmark, MessageSquare, Eye } from 'lucide-react';
import { isAuthenticated } from '../../utils/auth';
import { likePost, unlikePost, savePost, unsavePost } from '../../services/postService';
import { toast } from 'react-toastify';

const PostCard = ({ post, onUpdate }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [isSaved, setIsSaved] = useState(post.isSaved || false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [isProcessing, setIsProcessing] = useState(false);
  const authenticated = isAuthenticated();
  const navigate = useNavigate();

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!authenticated) {
      navigate('/login');
      return;
    }

    if (isProcessing) return;

    setIsProcessing(true);
    try {
      if (isLiked) {
        await unlikePost(post.post_id);
        setIsLiked(false);
        setLikesCount(prev => prev - 1);
      } else {
        await likePost(post.post_id);
        setIsLiked(true);
        setLikesCount(prev => prev + 1);
      }
      
      if (onUpdate) onUpdate();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!authenticated) {
      navigate('/login');
      return;
    }

    if (isProcessing) return;

    setIsProcessing(true);
    try {
      if (isSaved) {
        await unsavePost(post.post_id);
        setIsSaved(false);
        toast.success('Post removed from saved items');
      } else {
        await savePost(post.post_id);
        setIsSaved(true);
        toast.success('Post saved successfully');
      }
      
      if (onUpdate) onUpdate();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const getExcerpt = (content, maxLength = 150) => {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      {post.thumbnail && (
        <div className="h-48 overflow-hidden">
          <img 
            src={post.thumbnail} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <div className="p-5">
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.map(category => (
              <Link 
                key={category.category_id}
                to={`/category/${category.slug}`}
                className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 text-xs rounded-full hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}
        
        <Link to={`/posts/${post.post_id}`}>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {getExcerpt(post.excerpt || post.content)}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <button 
              onClick={handleLike}
              disabled={isProcessing}
              className={`flex items-center mr-4 transition-colors ${
                isLiked ? 'text-red-500' : 'hover:text-red-500'
              } ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likesCount}</span>
            </button>
            <div className="flex items-center mr-4">
              <MessageSquare className="w-4 h-4 mr-1" />
              <span>{post.comments_count || 0}</span>
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              <span>{post.view_count || 0}</span>
            </div>
          </div>
          
          <button 
            onClick={handleSave}
            disabled={isProcessing}
            className={`transition-colors ${
              isSaved 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            {post.author?.profile_image ? (
              <img 
                src={post.author.profile_image} 
                alt={post.author.username}
                className="w-6 h-6 rounded-full mr-2 object-cover"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2">
                {post.author?.username.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
            <span className="text-gray-700 dark:text-gray-300">
              {post.author?.username || 'Anonymous'}
            </span>
          </div>
          
          <span className="text-gray-500 dark:text-gray-400">
            {post.created_at ? format(new Date(post.created_at), 'MMM d, yyyy') : 'Unknown date'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;