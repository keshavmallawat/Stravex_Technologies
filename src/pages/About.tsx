import { Card } from "@/components/ui/card";
import { Shield, Target, Zap, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-hero pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Stravex Technologies
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pioneering the future of tactical technology with innovative solutions that push the boundaries of what's possible in defense and security operations.
          </p>
        </div>

        {/* Company Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6 animate-slide-up">
            <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Stravex Technologies, we are dedicated to developing cutting-edge tactical solutions that enhance operational capabilities and ensure mission success. Our advanced detection and interception systems are designed to meet the evolving challenges of modern security environments.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe in pushing the boundaries of innovation, combining state-of-the-art technology with practical field experience to deliver solutions that make a real difference in critical operations.
            </p>
          </div>

          <div className="space-y-6 animate-slide-up">
            <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To be the global leader in tactical technology solutions, setting new standards for performance, reliability, and innovation in the defense and security sectors.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We envision a future where our technologies provide unparalleled situational awareness and operational advantage, enabling our clients to achieve their objectives with confidence and precision.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Security First",
                description: "Every solution we develop prioritizes security and reliability above all else."
              },
              {
                icon: Target,
                title: "Precision Excellence",
                description: "We deliver solutions with unmatched accuracy and attention to detail."
              },
              {
                icon: Zap,
                title: "Innovation Drive",
                description: "Constantly pushing technological boundaries to stay ahead of emerging threats."
              },
              {
                icon: Users,
                title: "Client Partnership",
                description: "Building lasting relationships through collaboration and dedicated support."
              }
            ].map((value, index) => (
              <Card key={index} className="p-6 bg-card border-border hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Company History */}
        <Card className="p-8 bg-card border-border">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground text-center">Our Journey</h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                Founded with a vision to revolutionize tactical technology, Stravex Technologies has grown from a specialized research team to a leading innovator in defense and security solutions. Our journey began with a simple yet powerful idea: to create technology that enhances human capability rather than replacing it.
              </p>
              <p className="text-lg leading-relaxed">
                Today, our products like the AGNI STRIKE detection and interception system represent years of dedicated research, development, and real-world testing. We continue to evolve and adapt, ensuring our solutions meet the ever-changing demands of modern tactical operations.
              </p>
              <p className="text-lg leading-relaxed">
                As we look to the future, we remain committed to our founding principles of innovation, excellence, and unwavering dedication to our clients' success.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;