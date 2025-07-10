import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getUserProfile, updateUserProfile } from '../services/authService';
import { User, Mail, Key, Save } from 'lucide-react';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const user = await getUserProfile();
        setValue('username', user.username);
        setValue('email', user.email);
        setValue('full_name', user.full_name || '');
        setValue('bio', user.bio || '');
        setValue('profile_image', user.profile_image || '');
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [setValue]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      await updateUserProfile(data);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Profile</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account information and settings
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    {...register('username', { required: 'Username is required' })}
                    className="form-control pl-10"
                    readOnly
                  />
                </div>
                {errors.username && <p className="input-error">{errors.username.message}</p>}
                }
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="form-control pl-10"
                    readOnly
                  />
                </div>
                {errors.email && <p className="input-error">{errors.email.message}</p>}
                }
              </div>
              
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  id="full_name"
                  type="text"
                  {...register('full_name')}
                  className="form-control"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="profile_image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Profile Image URL
                </label>
                <input
                  id="profile_image"
                  type="url"
                  {...register('profile_image')}
                  className="form-control"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio
              </label>
              <textarea
                id="bio"
                rows="4"
                {...register('bio')}
                className="form-control"
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="btn btn-primary"
              >
                {saving ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Security</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Password</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Change your password to keep your account secure
              </p>
            </div>
            <button
              type="button"
              className="btn bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
            >
              <Key className="mr-2 h-4 w-4" />
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;