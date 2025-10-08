import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { MapPin, Clock, Users, Briefcase, ArrowRight, Star, Heart, Zap } from "lucide-react";

const Careers = () => {
  const jobOpenings = [
    {
      id: "senior-software-engineer",
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Remote / Hybrid",
      type: "Full-time",
      experience: "5+ years",
      description: "Lead development of next-generation tactical systems and defense technologies. Work with cutting-edge AI and real-time processing systems.",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "5+ years of software development experience",
        "Experience with C++, Python, and real-time systems",
        "Knowledge of defense industry standards",
        "Security clearance preferred"
      ],
      benefits: ["Competitive salary", "Health insurance", "401k matching", "Flexible work arrangements"],
      posted: "2 days ago"
    },
    {
      id: "product-manager",
      title: "Product Manager",
      department: "Product",
      location: "Washington, DC",
      type: "Full-time",
      experience: "3+ years",
      description: "Drive product strategy and roadmap for tactical defense solutions. Collaborate with engineering and operations teams to deliver mission-critical products.",
      requirements: [
        "Bachelor's degree in Engineering or Business",
        "3+ years of product management experience",
        "Experience in defense or aerospace industry",
        "Strong analytical and communication skills",
        "Project management certification preferred"
      ],
      benefits: ["Competitive salary", "Health insurance", "Stock options", "Professional development"],
      posted: "1 week ago"
    },
    {
      id: "field-engineer",
      title: "Field Engineer",
      department: "Operations",
      location: "Various Locations",
      type: "Full-time",
      experience: "2+ years",
      description: "Provide on-site technical support and system integration for tactical defense solutions. Travel to client locations for deployment and maintenance.",
      requirements: [
        "Associate's degree in Engineering Technology",
        "2+ years of field engineering experience",
        "Experience with tactical systems",
        "Willingness to travel 50% of the time",
        "Active security clearance required"
      ],
      benefits: ["Competitive salary", "Travel allowances", "Health insurance", "Equipment provided"],
      posted: "3 days ago"
    }
  ];

  const companyValues = [
    {
      icon: Star,
      title: "Excellence",
      description: "We strive for the highest standards in everything we do, from product development to customer service."
    },
    {
      icon: Heart,
      title: "Innovation",
      description: "We foster a culture of creativity and forward-thinking to solve complex defense challenges."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We believe in the power of teamwork and diverse perspectives to achieve our mission."
    },
    {
      icon: Zap,
      title: "Impact",
      description: "We're driven by the meaningful impact our solutions have on national security and defense."
    }
  ];

  const benefits = [
    "Competitive salary and performance bonuses",
    "Comprehensive health, dental, and vision insurance",
    "401(k) with company matching",
    "Flexible work arrangements and remote options",
    "Professional development and training opportunities",
    "Stock options for eligible employees",
    "Generous paid time off and holidays",
    "State-of-the-art equipment and tools",
    "Team building events and company retreats",
    "Opportunities for career advancement"
  ];

  return (
    <div className="min-h-screen bg-gradient-hero bg-grid pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Join Our{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Team
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Be part of the future of tactical defense technology. Join Stravex Technologies and help us build innovative solutions that protect and serve.
          </p>
        </div>

        {/* Company Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <Card key={index} className="p-6 bg-card border-border text-center hover:shadow-card transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <Card className="p-8 bg-gradient-secondary border-border">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why Work With Us?
              </h2>
              <p className="text-muted-foreground">
                We offer comprehensive benefits and a supportive work environment
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full shrink-0"></div>
                  <p className="text-muted-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Job Openings */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Current Openings
            </h2>
            <p className="text-muted-foreground">
              Explore exciting career opportunities at Stravex Technologies
            </p>
          </div>
          
          <div className="space-y-6">
            {jobOpenings.map((job) => (
              <Card key={job.id} className="p-6 bg-card border-border hover:shadow-card transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-foreground">{job.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{job.department}</Badge>
                        <Badge variant="secondary">{job.type}</Badge>
                        <Badge variant="outline">{job.experience}</Badge>
                      </div>
                    </div>
                    <div className="flex flex-col md:items-end space-y-2">
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">Posted {job.posted}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {job.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></div>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Benefits:</h4>
                      <ul className="space-y-1">
                        {job.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></div>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <Button 
                      asChild
                      className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                    >
                      <Link to="/contact">
                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="p-8 bg-gradient-secondary border-border text-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Don't See Your Perfect Role?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're always looking for talented individuals to join our team. Send us your resume and let us know how you can contribute to our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                <Link to="/contact">
                  Send Your Resume
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
              >
                <Link to="/about">
                  Learn About Us
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Careers;


