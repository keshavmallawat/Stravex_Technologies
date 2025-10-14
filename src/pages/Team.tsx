import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Linkedin, User } from "lucide-react";

const Team = () => {
  const teamMembers = [
    {
      name: "Krishna Mallawat",
      role: "CEO & Co-founder",
      department: "Leadership",
      bio: "Driving Stravex Technologies to develop high-impact defense solutions with electronics, embedded systems, and AI/ML. Committed to advancing technology that strengthens security, operational excellence, and global influence.",
      expertise: ["Electronics", "Embedded Systems", "AI & ML", "Defense Solutions"],
      image: "/team/krishna-mallawat.jpg",
      linkedin: "https://www.linkedin.com/in/krishna-mallawat-72061317b/"
    },
    {
      name: "Atharva Dalvi",
      role: "CTO & Co-founder",
      department: "Technology",
      bio: "Advancing innovation at Stravex Technologies through cutting-edge solutions designed to shape the future and make a meaningful global impact.",
      expertise: ["Hardware Design", "AI & ML", "IOT"],
      image: "/team/atharva-dalvi.jpg",
      linkedin: "https://www.linkedin.com/in/atharvadalvi010/"
    },
    {
      name: "Harsh Patil",
      role: "COO & Co-founder",
      department: "Operations",
      bio: "My role focuses on driving innovation from concept to deployment — ensuring our systems deliver unmatched speed, intelligence, and reliability in defence, security, and high-performance industrial missions.",
      expertise: ["Drone System Engineer", "Control system", "Hardware Design"],
      image: "/team/harsh-patil.jpg",
      linkedin: "https://www.linkedin.com/in/harsh-patil-33049130a/"
    }
  ];

  const departments = [
    { name: "Leadership", count: 1, color: "bg-blue-500/10 text-blue-400" },
    { name: "Operations", count: 1, color: "bg-green-500/10 text-green-400" },
    { name: "Technology", count: 1, color: "bg-purple-500/10 text-purple-400" }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero bg-grid pt-24 pb-16">
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
            Meet the founding team behind Stravex Technologies' innovative tactical solutions. Our founders combine strategic vision, technical expertise, and operational excellence to drive the future of defense technology.
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
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={`${member.name} photo`}
                      className="w-20 h-20 rounded-full object-cover border border-border shadow-sm"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center">
                      <User className="h-10 w-10 text-primary-foreground" />
                    </div>
                  )}
                </div>

                {/* Member Info */}
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                  <Badge variant="outline">{member.department}</Badge>
                </div>

                {/* Bio */}
                <p className="text-sm text-muted-foreground text-center leading-relaxed min-h-[6rem] md:min-h-[7rem]">
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
                  {member.linkedin && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => window.open(member.linkedin, '_blank')}
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  )}
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
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                <Link to="/contact">
                  Join Our Team
                </Link>
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => window.open('https://www.linkedin.com/company/stravex-technologies/', '_blank')}
                className="flex items-center space-x-2"
              >
                <Linkedin className="h-5 w-5" />
                <span>Follow Us on LinkedIn</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Team;