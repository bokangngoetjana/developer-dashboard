import React from "react";

interface UserCardProps {
    avatarUrl: string;
    login: string;
    htmlUrl: string;
}

const UserCard: React.FC<UserCardProps> = ({ avatarUrl, login, htmlUrl }) => {
    return (
        <div className="border p-4 rounded-md shadow-sm bg-white">
            <img src={avatarUrl} alt={login} className="w-16 h-16 rounded-full mb-2" />
            <h2 className="text-lg font-semibold">{login}</h2>
            <a
                href={htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
            >
                View Profile
            </a>
        </div>
    );
}
export default UserCard;