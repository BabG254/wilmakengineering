import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, X } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content:
        "Hello! I'm the WILMAK Engineering assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      { type: "user", content: input },
      {
        type: "bot",
        content:
          "Thanks for your message! One of our representatives will get back to you soon. For immediate assistance, please call us at 0720821196.",
      },
    ]);
    setInput("");
  };

  if (!isOpen) {
    return (
      <Button
        className="fixed bottom-36 right-4 rounded-full h-12 w-12"
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-36 right-4 w-80 z-50">
      <div className="p-4 border-b flex justify-between items-center bg-primary text-white rounded-t-lg">
        <h3 className="font-semibold">Chat with Us</h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:text-white/80"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === "user"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded"
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </div>
    </Card>
  );
};

export default Chatbot;
