
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex items-start py-4 border-b">
      <div className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </Link>
      </div>
      
      <div className="ml-4 flex-grow">
        <div className="flex justify-between">
          <Link to={`/products/${product.id}`} className="font-medium hover:text-primary">
            {product.name}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeFromCart(product.id)}
            className="h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-muted-foreground text-sm">${product.price.toFixed(2)}</p>
        
        <div className="mt-2 flex justify-between items-center">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="h-8 w-8 p-0"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <p className="font-medium">
            ${(product.price * quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
