
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { ShoppingCart, Heart, Share2, Star, ChevronRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';
import { products } from '@/data/products';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // In a real app, this would be an API call to get product details
    setLoading(true);
    
    const foundProduct = products.find(p => p.id === id);
    setProduct(foundProduct || null);
    
    if (foundProduct) {
      // Find similar products based on category
      const similar = products
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      setSimilarProducts(similar);
    }
    
    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast({
        title: "Added to cart",
        description: `${product.name} (${quantity}) has been added to your cart.`,
      });
    }
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product?.name} has been added to your wishlist.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container py-12">
          <div className="animate-pulse">
            <div className="h-6 w-1/3 bg-gray-200 rounded mb-4" />
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-200 rounded" />
              <div className="space-y-4">
                <div className="h-8 w-3/4 bg-gray-200 rounded" />
                <div className="h-6 w-1/4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-12 w-full bg-gray-200 rounded mt-6" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link to="/products" className="hover:text-primary">Products</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link to={`/products?category=${product.category}`} className="hover:text-primary capitalize">
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-foreground truncate">{product.name}</span>
        </div>
        
        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square relative overflow-hidden rounded-lg border">
            <img 
              src={product.imageUrl}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating.toFixed(1)} ({product.reviews} reviews)
              </span>
            </div>
            
            <div className="text-3xl font-bold mb-4">
              ${product.price.toFixed(2)}
            </div>
            
            <p className="text-muted-foreground mb-6">
              {product.description}
            </p>
            
            <div className="mb-6">
              <p className="font-medium mb-2">Availability:</p>
              <div className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </div>
            </div>
            
            {product.inStock && (
              <div className="mb-6">
                <p className="font-medium mb-2">Quantity:</p>
                <div className="flex items-center border rounded-md w-fit">
                  <button
                    className="px-3 py-1 border-r"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button
                    className="px-3 py-1 border-l"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button 
                size="lg" 
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleAddToWishlist}
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {similarProducts.map(relatedProduct => (
                <Link key={relatedProduct.id} to={`/products/${relatedProduct.id}`} className="group">
                  <Card className="overflow-hidden hover-scale">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={relatedProduct.imageUrl}
                        alt={relatedProduct.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-medium line-clamp-1">{relatedProduct.name}</h3>
                      <p className="font-semibold">${relatedProduct.price.toFixed(2)}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
