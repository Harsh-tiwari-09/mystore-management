
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
      setQuery('');
    }
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className={cn(
        'flex items-center space-x-2 transition-all duration-300',
        isFocused ? 'scale-[1.02]' : '',
        className
      )}
    >
      <div className="relative flex-1">
        <Input
          type="search"
          placeholder="Search products..."
          className={cn(
            "pr-8 transition-all duration-200",
            isFocused ? "shadow-md border-primary/50" : ""
          )}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {query && (
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 animate-in fade-in duration-200"
            onClick={clearSearch}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      <Button 
        type="submit" 
        size="icon" 
        variant="default" 
        className="transition-transform duration-200 active:scale-95 hover:animate-pulse"
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
};

export default SearchBar;
