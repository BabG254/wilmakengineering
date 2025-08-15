import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  User, 
  Search, 
  Tag, 
  BookOpen,
  ChevronRight,
  Clock
} from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";

const staticBlogPosts = [
  {
    id: 1,
    title: "Energy Efficiency in Commercial Refrigeration",
    content: "In today's world, energy efficiency isn't just good for the environment—it's good for business too. Commercial refrigeration systems can account for a significant portion of a business's energy consumption. At WILMAK Engineering, we specialize in designing and installing energy-efficient refrigeration systems that can significantly reduce operational costs without compromising performance. Our team of experts can assess your current system and recommend upgrades that will maximize efficiency while ensuring optimal cooling performance for your specific needs.",
    imageUrl: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740",
    publishedAt: "2023-09-01",
    author: "David Njoroge, Chief Engineer"
  },
  {
    id: 2,
    title: "The Importance of Regular HVAC Maintenance",
    content: "Regular maintenance of your HVAC systems is crucial for ensuring optimal performance and longevity. In this post, we discuss the key benefits of scheduled maintenance and what it should include. Preventive maintenance is far more cost-effective than emergency repairs. By implementing a regular maintenance schedule, businesses can avoid unexpected breakdowns, extend equipment life, improve indoor air quality, and maintain energy efficiency. WILMAK Engineering offers comprehensive maintenance plans tailored to your specific system requirements.",
    imageUrl: "https://images.unsplash.com/photo-1617104678798-08925113358b",
    publishedAt: "2023-10-15",
    author: "Jane Mwangi, Technical Director"
  },
  {
    id: 3,
    title: "Innovations in Ventilation Technology",
    content: "Ventilation technology has seen remarkable advancements in recent years, with new systems offering improved air quality, energy efficiency, and smart controls. As specialists in ventilation systems, WILMAK Engineering stays at the forefront of these innovations to provide our clients with cutting-edge solutions. Modern ventilation systems now incorporate sensors that monitor air quality in real-time, automatically adjusting airflow to maintain optimal conditions while minimizing energy consumption. These smart systems can be integrated with building management systems for comprehensive control and monitoring.",
    imageUrl: "https://images.unsplash.com/photo-1585503418537-88331351ad99",
    publishedAt: "2023-12-05",
    author: "Peter Kinyua, Innovation Lead"
  },
  {
    id: 4,
    title: "Selecting the Right Commercial Kitchen Equipment",
    content: "Selecting appropriate commercial kitchen equipment is a critical decision that impacts operational efficiency, food quality, and energy consumption. As specialists in kitchen equipment installation, WILMAK Engineering offers expert guidance on making these important choices. When designing a commercial kitchen, factors such as space utilization, workflow optimization, energy efficiency, and compliance with health regulations must be carefully considered. Our team works closely with restaurant owners and chefs to create customized solutions that meet their specific culinary needs while maximizing operational efficiency.",
    imageUrl: "https://images.unsplash.com/photo-1588542997599-d74953c59498",
    publishedAt: "2024-01-20",
    author: "Stephen Kimani, Project Manager"
  },
  {
    id: 5,
    title: "Safety Considerations for LP Gas Installations",
    content: "LP (Liquefied Petroleum) gas installations require careful planning and adherence to strict safety standards to prevent hazardous situations. As specialists in LP gas systems, WILMAK Engineering prioritizes safety in every installation and maintenance service we provide. Proper gas system design includes appropriate tank placement, secure piping installations, leak detection systems, and automatic shutoff valves. Regular inspections and maintenance are essential to ensure continued safe operation. Our certified technicians follow international best practices and local regulations for all LP gas installations.",
    imageUrl: "https://images.unsplash.com/photo-1623911329432-e2cbd7760e5b",
    publishedAt: "2024-02-10",
    author: "George Omondi, Safety Compliance Manager"
  },
  {
    id: 6,
    title: "Sustainable HVAC Solutions for Modern Buildings",
    content: "Sustainability is becoming increasingly important in building design and operation. Modern HVAC systems must balance comfort, efficiency, and environmental impact. At WILMAK Engineering, we specialize in designing sustainable HVAC solutions that reduce carbon footprint while maintaining optimal indoor comfort. Technologies such as heat recovery ventilation, variable refrigerant flow systems, and smart building integration can significantly reduce energy consumption. Our approach includes comprehensive building analysis to identify the most effective sustainable technologies for each specific project.",
    imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
    publishedAt: "2024-03-05",
    author: "Sarah Wangari, Sustainability Consultant"
  },
  {
    id: 7,
    title: "Refrigeration Maintenance Best Practices for Food Service",
    content: "Proper maintenance of refrigeration systems is critical in the food service industry, where equipment failure can lead to significant product loss and food safety concerns. This article outlines essential maintenance practices that food service businesses should implement to ensure reliable refrigeration performance. From regular cleaning of condenser coils to monitoring refrigerant levels and inspecting door seals, these practices help prevent unexpected breakdowns and extend equipment life. WILMAK Engineering offers specialized maintenance programs for food service refrigeration that help businesses maintain food safety compliance while optimizing operational costs.",
    imageUrl: "https://images.unsplash.com/photo-1589459362865-o6c0dfa6bc8c",
    publishedAt: "2024-03-18",
    author: "James Kamau, Refrigeration Specialist"
  },
  {
    id: 8,
    title: "Commercial Air Quality Solutions for Post-Pandemic Workplaces",
    content: "The COVID-19 pandemic has heightened awareness of indoor air quality in commercial spaces. Businesses are now prioritizing ventilation and filtration systems that can reduce airborne contaminants and provide healthier indoor environments. This article explores effective air quality solutions for commercial buildings, including enhanced filtration systems, UV germicidal irradiation, and increased fresh air exchange. WILMAK Engineering provides comprehensive air quality assessments and can recommend and implement appropriate upgrades to existing HVAC systems to address modern air quality concerns.",
    imageUrl: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0",
    publishedAt: "2024-04-02",
    author: "Dr. Elizabeth Maina, Public Health Consultant"
  },
  {
    id: 9,
    title: "Industrial Cooling Towers: Efficiency and Maintenance",
    content: "Cooling towers are critical components in many industrial processes, providing essential heat rejection for manufacturing facilities, power plants, and large commercial buildings. This article discusses strategies for optimizing cooling tower efficiency and implementing effective maintenance protocols. Regular maintenance including water treatment, mechanical inspection, and performance monitoring can prevent biological growth, scale formation, and mechanical failures. WILMAK Engineering offers specialized services for industrial cooling tower design, installation, and maintenance to ensure optimal performance and longevity.",
    imageUrl: "https://images.unsplash.com/photo-1635612014204-b8b39572895d",
    publishedAt: "2024-04-15",
    author: "Michael Otieno, Industrial Systems Engineer"
  },
  {
    id: 10,
    title: "Smart Building Integration for HVAC Systems",
    content: "Smart building technology is revolutionizing how HVAC systems operate, offering unprecedented levels of control, efficiency, and comfort. This article explores how modern HVAC systems can be integrated with building management systems to create intelligent environments that respond to occupancy patterns, weather conditions, and user preferences. From IoT sensors to predictive maintenance algorithms, these technologies are transforming building operations. WILMAK Engineering specializes in implementing smart HVAC solutions that can be seamlessly integrated into new or existing buildings, providing clients with advanced control capabilities and significant energy savings.",
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827",
    publishedAt: "2024-04-28",
    author: "Daniel Mutua, Building Automation Specialist"
  }
];

const BlogStatic = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useMobile();
  
  // Filter posts based on search term
  const filteredPosts = staticBlogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  
  // Extract first paragraph of content
  const getExcerpt = (content: string) => {
    // Return first 150 characters followed by ellipsis
    return content.length > 150 ? `${content.substring(0, 150)}...` : content;
  };

  // Get featured post (most recent)
  const featuredPost = staticBlogPosts[0]; 
  
  // Get remaining posts
  const remainingPosts = filteredPosts.filter(post => post.id !== featuredPost.id);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#003366] to-[#006400] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up">
              Engineering Blog
            </h1>
            <p className="text-xl max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              Industry insights, technical tips, and company updates
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16" data-aos="fade-up">
              <div className="bg-[#E76F00]/10 py-2 px-4 rounded-full text-[#E76F00] font-medium inline-block mb-6">
                Featured Post
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={featuredPost.imageUrl} 
                    alt={featuredPost.title} 
                    className="w-full h-auto"
                  />
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-[#003366]">{featuredPost.title}</h2>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formatDate(featuredPost.publishedAt)}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{featuredPost.author}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600">
                    {getExcerpt(featuredPost.content)}
                  </p>
                  
                  <Button
                    className="bg-[#006400] hover:bg-[#005400] text-white"
                    onClick={() => alert(`Viewing full post: ${featuredPost.title}`)}
                  >
                    Read Article
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-[#003366] mb-8" data-aos="fade-up">
                Latest Articles
              </h2>
              
              {remainingPosts.length > 0 ? (
                remainingPosts.map((post, index) => (
                  <Card 
                    key={post.id} 
                    className="mb-8 overflow-hidden hover:shadow-lg transition-shadow"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          style={{ minHeight: isMobile ? '200px' : '100%' }}
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <h3 className="text-xl font-semibold text-[#003366] mb-3">{post.title}</h3>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{formatDate(post.publishedAt)}</span>
                          </div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            <span>{post.author}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4">
                          {getExcerpt(post.content)}
                        </p>
                        
                        <Button 
                          variant="outline"
                          className="text-[#006400] hover:text-white hover:bg-[#006400] border-[#006400]"
                          onClick={() => alert(`Viewing full post: ${post.title}`)}
                        >
                          Read More
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {searchTerm ? "No matching articles found" : "No articles available"}
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6" data-aos="fade-left">
              {/* Search */}
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4 text-[#003366]">Search Articles</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by keyword..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </Card>
              
              {/* Categories */}
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4 text-[#003366]">Categories</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-[#E76F00]" />
                      <span className="text-gray-600 group-hover:text-[#006400]">Refrigeration</span>
                    </div>
                    <span className="text-gray-400 text-sm">5</span>
                  </div>
                  <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-[#E76F00]" />
                      <span className="text-gray-600 group-hover:text-[#006400]">Air Conditioning</span>
                    </div>
                    <span className="text-gray-400 text-sm">3</span>
                  </div>
                  <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-[#E76F00]" />
                      <span className="text-gray-600 group-hover:text-[#006400]">Ventilation</span>
                    </div>
                    <span className="text-gray-400 text-sm">2</span>
                  </div>
                  <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-[#E76F00]" />
                      <span className="text-gray-600 group-hover:text-[#006400]">LP Gas</span>
                    </div>
                    <span className="text-gray-400 text-sm">1</span>
                  </div>
                </div>
              </Card>
              
              {/* Recent Posts */}
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4 text-[#003366]">Recent Posts</h3>
                <div className="space-y-4">
                  {staticBlogPosts.slice(0, 3).map(post => (
                    <div key={post.id} className="flex items-start space-x-3 group cursor-pointer">
                      <div className="flex-shrink-0 w-12 h-12 rounded overflow-hidden">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 group-hover:text-[#006400] text-sm">
                          {post.title}
                        </h4>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              
              {/* About Blog */}
              <Card className="p-6 bg-[#006400]/5">
                <div className="flex items-center space-x-2 mb-4">
                  <BookOpen className="h-5 w-5 text-[#006400]" />
                  <h3 className="font-semibold text-lg text-[#003366]">About Our Blog</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Stay updated with the latest trends in engineering, technology updates, and insights from our experienced team at WILMAK Engineering.
                </p>
                <Button
                  variant="outline"
                  className="w-full text-[#006400] hover:bg-[#006400] hover:text-white border-[#006400]"
                  onClick={() => window.location.href = "/contact"}
                >
                  Subscribe to Updates
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogStatic;
