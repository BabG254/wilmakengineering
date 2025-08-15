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
    content: "In today's world, energy efficiency isn't just good for the environment—it's good for business too. Commercial refrigeration systems can account for a significant portion of a business's energy consumption. At WILMAK Engineering, we specialize in designing and installing energy-efficient refrigeration systems that can significantly reduce operational costs without compromising performance.",
    imageUrl: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740",
    publishedAt: "2023-09-01",
    author: "David Njoroge, Chief Engineer"
  },
  {
    id: 2,
    title: "The Importance of Regular HVAC Maintenance",
    content: "Regular maintenance of your HVAC systems is crucial for ensuring optimal performance and longevity. In this post, we discuss the key benefits of scheduled maintenance and what it should include. Preventive maintenance is far more cost-effective than emergency repairs.",
    imageUrl: "https://images.unsplash.com/photo-1617104678798-08925113358b",
    publishedAt: "2023-10-15",
    author: "Jane Mwangi, Technical Director"
  },
  {
    id: 3,
    title: "Innovations in Ventilation Technology",
    content: "Ventilation technology has seen remarkable advancements in recent years, with new systems offering improved air quality, energy efficiency, and smart controls. As specialists in ventilation systems, WILMAK Engineering stays at the forefront of these innovations to provide our clients with cutting-edge solutions.",
    imageUrl: "https://images.unsplash.com/photo-1585503418537-88331351ad99",
    publishedAt: "2023-12-05",
    author: "Peter Kinyua, Innovation Lead"
  },
  {
    id: 4,
    title: "Selecting the Right Commercial Kitchen Equipment",
    content: "Selecting appropriate commercial kitchen equipment is a critical decision that impacts operational efficiency, food quality, and energy consumption. As specialists in kitchen equipment installation, WILMAK Engineering offers expert guidance on making these important choices.",
    imageUrl: "https://images.unsplash.com/photo-1588542997599-d74953c59498",
    publishedAt: "2024-01-20",
    author: "Stephen Kimani, Project Manager"
  },
  {
    id: 5,
    title: "Safety Considerations for LP Gas Installations",
    content: "LP (Liquefied Petroleum) gas installations require careful planning and adherence to strict safety standards to prevent hazardous situations. As specialists in LP gas systems, WILMAK Engineering prioritizes safety in every installation and maintenance service we provide.",
    imageUrl: "https://images.unsplash.com/photo-1623911329432-e2cbd7760e5b",
    publishedAt: "2024-02-10",
    author: "George Omondi, Safety Compliance Manager"
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
