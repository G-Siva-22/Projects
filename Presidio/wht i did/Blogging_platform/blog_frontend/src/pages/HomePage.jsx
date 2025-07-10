import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, TrendingUp, Clock, Star } from 'lucide-react';
import PostCard from '../components/blog/PostCard';
import { getAllPosts } from '../services/postService';
import { getAllCategories } from '../services/categoryService';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('latest');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [postsData, categoriesData] = await Promise.all([
          getAllPosts(),
          getAllCategories()
        ]);
        setPosts(postsData || []);
        setCategories(categoriesData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getFilteredPosts = () => {
    if (!posts || posts.length === 0) return [];

    switch (filter) {
      case 'trending':
        return [...posts].sort((a, b) => (b.view_count || 0) - (a.view_count || 0));
      case 'featured':
        return posts.filter(post => post.is_featured);
      case 'latest':
      default:
        return [...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
  };

  const filteredPosts = getFilteredPosts();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="px-4">
      {/* Hero Section */}
      <section className="bg-blue-100 text-gray-800 rounded-lg shadow-md mb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Your Blogging Platform
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-700">
              Create, share, and explore stories from writers around the world.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/create-post" className="btn bg-blue-600 text-white hover:bg-blue-700">
                Start Writing
              </Link>
              {/* <Link to="/register" className="btn border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                Join Community
              </Link> */}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Browse by Category</h2>
          <Link to="/categories" className="text-blue-600 dark:text-blue-400 flex items-center text-sm hover:underline">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.category_id}
              to={`/category/${category.slug}`}
              className="card p-4 hover:shadow-md text-center transition-all hover:-translate-y-1 bg-white dark:bg-gray-800"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                {category.description || 'Explore articles'}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Posts Section */}
      <section className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Discover Articles</h2>

          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('latest')}
              className={`px-3 py-1 rounded-full text-sm flex items-center ${
                filter === 'latest'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              <Clock className="w-3 h-3 mr-1" /> Latest
            </button>
            <button
              onClick={() => setFilter('trending')}
              className={`px-3 py-1 rounded-full text-sm flex items-center ${
                filter === 'trending'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              <TrendingUp className="w-3 h-3 mr-1" /> Trending
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-3 py-1 rounded-full text-sm flex items-center ${
                filter === 'featured'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              <Star className="w-3 h-3 mr-1" /> Featured
            </button>
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 dark:text-gray-400">No posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.post_id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
