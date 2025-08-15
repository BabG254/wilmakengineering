import { Loader2 } from "lucide-react";

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-64">
      <div className="flex flex-col items-center">
        <Loader2 className="h-10 w-10 text-[#006400] animate-spin" />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export const PageSkeleton = () => {
  return (
    <div className="pt-20 animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="bg-gray-200 h-64 w-full"></div>
      
      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="h-10 bg-gray-200 w-1/3 mx-auto mb-6 rounded"></div>
        <div className="h-6 bg-gray-200 w-1/2 mx-auto mb-12 rounded"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-100 rounded-lg h-64"></div>
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="h-8 bg-gray-200 w-1/4 mb-6 rounded"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 w-full rounded"></div>
          <div className="h-4 bg-gray-200 w-5/6 rounded"></div>
          <div className="h-4 bg-gray-200 w-4/6 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default { LoadingSpinner, PageSkeleton };
