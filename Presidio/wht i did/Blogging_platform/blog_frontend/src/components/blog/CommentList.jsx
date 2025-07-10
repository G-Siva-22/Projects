import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';
import { deleteComment } from '../../services/commentService';
import { getUser } from '../../utils/auth';
import { toast } from 'react-toastify';

const CommentList = ({ comments, postId, onCommentDeleted }) => {
  const currentUser = getUser();

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    try {
      await deleteComment(commentId);
      toast.success('Comment deleted successfully');
      if (onCommentDeleted) {
        onCommentDeleted();
      }
    } catch (error) {
      toast.error('Failed to delete comment');
      console.error('Error deleting comment:', error);
    }
  };

  if (!comments || comments.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <p className="text-gray-600 dark:text-gray-400 text-center">No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Comments ({comments.length})
      </h3>
      
      <div className="space-y-6">
        {comments.map((comment) => (
          <div 
            key={comment.comment_id} 
            className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-3">
                {comment.user?.profile_image ? (
                  <img 
                    src={comment.user.profile_image} 
                    alt={comment.user.username} 
                    className="w-8 h-8 rounded-full mt-1 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white mt-1">
                    {comment.user?.username.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">
                      {comment.user?.username || 'Anonymous'}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {format(new Date(comment.created_at), 'MMM d, yyyy • h:mm a')}
                    </span>
                  </div>
                  
                  <p className="mt-1 text-gray-700 dark:text-gray-300">
                    {comment.content}
                  </p>
                </div>
              </div>
              
              {(currentUser?.userId === comment.user_id || currentUser?.role === 'admin') && (
                <button 
                  onClick={() => handleDeleteComment(comment.comment_id)}
                  className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                  title="Delete comment"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;