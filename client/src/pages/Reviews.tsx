import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import type { Testimonial } from "@shared/schema";
import { Star } from "lucide-react";

const Reviews = () => {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  if (isLoading) {
    return (
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#003366]">Customer Reviews</h1>
          <p className="mt-4 text-lg text-gray-600">
            What our clients say about our engineering excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="hover:shadow-lg transition-shadow duration-300 bg-white"
              data-aos="fade-up"
            >
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-[#E76F00] fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg">{testimonial.content}</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-[#003366]">{testimonial.name}</p>
                  <p className="text-[#006400]">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
