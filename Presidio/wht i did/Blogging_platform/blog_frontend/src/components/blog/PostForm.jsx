import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../../services/categoryService';
import { toast } from 'react-toastify';

const PostForm = ({ initialData, onSubmit, isSubmitting }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      title: '',
      content: '',
      slug: '',
      excerpt: '',
      thumbnail: '',
    },
  });

  const title = watch('title');

  useEffect(() => {
    if (title && !initialData?.slug) {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      setValue('slug', slug);
    }
  }, [title, setValue, initialData]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data || []);

        if (initialData?.category_id) {
          setSelectedCategory(initialData.category_id);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories');
      }
    };

    fetchCategories();
  }, [initialData]);

  const handleFormSubmit = (data) => {
    const postData = {
      ...data,
      category_id: selectedCategory,
    };

    onSubmit(postData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Title*
        </label>
        <input
          id="title"
          type="text"
          {...register('title', {
            required: 'Title is required',
            minLength: { value: 5, message: 'Title must be at least 5 characters' },
          })}
          className="form-control"
          placeholder="Enter post title"
        />
        {errors.title && <p className="input-error">{errors.title.message}</p>}
      </div>

      {/* Slug */}
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Slug*
        </label>
        <input
          id="slug"
          type="text"
          {...register('slug', { required: 'Slug is required' })}
          className="form-control"
          placeholder="post-url-slug"
        />
        {errors.slug && <p className="input-error">{errors.slug.message}</p>}
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Category
        </label>
        <select
          id="category"
          value={selectedCategory || ''}
          onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
          className="form-control"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Content*
        </label>
        <textarea
          id="content"
          rows="10"
          {...register('content', {
            required: 'Content is required',
            minLength: { value: 10, message: 'Content must be at least 10 characters' },
          })}
          className="form-control"
          placeholder="Write your post content here..."
        ></textarea>
        {errors.content && <p className="input-error">{errors.content.message}</p>}
      </div>

      {/* Excerpt */}
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          rows="3"
          {...register('excerpt')}
          className="form-control"
          placeholder="A short description of your post"
        ></textarea>
      </div>

      {/* Thumbnail */}
      <div>
        <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Thumbnail URL
        </label>
        <input
          id="thumbnail"
          type="url"
          {...register('thumbnail')}
          className="form-control"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn bg-gray-500 hover:bg-gray-600 text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
