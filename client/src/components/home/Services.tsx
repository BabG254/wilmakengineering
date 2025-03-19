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
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const services = [
  {
    title: "Refrigeration",
    icon: Snowflake,
    description:
      "Commercial and industrial refrigeration solutions with expert installation and maintenance.",
  },
  {
    title: "Air Conditioning",
    icon: Fan,
    description:
      "Complete HVAC services for residential, commercial, and industrial spaces.",
  },
  {
    title: "Ventilation",
    icon: Waves,
    description:
      "Advanced ventilation systems designed for optimal air quality and circulation.",
  },
  {
    title: "LP Gas",
    icon: FlameKindling,
    description:
      "Professional LP gas installation and maintenance services for all applications.",
  },
  {
    title: "Kitchen Equipment",
    icon: UtensilsCrossed,
    description:
      "Commercial kitchen equipment installation, repair, and maintenance.",
  },
  {
    title: "Laundry Equipment",
    icon: Wrench,
    description:
      "Industrial laundry equipment solutions and maintenance services.",
  },
  {
    title: "Sauna & Steam Bath",
    icon: Bath,
    description:
      "Expert installation and maintenance of sauna and steam bath facilities.",
  },
  {
    title: "Plumbing",
    icon: Pipette,
    description:
      "Comprehensive plumbing services for commercial and residential properties.",
  },
  {
    title: "General Building Services",
    icon: Building2,
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
              className="hover:shadow-lg transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
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
