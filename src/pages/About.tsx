import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Target, Zap, Users, Globe, Factory, Rocket, Award, Star, CheckCircle } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-hero bg-grid pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Stravex Technologies
            </span>
          </h1>
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <p className="text-2xl font-bold text-foreground">
                <span className="text-orange-500">Made in India</span> • <span className="text-blue-500">Made for the World</span>
              </p>
              
              {/* Made in India Badges */}
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-lg px-4 py-2">
                  <div className="w-8 h-8 overflow-hidden rounded-full">
                    <img
                      src="/indian-flag.png.jpg"
                      alt="Indian Flag"
                      className="w-full h-full object-cover object-center scale-150"
                    />
                  </div>
                  <div className="text-sm">
                    <div className="text-orange-400 font-bold">Made in India</div>
                    <div className="text-orange-300 text-xs">Certified</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg px-4 py-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-sm">
                    <div className="text-green-400 font-bold">Startup India</div>
                    <div className="text-green-300 text-xs">Recognized</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg px-4 py-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-sm">
                    <div className="text-blue-400 font-bold">Atmanirbhar</div>
                    <div className="text-blue-300 text-xs">Self-Reliant</div>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              We are more than a startup—we are a movement to position India as the global hub for cutting-edge defense, drone systems, and sustainable technology solutions that empower nations and strengthen global security.
            </p>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6 animate-slide-up">
            <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To engineer excellence that empowers nations, strengthens security, and drives innovation with global impact. We are committed to continuous research, indigenous manufacturing, and creating future-ready, scalable solutions that are globally competitive.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our mission transcends traditional boundaries—we don't just build products; we craft technological ecosystems that transform how nations protect their interests and advance their capabilities on the global stage.
            </p>
          </div>

          <div className="space-y-6 animate-slide-up">
            <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To establish India as the undisputed global leader in defense technology innovation, where "Made in India" becomes synonymous with world-class excellence, cutting-edge innovation, and unwavering reliability.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We envision a future where our indigenous technologies not only serve India's defense needs but also become the preferred choice for nations worldwide, setting new benchmarks for tactical superiority and operational excellence.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Our Innovation Drive
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Factory,
                title: "Indigenous Manufacturing",
                description: "Proudly Made in India with world-class quality standards and cutting-edge technology."
              },
              {
                icon: Globe,
                title: "Global Impact",
                description: "Designed for the world—our solutions transcend borders and serve nations globally."
              },
              {
                icon: Rocket,
                title: "Future-Ready Innovation",
                description: "Scalable, adaptable technologies that evolve with tomorrow's challenges and opportunities."
              },
              {
                icon: Award,
                title: "Excellence Standard",
                description: "Setting new benchmarks in defense technology through relentless pursuit of perfection."
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

        {/* Company Story */}
        <Card className="p-8 bg-gradient-secondary border-border">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground text-center">The Stravex Story</h2>
            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                Founded by visionary entrepreneurs who dared to dream beyond conventional boundaries, Stravex Technologies emerged from a bold vision: to position India as the global epicenter of defense technology innovation. We are not just building products—we are crafting the future of national security and global defense capabilities.
              </p>
              <p className="text-lg leading-relaxed">
                Our journey began with an unwavering commitment to indigenous manufacturing and technological sovereignty. Every component, every algorithm, every innovation that bears the Stravex name is a testament to India's engineering prowess and our relentless pursuit of excellence. From the AGNI STRIKE detection system to our advanced drone technologies, we prove that "Made in India" can mean "Made for the World."
              </p>
              <p className="text-lg leading-relaxed">
                Today, as we stand at the forefront of tactical technology innovation, we remain driven by our founding mission: to engineer solutions that don't just meet today's challenges but anticipate tomorrow's opportunities. We are building more than a company—we are building India's technological legacy on the global stage.
              </p>
            </div>
          </div>
        </Card>

        {/* Made in India Certifications */}
        <div className="mt-16">
          <Card className="p-8 bg-gradient-to-r from-orange-500/5 to-orange-600/5 border-orange-500/20">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-foreground">Proudly Made in India</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Certified by India's premier institutions and aligned with national initiatives for technological self-reliance and innovation excellence.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex flex-col items-center space-y-3 p-4 bg-white/5 rounded-lg border border-orange-500/10">
                  <div className="w-12 h-12 overflow-hidden rounded-full">
                    <img
                      src="/indian-flag.png.jpg"
                      alt="Indian Flag"
                      className="w-full h-full object-cover object-center scale-150"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-foreground">Made in India</h4>
                    <p className="text-sm text-muted-foreground">Government Initiative</p>
                    <Badge variant="outline" className="mt-2 text-xs">Certified</Badge>
                  </div>
                </div>
                
                <div className="flex flex-col items-center space-y-3 p-4 bg-white/5 rounded-lg border border-green-500/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-foreground">Startup India</h4>
                    <p className="text-sm text-muted-foreground">DIPP Recognized</p>
                    <Badge variant="outline" className="mt-2 text-xs">Verified</Badge>
                  </div>
                </div>
                
                <div className="flex flex-col items-center space-y-3 p-4 bg-white/5 rounded-lg border border-blue-500/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-foreground">Atmanirbhar Bharat</h4>
                    <p className="text-sm text-muted-foreground">Self-Reliant India</p>
                    <Badge variant="outline" className="mt-2 text-xs">Aligned</Badge>
                  </div>
                </div>
                
                <div className="flex flex-col items-center space-y-3 p-4 bg-white/5 rounded-lg border border-purple-500/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-foreground">SINE IIT Bombay</h4>
                    <p className="text-sm text-muted-foreground">Pre-incubated</p>
                    <Badge variant="outline" className="mt-2 text-xs">Partner</Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Global Impact Section */}
        <div className="mt-16">
          <Card className="p-8 bg-card border-border">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Empowering Nations, Strengthening Security</h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                Our technologies serve as the backbone of modern defense systems, providing nations with the tools they need to protect their interests, secure their borders, and maintain peace in an increasingly complex world.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <Shield className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">National Security</h3>
                  <p className="text-muted-foreground">Protecting sovereign interests with cutting-edge defense solutions</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <Target className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Global Competitiveness</h3>
                  <p className="text-muted-foreground">Setting new standards for tactical superiority worldwide</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <Zap className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Innovation Leadership</h3>
                  <p className="text-muted-foreground">Driving the future of defense technology through relentless innovation</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;