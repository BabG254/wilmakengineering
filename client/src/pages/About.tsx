import { Card } from "@/components/ui/card";
import { 
  Award, 
  CheckCircle, 
  Users, 
  History, 
  Target,
  BarChart3, 
  Briefcase,
  Phone 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  // Company values
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in every project we undertake"
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Your satisfaction is our top priority"
    },
    {
      icon: CheckCircle,
      title: "Integrity",
      description: "We maintain the highest ethical standards in all our operations"
    },
    {
      icon: BarChart3,
      title: "Innovation",
      description: "Embracing cutting-edge technologies and methods"
    }
  ];

  // Team members
  const team = [
    {
      name: "John Mwangi",
      role: "Managing Director",
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: "Jane Kamau",
      role: "Technical Director",
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      name: "Peter Omondi",
      role: "Chief Engineer",
      image: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      name: "Sarah Wanjiku",
      role: "Project Manager",
      image: "https://randomuser.me/api/portraits/women/4.jpg"
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#003366] to-[#006400] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up">About WILMAK Engineering</h1>
            <p className="text-xl max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              Your trusted partner for comprehensive engineering solutions since 2008.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6" data-aos="fade-right">
              <div className="inline-flex items-center space-x-2">
                <History className="h-6 w-6 text-[#E76F00]" />
                <h2 className="text-3xl font-bold text-[#003366]">Our Story</h2>
              </div>
              
              <p className="text-gray-600">
                Founded in 2008, WILMAK Engineering Services Ltd started as a small team with a big vision: to deliver exceptional engineering solutions to businesses across Kenya. Over the years, we've grown into one of the country's most trusted engineering firms.
              </p>
              
              <p className="text-gray-600">
                What began with a focus on refrigeration systems has expanded into a comprehensive range of services including air conditioning, ventilation, LP gas installations, and kitchen equipment.
              </p>
              
              <p className="text-gray-600">
                Throughout our journey, we've maintained our commitment to quality, reliability, and customer satisfaction, completing hundreds of successful projects for clients in various industries.
              </p>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-xl" data-aos="fade-left">
              <img 
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12" 
                alt="WILMAK Engineering Team" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-up">
            <div className="inline-flex items-center space-x-2 mb-4">
              <Award className="h-6 w-6 text-[#E76F00]" />
              <h2 className="text-3xl font-bold text-[#003366]">Our Values</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do at WILMAK Engineering
            </p>
          </div>

          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="p-6 text-center hover:shadow-lg transition-shadow" 
                data-aos="fade-up" 
                data-aos-delay={index * 100}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#006400]/10 mb-6">
                  <value.icon className="h-7 w-7 text-[#006400]" />
                </div>
                <h3 className="text-xl font-semibold text-[#003366] mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-up">
            <div className="inline-flex items-center space-x-2 mb-4">
              <Briefcase className="h-6 w-6 text-[#E76F00]" />
              <h2 className="text-3xl font-bold text-[#003366]">Our Team</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet the experts behind WILMAK Engineering's success
            </p>
          </div>

          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
            {team.map((member, index) => (
              <Card 
                key={index} 
                className="overflow-hidden hover:shadow-lg transition-shadow" 
                data-aos="fade-up" 
                data-aos-delay={index * 100}
              >
                <img src={member.image} alt={member.name} className="w-full h-60 object-cover" />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-[#003366]">{member.name}</h3>
                  <p className="text-[#006400]">{member.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-[#003366]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-white">Why Choose WILMAK?</h2>
            <p className="mt-4 text-lg text-gray-200 max-w-3xl mx-auto">
              Our commitment to excellence sets us apart from the competition
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-lg" data-aos="fade-up">
              <h3 className="text-xl font-semibold text-[#003366] mb-4">Experienced Team</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#006400] mr-2 shrink-0 mt-0.5" />
                  <span>Highly qualified engineers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#006400] mr-2 shrink-0 mt-0.5" />
                  <span>Specialized technical staff</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#006400] mr-2 shrink-0 mt-0.5" />
                  <span>Continuous professional development</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#006400] mr-2 shrink-0 mt-0.5" />
                  <span>Industry-specific expertise</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg" data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-xl font-semibold text-[#003366] mb-4">Quality Assurance</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#006400] mr-2 shrink-0 mt-0.5" />
                  <span>ISO certified processes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#006400] mr-2 shrink-0 mt-0.5" />
                  <span>Rigorous testing protocols</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#006400] mr-2 shrink-0 mt-0.5" />
                  <span>Premium materials and components</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#006400] mr-2 shrink-0 mt-0.5" />
                  <span>Comprehensive warranty coverage</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg" data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-xl font-semibold text-[#003366] mb-4">Customer Service</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#006400] mr-2 shrink-0 mt-0.5" />
                  <span>24/7 emergency support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#006400] mr-2 shrink-0 mt-0.5" />
                  <span>Responsive communication</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#006400] mr-2 shrink-0 mt-0.5" />
                  <span>Detailed project updates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#006400] mr-2 shrink-0 mt-0.5" />
                  <span>Tailored maintenance programs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#003366] mb-6" data-aos="fade-up">Ready to Work With Us?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8" data-aos="fade-up" data-aos-delay="100">
            Contact our team today to discuss how WILMAK Engineering can help with your next project
          </p>
          <Button 
            size="lg" 
            className="bg-[#E76F00] hover:bg-[#D65F00] text-white"
            onClick={() => window.location.href = "#contact"}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <Phone className="mr-2 h-5 w-5" />
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
