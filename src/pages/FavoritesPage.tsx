import React, { useEffect } from "react";
import UserCard from "../components/UserCard";

interface GitHubUser {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
}

const FavoritesPage: React.FC = () => {
    const [favorites, setFavorites] = React.useState<GitHubUser[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('favorites');
        if (stored) {
            setFavorites(JSON.parse(stored));
        }
    }, []);

    const removeFavorite = (userId: number) => {
        const updated = favorites?.filter((user) => user.id !== userId);
        setFavorites(updated || []);
        localStorage.setItem('favorites', JSON.stringify(updated));
    }
    return (
         <main>
      <h1 className="text-2xl font-bold mb-4">Favorite Users</h1>
      {favorites.length === 0 ? (
        <p>No favorites added.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          {favorites.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              isFavorite={true}
              onAddFavorite={() => {}}
              onRemoveFavorite={removeFavorite}
            />
          ))}
        </div>
      )}
    </main>
    );
}
export default FavoritesPage;