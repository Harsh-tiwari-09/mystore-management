
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import CartItem from '@/components/cart/CartItem';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';

const CartPage = () => {
  const { cartItems, clearCart, cartTotal } = useCart();
  const { toast } = useToast();

  const handleCheckout = () => {
    toast({
      title: "Checkout process initiated",
      description: "This is a demo. No actual payment will be processed.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                {cartItems.map(item => (
                  <CartItem key={item.product.id} item={item} />
                ))}
                
                <div className="p-4 flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => clearCart()}
                  >
                    Clear Cart
                  </Button>
                  <Link to="/products">
                    <Button variant="link" size="sm">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div>
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${(cartTotal * 0.1).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-2 mb-4">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${(cartTotal + cartTotal * 0.1).toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button
                    onClick={handleCheckout}
                    className="w-full"
                    size="lg"
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center rounded-full bg-muted w-16 h-16 mb-4">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button asChild size="lg">
              <Link to="/products">
                Start Shopping
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
