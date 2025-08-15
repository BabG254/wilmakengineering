import { useState, useEffect } from "react";
import { Phone, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";

const WhatsAppButton = () => {
  const whatsappNumber = "+254720821196";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  const isMobile = useMobile();
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // Hide the expanded buttons after scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 100) {
        setHasScrolled(true);
        if (isExpanded) setIsExpanded(false);
      } else {
        setHasScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isExpanded]);

  return (
    <div className={`fixed ${isMobile ? 'bottom-4 right-4' : 'bottom-6 right-6'} z-50 flex flex-col items-end gap-3`}>
      {/* Expanded Buttons */}
      {isExpanded && (
        <div className="flex flex-col gap-3 mb-3 animate-fade-in-up">
          <Button
            variant="default"
            size={isMobile ? "default" : "lg"}
            className="rounded-full bg-green-600 hover:bg-green-700 shadow-lg flex items-center justify-center"
            onClick={() => window.open(whatsappUrl, "_blank")}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            <span className="whitespace-nowrap">WhatsApp</span>
          </Button>
          
          <Button
            variant="default"
            size={isMobile ? "default" : "lg"}
            className="rounded-full bg-[#006400] hover:bg-[#005400] shadow-lg"
            onClick={() => window.location.href = `tel:${whatsappNumber}`}
          >
            <Phone className="h-5 w-5 mr-2" />
            <span className="whitespace-nowrap">Call Now</span>
          </Button>
        </div>
      )}
      
      {/* Main Toggle Button */}
      <Button
        variant="default"
        size={isMobile ? "icon" : "lg"}
        className={`rounded-full shadow-lg ${
          isExpanded ? 'bg-gray-700 hover:bg-gray-800' : 'bg-[#E76F00] hover:bg-[#D65F00]'
        } transition-all duration-300 h-14 w-14 flex items-center justify-center`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="flex flex-col items-center">
            <span className="text-xs">Contact</span>
            <span className="text-xs">Us</span>
          </div>
        )}
      </Button>
      
      {/* Style for animation */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default WhatsAppButton;
