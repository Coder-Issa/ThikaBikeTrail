
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-bike-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-bike-accent">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-bike-accent" />
                <span>+254 799353813</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-bike-accent" />
                <a href="mailto: thikabiketrail@gmail.com" ><i className='bx bxs-envelope'></i>thikabiketrail@gmail.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-bike-accent mt-1" />
                <span>Near Mt. Kenya University, Baghdad Street, Thika, Kenya</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-bike-accent">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-bike-accent transition">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-bike-accent transition">Products</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-bike-accent transition">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-bike-accent transition">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-bike-accent">Working Hours</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Monday - Thursday</span>
                <span>10:00am - 7:00pm</span>
              </li>
              <li className="flex justify-between">
                <span>Friday</span>
                <span className="text-bike-secondary">Closed</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday - Sunday</span>
                <span>10:00am - 7:00pm</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Thika Bikes Trail. All rights reserved.</p>
            <a target="_blank" rel="noreferrer" href="https://my-portfolio-omega-nine-17.vercel.app/">
              Built by Issa Changawa.
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;