import React, { useEffect } from "react";
import { useState } from "react";
import Pagination from "../components/Pagination.tsx";
import SearchBar from "../components/SearchBar.tsx";
import UserCard from "../components/UserCard.tsx";
import { Link } from "react-router-dom";
//user data expected from the GitHub API
interface GitHubUser{
        id: number;
        login: string;
        avatar_url: string;
        html_url: string;
}

const USERS_PER_PAGE = 20;
<nav className="p-4 bg-gray-100 mb-4">
  <Link to="/" className="mr-4 text-blue-600 hover:underline">Home</Link>
  <Link to="/favorites" className="text-blue-600 hover:underline">Favorites</Link>
</nav>

const HomePage: React.FC = () => {
    const [users, setUsers] = useState<GitHubUser[]>([]); //array of search results
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [query, setQuery] = useState<string>('');
    const [since, setSince] = useState<number>(0); //since parameter for pagination
    const [favorites, setFavorites] = useState<GitHubUser[]>(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });
    
    const fetchDefaultUsers = async (sinceValue: number) => {
        try{
            setLoading(true);
            setError('');
            const res = await fetch(`https://api.github.com/users?since=${sinceValue}&per_page=${USERS_PER_PAGE}`);
            if(!res.ok){
                throw new Error('Failed to fetch users');
            }
            const data = await res.json();
            setUsers(data);
        }catch(err){
            setError('Something went wrong while fetching users');
        }finally {
            setLoading(false);
        }
    };

    const fetchSearchedUsers = async (searchQuery: string, page: number) => {
        try{
            setLoading(true);
            setError('');
            const res = await fetch(`https://api.github.com/search/users?q=${searchQuery}&per_page=${USERS_PER_PAGE}&page=${page}`);
            if(!res.ok){
                throw new Error('Failed to fetch users');
            }
            const data = await res.json();
            setUsers(data.items || []);
        }catch(err){
            setError('Something went wrong while searching users');
        }finally {
            setLoading(false);
        }};

        useEffect(() => {
    if (query.trim().length >= 3) {
      fetchSearchedUsers(query, page);
    } else {
      fetchDefaultUsers(since);
    }
  }, [query, page, since]);

     const handleSearch = (searchQuery: string) => {
       setQuery(searchQuery);
       setPage(1); //reset to first page on new search
       setSince(0); //reset since for default users
    };

    const handlePrev = () => {
    if (query.trim().length >= 3) {
      setPage((prev) => Math.max(prev - 1, 1));
    } else {
      setSince((prev) => Math.max(prev - USERS_PER_PAGE, 0));
    }
  };
  const handleNext = () => {
    if (query.trim().length >= 3) {
      setPage((prev) => prev + 1);
    } else {
      // GitHub's /users endpoint requires "since" to be the last user's ID
      const lastUserId = users.length > 0 ? users[users.length - 1].id : since + USERS_PER_PAGE;
      setSince(lastUserId);
    }
  };
const addFavorite = (user: GitHubUser) => {
    setFavorites((prev) => {
        const exists = prev.some(fav => fav.id === user.id);
        if (exists) return prev;
        const updated = [...prev, user];
        localStorage.setItem('favorites', JSON.stringify(updated));
        return updated;
    })
};

const removeFavorite = (userId: number) => {
    setFavorites(prev => {
      const updated = prev.filter(fav => fav.id !== userId);
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (userId: number) => {
    return favorites.some(fav => fav.id === userId);
  };


return(
    <main>
        <h1>GitHub Developer Dashboard</h1>
        <SearchBar onSearch={handleSearch} delay={1000} />

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

         <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            isFavorite={isFavorite(user.id)}
            onAddFavorite={addFavorite}
            onRemoveFavorite={removeFavorite}
          />
        ))}
      </section>

        {users.length > 0 && (
            <Pagination
               page={query ? page : since / USERS_PER_PAGE + 1}
               onPrev={handlePrev}
               onNext={handleNext}
            />
        )}
    </main>
);
};
export default HomePage;