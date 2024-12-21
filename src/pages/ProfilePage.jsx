import { useEffect, useState } from 'react';
import AuthenticationAPI from '../apis/AuthenticationAPI';

const ProfilePage = () => {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await AuthenticationAPI.getProfile();
        setProfile(res);
      } catch (err) {
        setError('Unable to fetch profile');
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await AuthenticationAPI.updateProfile(profile);
      setProfile(res);
    } catch (err) {
      setError('Unable to update profile');
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={profile.firstName || ''}
          onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
          placeholder="First Name"
        />
        <input
          type="text"
          value={profile.lastName || ''}
          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
          placeholder="Last Name"
        />
        <input
          type="text"
          value={profile.bio || ''}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          placeholder="Bio"
        />
        <input
          type="text"
          value={profile.location || ''}
          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
          placeholder="Location"
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
