import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Linkedin, Mail, User } from "lucide-react";

const Team = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Technology Officer",
      department: "Engineering",
      bio: "Leading tactical systems innovation with 15+ years in defense technology. PhD in Advanced Materials Engineering.",
      expertise: ["Tactical Systems", "Materials Science", "R&D Leadership"],
      image: null
    },
    {
      name: "Marcus Rodriguez",
      role: "VP of Operations",
      department: "Operations", 
      bio: "Former military operations specialist with extensive field experience in tactical deployment and system integration.",
      expertise: ["Operations Management", "Field Deployment", "System Integration"],
      image: null
    },
    {
      name: "Dr. Alex Thompson",
      role: "Senior Research Engineer",
      department: "R&D",
      bio: "Specializing in detection algorithms and AI-powered threat assessment systems. Former DARPA researcher.",
      expertise: ["AI Development", "Detection Systems", "Algorithm Design"],
      image: null
    },
    {
      name: "Lisa Park",
      role: "Director of Product Development",
      department: "Product",
      bio: "Product strategist with deep understanding of tactical requirements and user experience in defense applications.",
      expertise: ["Product Strategy", "User Experience", "Market Analysis"],
      image: null
    },
    {
      name: "James Wilson",
      role: "Lead Systems Architect",
      department: "Engineering",
      bio: "Architect of next-generation tactical systems with focus on scalability and real-time performance optimization.",
      expertise: ["System Architecture", "Performance Optimization", "Technical Leadership"],
      image: null
    },
    {
      name: "Dr. Maria Santos",
      role: "Head of Quality Assurance",
      department: "QA",
      bio: "Ensuring mission-critical reliability through comprehensive testing protocols and quality management systems.",
      expertise: ["Quality Management", "Testing Protocols", "Compliance"],
      image: null
    }
  ];

  const departments = [
    { name: "Engineering", count: 2, color: "bg-blue-500/10 text-blue-400" },
    { name: "Operations", count: 1, color: "bg-green-500/10 text-green-400" },
    { name: "R&D", count: 1, color: "bg-purple-500/10 text-purple-400" },
    { name: "Product", count: 1, color: "bg-orange-500/10 text-orange-400" },
    { name: "QA", count: 1, color: "bg-red-500/10 text-red-400" }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Team
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet the experts behind Stravex Technologies' innovative tactical solutions. Our diverse team combines cutting-edge research with real-world operational experience.
          </p>
        </div>

        {/* Department Overview */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Departments
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {departments.map((dept, index) => (
              <Badge key={index} variant="outline" className={`px-4 py-2 ${dept.color}`}>
                {dept.name} ({dept.count})
              </Badge>
            ))}
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <Card key={index} className="p-6 bg-card border-border hover:shadow-card transition-all duration-300 hover:-translate-y-1">
              <div className="space-y-4">
                {/* Avatar */}
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-primary-foreground" />
                  </div>
                </div>

                {/* Member Info */}
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                  <Badge variant="outline">{member.department}</Badge>
                </div>

                {/* Bio */}
                <p className="text-sm text-muted-foreground text-center leading-relaxed">
                  {member.bio}
                </p>

                {/* Expertise */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground">Expertise</h4>
                  <div className="flex flex-wrap gap-1">
                    {member.expertise.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="flex justify-center space-x-2 pt-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Leadership Message */}
        <Card className="p-8 bg-gradient-secondary border-border">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Leadership Message
            </h2>
            <div className="max-w-4xl mx-auto space-y-4 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                "At Stravex Technologies, our greatest asset is our team. Each member brings unique expertise and passion for advancing tactical technology solutions. We foster a culture of innovation, collaboration, and excellence that drives us to push the boundaries of what's possible."
              </p>
              <p className="text-lg leading-relaxed">
                "Our diverse backgrounds—from advanced research to operational field experience—enable us to create solutions that are not only technologically advanced but also practical and effective in real-world scenarios."
              </p>
            </div>
            <div className="pt-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                <Link to="/contact">
                  Join Our Team
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Team;