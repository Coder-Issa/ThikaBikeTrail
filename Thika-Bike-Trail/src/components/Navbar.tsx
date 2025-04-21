
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContexts";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-bike-dark text-white py-4 px-6 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">  
          {/* <img src="images/logo.png"/> */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-bike-accent">Thika Bikes Trail</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="hover:text-bike-accent transition">Home</Link>
            <Link to="/products" className="hover:text-bike-accent transition">Products</Link>
            <Link to="/about" className="hover:text-bike-accent transition">About Us</Link>
            <Link to="/contact" className="hover:text-bike-accent transition">Contact</Link>
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-bike-accent" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-bike-secondary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-4 pb-4">
            <Link to="/" className="hover:text-bike-accent transition" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/products" className="hover:text-bike-accent transition" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
            <Link to="/about" className="hover:text-bike-accent transition" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
            <Link to="/contact" className="hover:text-bike-accent transition" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            <Link to="/cart" className="flex items-center gap-2 hover:text-bike-accent transition" onClick={() => setIsMobileMenuOpen(false)}>
              <ShoppingCart className="h-5 w-5" />
              <span>Cart ({totalItems})</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;