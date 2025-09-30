import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Zap, Target } from "lucide-react";
import stravexHero from "@/assets/stravex-hero.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                  Innovating{" "}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Beyond Limits
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Advanced tactical technologies for detect and intercept operations. 
                  Pushing the boundaries of what's possible in defense and security.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild 
                  size="xl" 
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-105"
                >
                  <Link to="/products">
                    Explore Products <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="xl"
                  className="border-border hover:bg-secondary"
                >
                  <Link to="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-scale-in">
              <div className="relative">
                <img 
                  src={stravexHero} 
                  alt="Stravex AGNI STRIKE - Advanced Tactical Detection System"
                  className="w-full h-auto rounded-2xl shadow-card"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Stravex Technologies?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Leading the future of tactical technology with innovative solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Advanced Defense",
                description: "Cutting-edge detection and interception capabilities designed for mission-critical operations."
              },
              {
                icon: Zap,
                title: "Rapid Response",
                description: "Lightning-fast systems engineered for real-time threat assessment and immediate action."
              },
              {
                icon: Target,
                title: "Precision Technology",
                description: "Unmatched accuracy and reliability in the most demanding operational environments."
              }
            ].map((feature, index) => (
              <Card key={index} className="p-8 bg-card border-border hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-secondary">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Ready to Experience the Future?
          </h2>
          <p className="text-xl text-muted-foreground">
            Discover how Stravex Technologies can transform your tactical operations
          </p>
          <Button 
            asChild 
            size="xl" 
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            <Link to="/contact">
              Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;