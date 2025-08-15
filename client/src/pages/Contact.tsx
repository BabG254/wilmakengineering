import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  Building, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram 
} from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    contactMutation.mutate(data);
  });

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#003366] to-[#006400] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-aos="fade-up">
              Contact Us
            </h1>
            <p className="text-xl max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              Get in touch with our team for any inquiries or service requests
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div data-aos="fade-right">
              <h2 className="text-2xl font-bold text-[#003366] mb-6">Send Us a Message</h2>
              
              <Card className="p-6">
                <form onSubmit={onSubmit} className="space-y-6">
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
                      Email Address
                    </label>
                    <input
                      {...form.register("email")}
                      type="email"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#006400] focus:ring-[#006400]"
                    />
                    {form.formState.errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.email.message as string}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      {...form.register("subject")}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#006400] focus:ring-[#006400]"
                    />
                    {form.formState.errors.subject && (
                      <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.subject.message as string}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      {...form.register("message")}
                      rows={5}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#006400] focus:ring-[#006400]"
                    />
                    {form.formState.errors.message && (
                      <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.message.message as string}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#006400] hover:bg-[#005400] text-white"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? "Sending..." : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>
            
            {/* Contact Info and Map */}
            <div data-aos="fade-left">
              <h2 className="text-2xl font-bold text-[#003366] mb-6">Contact Information</h2>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-[#E76F00]/10 p-3 rounded-full mr-4">
                      <MapPin className="w-6 h-6 text-[#E76F00]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-[#003366] mb-1">Our Address</h3>
                      <p className="text-gray-600">P.O Box 42822-00100, Off Kirinyaga Road, Nairobi</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#E76F00]/10 p-3 rounded-full mr-4">
                      <Phone className="w-6 h-6 text-[#E76F00]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-[#003366] mb-1">Phone Numbers</h3>
                      <p className="text-gray-600">0720821196 / 0736471100</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#E76F00]/10 p-3 rounded-full mr-4">
                      <Mail className="w-6 h-6 text-[#E76F00]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-[#003366] mb-1">Email Address</h3>
                      <p className="text-gray-600">wilmak.engeering@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#E76F00]/10 p-3 rounded-full mr-4">
                      <Building className="w-6 h-6 text-[#E76F00]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-[#003366] mb-1">Company Name</h3>
                      <p className="text-gray-600">WILMAK ENGINEERING SERVICES LTD</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#E76F00]/10 p-3 rounded-full mr-4">
                      <Clock className="w-6 h-6 text-[#E76F00]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-[#003366] mb-1">Working Hours</h3>
                      <p className="text-gray-600">Monday to Friday: 8am - 5pm</p>
                      <p className="text-gray-600">Saturday: 9am - 1pm</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-[#003366] mb-4">Connect With Us</h2>
              <div className="flex space-x-4 mb-8">
                <a 
                  href="#" 
                  className="bg-[#1877F2] text-white p-3 rounded-full hover:opacity-80 transition-opacity"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a 
                  href="#" 
                  className="bg-[#1DA1F2] text-white p-3 rounded-full hover:opacity-80 transition-opacity"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a 
                  href="#" 
                  className="bg-[#0A66C2] text-white p-3 rounded-full hover:opacity-80 transition-opacity"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a 
                  href="#" 
                  className="bg-[#E4405F] text-white p-3 rounded-full hover:opacity-80 transition-opacity"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
              
              {/* Google Map */}
              <div className="rounded-lg overflow-hidden shadow-md">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.23628617053!2d36.80978!3d-1.28868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d75e1e1e05%3A0xd9aa8298bc06bbe7!2sKirinyaga%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1684940542939!5m2!1sen!2ske" 
                  width="100%" 
                  height="300" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#003366]" data-aos="fade-up">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-gray-600" data-aos="fade-up" data-aos-delay="100">
              Find quick answers to common questions
            </p>
          </div>
          
          <div className="space-y-6" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg text-[#003366] mb-2">
                What areas do you serve?
              </h3>
              <p className="text-gray-600">
                We provide our engineering services throughout Kenya, with a focus on Nairobi and surrounding counties.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg text-[#003366] mb-2">
                Do you offer maintenance services?
              </h3>
              <p className="text-gray-600">
                Yes, we provide comprehensive maintenance services for refrigeration, air conditioning, ventilation systems, and LP gas installations.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg text-[#003366] mb-2">
                What is your response time for emergencies?
              </h3>
              <p className="text-gray-600">
                For emergency situations, we aim to respond within 2-4 hours depending on your location and the nature of the emergency.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg text-[#003366] mb-2">
                How can I get a quote for my project?
              </h3>
              <p className="text-gray-600">
                You can request a quote by filling out the contact form on this page, calling us directly, or sending us an email with your project details.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
