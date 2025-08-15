import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "./../../assets/logo.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/reviews", label: "Reviews" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);
  
  // Close mobile menu on location change
  useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [location]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-white/95 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <img 
                  src={logo}
                  alt="WILMAK Logo" 
                  className="h-12 w-auto"
                  onError={(e) => {
                    console.error("Logo failed to load");
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </a>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location === item.href
                      ? "text-[#006400] border-b-2 border-[#006400]"
                      : "text-gray-700 hover:text-[#006400] hover:border-b-2 hover:border-[#006400]/50"
                  }`}
                >
                  {item.label}
                </a>
              </Link>
            ))}
            <Button
              variant="default"
              className="bg-[#E76F00] hover:bg-[#D65F00] text-white ml-4"
              onClick={() => window.location.href = "tel:0720821196"}
            >
              <Phone className="mr-2 h-4 w-4" />
              Call Us
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 mobile-menu-button"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-[#006400]" />
              ) : (
                <Menu className="h-6 w-6 text-[#006400]" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg mobile-menu absolute w-full">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className={`block px-4 py-3 rounded-md text-base font-medium ${
                    location === item.href
                      ? "text-white bg-[#006400]"
                      : "text-gray-700 hover:text-[#006400] hover:bg-green-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </Link>
            ))}
            <div className="pt-2">
              <Button
                variant="default"
                className="w-full bg-[#E76F00] hover:bg-[#D65F00] text-white"
                onClick={() => window.location.href = "tel:0720821196"}
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Overlay for mobile menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/20 z-[-1]" onClick={() => setIsOpen(false)}></div>
      )}
    </nav>
  );
};

export default Navbar;