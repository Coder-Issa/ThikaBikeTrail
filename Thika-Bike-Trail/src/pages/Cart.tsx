
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "../contexts/CartContexts";
import { toast } from "@/components/ui/use-toast";

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleRemove = (id: number) => {
    removeFromCart(id);
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart.",
      duration: 3000,
    });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }
    navigate("/checkout");
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-bike-dark mb-8">Your Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
                      <h3 className="text-xl font-semibold text-bike-dark">{item.name}</h3>
                      <span className="text-lg font-bold text-bike">${item.price.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <div className="flex items-center">
                        <button 
                          className="w-8 h-8 rounded-l border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                          className="w-12 h-8 text-center border-y border-gray-300 rounded-none"
                        />
                        <button 
                          className="w-8 h-8 rounded-r border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <span className="font-semibold">
                          Subtotal: ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button 
                          onClick={() => handleRemove(item.id)}
                          className="text-red-500 hover:text-red-700 transition"
                          aria-label="Remove item"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
              <h2 className="text-xl font-bold text-bike-dark mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-bike">${getCartTotal().toFixed(2)}</span>
                </div>
              </div>
              <Button 
                className="w-full bg-bike hover:bg-bike-dark"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
              <div className="mt-4 text-center">
                <Link
                  to="/products"
                  className="text-bike hover:text-bike-dark transition underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
            <div className="text-5xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-bike-dark mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Button asChild className="bg-bike hover:bg-bike-dark">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;