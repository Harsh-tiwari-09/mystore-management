
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../products/ProductCard';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { products } from '@/data/products';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // In a real app, this would be an API call to get featured products
    const featured = products.filter(product => product.featured);
    setFeaturedProducts(featured);
  }, []);

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-muted-foreground">Explore our handpicked selection of top products</p>
          </div>
          <Button variant="link" asChild className="mt-2 md:mt-0">
            <Link to="/products">
              View all products
            </Link>
          </Button>
        </div>
        
        <div className="product-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {featuredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No featured products found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
