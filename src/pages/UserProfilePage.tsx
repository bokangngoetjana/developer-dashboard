import React from "react";
import { useParams } from "react-router-dom";

const UserProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();

  // Fetch user details by username here or show username
  return (
    <div>
      <h1>User Profile: {username}</h1>
      {/* Add your user info display here */}
    </div>
  );
};

export default UserProfilePage;
