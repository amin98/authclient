import { useEffect, useState } from "react";
import AuthenticationAPI from "../apis/AuthenticationAPI";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await AuthenticationAPI.getProfile();
        setProfile(res);
      } catch (err) {
        setError("Unable to fetch profile");
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (const key in profile) {
        formData.append(key, profile[key]);
      }
      if (profileImage) {
        formData.append("profileImage", profileImage); // Include file in update
      }

      const updatedProfile = await AuthenticationAPI.updateProfile(formData);
      setProfile(updatedProfile);
      setError(null);
    } catch (err) {
      setError("Unable to update profile");
      console.log(err)
    }
  };

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!profile) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-6 bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 mb-4">
            {profile.avatar ? (
              <img
                src={`http://localhost:3000${profile.avatar}`}
                alt="Profile Avatar"
                className="object-cover w-24 h-24 border border-gray-300 rounded-full"
              />
            ) : (
              <div className="flex items-center justify-center w-24 h-24 text-gray-500 bg-gray-200 rounded-full">
                No Image
              </div>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{profile.username}</h2>
          <p className="text-gray-500">{profile.email}</p>
        </div>

        <form onSubmit={handleUpdate} className="mt-6">
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">First Name</label>
            <input
              type="text"
              value={profile.firstName || ""}
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              value={profile.lastName || ""}
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">Bio</label>
            <textarea
              value={profile.bio || ""}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              rows={3}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={profile.location || ""}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 font-medium text-gray-700">Update Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfileImage(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 font-medium text-muted-black transition bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
