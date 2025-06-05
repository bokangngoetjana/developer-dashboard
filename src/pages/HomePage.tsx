import React, { useEffect } from "react";
import { useState } from "react";
import Pagination from "../components/Pagination.tsx";
import SearchBar from "../components/SearchBar.tsx";
import { Link } from "react-router-dom";

//user data expected from the GitHub API
interface GitHubUser{
        id: number;
        login: string;
        avatar_url: string;
        html_url: string;
}

const USERS_PER_PAGE = 20;

const HomePage: React.FC = () => {
    const [users, setUsers] = useState<GitHubUser[]>([]); //array of search results
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [query, setQuery] = useState<string>('');
    const [since, setSince] = useState<number>(0); //since parameter for pagination
    
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

return(
    <main>
        <h1>GitHub Developer Dashboard</h1>
        <SearchBar onSearch={handleSearch} delay={1000} />

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        <section>
            {users.map(({id, login, avatar_url, html_url}) => (
                <div key={id} className="border p-4 rounded-md shadow-sm bg-white">
                    <img src={avatar_url} alt={login} className="w-16 h-16 rounded-full mb-2" />
                    <h2 className="text-lg font-semibold">{login}</h2>
                    <Link to={`/user/${login}`} className="text-blue-500 hover:underline">
                        View Profile 
                    </Link>
                </div>
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