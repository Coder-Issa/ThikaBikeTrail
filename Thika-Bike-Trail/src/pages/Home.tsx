
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-bike-dark to-bike h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1601067095185-b8b73ad7db10?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmljeWNsZSUyMHNob3B8ZW58MHx8MHx8fDA%3D')" }}
        ></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-lg text-white">
            <h1 className="text-5xl font-bold mb-4">Thika Bikes Trail Hub</h1>
            <p className="text-xl mb-8">
              Your premier destination for high-quality bicycles, parts, and expert repair services.
            </p>
            <div className="flex gap-4">
              <Button asChild className="bg-bike-accent hover:bg-bike-accent/90 text-white px-8 py-6">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-bike-dark mb-2">Featured Products</h2>
            <p className="text-gray-600">Check out our most popular bicycle parts and accessories</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                name: "Premium Bike Chain",
                price: 29.99,
                image: "https://images.unsplash.com/photo-1718119321508-fbb94072cfa6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              },
              {
                id: 2,
                name: "Mountain Bike Tires",
                price: 49.99,
                image: "https://images.unsplash.com/photo-1695142258908-10b1851d5b6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              },
              {
                id: 3,
                name: "Cycling Helmet",
                price: 89.99,
                image: "https://images.unsplash.com/photo-1701522814856-056f1f6125f1?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            ].map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <div className="h-60 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-bike-dark font-bold text-lg mb-4">${product.price}</p>
                  <Button asChild className="w-full bg-bike hover:bg-bike-dark">
                    <Link to="/products">View Details</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild className="bg-bike hover:bg-bike-dark px-8">
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-bike text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Our Services</h2>
            <p className="text-white/80">Professional bicycle maintenance and repair services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Bike Repairs",
                description: "Professional repair services for all types of bicycles to keep them running smoothly.",
                icon: "🔧"
              },
              {
                title: "Bike Rentals",
                description: "Quality bikes available for rent for casual rides, tours, or adventures.",
                icon: "🚲"
              },
              {
                title: "Custom Builds",
                description: "Personalized bicycle builds tailored to your specific preferences and requirements.",
                icon: "⚙️"
              }
            ].map((service, index) => (
              <div key={index} className="bg-bike-dark p-8 rounded-lg text-center">
                <div className="text-4xl mb-4">{service.icon}</div>http://localhost:8080/
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-white/80">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-bike-dark mb-2">Visit Our Shop</h2>
            <p className="text-gray-600">Located near Mt. Kenya University, Baghdad Street, Thika, Kenya</p>
          </div>
          
          <div className="h-96 bg-gray-200 rounded-lg shadow-md overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.1751898866134!2d37.074799214665745!3d-1.0424580992915626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f4e841ee76ff3%3A0x6e0a9de147f61ef!2sMt%20Kenya%20University%2C%20Thika!5e0!3m2!1sen!2sus!4v1650282938741!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-bike-dark to-bike text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Enhance Your Cycling Experience?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Visit our shop today or browse our online store for quality bicycle parts and accessories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-bike-accent hover:bg-bike-accent/90 text-white px-8 py-6">
              <Link to="/products">Shop Online</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;