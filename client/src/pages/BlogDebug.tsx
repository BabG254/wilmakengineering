import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import type { BlogPost } from "@shared/schema";

const BlogDebug = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        console.log("Fetching blog posts...");
        const response = await fetch("/api/blog-posts");
        console.log("Response status:", response.status);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Blog posts data:", data);
        setBlogPosts(data);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogPosts();
  }, []);

  if (loading) {
    return <div className="p-20 text-center">Loading blog posts...</div>;
  }

  if (error) {
    return <div className="p-20 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-20">
      <h1 className="text-2xl font-bold mb-4">Blog Posts Debug Page</h1>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(blogPosts, null, 2)}
      </pre>
    </div>
  );
};

export default BlogDebug;
