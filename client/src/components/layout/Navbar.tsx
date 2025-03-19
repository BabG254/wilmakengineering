import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/reviews", label: "Reviews" },
    { href: "/blog", label: "Blog" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <img 
                  src="/logo.png" 
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
                      ? "text-[#006400]"
                      : "text-gray-700 hover:text-[#006400]"
                  }`}
                >
                  {item.label}
                </a>
              </Link>
            ))}
            <Button
              variant="default"
              className="bg-[#006400] hover:bg-[#005400] text-white"
              onClick={() => window.location.href = "tel:0720821196"}
            >
              Call Us
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2"
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
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location === item.href
                      ? "text-[#006400] bg-green-50"
                      : "text-gray-700 hover:text-[#006400] hover:bg-green-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </Link>
            ))}
            <Button
              variant="default"
              className="w-full mt-4 bg-[#006400] hover:bg-[#005400] text-white"
              onClick={() => window.location.href = "tel:0720821196"}
            >
              Call Us
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;