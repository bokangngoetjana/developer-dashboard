import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

interface GittHubUser{
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  followers: number;
  public_repos: number;
}

const UserProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<GittHubUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) throw new Error("Failed to fetch user details.");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError("Unable to load user profile.");
      } finally {
        setLoading(false);
      }
    };
    if(username) fetchUserDetails();
  }, [username]);

   if (loading) return <p>Loading user profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>No user found.</p>;
  // Fetch user details by username here or show username
  return (
    <div className="max-w-xl mx-auto mt-6 bg-white shadow-md rounded-lg p-6">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-32 h-32 rounded-full mx-auto mb-4"
      />
      <h2 className="text-2xl font-bold text-center">{user.name || user.login}</h2>
      {user.bio && <h4 className="text-center text-gray-600 mb-2">{user.bio}</h4>}
      <div className="text-center text-gray-700">
        {user.location && <h3> {user.location}</h3>}
        <h3> {user.followers} followers</h3>
        <h3> {user.public_repos} public repositories</h3>
      </div>
    </div>
  );
};

export default UserProfilePage;
