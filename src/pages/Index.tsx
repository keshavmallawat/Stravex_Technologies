import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Zap, Target } from "lucide-react";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero bg-grid">
      <SEO 
        title="Stravex Technologies - Advanced Tactical Solutions"
        description="Leading innovator in tactical detection and interception systems. Advanced defense technologies for mission-critical operations."
        path="/"
        image="/stravex-logo.png"
        type="website"
      />
      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative text-center space-y-8 animate-fade-in">
            <div className="pointer-events-none absolute inset-0 -z-10 mx-auto max-w-3xl blur-2xl opacity-40" style={{background: 'radial-gradient(600px 200px at 50% 10%, rgba(56,189,248,0.25), transparent 60%)'}} />
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight drop-shadow-sm">
                <span className="flex flex-wrap items-baseline gap-3 justify-center">
                  <span className="font-geo-hero bg-gradient-primary bg-clip-text text-transparent">
                    Innovating
                  </span>
                  <span className="font-geo-hero bg-gradient-primary bg-clip-text text-transparent">
                    Beyond Limits
                  </span>
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Stravex Technologies delivers advanced tactical technologies for detect-and-intercept operations.
                At Stravex Technologies, we push the boundaries of what's possible in defense and security.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="xl" 
                className="bg-gradient-primary neon-ring hover:shadow-glow transition-all duration-300 hover:scale-105"
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
              <Card key={index} className="p-8 glass hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-primary/10 rounded-full neon-ring">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Ready to Experience the Future?
          </h2>
          <p className="text-xl text-muted-foreground">
            Discover how Stravex Technologies can transform your tactical operations
          </p>
          <Button 
            asChild 
            size="lg" 
            variant="outline"
            className="border-border hover:bg-primary hover:text-primary-foreground border-primary transition-colors hover:shadow-glow"
          >
            <Link to="/contact">
              Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* SINE IIT Bombay Pre-incubation Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Card className="p-8 bg-gradient-to-r from-blue-600/5 to-blue-800/5 border-blue-500/20">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-6">
                  <div className="text-center">
                    <img
                      src="/iitb-logo.png"
                      alt="IIT Bombay - SINE Business Incubator"
                      className="h-24 sm:h-28 md:h-32 w-auto object-contain"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  Pre-incubated at SINE IIT Bombay
                </h3>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Stravex Technologies is proud to be pre-incubated at the Society for Innovation and Entrepreneurship (SINE) at the prestigious Indian Institute of Technology Bombay. This partnership validates our innovative approach to tactical defense technology and provides us with world-class mentorship and resources.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-blue-500 font-bold text-lg">🏛️</span>
                  </div>
                  <h4 className="font-semibold text-foreground">IIT Bombay</h4>
                  <p className="text-sm text-muted-foreground">Premier Technical Institute</p>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-blue-500 font-bold text-lg">🚀</span>
                  </div>
                  <h4 className="font-semibold text-foreground">Innovation Hub</h4>
                  <p className="text-sm text-muted-foreground">Cutting-edge Research & Development</p>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-blue-500 font-bold text-lg">🤝</span>
                  </div>
                  <h4 className="font-semibold text-foreground">Mentorship</h4>
                  <p className="text-sm text-muted-foreground">Expert Guidance & Support</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;