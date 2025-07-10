import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  Heart, MessageSquare, Bookmark, Edit, Trash2, 
  Share2, Facebook, Twitter, Copy, ChevronLeft 
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getPostById, likePost, unlikePost, savePost, unsavePost, deletePost } from '../services/postService';
import { getUser, isAuthenticated } from '../utils/auth';
import CommentForm from '../components/blog/CommentForm';
import CommentList from '../components/blog/CommentList';
import { toast } from 'react-toastify';

const SinglePostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const user = getUser();
  const isAuth = isAuthenticated();
  
  const isAuthor = user && post && user.userId === post.author_id;
  const isAdmin = user && user.role === 'admin';

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const data = await getPostById(postId);
        setPost(data);
        setIsLiked(data.isLiked || false);
        setIsSaved(data.isSaved || false);
        setLikesCount(data.likes_count || 0);
        setCommentsCount(data.comments_count || 0);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to load post details');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleLike = async () => {
    if (!isAuth) {
      toast.error('Please login to like posts');
      return;
    }

    try {
      if (isLiked) {
        await unlikePost(postId);
        setIsLiked(false);
        setLikesCount(prev => prev - 1);
      } else {
        await likePost(postId);
        setIsLiked(true);
        setLikesCount(prev => prev + 1);
      }
    } catch (error) {
      toast.error('Error updating like status');
      console.error('Error:', error);
    }
  };

  const handleSave = async () => {
    if (!isAuth) {
      toast.error('Please login to save posts');
      return;
    }

    try {
      if (isSaved) {
        await unsavePost(postId);
        setIsSaved(false);
        toast.success('Post removed from saved items');
      } else {
        await savePost(postId);
        setIsSaved(true);
        toast.success('Post saved successfully');
      }
    } catch (error) {
      toast.error('Error updating save status');
      console.error('Error:', error);
    }
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => {
        toast.success('Link copied to clipboard');
        setShareMenuOpen(false);
      })
      .catch(() => {
        toast.error('Failed to copy link');
      });
  };

  const handleShareToFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    setShareMenuOpen(false);
  };

  const handleShareToTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post?.title || 'Check out this post');
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    setShareMenuOpen(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    try {
      await deletePost(postId);
      toast.success('Post deleted successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to delete post');
      console.error('Error deleting post:', error);
    }
  };

  const handleCommentAdded = () => {
    // Refresh the post data to update comment count
    setCommentsCount(prev => prev + 1);
  };

  const handleCommentDeleted = () => {
    // Refresh the post data to update comment count
    setCommentsCount(prev => prev - 1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Error Loading Post</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{error || 'Post not found'}</p>
        <Link to="/" className="btn btn-primary">
          <ChevronLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Post Header */}
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 mb-4 hover:underline">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to All Posts
        </Link>

        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map(category => (
              <Link 
                key={category.category_id}
                to={`/category/${category.slug}`}
                className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 text-sm rounded-full hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h1>

        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex items-center">
            {post.author?.profile_image ? (
              <img 
                src={post.author.profile_image} 
                alt={post.author.username}
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mr-3">
                {post.author?.username.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200">
                {post.author?.username || 'Anonymous'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {post.created_at ? format(new Date(post.created_at), 'MMM d, yyyy • h:mm a') : 'Unknown date'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {(isAuthor || isAdmin) && (
              <>
                <Link 
                  to={`/edit-post/${post.post_id}`}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  title="Edit post"
                >
                  <Edit className="w-5 h-5" />
                </Link>
                <button 
                  onClick={handleDelete}
                  className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                  title="Delete post"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </>
            )}
            <div className="relative">
              <button 
                onClick={() => setShareMenuOpen(!shareMenuOpen)}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                title="Share post"
              >
                <Share2 className="w-5 h-5" />
              </button>
              {shareMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                  <button
                    onClick={handleShareToFacebook}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Facebook className="w-4 h-4 mr-3" /> Facebook
                  </button>
                  <button
                    onClick={handleShareToTwitter}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Twitter className="w-4 h-4 mr-3" /> Twitter
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Copy className="w-4 h-4 mr-3" /> Copy Link
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Post Featured Image */}
      {post.thumbnail && (
        <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
          <img 
            src={post.thumbnail} 
            alt={post.title} 
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Post Content */}
      <div className="prose dark:prose-invert prose-lg max-w-none mb-8">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between border-t border-b border-gray-200 dark:border-gray-700 py-4 mb-8">
        <div className="flex items-center space-x-6">
          <button 
            onClick={handleLike}
            className={`flex items-center space-x-2 ${
              isLiked ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500' : ''}`} />
            <span>{likesCount}</span>
          </button>
          <button 
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400"
            onClick={() => document.getElementById('comments-section').scrollIntoView({ behavior: 'smooth' })}
          >
            <MessageSquare className="w-6 h-6" />
            <span>{commentsCount}</span>
          </button>
        </div>
        <button 
          onClick={handleSave}
          className={`flex items-center space-x-2 ${
            isSaved ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          <Bookmark className={`w-6 h-6 ${isSaved ? 'fill-blue-500' : ''}`} />
          <span>{isSaved ? 'Saved' : 'Save'}</span>
        </button>
      </div>

      {/* Comments Section */}
      <div id="comments-section" className="pt-4">
        {isAuth ? (
          <CommentForm postId={post.post_id} onCommentAdded={handleCommentAdded} />
        ) : (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6">
            <p className="text-blue-800 dark:text-blue-300 text-center">
              Please{' '}
              <Link to="/login" className="font-medium underline">
                log in
              </Link>{' '}
              to comment on this post.
            </p>
          </div>
        )}

        <CommentList 
          comments={post.comments || []} 
          postId={post.post_id} 
          onCommentDeleted={handleCommentDeleted} 
        />
      </div>
    </div>
  );
};

export default SinglePostPage;