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
        description: "Installation of industrial refrigeration system for a major supermarket chain in Nairobi.",
        imageUrl: "https://images.unsplash.com/photo-1607582544956-a793312325c2",
        category: "Refrigeration",
        completionDate: /* @__PURE__ */ new Date("2023-08-15")
      },
      {
        title: "Hotel HVAC Upgrade",
        description: "Complete overhaul of heating, ventilation, and air conditioning systems for a 5-star hotel.",
        imageUrl: "https://images.unsplash.com/photo-1586813551819-52de34c2548b",
        category: "Air Conditioning",
        completionDate: /* @__PURE__ */ new Date("2023-05-22")
      },
      {
        title: "Hospital Ventilation System",
        description: "Design and installation of specialized ventilation system for a major hospital in Mombasa.",
        imageUrl: "https://images.unsplash.com/photo-1603728981511-eea7c2e14cdf",
        category: "Ventilation",
        completionDate: /* @__PURE__ */ new Date("2023-11-30")
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
      }
    ];
    sampleTestimonials.forEach((testimonial) => {
      this.createTestimonial(testimonial);
    });
    const sampleBlogPosts = [
      {
        title: "Energy Efficiency in Commercial Refrigeration",
        content: "In today's world, energy efficiency isn't just good for the environment\u2014it's good for business too. Commercial refrigeration systems can account for a significant portion of a business's energy consumption...",
        imageUrl: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740",
        publishedAt: /* @__PURE__ */ new Date("2023-09-01"),
        author: "David Njoroge, Chief Engineer"
      },
      {
        title: "The Importance of Regular HVAC Maintenance",
        content: "Regular maintenance of your HVAC systems is crucial for ensuring optimal performance and longevity. In this post, we discuss the key benefits of scheduled maintenance and what it should include...",
        imageUrl: "https://images.unsplash.com/photo-1617104678798-08925113358b",
        publishedAt: /* @__PURE__ */ new Date("2023-10-15"),
        author: "Jane Mwangi, Technical Director"
      },
      {
        title: "Innovations in Ventilation Technology",
        content: "Ventilation technology has seen remarkable advancements in recent years, with new systems offering improved air quality, energy efficiency, and smart controls...",
        imageUrl: "https://images.unsplash.com/photo-1585503418537-88331351ad99",
        publishedAt: /* @__PURE__ */ new Date("2023-12-05"),
        author: "Peter Kinyua, Innovation Lead"
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
