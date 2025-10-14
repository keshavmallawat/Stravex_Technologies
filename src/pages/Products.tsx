import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Radar, Zap, Target, Cpu, Lock } from "lucide-react";
import stravexHero from "@/assets/stravex-hero.png";

const Products = () => {
  const products = [
    {
      id: "agni-strike",
      name: "AgniStrike",
      subtitle: "Next‑Gen Drone Interceptor",
      description: `What if a silent predator pierced the skies over a vital border outpost or a high-profile VIP convoy—slicing through at over 200 km/h, its payload not just a camera, but a potential catastrophe?

At Stravex Technologies, we’re confronting this threat head-on. AgniStrike is a revolutionary, compact, and portable drone interception system engineered for rapid response and field deployment. Weighing under 2.5 kg, it fits effortlessly into a backpack and can be operated by any trained personnel.

Using AI-driven optical detection, AgniStrike analyzes an incoming drone’s speed, trajectory, intent, and vulnerabilities, locking onto the target with precision accuracy. With a single press, it launches a high-speed interceptor that rockets at 200–250 km/h to neutralize the threat mid-air through kinetic impact or advanced countermeasures — and can be swiftly reloaded for subsequent engagements.

Built entirely in India, AgniStrike redefines tactical defense, offering unmatched mobility, intelligence, and reliability to protect borders, convoys, and critical infrastructure.
➡ Point. Analyze. Press. Protect.`,
      image: "/products/agni-strike.png?v=3",
      features: [
        "AI-driven optical detection",
        "200–250 km/h high-speed interceptor",
        "Under 2.5 kg, backpack portable",
        "Kinetic and advanced countermeasures",
        "Rapid reload for multiple engagements"
      ],
      category: "Tactical Interception",
      status: "In Development"
    },
    {
      id: "fpv-drones",
      name: "FPV Drones",
      subtitle: "Swappable Payload Platforms",
      description: `At Stravex Technologies, we’re engineering a new generation of FPV (First-Person View) drones with modular swappable payload systems, designed for a wide range of tactical and operational missions.

Our FPV platforms — available in 5-inch, 7-inch, and 10-inch configurations — are optimized for agility, endurance, and payload flexibility. The quick-swap payload mechanism enables operators to rapidly switch between mission-specific modules such as:

Ammunition or supply drop units

Kamikaze or impact payloads

Surveillance and sensor modules

These drones combine high-speed maneuverability with real-time FPV control, offering precise, responsive performance in defense, reconnaissance, and field operations.`,
      image: "/products/fpv-drones.png?v=1",
      features: [
        "5-inch, 7-inch, 10-inch configurations",
        "Quick-swap payload mechanism",
        "Supply drop, impact, surveillance modules",
        "High-speed, precise FPV control",
        "Agility and endurance for field ops"
      ],
      category: "Aerial Platforms",
      status: "In Development"
    },
    {
      id: "indigenous-fc-esc",
      name: "Indigenous Flight Controller & ESC",
      subtitle: "Made‑in‑India Core Electronics",
      description: `Stravex Technologies is developing a fully indigenous Flight Controller (FC) and Electronic Speed Controller (ESC) designed for commercial and tactical drone applications.

Our next-generation FC integrates AI-based stabilization, adaptive flight algorithms, and real-time telemetry processing for unmatched flight precision and safety. Complementing it, our custom-built ESC ensures efficient power delivery, advanced motor control, and system reliability across various drone categories — from FPV and industrial drones to logistics and surveillance platforms.

Together, these systems form the core of our Made-in-India drone ecosystem, providing a secure, high-performance, and scalable foundation for the country’s growing unmanned aviation market.`,
      image: "/products/indigenous-fc-esc.png?v=2",
      features: [
        "AI-based stabilization",
        "Adaptive flight algorithms",
        "Real-time telemetry processing",
        "Efficient, reliable ESC power control",
        "Scalable across FPV, industrial, logistics"
      ],
      category: "Avionics",
      status: "In Development"
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
      icon: Cpu,
      title: "Drone Parts",
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
    <div className="min-h-screen bg-gradient-hero bg-grid pt-24 pb-16">
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
                <div
                  className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''} ${
                    (product.id === 'indigenous-fc-esc' || product.id === 'agni-strike')
                      ? 'bg-neutral-900 border border-border rounded-md overflow-hidden flex items-center justify-center min-h-[20rem] lg:min-h-[24rem]'
                      : ''
                  }`}
                >
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className={
                        (product.id === 'indigenous-fc-esc' || product.id === 'agni-strike')
                          ? 'w-full h-full object-cover'
                          : 'w-full h-full object-cover'
                      }
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