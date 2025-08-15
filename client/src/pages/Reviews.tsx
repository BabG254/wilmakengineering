import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import type { Testimonial } from "@shared/schema";
import { Star, MessageSquareQuote, MessageCircle, SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTestimonialSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

const Reviews = () => {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });
  
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(insertTestimonialSchema),
    defaultValues: {
      name: "",
      role: "",
      content: "",
      rating: 5
    },
  });
  
  const onSubmit = form.handleSubmit((data) => {
    // In a real implementation, this would submit to an API
    toast({
      title: "Thank you for your feedback!",
      description: "Your review has been submitted for approval.",
    });
    form.reset();
  });

  if (isLoading) {
    return (
      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#003366] to-[#006400] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up">
                Customer Reviews
              </h1>
              <p className="text-xl max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                What our clients say about our engineering excellence
              </p>
            </div>
          </div>
        </section>
        
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <Card key={n} className="bg-white">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                    <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#003366] to-[#006400] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up">
              Customer Reviews
            </h1>
            <p className="text-xl max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              What our clients say about our engineering excellence
            </p>
          </div>
        </div>
      </section>

      {/* Featured Review */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {testimonials && testimonials.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-8 mb-16 relative" data-aos="fade-up">
              <div className="absolute -top-6 left-10 bg-[#E76F00] text-white p-3 rounded-full">
                <MessageSquareQuote className="h-6 w-6" />
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/4 flex justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#003366] to-[#006400] flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {testimonials[0]?.name?.charAt(0) || "W"}
                    </span>
                  </div>
                </div>
                
                <div className="w-full md:w-3/4">
                  <div className="flex mb-4">
                    {[...Array(testimonials[0]?.rating || 5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-6 w-6 text-[#E76F00] fill-current"
                      />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-6 text-xl italic">"{testimonials[0]?.content}"</p>
                  
                  <div className="border-t pt-4">
                    <p className="font-semibold text-[#003366] text-lg">{testimonials[0]?.name}</p>
                    <p className="text-[#006400]">{testimonials[0]?.role}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-[#003366]">What Our Clients Say</h2>
            <p className="mt-4 text-lg text-gray-600">
              We take pride in our client relationships and the feedback they provide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials?.slice(1).map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className="hover:shadow-lg transition-shadow duration-300 bg-white"
                data-aos="fade-up"
                data-aos-delay={index * 100}
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
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-[#003366]">{testimonial.name}</p>
                    <p className="text-[#006400]">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leave a Review Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-up">
            <div className="inline-flex items-center space-x-2 mb-4">
              <MessageCircle className="h-6 w-6 text-[#E76F00]" />
              <h2 className="text-3xl font-bold text-[#003366]">Share Your Experience</h2>
            </div>
            <p className="text-lg text-gray-600">
              Your feedback helps us improve and serves as valuable information for other clients
            </p>
          </div>

          <Card className="p-6" data-aos="fade-up">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    {...form.register("name")}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#006400] focus:ring-[#006400]"
                  />
                  {form.formState.errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {form.formState.errors.name.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Role/Company
                  </label>
                  <input
                    {...form.register("role")}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#006400] focus:ring-[#006400]"
                  />
                  {form.formState.errors.role && (
                    <p className="mt-1 text-sm text-red-600">
                      {form.formState.errors.role.message as string}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Review
                </label>
                <textarea
                  {...form.register("content")}
                  rows={5}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#006400] focus:ring-[#006400]"
                />
                {form.formState.errors.content && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.content.message as string}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Rating
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      className="focus:outline-none"
                      onClick={() => form.setValue("rating", rating)}
                    >
                      <Star
                        className={`h-8 w-8 ${
                          (form.watch("rating") || 5) >= rating
                            ? "text-[#E76F00] fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="bg-[#006400] hover:bg-[#005400] text-white w-full"
              >
                <SendHorizontal className="mr-2 h-5 w-5" />
                Submit Review
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
