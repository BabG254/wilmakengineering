import { Card } from "@/components/ui/card";
import { Building2, Award, Users, Target } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Building2,
      title: "15+ Years Experience",
      description: "Serving Kenya with excellence since 2008",
    },
    {
      icon: Award,
      title: "Certified Experts",
      description: "Highly qualified and certified engineering team",
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Dedicated to exceeding client expectations",
    },
    {
      icon: Target,
      title: "Quality Assured",
      description: "Following international engineering standards",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-[#003366]">About WILMAK</h2>
          <p className="mt-4 text-lg text-gray-600">
            Your Trusted Partner in Engineering Excellence
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6" data-aos="fade-right">
            <h3 className="text-2xl font-semibold text-[#006400]">
              Our Commitment to Excellence
            </h3>
            <p className="text-gray-600">
              WILMAK Engineering Services Ltd has been at the forefront of providing 
              comprehensive engineering solutions across Kenya. Our commitment to 
              quality, innovation, and customer satisfaction has made us a leader 
              in the industry.
            </p>
            <p className="text-gray-600">
              We specialize in a wide range of services including Refrigeration, 
              Air Conditioning, Ventilation, LP Gas installations, and more. Our 
              team of experienced professionals ensures that every project is 
              executed with precision and excellence.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4" data-aos="fade-left">
            {features.map((feature, index) => (
              <Card key={index} className="p-6">
                <feature.icon className="h-8 w-8 text-[#E76F00] mb-4" />
                <h4 className="text-lg font-semibold text-[#003366] mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
