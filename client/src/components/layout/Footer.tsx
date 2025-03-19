import { Link } from "wouter";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">WILMAK ENGINEERING</h3>
            <p className="text-gray-400">
              Providing professional engineering services with excellence and reliability.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-400 hover:text-white">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/testimonials">
                  <a className="text-gray-400 hover:text-white">Testimonials</a>
                </Link>
                </li>
              <li>
                <Link href="/projects">
                  <a className="text-gray-400 hover:text-white">Projects</a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-gray-400 hover:text-white">Blog</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Refrigeration</li>
              <li>Air Conditioning</li>
              <li>Ventilation</li>
              <li>LP Gas</li>
              <li>Kitchen Equipment</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-4 text-gray-400">
              <p className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                P.O Box 42822-00100, Off Kirinyaga Road, Nairobi
              </p>
              <p className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                0720821196 / 0736471100
              </p>
              <p className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                wilmak.engeering@gmail.com
              </p>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="hover:text-primary">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-primary">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-primary">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-primary">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} WILMAK ENGINEERING SERVICES LTD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
