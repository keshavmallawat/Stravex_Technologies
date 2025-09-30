import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Radar, Zap, Target, Eye, Lock } from "lucide-react";
import stravexHero from "@/assets/stravex-hero.png";

const Products = () => {
  const products = [
    {
      id: "agni-strike",
      name: "AGNI STRIKE",
      subtitle: "DETECT & INTERCEPT",
      description: "Advanced tactical detection and interception system with real-time threat assessment capabilities.",
      image: stravexHero,
      features: ["Real-time Detection", "Precision Targeting", "Rapid Response", "Carbon Fiber Construction"],
      category: "Tactical Systems",
      status: "Available"
    },
    {
      id: "sentinel-radar",
      name: "SENTINEL RADAR",
      subtitle: "SURVEILLANCE & TRACKING",
      description: "Next-generation radar system for comprehensive area surveillance and multi-target tracking.",
      features: ["360° Coverage", "Multi-Target Tracking", "Weather Resistant", "AI-Powered Analysis"],
      category: "Surveillance",
      status: "Development"
    },
    {
      id: "guardian-shield",
      name: "GUARDIAN SHIELD",
      subtitle: "ACTIVE PROTECTION",
      description: "Automated defense system with intelligent threat prioritization and countermeasure deployment.",
      features: ["Automated Response", "Threat Prioritization", "Modular Design", "Remote Operation"],
      category: "Defense Systems",
      status: "Available"
    }
  ];

  const capabilities = [
    {
      icon: Shield,
      title: "Defense Systems",
      description: "Comprehensive protection solutions"
    },
    {
      icon: Radar,
      title: "Detection Technology",
      description: "Advanced sensing and identification"
    },
    {
      icon: Target,
      title: "Precision Targeting",
      description: "Accurate threat engagement"
    },
    {
      icon: Eye,
      title: "Surveillance Solutions",
      description: "Real-time monitoring capabilities"
    },
    {
      icon: Zap,
      title: "Rapid Response",
      description: "Lightning-fast reaction systems"
    },
    {
      icon: Lock,
      title: "Secure Operations",
      description: "Encrypted communication systems"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Products
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cutting-edge tactical solutions designed for mission-critical operations and advanced defense scenarios.
          </p>
        </div>

        {/* Featured Products */}
        <div className="space-y-12 mb-16">
          {products.map((product, index) => (
            <Card key={product.id} className="overflow-hidden bg-card border-border hover:shadow-card transition-all duration-300">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Product Image */}
                <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-80 lg:h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-80 lg:h-full bg-gradient-secondary flex items-center justify-center">
                      <div className="text-center">
                        <Target className="h-16 w-16 text-primary mx-auto mb-4" />
                        <p className="text-muted-foreground">Product Image Coming Soon</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge variant={product.status === 'Available' ? 'default' : 'secondary'}>
                      {product.status}
                    </Badge>
                  </div>
                </div>

                {/* Product Details */}
                <div className={`p-8 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="space-y-6">
                    <div>
                      <Badge variant="outline" className="mb-4">{product.category}</Badge>
                      <h3 className="text-3xl font-bold text-foreground mb-2">{product.name}</h3>
                      <p className="text-lg text-primary font-semibold mb-4">{product.subtitle}</p>
                      <p className="text-lg text-muted-foreground">{product.description}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Key Features</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {product.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button 
                      asChild 
                      className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                    >
                      <Link to="/contact">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Capabilities Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Our Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <Card key={index} className="p-6 bg-card border-border hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-full shrink-0">
                    <capability.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{capability.title}</h3>
                    <p className="text-sm text-muted-foreground">{capability.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="p-8 bg-gradient-secondary border-border text-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Ready to Enhance Your Operations?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover how our tactical solutions can transform your mission capabilities. Contact us to discuss your specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                <Link to="/contact">
                  Request Information <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-border hover:bg-secondary"
              >
                <Link to="/technologies">View Technologies</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Products;