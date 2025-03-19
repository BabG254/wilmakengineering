import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-[90vh] flex items-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1581092335397-9583eb92d232')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/90 to-[#006400]/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl" data-aos="fade-up">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Engineering Excellence at Your Service
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            WILMAK Engineering Services Ltd delivers cutting-edge solutions in Refrigeration, 
            Air Conditioning, and comprehensive engineering services. Trust our expertise 
            for all your technical needs.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-[#E76F00] hover:bg-[#D65F00] text-white"
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get in Touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              className="bg-white text-[#003366] hover:bg-gray-100"
              onClick={() => window.location.href = "/projects"}
            >
              View Our Projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;