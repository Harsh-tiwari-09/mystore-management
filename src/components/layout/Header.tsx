
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, User, Menu, Search, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

const Header = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            <span className="text-xl font-bold">ShopSmart</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            <Link to="/products" className="text-foreground hover:text-primary transition-colors">
              All Products
            </Link>
            <Link to="/categories" className="text-foreground hover:text-primary transition-colors">
              Categories
            </Link>
            <Link to="/deals" className="text-foreground hover:text-primary transition-colors">
              Deals
            </Link>
          </nav>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex w-full max-w-sm items-center space-x-2 mx-4">
          <Input
            type="search"
            placeholder="Search products..."
            className="flex-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-5 w-5" />
          </Button>
        </form>

        {/* Action Icons */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[1.25rem] text-xs flex justify-center" variant="destructive">
                {cartCount}
              </Badge>
            )}
          </Link>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 pt-6">
                <h2 className="text-lg font-semibold">Account</h2>
                <div className="grid gap-4">
                  <Link to="/login">
                    <Button variant="outline" className="w-full justify-start">Sign In</Button>
                  </Link>
                  <Link to="/register">
                    <Button className="w-full justify-start">Create Account</Button>
                  </Link>
                  <Link to="/admin/dashboard">
                    <Button variant="outline" className="w-full justify-start text-primary">Admin Dashboard</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden p-4 pt-0 bg-background shadow-md">
          <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-4">
            <Input
              type="search"
              placeholder="Search products..."
              className="flex-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" size="icon" variant="ghost">
              <Search className="h-5 w-5" />
            </Button>
          </form>
          <nav className="flex flex-col space-y-3">
            <Link to="/products" className="text-foreground hover:text-primary py-2 transition-colors">
              All Products
            </Link>
            <Link to="/categories" className="text-foreground hover:text-primary py-2 transition-colors">
              Categories
            </Link>
            <Link to="/deals" className="text-foreground hover:text-primary py-2 transition-colors">
              Deals
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
