import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addComment } from '../../services/commentService';
import { toast } from 'react-toastify';

const CommentForm = ({ postId, onCommentAdded }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await addComment(postId, { comment_text: data.comment });
      toast.success('Comment added successfully');
      reset();
      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (error) {
      toast.error(error.message || 'Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Leave a Comment</h3>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <textarea
            {...register('comment', { 
              required: 'Comment is required',
              minLength: { value: 3, message: 'Comment must be at least 3 characters' }
            })}
            rows="4"
            placeholder="Share your thoughts..."
            className={`form-control ${errors.comment ? 'border-red-500' : ''}`}
          ></textarea>
          {errors.comment && (
            <p className="input-error">{errors.comment.message}</p>
          )}
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`btn btn-primary ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Submitting...' : 'Post Comment'}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;