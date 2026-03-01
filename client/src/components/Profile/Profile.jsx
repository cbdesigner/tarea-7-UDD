import { useContext } from 'react';
import UserContext from '../../context/User/UserContext';

const Profile = () => {
  const { user, logout } = useContext(UserContext);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center mb-8">
          <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="space-y-4 border-t pt-6">
          <div>
            <span className="text-sm text-gray-500">Name</span>
            <p className="font-medium">{user.name}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Email</span>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Member Since</span>
            <p className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="mt-8 w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
