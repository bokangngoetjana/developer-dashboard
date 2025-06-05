import React, { useEffect } from "react";
import { useState } from "react";
import Pagination from "../components/Pagination.tsx";
import SearchBar from "../components/SearchBar.tsx";

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

    useEffect(() => {
        const fetchUsers = async () => {
            if(!query.trim() || query.length < 3){
                setUsers([]);
                setError('');
                setLoading(false);
                return;
            }
            try{
                setLoading(true);
                setError('');
                const response = await fetch(`https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=${USERS_PER_PAGE}&page=${page}`);
                if(!response.ok){
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data.items || []);
            }catch(err){
                setError('Something went wrong while fetching users');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [query, page]); //fetch users when query or page changes

     const handleSearch = (searchQuery: string): void => {
       setQuery(searchQuery);
       setPage(1); //reset to first page on new search
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
                    <a href={html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        View Profile 
                    </a>
                </div>
            ))}
        </section>

        {users.length > 0 && (
            <Pagination
                page={page}
                onPrev={() => setPage((prev) => Math.max(prev - 1, 1))}
                onNext={() => setPage((prev) => prev + 1)}
            />
        )}
    </main>
);
};
export default HomePage;