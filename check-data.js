import { storage } from './server/storage.js';

async function checkData() {
  console.log("Checking data in storage...");
  
  // Check projects
  const projects = await storage.getAllProjects();
  console.log(`Projects: ${projects.length}`);
  if (projects.length > 0) {
    console.log("First project:", projects[0].title);
  }
  
  // Check blog posts
  const posts = await storage.getAllBlogPosts();
  console.log(`Blog posts: ${posts.length}`);
  if (posts.length > 0) {
    console.log("First blog post:", posts[0].title);
  }
  
  // Check testimonials
  const testimonials = await storage.getAllTestimonials();
  console.log(`Testimonials: ${testimonials.length}`);
}

checkData().catch(console.error);
