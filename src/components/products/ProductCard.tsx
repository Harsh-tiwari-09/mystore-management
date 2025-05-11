
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Card className="overflow-hidden hover-scale">
      <Link to={`/products/${product.id}`}>
        <div className="aspect-square relative overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-cover w-full h-full"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Badge variant="destructive" className="text-sm">Out of Stock</Badge>
            </div>
          )}
          {product.featured && (
            <Badge className="absolute top-2 right-2 bg-primary">Featured</Badge>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="mb-1 flex items-center">
            <div className="flex items-center text-yellow-500 mr-1">
              <Star className="fill-yellow-500 stroke-yellow-500 h-4 w-4" />
            </div>
            <span className="text-sm">{product.rating}</span>
            <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
          </div>
          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
          <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
          <p className="text-muted-foreground text-sm line-clamp-2 mt-2">
            {product.description}
          </p>
        </CardContent>
      </Link>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
