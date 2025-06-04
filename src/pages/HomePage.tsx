import React from "react";
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar.tsx";

   interface GitHubUser{
        id: number;
        login: string;
        avatar_url: string;
        html_url: string;
    }

const HomePage: React.FC = () => {
    const [users, setUsers] = useState<GitHubUser[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSearch = async (query: string): Promise<void> => {
        if(!query){
            return;
        }
        try{
            setLoading(true);
            setError('');
            const response = await fetch(`https://api.github.com/search/users?q=${encodeURIComponent(query)}`);
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
    
return(
    <main>
        <h1>GitHub Developer Dashboard</h1>
        <SearchBar onSearch={handleSearch} />

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
    </main>
);
};
export default HomePage;