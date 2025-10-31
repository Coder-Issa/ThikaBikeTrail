
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "../contexts/CartContexts";
import { toast } from "@/components/ui/use-toast";

// Product data
const products = [
  {
    id: 1,
    name: "Premium Bike Chain",
    category: "Components",
    price: 8.85,
    image: "https://images.unsplash.com/photo-1718119321508-fbb94072cfa6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "High-quality bike chain for all types of bicycles. Durable and rust-resistant."
  },
  {
    id: 2,
    name: "Mountain Bike Tires",
    category: "Tires",
    price: 20.95,
    image: "https://images.unsplash.com/photo-1695142258908-10b1851d5b6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Rugged tires with excellent traction for off-road cycling."
  },
  {
    id: 3,
    name: "Cycling Helmet",
    category: "Accessories",
    price: 89.25,
    image: "https://images.unsplash.com/photo-1701522814856-056f1f6125f1?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Lightweight and ventilated helmet for maximum protection and comfort."
  },
  {
    id: 4,
    name: "Bike Pedals",
    category: "Components",
    price: 35.95,
    image: "https://images.unsplash.com/photo-1632383092420-8075637b063b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Durable aluminum pedals with excellent grip for all weather conditions."
  },
  {
    id: 5,
    name: "Cycling Gloves",
    category: "Accessories",
    price: 24.85,
    image: "https://plus.unsplash.com/premium_photo-1663036963694-b14db62c8575?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Padded gloves for comfort and grip during long rides."
  },
  {
    id: 6,
    name: "Bike Lock",
    category: "Accessories",
    price: 26.75,
    image: "https://images.unsplash.com/photo-1664146158348-6a8c71ac62d1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Heavy-duty lock to keep your bike secure wherever you go."
  },
  {
    id: 7,
    name: "LED Smart Brake Lights",
    category: "Accessories",
    price: 15.35,
    image: "https://cdn.rosebikes.de/images/7DB04FEC01AE0F6DF083BFA46FDFDA8E.png?im=Resize=(2400%2C2400)",
    description: "Bright LED lights for increased visibility and safety during night rides."
  },
  {
    id: 8,
    name: "Road-Bike Repair Tool Kit",
    category: "Tools",
    price: 5.95,
    image: "https://bike.co.ke/wp-content/uploads/2024/11/ROCKBROS-16-in-1-MTB-Road-Bike-Repair-Tools-Kit-1.webp",
    description: "Complete repair kit with essential tools for bike maintenance."
  },
  {
    id: 10,
    name: "Water Bottle Holder",
    category: "Accessories",
    price: 4.55,
    image: "https://bike.co.ke/wp-content/uploads/2024/12/ROCKBROS-Bicycle-Water-Bottle-Cage-Holder.webp",
    description: "Lightweight bottle holder that attaches securely to your bike frame."
  },
  {
    id: 11,
    name: "Shimano SLX Groupset",
    category: "Components",
    price: 222.45,
    image: "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_1000,w_500,f_auto,q_auto/19199965/293888_566156.png",
    description: "Offers a balanced mix of performance, quality, and durability."
  },
  {
    id: 12,
    name: "Road Bike Bar-Tape",
    category: "Components",
    price: 12.55,
    image: "https://bike.co.ke/wp-content/uploads/2024/11/ROCKBROS-Bike-Handlebar-Grip-Tape-With-2-Bar-Plug.webp",
    description: "Smooth bar tape to provide more hand grip."
  },
  {
    id: 13,
    name: "Bike Frame",
    category: "Components",
    price: 260.55,
    image: "https://images.unsplash.com/photo-1671049828362-de5057953ba3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Best frames in terms of stiffness,weight,bike's perfomance and ride quality."
  },
  {
    id: 14,
    name: "Floating Roaters",
    category: "Components",
    price: 15.85,
    image: "https://i.ebayimg.com/images/g/YGIAAOSwjF1jDvMb/s-l1600.webp",
    description: "Best frames in terms of stiffness,weight,bike's perfomance and ride quality."
  },
  {
    id: 15,
    name: "Dual MTB Folding Tires",
    category: "Tires",
    price: 38.85,
    image: "https://bike.co.ke/wp-content/uploads/2022/09/Best-MAXXIS-Pace-26-27.5-29-inch-x-1.95-2.1-TR-EXO-Dual-MTB-Folding-Tire.webp",
    description: "Fast-rolling mountain and cross-country tyre made for speed and hard pack grip." 
  }
];


// Categories array
const categories = ["All", ...new Set(products.map(product => product.category))];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart } = useCart();

  // Filter products based on selected category
  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product: Omit<typeof products[0], "category" | "description">) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <Layout>
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-bike-dark mb-8">Bicycle Parts & Accessories</h1>
          
          {/* Category Filters */}
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category ? "bg-bike text-white" : "text-bike-dark"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <span className="text-sm bg-bike-light/20 text-bike-dark px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-bike-dark font-bold text-xl">${product.price}</span>
                    <Button 
                      className="bg-bike hover:bg-bike-dark"
                      onClick={() => handleAddToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image
                      })}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-600 text-lg">No products found in this category.</p>
              <Button 
                className="mt-4 bg-bike hover:bg-bike-dark"
                onClick={() => setSelectedCategory("All")}
              >
                View All Products
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Products;