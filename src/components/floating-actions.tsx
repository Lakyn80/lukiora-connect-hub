import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";

export function FloatingActions() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsApp = () => {
    // WhatsApp Web URL with pre-filled message
    const phoneNumber = "1234567890"; // Replace with actual number
    const message = encodeURIComponent("Hi! I'm interested in your AI chatbot solutions.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleTelegram = () => {
    // Telegram URL
    const username = "lukiora"; // Replace with actual username
    window.open(`https://t.me/${username}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end gap-3">
        {/* Floating action buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: isExpanded ? 1 : 0, 
            scale: isExpanded ? 1 : 0,
            y: isExpanded ? 0 : 20
          }}
          transition={{ duration: 0.3, delay: isExpanded ? 0.1 : 0 }}
          className="flex flex-col gap-3"
        >
          <Button
            onClick={handleWhatsApp}
            size="icon"
            className="w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover-lift"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
          
          <Button
            onClick={handleTelegram}
            size="icon"
            className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover-lift"
          >
            <Send className="w-6 h-6" />
          </Button>
        </motion.div>

        {/* Main toggle button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            size="icon"
            className="w-14 h-14 rounded-full gradient-hero text-white shadow-lg hover:shadow-xl transition-all duration-300 glow-primary"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <MessageCircle className="w-7 h-7" />
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}