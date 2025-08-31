import {
  Fan,
  Snowflake,
  FlameKindling,
  UtensilsCrossed,
  Waves,
  Wrench,
  Bath,
  Pipette,
  Building2,
  Drill,
  SignpostBig,
  Droplets,
  FerrisWheel,
  HardHat,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const services = [
  {
    title: "Refrigeration",
    icon: Snowflake,
    image: "https://images.unsplash.com/photo-1607582544956-a793312325c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Commercial and industrial refrigeration solutions with expert installation and maintenance.",
  },
  {
    title: "Air Conditioning & HVAC",
    icon: Fan,
    image: "https://images.unsplash.com/photo-1586813551819-52de34c2548b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Complete HVAC services including VRV systems, chillers, and split units for all spaces.",
  },
  {
    title: "Cold Rooms",
    icon: Snowflake,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Professional cold room installation and maintenance for food storage and preservation.",
  },
  {
    title: "Mechanical Ventilation",
    icon: Waves,
    image: "https://images.unsplash.com/photo-1585503418537-88331351ad99?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Advanced mechanical ventilation systems for optimal air quality and circulation.",
  },
  {
    title: "LP Gas Systems",
    icon: FlameKindling,
    image: "https://images.unsplash.com/photo-1623911329432-e2cbd7760e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Professional LP gas installation and maintenance services for all applications.",
  },
  {
    title: "Kitchen Equipment",
    icon: UtensilsCrossed,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Commercial kitchen equipment installation, repair, and maintenance.",
  },
  {
    title: "Core Drilling",
    icon: Drill,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Precision core drilling services for concrete, masonry, and structural applications.",
  },
  {
    title: "Borehole Services",
    icon: Droplets,
    image: "https://images.unsplash.com/photo-1574263867128-83d21d7abfb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Complete borehole drilling, pump installation, and water system maintenance services.",
  },
  {
    title: "Installation of Signages",
    icon: SignpostBig,
    image: "https://images.unsplash.com/photo-1535732820275-9ffd998cac22?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Professional signage installation for commercial and industrial properties.",
  },
  {
    title: "Sauna & Steam Bath",
    icon: Bath,
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Expert installation and maintenance of sauna and steam bath facilities.",
  },
  {
    title: "Scaffolding & Ladder Rental",
    icon: HardHat,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Professional scaffolding and ladder rental services for construction and maintenance projects.",
  },
  {
    title: "Laundry Equipment",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Industrial laundry equipment solutions and maintenance services.",
  },
  {
    title: "Plumbing Services",
    icon: Pipette,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Comprehensive plumbing services for commercial and residential properties.",
  },
  {
    title: "General Building Services",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description:
      "Complete building maintenance and general engineering services.",
  },
];

const Services = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
          <p className="mt-4 text-lg text-gray-600">
            Comprehensive engineering solutions for all your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <service.icon className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
