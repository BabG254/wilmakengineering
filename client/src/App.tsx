import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import Chatbot from "@/components/shared/Chatbot";
import ScrollToTop from "@/components/shared/ScrollToTop";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import Blog from "@/pages/Blog";
import Reviews from "@/pages/Reviews";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";
import ProjectsDebug from "@/pages/ProjectsDebug";
import ProjectsStatic from "@/pages/ProjectsStatic";
import BlogDebug from "@/pages/BlogDebug";
import BlogStatic from "@/pages/BlogStatic";

function Router() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up a timer to stop showing the loading state after a few seconds
    // This prevents a blank screen if there's an issue with data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#006400] mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/projects" component={ProjectsStatic} />
          <Route path="/projects-debug" component={ProjectsDebug} />
          <Route path="/blog" component={BlogStatic} />
          <Route path="/blog-debug" component={BlogDebug} />
          <Route path="/reviews" component={Reviews} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <ScrollToTop />
      <WhatsAppButton />
      <Chatbot />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;