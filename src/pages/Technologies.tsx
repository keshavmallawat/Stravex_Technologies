import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Cpu, 
  Database, 
  Shield, 
  Radar, 
  Zap, 
  Brain,
  Settings,
  Globe,
  ArrowRight
} from "lucide-react";

const Technologies = () => {
  const techCategories = [
    {
      title: "Core Technologies",
      description: "Fundamental technologies powering our tactical solutions",
      technologies: [
        {
          name: "Advanced Materials",
          icon: Shield,
          description: "Carbon fiber composites and lightweight tactical materials",
          applications: ["Structural Components", "Protective Systems", "Lightweight Design"]
        },
        {
          name: "AI & Machine Learning",
          icon: Brain,
          description: "Intelligent threat detection and pattern recognition systems",
          applications: ["Threat Assessment", "Predictive Analysis", "Automated Response"]
        },
        {
          name: "Signal Processing",
          icon: Radar,
          description: "Advanced radar and sensor signal processing algorithms",
          applications: ["Detection Systems", "Target Tracking", "Interference Filtering"]
        },
        {
          name: "Real-time Computing",
          icon: Cpu,
          description: "High-performance computing for mission-critical operations",
          applications: ["Low Latency Systems", "Parallel Processing", "Edge Computing"]
        }
      ]
    },
    {
      title: "Development Stack",
      description: "Technologies and frameworks used in our development process",
      technologies: [
        {
          name: "Embedded Systems",
          icon: Settings,
          description: "Real-time embedded software for tactical hardware",
          applications: ["Firmware Development", "Hardware Integration", "System Control"]
        },
        {
          name: "Secure Communications",
          icon: Globe,
          description: "Encrypted communication protocols and networking",
          applications: ["Data Encryption", "Secure Channels", "Network Security"]
        },
        {
          name: "Database Systems",
          icon: Database,
          description: "High-performance data storage and retrieval systems",
          applications: ["Mission Data", "Analytics", "Historical Records"]
        },
        {
          name: "Power Management",
          icon: Zap,
          description: "Efficient power systems for portable tactical equipment",
          applications: ["Battery Optimization", "Power Distribution", "Energy Harvesting"]
        }
      ]
    }
  ];

  const certifications = [
    "ISO 9001:2015 Quality Management",
    "ISO 27001 Information Security",
    "Defense Industry Standards",
    "Export Control Compliance",
    "Environmental Standards"
  ];

  const partnerships = [
    "Leading Defense Contractors",
    "Research Universities",
    "Government Agencies",
    "Technology Partners",
    "International Allies"
  ];

  return (
    <div className="min-h-screen bg-gradient-hero pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Technologies
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cutting-edge technologies and development frameworks that power our advanced tactical solutions and drive innovation in defense applications.
          </p>
        </div>

        {/* Technology Categories */}
        <div className="space-y-16 mb-16">
          {techCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">{category.title}</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {category.technologies.map((tech, techIndex) => (
                  <Card key={techIndex} className="p-6 bg-card border-border hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-primary/10 rounded-full shrink-0">
                          <tech.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-foreground">{tech.name}</h3>
                          <p className="text-muted-foreground">{tech.description}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-foreground">Applications</h4>
                        <div className="flex flex-wrap gap-2">
                          {tech.applications.map((app, appIndex) => (
                            <Badge key={appIndex} variant="secondary" className="text-xs">
                              {app}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Standards & Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 bg-card border-border">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground text-center">
                Standards & Certifications
              </h3>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full shrink-0"></div>
                    <span className="text-muted-foreground">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-card border-border">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground text-center">
                Strategic Partnerships
              </h3>
              <div className="space-y-3">
                {partnerships.map((partner, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full shrink-0"></div>
                    <span className="text-muted-foreground">{partner}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Innovation Approach */}
        <Card className="p-8 bg-gradient-secondary border-border mb-16">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Our Innovation Approach
            </h2>
            <div className="max-w-4xl mx-auto space-y-4 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                At Stravex Technologies, we believe in continuous innovation through research, development, and strategic partnerships. Our technology stack is carefully chosen to ensure reliability, performance, and scalability in mission-critical environments.
              </p>
              <p className="text-lg leading-relaxed">
                We invest heavily in emerging technologies while maintaining proven methodologies that have demonstrated success in tactical applications. This balanced approach ensures our solutions are both cutting-edge and battle-tested.
              </p>
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <Card className="p-8 bg-card border-border text-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Interested in Our Technology?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn more about how our advanced technologies can enhance your operational capabilities and mission success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                <Link to="/contact">
                  Request Technical Briefing <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-border hover:bg-secondary"
              >
                <Link to="/products">View Products</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Technologies;