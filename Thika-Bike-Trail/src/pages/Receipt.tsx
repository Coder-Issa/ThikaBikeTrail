
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface OrderData {
  orderNumber: string;
  orderDate: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
  };
  paymentMethod: string;
  items: OrderItem[];
  total: number;
}

const Receipt = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get order data from localStorage
    const savedOrder = localStorage.getItem("lastOrder");
    
    if (!savedOrder) {
      // If there's no order data, redirect to home
      navigate("/");
      return;
    }
    
    try {
      const parsedOrder = JSON.parse(savedOrder);
      setOrderData(parsedOrder);
    } catch (error) {
      console.error("Error parsing order data:", error);
      navigate("/");
    }
    
    setIsLoading(false);
  }, [navigate]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-16 text-center">
          <p>Loading receipt...</p>
        </div>
      </Layout>
    );
  }

  if (!orderData) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl font-bold text-bike-dark mb-4">No Order Found</h1>
          <p className="mb-8">We couldn't find any recent order information.</p>
          <Button asChild className="bg-bike hover:bg-bike-dark">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-bike-dark">Order Confirmation</h1>
            <div className="print:hidden">
              <Button onClick={handlePrint} className="bg-bike hover:bg-bike-dark">
                Print Receipt
              </Button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md mb-8 print:shadow-none">
            {/* Receipt Header */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-bike-dark mb-2">Thika Bikes Trail Hub</h2>
                  <p className="text-gray-600">
                    Near Mt. Kenya University, <br />
                    Baghdad Street, Thika, Kenya<br />
                    Email: thikabikestrail@gmail.com<br />
                    Phone: +254 799353813
                  </p>
                </div>
                <div className="text-right">
                  <div className="mb-2">
                    <span className="font-medium text-gray-600">Order Number:</span>
                    <p className="font-bold text-bike-dark">{orderData.orderNumber}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Order Date:</span>
                    <p>{formatDate(orderData.orderDate)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
                <p className="font-medium">{orderData.customer.name}</p>
                <p>{orderData.customer.email}</p>
                <p>{orderData.customer.phone}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
                <p>{orderData.customer.address}</p>
                <p>{orderData.customer.city} {orderData.customer.zipCode}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
              <p className="capitalize">{orderData.paymentMethod}</p>
            </div>

            {/* Order Items */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Order Items</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="py-3 px-4 text-left font-semibold">Item</th>
                      <th className="py-3 px-4 text-center font-semibold">Quantity</th>
                      <th className="py-3 px-4 text-right font-semibold">Price</th>
                      <th className="py-3 px-4 text-right font-semibold">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orderData.items.map((item) => (
                      <tr key={item.id}>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded overflow-hidden hidden sm:block">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="font-medium">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">{item.quantity}</td>
                        <td className="py-3 px-4 text-right">${item.price.toFixed(2)}</td>
                        <td className="py-3 px-4 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-end">
                <div className="w-full sm:w-72 space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Subtotal:</span>
                    <span>${orderData.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-bike-dark">
                    <span>Total:</span>
                    <span>${orderData.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-bike-dark mb-2">Thank You for Your Order!</h2>
            <p className="text-gray-600 mb-6">
              We appreciate your business and look forward to serving you again.
            </p>
            <div className="space-x-4 print:hidden">
              <Button asChild className="bg-bike hover:bg-bike-dark">
                <Link to="/">Return to Home</Link>
              </Button>
              <Button asChild variant="outline" className="border-bike text-bike hover:bg-bike/5">
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Receipt;