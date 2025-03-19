import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const whatsappNumber = "+254720821196";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <Button
        variant="default"
        size="lg"
        className="rounded-full bg-green-500 hover:bg-green-600"
        onClick={() => window.open(whatsappUrl, "_blank")}
      >
        <i className="fab fa-whatsapp text-xl mr-2"></i>
        Chat
      </Button>
      
      <Button
        variant="default"
        size="lg"
        className="rounded-full"
        onClick={() => window.location.href = `tel:${whatsappNumber}`}
      >
        <Phone className="mr-2" />
        Call
      </Button>
    </div>
  );
};

export default WhatsAppButton;
