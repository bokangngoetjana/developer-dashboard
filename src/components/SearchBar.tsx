import { useState, useEffect } from "react";

interface SearchBarProps {
    onSearch: (query: string) => void;
    delay?: number; 
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, delay=1000}) => {
    const [input, setInput] = useState<string>('');
    const [debouncedInput, setDebouncedInput] = useState<string>(input);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedInput(input);
        }, delay);

        return () => clearTimeout(handler);
    }, [input, delay]);

    useEffect(() => {
        onSearch(debouncedInput);
    }, [debouncedInput, onSearch]);
    
    return(
        <input type="text"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="Search GitHub users..."
               className="border p-2 rounded-md w-full mb-4"
               />
    );
};
export default SearchBar;