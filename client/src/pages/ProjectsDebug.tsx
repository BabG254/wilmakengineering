import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@shared/schema";

const ProjectsDebug = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log("Fetching projects...");
        const response = await fetch("/api/projects");
        console.log("Response status:", response.status);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Projects data:", data);
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  if (loading) {
    return <div className="p-20 text-center">Loading projects...</div>;
  }

  if (error) {
    return <div className="p-20 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-20">
      <h1 className="text-2xl font-bold mb-4">Projects Debug Page</h1>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(projects, null, 2)}
      </pre>
    </div>
  );
};

export default ProjectsDebug;
