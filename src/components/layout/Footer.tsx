
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-lg font-bold mb-4">ShopSmart</h3>
          <p className="text-muted-foreground mb-4">Your one-stop shop for all your needs with amazing deals and discounts.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/categories" className="text-muted-foreground hover:text-primary transition-colors">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/deals" className="text-muted-foreground hover:text-primary transition-colors">
                Special Deals
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-bold mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="text-muted-foreground hover:text-primary transition-colors">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link to="/returns" className="text-muted-foreground hover:text-primary transition-colors">
                Returns & Refunds
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-bold mb-4">Contact Info</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">123 Commerce St, Business City, 10001</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">+1 (555) 123-4567</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">support@shopsmart.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mt-8 pt-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">© 2025 ShopSmart. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
