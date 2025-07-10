import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, TrendingUp, Users, FileText, 
  Eye, MessageSquare, Star, ChevronRight 
} from 'lucide-react';
import { getAllPosts } from '../../services/postService';
import { getAllUsers } from '../../services/authService';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalUsers: 0,
    totalViews: 0,
    totalComments: 0,
    featuredPosts: 0,
    recentPosts: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [posts, users] = await Promise.all([
          getAllPosts(),
          getAllUsers()
        ]);

        const totalViews = posts.reduce((sum, post) => sum + (post.view_count || 0), 0);
        const totalComments = posts.reduce((sum, post) => sum + (post.comments_count || 0), 0);
        const featuredPosts = posts.filter(post => post.is_featured).length;
        
        // Sort posts by created_at (newest first) and take 5
        const recentPosts = [...posts]
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5);

        setStats({
          totalPosts: posts.length,
          totalUsers: users.length,
          totalViews,
          totalComments,
          featuredPosts,
          recentPosts
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Overview of your blog statistics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 mr-4">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Posts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalPosts}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 mr-4">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 mr-4">
              <Eye className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Views</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalViews}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 mr-4">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Comments</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalComments}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Posts</h2>
          <Link 
            to="/admin/posts" 
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
          >
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {stats.recentPosts.length === 0 ? (
            <div className="px-6 py-4 text-gray-600 dark:text-gray-400 text-center">
              No posts available
            </div>
          ) : (
            stats.recentPosts.map((post) => (
              <div key={post.post_id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex-1">
                  <Link 
                    to={`/posts/${post.post_id}`} 
                    className="text-gray-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {post.title}
                  </Link>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <span className="flex items-center mr-4">
                      <Eye className="w-4 h-4 mr-1" /> {post.view_count || 0}
                    </span>
                    <span className="flex items-center mr-4">
                      <MessageSquare className="w-4 h-4 mr-1" /> {post.comments_count || 0}
                    </span>
                    {post.is_featured && (
                      <span className="flex items-center text-yellow-500">
                        <Star className="w-4 h-4 mr-1" /> Featured
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <Link 
                    to={`/edit-post/${post.post_id}`} 
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Analytics Section (Placeholder) */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Traffic Overview</h2>
        </div>
        <div className="p-6">
          <div className="flex justify-center items-center h-64 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Analytics data will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;