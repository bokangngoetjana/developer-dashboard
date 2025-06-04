import { useState, useEffect } from "react";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch}) => {
    const [input, setInput] = useState<string>('');
    const [debouncedInput, setDebouncedInput] = useState<string>(input);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedInput(input);
        });

        return () => clearTimeout(handler);
    }, [input]);

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