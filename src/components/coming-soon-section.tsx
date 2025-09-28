import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Rocket, Target, BarChart3, Zap, Bell } from "lucide-react";

const upcomingFeatures = [
  {
    icon: Target,
    title: "Smart Targeting",
    description: "AI-powered customer segmentation and personalized messaging"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Deep insights into customer behavior and campaign performance"
  },
  {
    icon: Zap,
    title: "Automation Suite",
    description: "Complete marketing workflow automation with AI optimization"
  },
  {
    icon: Rocket,
    title: "Growth Engine",
    description: "AI assistants that scale your marketing efforts automatically"
  }
];

export function ComingSoonSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
      <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-sm font-medium">Coming Soon</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            AI Marketing <span className="text-gradient">Revolution</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get ready for the next generation of AI-powered marketing assistants. 
            Smart, autonomous, and designed to supercharge your growth.
          </p>
        </motion.div>

        {/* Main coming soon card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Card className="glass glow-primary relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
            <CardHeader className="text-center relative z-10">
              <div className="mx-auto w-20 h-20 rounded-full bg-background/20 flex items-center justify-center mb-6">
                <Rocket className="w-10 h-10 text-accent" />
              </div>
              <CardTitle className="text-3xl font-bold mb-4">
                AI Marketing Assistants
              </CardTitle>
              <CardDescription className="text-lg">
                Autonomous AI agents that will handle your entire marketing funnel - 
                from lead generation to conversion optimization, all while you sleep.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center relative z-10">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="glow-accent">
                  <Bell className="mr-2 w-4 h-4" />
                  Notify Me When Ready
                </Button>
                <Button variant="outline" className="glass">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="glass hover-lift h-full">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-background/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 glass px-8 py-4 rounded-full">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium">In Development</span>
            </div>
            <div className="w-px h-6 bg-border" />
            <span className="text-sm text-muted-foreground">Expected Q2 2024</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}