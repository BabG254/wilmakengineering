import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="pt-20 min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#003366] mb-4">404 Page Not Found</h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-center">
        <Button 
          size="lg" 
          className="bg-[#006400] hover:bg-[#005400] text-white"
          asChild
        >
          <Link href="/">
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </Button>
        
        <Button 
          size="lg" 
          variant="outline"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Go Back
        </Button>
      </div>
    </div>
  );
}
