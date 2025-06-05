import React from "react";
import { Link } from "react-router-dom";

interface UserCardProps {
    avatarUrl: string;
    login: string;
}

const UserCard: React.FC<UserCardProps> = ({ avatarUrl, login }) => {
    return (
        <div className="border p-4 rounded-md shadow-sm bg-white">
            <img src={avatarUrl} alt={login} className="w-16 h-16 rounded-full mb-2" />
            <h2 className="text-lg font-semibold">{login}</h2>
            <Link to={`/user/${login}`} className="text-blue-500 hover:underline">
                View Profile
            </Link>
        </div>
    );
}
export default UserCard;