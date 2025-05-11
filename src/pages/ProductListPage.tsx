
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Product } from '@/types';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { Filter, SlidersHorizontal, ChevronDown, ChevronRight } from 'lucide-react';

const ProductListPage = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter state
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    // In a real app, this would be API calls to get products with filters
    setLoading(true);
    
    const categoryParam = searchParams.get('category')?.toLowerCase();
    const searchQuery = searchParams.get('search')?.toLowerCase();
    
    // Initialize selected categories from URL if present
    if (categoryParam && !selectedCategories.includes(categoryParam)) {
      setSelectedCategories([categoryParam]);
    }
    
    let filtered = [...products];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery) || 
        product.description.toLowerCase().includes(searchQuery)
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category.toLowerCase())
      );
    }
    
    // Apply price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating-desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }
    
    setFilteredProducts(filtered);
    setLoading(false);
  }, [searchParams, selectedCategories, priceRange, sortOption]);

  const toggleCategoryFilter = (category: string) => {
    if (selectedCategories.includes(category.toLowerCase())) {
      setSelectedCategories(selectedCategories.filter(c => c !== category.toLowerCase()));
    } else {
      setSelectedCategories([...selectedCategories, category.toLowerCase()]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">All Products</h1>
          <Button 
            variant="outline"
            size="sm"
            className="md:hidden flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters
            {showFilters ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block space-y-6`}>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </h2>
              <Button variant="link" className="text-sm" onClick={() => {
                setPriceRange([0, 500]);
                setSelectedCategories([]);
              }}>
                Reset
              </Button>
            </div>
            
            {/* Category Filter */}
            <div>
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category.id}`} 
                      checked={selectedCategories.includes(category.name.toLowerCase())}
                      onCheckedChange={() => toggleCategoryFilter(category.name)}
                    />
                    <label 
                      htmlFor={`category-${category.id}`}
                      className="text-sm cursor-pointer"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Filter */}
            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[0, 500]}
                  max={500}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="my-6"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm">${priceRange[0]}</span>
                  <span className="text-sm">${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} products
              </p>
              
              <Select
                value={sortOption}
                onValueChange={setSortOption}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Recommended</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                  <SelectItem value="rating-desc">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {loading ? (
              <div className="grid product-grid gap-6">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                  <div key={index} className="bg-gray-100 animate-pulse rounded-md aspect-square" />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid product-grid gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <Button
                  onClick={() => {
                    setPriceRange([0, 500]);
                    setSelectedCategories([]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductListPage;
