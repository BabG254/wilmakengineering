import { 
  type Project, 
  type Testimonial, 
  type BlogPost, 
  type ContactMessage,
  insertContactMessageSchema,
  insertProjectSchema,
  insertTestimonialSchema,
  insertBlogPostSchema
} from "@shared/schema";

// Define storage interface with CRUD methods
export interface IStorage {
  getAllProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
  createProject(project: Omit<Project, 'id'>): Promise<Project>;
  
  getAllTestimonials(): Promise<Testimonial[]>;
  getTestimonialById(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: Omit<Testimonial, 'id'>): Promise<Testimonial>;
  
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  createBlogPost(blogPost: Omit<BlogPost, 'id'>): Promise<BlogPost>;
  
  createContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  private testimonials: Map<number, Testimonial>;
  private blogPosts: Map<number, BlogPost>;
  private contactMessages: Map<number, ContactMessage>;
  
  private projectId: number;
  private testimonialId: number;
  private blogPostId: number;
  private contactMessageId: number;

  constructor() {
    this.projects = new Map();
    this.testimonials = new Map();
    this.blogPosts = new Map();
    this.contactMessages = new Map();
    
    this.projectId = 1;
    this.testimonialId = 1;
    this.blogPostId = 1;
    this.contactMessageId = 1;
    
    // Add some sample data
    this.initSampleData();
  }
  
  private initSampleData() {
    // Sample Projects
    const sampleProjects = [
      {
        title: "Commercial Refrigeration System",
        description: "Installation of industrial refrigeration system for a major supermarket chain in Nairobi.",
        imageUrl: "https://images.unsplash.com/photo-1607582544956-a793312325c2",
        category: "Refrigeration",
        completionDate: new Date("2023-08-15")
      },
      {
        title: "Hotel HVAC Upgrade",
        description: "Complete overhaul of heating, ventilation, and air conditioning systems for a 5-star hotel.",
        imageUrl: "https://images.unsplash.com/photo-1586813551819-52de34c2548b",
        category: "Air Conditioning",
        completionDate: new Date("2023-05-22")
      },
      {
        title: "Hospital Ventilation System",
        description: "Design and installation of specialized ventilation system for a major hospital in Mombasa.",
        imageUrl: "https://images.unsplash.com/photo-1603728981511-eea7c2e14cdf",
        category: "Ventilation",
        completionDate: new Date("2023-11-30")
      }
    ];
    
    sampleProjects.forEach(project => {
      this.createProject(project);
    });
    
    // Sample Testimonials
    const sampleTestimonials = [
      {
        name: "John Kamau",
        role: "Operations Manager, Kenya Supermarkets Ltd",
        content: "WILMAK Engineering delivered an exceptional refrigeration system that has significantly reduced our energy costs and improved product shelf life.",
        rating: 5
      },
      {
        name: "Sarah Odhiambo",
        role: "General Manager, Royal Blue Hotel",
        content: "The HVAC upgrade by WILMAK has transformed our guest experience. The team was professional and completed the project ahead of schedule.",
        rating: 5
      },
      {
        name: "Dr. Michael Wambua",
        role: "Director, Coastal General Hospital",
        content: "WILMAK's ventilation system has improved air quality in our critical care units. Their attention to healthcare-specific requirements was impressive.",
        rating: 4
      }
    ];
    
    sampleTestimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
    
    // Sample Blog Posts
    const sampleBlogPosts = [
      {
        title: "Energy Efficiency in Commercial Refrigeration",
        content: "In today's world, energy efficiency isn't just good for the environment—it's good for business too. Commercial refrigeration systems can account for a significant portion of a business's energy consumption...",
        imageUrl: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740",
        publishedAt: new Date("2023-09-01"),
        author: "David Njoroge, Chief Engineer"
      },
      {
        title: "The Importance of Regular HVAC Maintenance",
        content: "Regular maintenance of your HVAC systems is crucial for ensuring optimal performance and longevity. In this post, we discuss the key benefits of scheduled maintenance and what it should include...",
        imageUrl: "https://images.unsplash.com/photo-1617104678798-08925113358b",
        publishedAt: new Date("2023-10-15"),
        author: "Jane Mwangi, Technical Director"
      },
      {
        title: "Innovations in Ventilation Technology",
        content: "Ventilation technology has seen remarkable advancements in recent years, with new systems offering improved air quality, energy efficiency, and smart controls...",
        imageUrl: "https://images.unsplash.com/photo-1585503418537-88331351ad99",
        publishedAt: new Date("2023-12-05"),
        author: "Peter Kinyua, Innovation Lead"
      }
    ];
    
    sampleBlogPosts.forEach(blogPost => {
      this.createBlogPost(blogPost);
    });
  }

  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectById(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(project: Omit<Project, 'id'>): Promise<Project> {
    const id = this.projectId++;
    const newProject = { ...project, id };
    this.projects.set(id, newProject);
    return newProject;
  }
  
  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getTestimonialById(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }

  async createTestimonial(testimonial: Omit<Testimonial, 'id'>): Promise<Testimonial> {
    const id = this.testimonialId++;
    const newTestimonial = { ...testimonial, id };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }
  
  // Blog post methods
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(blogPost: Omit<BlogPost, 'id'>): Promise<BlogPost> {
    const id = this.blogPostId++;
    const newBlogPost = { ...blogPost, id };
    this.blogPosts.set(id, newBlogPost);
    return newBlogPost;
  }
  
  // Contact message methods
  async createContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<ContactMessage> {
    const id = this.contactMessageId++;
    const newMessage = { 
      ...message, 
      id, 
      createdAt: new Date() 
    };
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }
}

export const storage = new MemStorage();
