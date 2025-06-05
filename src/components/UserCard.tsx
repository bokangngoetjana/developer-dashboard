import React from "react";
import { Link } from "react-router-dom";

interface GitHubUser{
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
}

interface UserCardProps {
    user: GitHubUser;
    isFavorite?: boolean;
    onAddFavorite: (user: GitHubUser) => void;
    onRemoveFavorite: (userId: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, isFavorite, onAddFavorite, onRemoveFavorite }) => {
    return (
        <div className="border p-4 rounded-md shadow-sm bg-white">
            <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full mb-2" />
            <h2 className="text-lg font-semibold">{user.login}</h2>
            <Link to={`/user/${user.login}`} className="text-blue-500 hover:underline">
                View Profile
            </Link>
            { isFavorite ? (
                <button onClick={() => onRemoveFavorite(user.id)} className="px-3 py-1 bg-red-500 text-white rounded-md mt-2">Remove FGavorite</button>
            ) : (
                <button onClick={() => onAddFavorite?.(user)} className="px-3 py-1 bg-green-500 text-white rounded-md mt-2">Add to Favorites</button>
            )}
        </div>
    );
}
export default UserCard;