import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageCircle, Send, Bot, TrendingUp, Play, ExternalLink, Layout, PanelsTopLeft, MonitorCog, BarChart3 } from "lucide-react";
import { useTranslation } from "react-i18next";

const offeringIcons = {
  whatsapp: { icon: MessageCircle, color: "text-green-500" },
  telegram: { icon: Send, color: "text-blue-500" },
  api: { icon: Bot, color: "text-purple-500" },
  marketing: { icon: TrendingUp, color: "text-accent" },
  webCard: { icon: Layout, color: "text-primary" },
  webPresentation: { icon: PanelsTopLeft, color: "text-primary" },
  webClassic: { icon: MonitorCog, color: "text-primary" },
  dataAnalysis: { icon: BarChart3, color: "text-cyan-500" },
};

const offeringKeys = ['whatsapp', 'telegram', 'api', 'marketing', 'webCard', 'webPresentation', 'webClassic', 'dataAnalysis'];

export function OfferingsSection() {
  const { t } = useTranslation();

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
            {t('offerings.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('offerings.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {offeringKeys.map((key, index) => {
            const { icon: Icon, color } = offeringIcons[key as keyof typeof offeringIcons];
            return (
              <motion.div
                key={key}
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
                          <Icon className={`w-8 h-8 ${color}`} />
                        </div>
                        <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {t(`offerings.${key}.title`)}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {t(`offerings.${key}.description`)}
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
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-background/50 flex items-center justify-center">
                          <Icon className={`w-6 h-6 ${color}`} />
                        </div>
                        <DialogTitle className="text-2xl">{t(`offerings.${key}.title`)}</DialogTitle>
                      </div>
                      <DialogDescription className="text-base leading-relaxed">
                        {t(`offerings.${key}.description`)}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="mt-6">
                      <h4 className="font-semibold mb-3">{t(`offerings.${key}.features.title`)}</h4>
                      <ul className="space-y-2">
                        {Object.keys(t(`offerings.${key}.features`, { returnObjects: true }) as object)
                          .filter(k => k !== 'title')
                          .map((featureKey, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                              <span>{t(`offerings.${key}.features.${featureKey}`)}</span>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-semibold mb-3">{t(`offerings.${key}.pricing.title`)}</h4>
                      <div className="glass rounded-lg p-4 space-y-2">
                        {Object.keys(t(`offerings.${key}.pricing`, { returnObjects: true }) as object)
                          .filter(k => k !== 'title')
                          .map((priceKey, i) => (
                            <div key={i} className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">{t(`offerings.${key}.pricing.${priceKey}`)}</span>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="mt-6 p-4 glass rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Play className="w-5 h-5 text-accent" />
                        <span className="font-semibold">Demo</span>
                      </div>
                      <div className="bg-background/20 rounded-lg p-8 text-center">
                        <div className="text-muted-foreground mb-4">
                          <Play className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          {t(`offerings.${key}.demo`)}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <Button className="flex-1" asChild>
                        <a href="#contact">{t(`offerings.${key}.orderNow`)}</a>
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
