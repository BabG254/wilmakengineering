import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

// Partner logos array with image URLs
const partners = [
  {
    name: "Samsung",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg"
  },
  {
    name: "LG",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/bf/LG_logo_%282015%29.svg"
  },
  {
    name: "Daikin",
    logo: "https://www.daikin.com/-/media/Project/Daikin/daikin_com/common/img/common/daikin_logo.png"
  },
  {
    name: "Mitsubishi Electric",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Mitsubishi_Electric_logo.svg/2560px-Mitsubishi_Electric_logo.svg.png"
  },
  {
    name: "Carrier",
    logo: "https://www.carrier.com/carrier/en/worldwide/-/media/carrier/banner/carrier-logo.svg"
  },
  {
    name: "Trane",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Trane_logo.svg"
  }
];

const Partners = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scroll = () => {
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-[#003366]">Our Partners</h2>
          <p className="mt-4 text-lg text-gray-600">
            Working with leading brands in the industry
          </p>
        </div>

        <div
          ref={containerRef}
          className="overflow-hidden whitespace-nowrap"
          data-aos="fade-up"
        >
          <div className="inline-flex gap-8 animate-scroll">
            {[...partners, ...partners].map((partner, index) => (
              <Card
                key={`${partner.name}-${index}`}
                className="inline-block p-6 min-w-[200px] flex items-center justify-center"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-12 object-contain"
                />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;