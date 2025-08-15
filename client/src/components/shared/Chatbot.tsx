import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, X, Send, User, Clock } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hello! I'm the WILMAK Engineering assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Close chatbot when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.chatbot-container') && !target.closest('.chatbot-toggle')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", content: input, timestamp: new Date() };
    setMessages([...messages, userMessage]);
    setInput("");
    
    // Simulate typing indicator
    setTimeout(() => {
      let botResponse = "Thanks for your message! One of our representatives will get back to you soon.";
      
      // Customize responses based on keywords
      const lowercaseInput = input.toLowerCase();
      if (lowercaseInput.includes("price") || lowercaseInput.includes("cost") || lowercaseInput.includes("quote")) {
        botResponse = "For pricing information, we would need to understand your specific requirements. Please call us at 0720821196 for a customized quote.";
      } else if (lowercaseInput.includes("time") || lowercaseInput.includes("when") || lowercaseInput.includes("schedule")) {
        botResponse = "Our typical project timeline depends on scope and complexity. We can provide you with a detailed schedule after an initial consultation. Call us at 0720821196 to discuss further.";
      } else if (lowercaseInput.includes("service") || lowercaseInput.includes("repair")) {
        botResponse = "We offer a wide range of engineering services including refrigeration, air conditioning, ventilation, and LP gas installations. For service requests, please call 0720821196.";
      }
      
      const botMessage = { type: "bot", content: botResponse, timestamp: new Date() };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <Button
        className="fixed bottom-36 right-4 z-40 rounded-full h-14 w-14 bg-[#006400] hover:bg-[#005400] shadow-lg chatbot-toggle"
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className={`fixed ${isMobile ? 'bottom-20 right-4 left-4' : 'bottom-24 right-6 w-96'} z-50 shadow-xl chatbot-container`}>
      <div className="p-4 flex justify-between items-center bg-[#006400] text-white rounded-t-lg">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3">
            <span className="text-[#006400] font-bold">W</span>
          </div>
          <div>
            <h3 className="font-semibold">WILMAK Engineering</h3>
            <p className="text-xs text-gray-100">Usually replies within an hour</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:text-white/80 hover:bg-[#005400]"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div 
        className="h-[350px] overflow-y-auto p-4 space-y-4 bg-gray-50"
        style={{ scrollBehavior: 'smooth' }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.type === "bot" && (
              <div className="w-8 h-8 rounded-full bg-[#006400] flex items-center justify-center mr-2 shrink-0 mt-1">
                <span className="text-white font-bold text-sm">W</span>
              </div>
            )}
            
            <div className="flex flex-col max-w-[75%]">
              <div
                className={`p-3 rounded-lg ${
                  message.type === "user"
                    ? "bg-[#E76F00] text-white rounded-tr-none"
                    : "bg-white text-gray-800 shadow-sm rounded-tl-none"
                }`}
              >
                {message.content}
              </div>
              
              <div className={`flex items-center mt-1 text-xs text-gray-500 ${
                message.type === "user" ? "self-end" : "self-start"
              }`}>
                {message.type === "user" ? (
                  <>
                    {formatTime(message.timestamp)}
                    <User className="h-3 w-3 ml-1" />
                  </>
                ) : (
                  <>
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTime(message.timestamp)}
                  </>
                )}
              </div>
            </div>
            
            {message.type === "user" && (
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center ml-2 shrink-0 mt-1">
                <User className="h-4 w-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }} 
          className="flex gap-2"
        >
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 focus-visible:ring-[#006400]"
          />
          <Button 
            type="submit" 
            className="bg-[#006400] hover:bg-[#005400] text-white"
            disabled={!input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-2 text-center">
          For immediate assistance, call us at 0720821196
        </p>
      </div>
    </Card>
  );
};

export default Chatbot;
