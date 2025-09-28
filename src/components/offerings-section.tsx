import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageCircle, Send, Bot, TrendingUp, Play, ExternalLink } from "lucide-react";
import { useState } from "react";

const offerings = [
  {
    id: "whatsapp",
    title: "WhatsApp Chatbot",
    description: "Intelligent customer support and sales automation for WhatsApp Business",
    icon: MessageCircle,
    color: "text-green-500",
    details: "Our WhatsApp chatbots provide 24/7 customer support, automated order processing, and personalized product recommendations. Integrate seamlessly with your existing business processes.",
    features: ["24/7 Customer Support", "Order Processing", "Product Recommendations", "Multi-language Support", "Analytics Dashboard"],
    demoVideo: "https://example.com/whatsapp-demo" // Placeholder
  },
  {
    id: "telegram",
    title: "Telegram Chatbot",
    description: "Advanced bot automation for Telegram communities and customer service",
    icon: Send,
    color: "text-blue-500",
    details: "Build powerful Telegram bots for community management, automated responses, and interactive experiences. Perfect for crypto projects, news channels, and customer support.",
    features: ["Community Management", "Automated Responses", "File Sharing", "Payment Integration", "Group Administration"],
    demoVideo: "https://example.com/telegram-demo" // Placeholder
  },
  {
    id: "api",
    title: "AI API Chatbot",
    description: "Custom AI-powered chatbots with API integration for any platform",
    icon: Bot,
    color: "text-purple-500",
    details: "Create sophisticated AI chatbots that can be integrated into websites, mobile apps, or any platform via our robust API. Fully customizable and scalable.",
    features: ["Custom AI Training", "API Integration", "Multi-platform Support", "Real-time Analytics", "Scalable Infrastructure"],
    demoVideo: "https://example.com/api-demo" // Placeholder
  },
  {
    id: "marketing",
    title: "AI Marketing Assistants",
    description: "Intelligent marketing automation and customer engagement tools",
    icon: TrendingUp,
    color: "text-accent",
    details: "Leverage AI to automate your marketing campaigns, analyze customer behavior, and optimize conversion rates. Get actionable insights and automated responses.",
    features: ["Campaign Automation", "Customer Analytics", "Conversion Optimization", "A/B Testing", "ROI Tracking"],
    demoVideo: "https://example.com/marketing-demo" // Placeholder
  }
];

export function OfferingsSection() {
  const [selectedOffering, setSelectedOffering] = useState<typeof offerings[0] | null>(null);

  return (
    <section id="offerings" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-gradient">AI Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our comprehensive suite of AI-powered chatbot solutions designed to revolutionize your business operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {offerings.map((offering, index) => {
            const Icon = offering.icon;
            return (
              <motion.div
                key={offering.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="glass hover-lift cursor-pointer group h-full">
                      <CardHeader className="text-center">
                        <div className="mx-auto w-16 h-16 rounded-full bg-background/50 flex items-center justify-center mb-4 group-hover:glow-primary transition-all duration-300">
                          <Icon className={`w-8 h-8 ${offering.color}`} />
                        </div>
                        <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {offering.title}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {offering.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <Button variant="ghost" className="group-hover:text-primary transition-colors">
                          Learn More
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-background/50 flex items-center justify-center">
                          <Icon className={`w-6 h-6 ${offering.color}`} />
                        </div>
                        <DialogTitle className="text-2xl">{offering.title}</DialogTitle>
                      </div>
                      <DialogDescription className="text-base leading-relaxed">
                        {offering.details}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3">Key Features:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {offering.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 p-4 glass rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Play className="w-5 h-5 text-accent" />
                        <span className="font-semibold">Demo Video</span>
                      </div>
                      <div className="bg-background/20 rounded-lg p-8 text-center">
                        <div className="text-muted-foreground mb-4">
                          <Play className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          Video demo coming soon
                        </div>
                        <Button variant="outline" size="sm" disabled>
                          Watch Demo
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <Button className="flex-1">
                        Get Started
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Schedule Demo
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}