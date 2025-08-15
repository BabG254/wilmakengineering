// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  projects;
  testimonials;
  blogPosts;
  contactMessages;
  projectId;
  testimonialId;
  blogPostId;
  contactMessageId;
  constructor() {
    this.projects = /* @__PURE__ */ new Map();
    this.testimonials = /* @__PURE__ */ new Map();
    this.blogPosts = /* @__PURE__ */ new Map();
    this.contactMessages = /* @__PURE__ */ new Map();
    this.projectId = 1;
    this.testimonialId = 1;
    this.blogPostId = 1;
    this.contactMessageId = 1;
    this.initSampleData();
  }
  initSampleData() {
    const sampleProjects = [
      {
        title: "Commercial Refrigeration System",
        description: "Installation of industrial refrigeration system for a major supermarket chain in Nairobi. This project involved designing and implementing a custom cooling solution that reduced energy consumption by 30% while maintaining optimal temperature conditions for food preservation.",
        imageUrl: "https://images.unsplash.com/photo-1607582544956-a793312325c2",
        category: "Refrigeration",
        completionDate: /* @__PURE__ */ new Date("2023-08-15")
      },
      {
        title: "Hotel HVAC Upgrade",
        description: "Complete overhaul of heating, ventilation, and air conditioning systems for a 5-star hotel. The new system features smart temperature control, improved air filtration, and energy-efficient components that resulted in a 25% reduction in operational costs.",
        imageUrl: "https://images.unsplash.com/photo-1586813551819-52de34c2548b",
        category: "Air Conditioning",
        completionDate: /* @__PURE__ */ new Date("2023-05-22")
      },
      {
        title: "Hospital Ventilation System",
        description: "Design and installation of specialized ventilation system for a major hospital in Mombasa. The system includes HEPA filtration, negative pressure rooms for isolation areas, and precise humidity control to maintain sterile environments in operating theaters.",
        imageUrl: "https://images.unsplash.com/photo-1603728981511-eea7c2e14cdf",
        category: "Ventilation",
        completionDate: /* @__PURE__ */ new Date("2023-11-30")
      },
      {
        title: "Restaurant Kitchen Equipment Installation",
        description: "Comprehensive kitchen equipment setup for a high-end restaurant in Nairobi. The project included commercial-grade refrigeration, ventilation systems, and cooking equipment installation, all optimized for energy efficiency and workflow optimization.",
        imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f",
        category: "Kitchen Equipment",
        completionDate: /* @__PURE__ */ new Date("2024-01-18")
      },
      {
        title: "Industrial LP Gas System",
        description: "Design and installation of an LP gas system for a manufacturing facility. This included storage tanks, distribution pipelines, safety systems, and monitoring equipment to ensure reliable and safe gas supply for industrial processes.",
        imageUrl: "https://images.unsplash.com/photo-1626446525425-d15c4ca62d27",
        category: "LP Gas",
        completionDate: /* @__PURE__ */ new Date("2024-03-05")
      },
      {
        title: "Corporate Office HVAC Renovation",
        description: "Complete renovation of the air conditioning and ventilation system for a 10-floor corporate headquarters in Nairobi CBD. The project focused on energy efficiency, improved air quality, and zoned climate control for different office areas.",
        imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12",
        category: "Air Conditioning",
        completionDate: /* @__PURE__ */ new Date("2023-09-12")
      },
      {
        title: "Cold Storage Facility",
        description: "Construction of a large-scale cold storage facility for a food distribution company. The project included multiple temperature zones, advanced insulation, energy-efficient refrigeration systems, and digital monitoring solutions.",
        imageUrl: "https://images.unsplash.com/photo-1542013936693-884638332954",
        category: "Refrigeration",
        completionDate: /* @__PURE__ */ new Date("2024-02-20")
      },
      {
        title: "School Ventilation Upgrade",
        description: "Modernization of ventilation systems for a large educational institution. The project improved air circulation, reduced CO2 levels in classrooms, and implemented energy recovery ventilators to maintain air quality while minimizing energy costs.",
        imageUrl: "https://images.unsplash.com/photo-1623743932725-8d99c82e90f7",
        category: "Ventilation",
        completionDate: /* @__PURE__ */ new Date("2024-04-10")
      },
      {
        title: "Shopping Mall HVAC System",
        description: "Installation of a comprehensive HVAC solution for a new shopping mall in Kisumu. The system features variable refrigerant flow technology, digital controls, and integration with the building management system for optimal energy efficiency.",
        imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
        category: "Air Conditioning",
        completionDate: /* @__PURE__ */ new Date("2023-10-25")
      }
    ];
    sampleProjects.forEach((project) => {
      this.createProject(project);
    });
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
      },
      {
        name: "Robert Maina",
        role: "Facilities Director, Sunset Plaza Mall",
        content: "We've worked with several engineering firms, but WILMAK stands out for their technical expertise and customer service. The air conditioning system they installed has operated flawlessly for over a year.",
        rating: 5
      },
      {
        name: "Elizabeth Njeri",
        role: "CEO, Fresh Foods Distribution",
        content: "Our cold storage facility designed by WILMAK has been a game-changer for our business. The attention to detail and quality of installation exceeded our expectations.",
        rating: 5
      }
    ];
    sampleTestimonials.forEach((testimonial) => {
      this.createTestimonial(testimonial);
    });
    const sampleBlogPosts = [
      {
        title: "Energy Efficiency in Commercial Refrigeration",
        content: "In today's world, energy efficiency isn't just good for the environment\u2014it's good for business too. Commercial refrigeration systems can account for a significant portion of a business's energy consumption. At WILMAK Engineering, we specialize in designing and installing energy-efficient refrigeration systems that can significantly reduce operational costs without compromising performance.\n\nModern refrigeration technology offers numerous ways to enhance efficiency. Variable speed compressors adjust their operation based on cooling demand, smart defrost systems only run when needed, and advanced insulation materials minimize heat transfer. Additionally, using environmentally friendly refrigerants not only reduces your carbon footprint but can also improve system efficiency.\n\nOne of our recent projects for a supermarket chain in Nairobi demonstrated these principles in action. By implementing a state-of-the-art refrigeration system with heat recovery capabilities, we helped the client reduce their energy consumption by 32% compared to their previous system. The recovered heat is now used for water heating, further enhancing overall building efficiency.\n\nWhen considering an upgrade to your commercial refrigeration system, it's important to evaluate the entire lifecycle cost rather than just the initial investment. More efficient systems typically cost more upfront but deliver substantial savings over time through reduced energy bills and maintenance costs.\n\nContact our team today to learn how we can help optimize your refrigeration systems for maximum efficiency and performance.",
        imageUrl: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740",
        publishedAt: /* @__PURE__ */ new Date("2023-09-01"),
        author: "David Njoroge, Chief Engineer"
      },
      {
        title: "The Importance of Regular HVAC Maintenance",
        content: "Regular maintenance of your HVAC systems is crucial for ensuring optimal performance and longevity. In this post, we discuss the key benefits of scheduled maintenance and what it should include.\n\nPreventive maintenance is far more cost-effective than emergency repairs. When HVAC systems break down unexpectedly, businesses face not only repair costs but also potential losses due to downtime and uncomfortable conditions for employees and customers. Regular maintenance helps identify potential issues before they become major problems.\n\nA well-maintained HVAC system operates more efficiently, consuming less energy while providing better climate control. Studies show that proper maintenance can reduce energy consumption by 15-20% compared to neglected systems. This translates directly to lower utility bills and a reduced environmental impact.\n\nAt WILMAK Engineering, our comprehensive maintenance program includes:\n\n1. Inspection and cleaning of all components\n2. Lubrication of moving parts\n3. Checking and calibrating thermostats\n4. Testing system controls\n5. Inspecting ductwork for leaks\n6. Checking refrigerant levels\n7. Cleaning or replacing filters\n8. Examining electrical connections\n\nWe recommend scheduling maintenance at least twice a year\u2014ideally before the hottest and coolest seasons\u2014to ensure your system is ready for peak demand periods. For facilities with critical climate control needs, such as hospitals or data centers, more frequent maintenance may be advisable.\n\nInvesting in a maintenance agreement with a reputable provider like WILMAK Engineering ensures that your HVAC systems receive regular professional attention without you having to remember scheduling. This proactive approach extends equipment life, maintains warranty coverage, and provides peace of mind.",
        imageUrl: "https://images.unsplash.com/photo-1617104678798-08925113358b",
        publishedAt: /* @__PURE__ */ new Date("2023-10-15"),
        author: "Jane Mwangi, Technical Director"
      },
      {
        title: "Innovations in Ventilation Technology",
        content: "Ventilation technology has seen remarkable advancements in recent years, with new systems offering improved air quality, energy efficiency, and smart controls. As specialists in ventilation systems, WILMAK Engineering stays at the forefront of these innovations to provide our clients with cutting-edge solutions.\n\nEnergy Recovery Ventilation (ERV) and Heat Recovery Ventilation (HRV) systems have revolutionized how we approach air exchange in buildings. These systems recover heat or coolness from exhaust air before it leaves the building, transferring it to incoming fresh air. This significantly reduces the energy required to condition incoming air, resulting in substantial energy savings while maintaining excellent indoor air quality.\n\nDemand-controlled ventilation uses sensors to monitor occupancy levels and air quality metrics such as CO2, humidity, and VOCs. The system automatically adjusts ventilation rates based on real-time data, providing appropriate air exchange without wasting energy on over-ventilation when spaces are unoccupied or under-utilized.\n\nUltraviolet Germicidal Irradiation (UVGI) technology incorporated into ventilation systems helps eliminate airborne pathogens, including bacteria, viruses, and mold spores. This is particularly valuable in healthcare facilities, schools, and other high-occupancy buildings where preventing the spread of infectious diseases is critical.\n\nAdvanced filtration technologies, including HEPA filters and electrostatic precipitators, remove smaller particles from the air than conventional filters, creating healthier indoor environments. These systems are increasingly important as awareness of indoor air quality's impact on health and productivity continues to grow.\n\nAt WILMAK Engineering, we evaluate each client's specific needs before recommending ventilation solutions. Factors including building use, occupancy patterns, local climate, and energy efficiency goals all influence the optimal system design. Contact us to learn how innovative ventilation technology can improve your facility's air quality and energy performance.",
        imageUrl: "https://images.unsplash.com/photo-1585503418537-88331351ad99",
        publishedAt: /* @__PURE__ */ new Date("2023-12-05"),
        author: "Peter Kinyua, Innovation Lead"
      },
      {
        title: "Selecting the Right Commercial Kitchen Equipment",
        content: "Selecting appropriate commercial kitchen equipment is a critical decision that impacts operational efficiency, food quality, and energy consumption. As specialists in kitchen equipment installation, WILMAK Engineering offers expert guidance on making these important choices.\n\nCommercial kitchens have unique ventilation requirements due to heat, moisture, and cooking byproducts. A properly designed kitchen ventilation system not only removes contaminants and excess heat but also contributes to a comfortable working environment and ensures compliance with health and safety regulations.\n\nModern commercial refrigeration offers various options including reach-in units, walk-in coolers and freezers, under-counter refrigeration, and specialized units like blast chillers. The right combination depends on your menu, production volume, and kitchen workflow. Energy-efficient models may cost more initially but deliver significant savings over their operational lifetime.\n\nWhen selecting cooking equipment, consider not only current needs but future menu flexibility. Combination cooking systems that offer multiple functions in a single unit can maximize space efficiency in smaller kitchens. Additionally, equipment with programmable controls helps ensure consistent food quality regardless of which staff member is operating it.\n\nEnsuring proper utility connections for all equipment is essential. Gas, electrical, water, and drainage requirements must be carefully planned during the design phase. WILMAK's technical team evaluates your facility's infrastructure to confirm it can support your equipment selections or recommends necessary upgrades.\n\nSustainability considerations are increasingly important in commercial kitchens. Energy Star-rated equipment, water-saving technologies, and heat recovery systems can substantially reduce utility costs and environmental impact. Many businesses find that these investments pay for themselves through operational savings while also supporting environmental commitments.\n\nWILMAK Engineering provides comprehensive kitchen equipment services from initial consultation and design through installation and maintenance. Our experience across numerous restaurant and institutional kitchen projects ensures we can help you create a functional, efficient kitchen that supports your culinary operations.",
        imageUrl: "https://images.unsplash.com/photo-1588542997599-d74953c59498",
        publishedAt: /* @__PURE__ */ new Date("2024-01-20"),
        author: "Stephen Kimani, Project Manager"
      },
      {
        title: "Safety Considerations for LP Gas Installations",
        content: "LP (Liquefied Petroleum) gas installations require careful planning and adherence to strict safety standards to prevent hazardous situations. As specialists in LP gas systems, WILMAK Engineering prioritizes safety in every installation and maintenance service we provide.\n\nProper storage tank placement is the foundation of a safe LP gas system. Tanks must be positioned at safe distances from buildings, property lines, sources of ignition, and areas of high traffic. They should be placed on stable, non-combustible surfaces and protected from vehicle impact where necessary.\n\nGas detection systems provide an essential early warning of potential leaks. Modern detectors can automatically trigger alarms, shut off gas supply, and even notify monitoring services when gas is detected. These systems are particularly important for indoor installations and facilities with intermittent occupancy.\n\nRegular professional inspection of LP gas systems is not just a good practice\u2014it's often required by regulations. These inspections check for proper functioning of pressure regulators, leak detection in piping and connections, condition of storage tanks, and testing of safety devices. WILMAK's certified technicians conduct thorough evaluations to identify and address potential issues before they become safety hazards.\n\nStaff training is a critical component of LP gas safety. Employees should understand basic gas safety principles, know how to respond to gas odors or alarms, and be familiar with emergency shutdown procedures. We provide comprehensive training sessions for facility personnel as part of our installation service.\n\nDocumentation and record-keeping may seem mundane, but they're essential aspects of gas safety management. Maintaining accurate records of installations, modifications, inspections, and incidents helps ensure continuous safe operation and demonstrates compliance with regulatory requirements.\n\nWILMAK Engineering's LP gas services include system design, installation, inspection, maintenance, and staff training. Our team stays current with industry standards and regulations to deliver gas systems that operate safely and efficiently. Contact us to learn how we can help ensure your LP gas installation meets the highest safety standards.",
        imageUrl: "https://images.unsplash.com/photo-1623911329432-e2cbd7760e5b",
        publishedAt: /* @__PURE__ */ new Date("2024-02-10"),
        author: "George Omondi, Safety Compliance Manager"
      },
      {
        title: "Designing HVAC Systems for Healthcare Facilities",
        content: "Healthcare facilities present unique challenges for HVAC design due to their critical requirements for infection control, patient comfort, and consistent environmental conditions. WILMAK Engineering specializes in creating HVAC solutions that address these specialized needs.\n\nInfection control is paramount in healthcare environments. Properly designed HVAC systems help prevent the spread of airborne pathogens through strategies such as negative pressure isolation rooms, appropriate air exchange rates, directional airflow, and high-efficiency filtration. These features are particularly crucial in surgical suites, isolation rooms, and other critical care areas.\n\nDifferent areas within healthcare facilities require specific environmental conditions. Operating rooms need precise temperature and humidity control, pharmacies may require positive pressure to prevent contamination, and patient rooms must prioritize comfort while maintaining appropriate ventilation. A well-designed HVAC system addresses these varied requirements through careful zoning and controls.\n\nReliability is non-negotiable in healthcare HVAC systems. Backup systems, redundant components, and emergency power connections ensure continuous operation even during power outages or equipment failures. Regular maintenance and monitoring help prevent unexpected downtime in these critical systems.\n\nEnergy efficiency remains important despite the demanding requirements of healthcare facilities. Strategies such as heat recovery, variable air volume systems, and intelligent controls help minimize energy consumption without compromising performance. Many hospitals find that investments in efficiency measures yield significant operational savings over time.\n\nCompliance with healthcare-specific standards and regulations is essential. WILMAK's design team stays current with requirements from organizations such as ASHRAE, AIA, and local health departments to ensure that all systems meet or exceed applicable standards.\n\nWILMAK Engineering has extensive experience designing and installing HVAC systems for hospitals, clinics, and specialized healthcare facilities throughout Kenya. Our comprehensive approach considers not only technical requirements but also operational needs, future flexibility, and lifecycle costs. Contact us to discuss how we can support your healthcare facility's environmental control needs.",
        imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514",
        publishedAt: /* @__PURE__ */ new Date("2024-03-15"),
        author: "Dr. Christine Wangari, Healthcare Solutions Specialist"
      },
      {
        title: "Sustainable Cooling Solutions for the African Climate",
        content: "Africa's hot climate presents unique cooling challenges that require innovative, sustainable solutions. At WILMAK Engineering, we specialize in developing cooling systems that balance performance, energy efficiency, and environmental responsibility for the specific conditions of the African continent.\n\nPassive cooling strategies can significantly reduce the energy demands of mechanical cooling systems. Techniques such as strategic building orientation, appropriate insulation, shading devices, natural ventilation, and thermal mass can work with the local climate rather than against it. Incorporating these passive approaches into building design provides a solid foundation for efficient cooling.\n\nEvaporative cooling offers an energy-efficient option for dry climates, using the natural cooling effect of water evaporation to reduce air temperature. Direct and indirect evaporative cooling systems can reduce energy consumption by up to 80% compared to conventional air conditioning in appropriate conditions. This approach is particularly valuable in the drier regions of Kenya and East Africa.\n\nSolar cooling technologies are increasingly viable in Africa given the abundant sunshine available. Absorption and adsorption cooling systems can use solar thermal energy to drive the cooling process, while photovoltaic panels can power efficient electric cooling systems. These solar-driven solutions help address both energy access and sustainability concerns.\n\nDistrict cooling systems, where centralized plants serve multiple buildings through a network of insulated pipes, offer economies of scale and operational efficiencies for dense urban developments. Though requiring significant initial investment, these systems can substantially reduce energy consumption and peak electricity demand across communities.\n\nAdaptive comfort standards recognize that people living in hot climates typically have different thermal comfort expectations than those in temperate regions. Designing systems with these adaptive standards in mind can avoid overcooling spaces, saving energy while maintaining appropriate comfort levels for local populations.\n\nWILMAK Engineering integrates these sustainable approaches with conventional cooling technologies to create holistic solutions tailored to each project's specific context. Our experience across diverse African environments informs practical, effective cooling strategies that minimize environmental impact while delivering reliable performance.",
        imageUrl: "https://images.unsplash.com/photo-1595356700395-6f14b5c1f33f",
        publishedAt: /* @__PURE__ */ new Date("2024-04-22"),
        author: "Samuel Muthoni, Sustainability Director"
      }
    ];
    sampleBlogPosts.forEach((blogPost) => {
      this.createBlogPost(blogPost);
    });
  }
  // Project methods
  async getAllProjects() {
    return Array.from(this.projects.values());
  }
  async getProjectById(id) {
    return this.projects.get(id);
  }
  async createProject(project) {
    const id = this.projectId++;
    const newProject = { ...project, id };
    this.projects.set(id, newProject);
    return newProject;
  }
  // Testimonial methods
  async getAllTestimonials() {
    return Array.from(this.testimonials.values());
  }
  async getTestimonialById(id) {
    return this.testimonials.get(id);
  }
  async createTestimonial(testimonial) {
    const id = this.testimonialId++;
    const newTestimonial = { ...testimonial, id };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }
  // Blog post methods
  async getAllBlogPosts() {
    return Array.from(this.blogPosts.values());
  }
  async getBlogPostById(id) {
    return this.blogPosts.get(id);
  }
  async createBlogPost(blogPost) {
    const id = this.blogPostId++;
    const newBlogPost = { ...blogPost, id };
    this.blogPosts.set(id, newBlogPost);
    return newBlogPost;
  }
  // Contact message methods
  async createContactMessage(message) {
    const id = this.contactMessageId++;
    const newMessage = {
      ...message,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  completionDate: timestamp("completion_date").notNull()
});
var testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull()
});
var blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url").notNull(),
  publishedAt: timestamp("published_at").notNull(),
  author: text("author").notNull()
});
var contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var insertProjectSchema = createInsertSchema(projects);
var insertTestimonialSchema = createInsertSchema(testimonials);
var insertBlogPostSchema = createInsertSchema(blogPosts);
var insertContactMessageSchema = createInsertSchema(contactMessages).omit({ createdAt: true });

// server/routes.ts
import { ZodError } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/projects", async (_req, res) => {
    try {
      const projects2 = await storage.getAllProjects();
      res.json(projects2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });
  app2.get("/api/testimonials", async (_req, res) => {
    try {
      const testimonials2 = await storage.getAllTestimonials();
      res.json(testimonials2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });
  app2.get("/api/blog-posts", async (_req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(data);
      res.json(message);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid form data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to send message" });
      }
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
