import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const staticProjects = [
  {
    id: 1,
    title: "Commercial Refrigeration System",
    description: "Installation of industrial refrigeration system for a major supermarket chain in Nairobi. This project involved designing and implementing a custom cooling solution that reduced energy consumption by 30% while maintaining optimal temperature conditions for food preservation.",
    imageUrl: "https://images.unsplash.com/photo-1607582544956-a793312325c2",
    category: "Refrigeration",
    completionDate: "2023-08-15"
  },
  {
    id: 2,
    title: "Hotel HVAC Upgrade",
    description: "Complete overhaul of heating, ventilation, and air conditioning systems for a 5-star hotel. The new system features smart temperature control, improved air filtration, and energy-efficient components that resulted in a 25% reduction in operational costs.",
    imageUrl: "https://images.unsplash.com/photo-1586813551819-52de34c2548b",
    category: "Air Conditioning",
    completionDate: "2023-05-22"
  },
  {
    id: 3,
    title: "Hospital Ventilation System",
    description: "Design and installation of specialized ventilation system for a major hospital in Mombasa. The system includes HEPA filtration, negative pressure rooms for isolation areas, and precise humidity control to maintain sterile environments in operating theaters.",
    imageUrl: "https://images.unsplash.com/photo-1603728981511-eea7c2e14cdf",
    category: "Ventilation",
    completionDate: "2023-11-30"
  },
  {
    id: 4,
    title: "Restaurant Kitchen Equipment Installation",
    description: "Comprehensive kitchen equipment setup for a high-end restaurant in Nairobi. The project included commercial-grade refrigeration, ventilation systems, and cooking equipment installation, all optimized for energy efficiency and workflow optimization.",
    imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f",
    category: "Kitchen Equipment",
    completionDate: "2024-01-18"
  },
  {
    id: 5,
    title: "Industrial LP Gas System",
    description: "Design and installation of an LP gas system for a manufacturing facility. This included storage tanks, distribution pipelines, safety systems, and monitoring equipment to ensure reliable and safe gas supply for industrial processes.",
    imageUrl: "https://images.unsplash.com/photo-1626446525425-d15c4ca62d27",
    category: "LP Gas",
    completionDate: "2024-03-05"
  }
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState(staticProjects);

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProjects(staticProjects);
    } else {
      setFilteredProjects(
        staticProjects.filter((project) => project.category === activeCategory)
      );
    }
  }, [activeCategory]);

  // Extract unique categories
  const categories = ["all", ...Array.from(new Set(staticProjects.map((project) => project.category)))];

  // Function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#003366] to-[#006400] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up">
              Our Projects
            </h1>
            <p className="text-xl max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              Explore our portfolio of successful engineering projects delivered with excellence
            </p>
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" className="mb-12" onValueChange={setActiveCategory}>
            <div className="flex justify-center mb-10" data-aos="fade-up">
              <TabsList className="bg-gray-100">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="px-6 py-2 data-[state=active]:bg-[#006400] data-[state=active]:text-white"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <Card 
                  key={project.id} 
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="relative h-64">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-[#E76F00] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-[#003366] mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">Completed: {formatDate(project.completionDate)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-[#003366] mb-6">
              Have a Project in Mind?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              From concept to completion, our expert team is ready to bring your vision to life with professional engineering solutions
            </p>
            <Button
              size="lg"
              className="bg-[#E76F00] hover:bg-[#D65F00] text-white"
              onClick={() => window.location.href = "/contact"}
            >
              Get a Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
