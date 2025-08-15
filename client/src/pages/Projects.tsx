import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import type { Project } from "@shared/schema";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  useEffect(() => {
    if (projects?.length) {
      if (activeCategory === "all") {
        setFilteredProjects(projects);
      } else {
        setFilteredProjects(
          projects.filter((project) => project.category === activeCategory)
        );
      }
    }
  }, [activeCategory, projects]);

  // Extract unique categories
  const categories = projects
    ? ["all", ...Array.from(new Set(projects.map((project) => project.category)))]
    : ["all"];

  // Function to format date
  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  if (isLoading) {
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
        
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
              {[1, 2, 3].map((n) => (
                <Card key={n} className="overflow-hidden">
                  <div className="bg-gray-200 h-64 animate-pulse"></div>
                  <CardContent className="p-6 space-y-4">
                    <div className="h-7 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

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
