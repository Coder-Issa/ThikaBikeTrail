
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "../contexts/CartContexts";
import { toast } from "@/components/ui/use-toast";
import { PhoneInput } from "../components/PhoneInput";

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  paymentMethod: "cash" | "mpesa" | "card";
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  mpesaNumber?: string;
}

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "mpesa", // Default payment method
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      phone: value
    }));
  };

  const handleMpesaNumberChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      mpesaNumber: value
    }));
  };

  const handlePaymentMethodChange = (method: CheckoutFormData["paymentMethod"]) => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: method
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "firstName", 
      "lastName", 
      "email", 
      "phone", 
      "address", 
      "city"
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof CheckoutFormData]) {
        toast({
          title: "Missing Information",
          description: `Please fill in all required fields.`,
          variant: "destructive",
        });
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }

    // Payment method validation
    if (formData.paymentMethod === "card") {
      if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvv) {
        toast({
          title: "Missing Payment Information",
          description: "Please enter your card details.",
          variant: "destructive",
        });
        return false;
      }
    } else if (formData.paymentMethod === "mpesa") {
      if (!formData.mpesaNumber) {
        toast({
          title: "Missing M-Pesa Number",
          description: "Please enter your M-Pesa number.",
          variant: "destructive",
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Add items before checkout.",
        variant: "destructive",
      });
      navigate("/products");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Save order data to localStorage for the receipt page
    const orderData = {
      orderNumber: Math.floor(1000000 + Math.random() * 9000000).toString(),
      orderDate: new Date().toISOString(),
      customer: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
      },
      paymentMethod: formData.paymentMethod,
      items: cartItems,
      total: getCartTotal(),
    };
    
    localStorage.setItem("lastOrder", JSON.stringify(orderData));

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Clear the cart after successful checkout
      clearCart();
      
      // Navigate to receipt page
      navigate("/receipt");
    }, 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-bike-dark mb-8">Checkout</h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Customer Information */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name*</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name*</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email*</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone*</Label>
                      <PhoneInput
                        value={formData.phone}
                        onChange={handlePhoneChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address*</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City*</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">Postal Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="mpesa"
                          name="paymentMethod"
                          checked={formData.paymentMethod === "mpesa"}
                          onChange={() => handlePaymentMethodChange("mpesa")}
                          className="h-4 w-4 text-bike border-gray-300 focus:ring-bike"
                        />
                        <Label htmlFor="mpesa" className="flex items-center">
                          M-Pesa
                          <span className="ml-2 text-sm text-green-600">Pay Bill Business no: 714888 Acc. No: 341687 [Recommended for Kenyan customers.]</span>
                        </Label>
                      </div>
                      
                      {formData.paymentMethod === "mpesa" && (
                        <div className="ml-6 mt-2">
                          <Label htmlFor="mpesaNumber">M-Pesa Number</Label>
                          <PhoneInput
                            value={formData.mpesaNumber || ""}
                            onChange={handleMpesaNumberChange}
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="card"
                          name="paymentMethod"
                          checked={formData.paymentMethod === "card"}
                          onChange={() => handlePaymentMethodChange("card")}
                          className="h-4 w-4 text-bike border-gray-300 focus:ring-bike"
                        />
                        <Label htmlFor="card">Credit/Debit Card</Label>
                      </div>
                      
                      {formData.paymentMethod === "card" && (
                        <div className="ml-6 mt-2 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                              id="cardNumber"
                              name="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={formData.cardNumber || ""}
                              onChange={handleChange}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="cardExpiry">Expiry Date</Label>
                              <Input
                                id="cardExpiry"
                                name="cardExpiry"
                                placeholder="MM/YY"
                                value={formData.cardExpiry || ""}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cardCvv">CVV</Label>
                              <Input
                                id="cardCvv"
                                name="cardCvv"
                                type="password"
                                placeholder="123"
                                value={formData.cardCvv || ""}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="cash"
                          name="paymentMethod"
                          checked={formData.paymentMethod === "cash"}
                          onChange={() => handlePaymentMethodChange("cash")}
                          className="h-4 w-4 text-bike border-gray-300 focus:ring-bike"
                        />
                        <Label htmlFor="cash">Cash on Delivery</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-bike hover:bg-bike-dark py-6 text-lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing Order..." : `Complete Order • $${getCartTotal().toFixed(2)}`}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4 max-h-96 overflow-auto mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100">
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-bike-dark">{item.name}</h3>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Qty: {item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-bike-dark pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-bike-dark mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some items to your cart before proceeding to checkout.</p>
            <Button asChild className="bg-bike hover:bg-bike-dark">
              <a href="/products">Browse Products</a>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Checkout;