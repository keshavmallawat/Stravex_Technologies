import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().nonempty({ message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Please enter a valid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  message: z.string().trim().nonempty({ message: "Message is required" }).max(1000, { message: "Message must be less than 1000 characters" })
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: ["info@stravex.tech", "support@stravex.tech"],
      description: "Get in touch via email"
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 123-4568"],
      description: "Call us during business hours"
    },
    {
      icon: MapPin,
      title: "Location",
      details: ["1234 Technology Blvd", "Defense District, DC 20001"],
      description: "Visit our headquarters"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat - Sun: Emergency Only"],
      description: "Our availability"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = contactSchema.parse(formData);

      // Submit to Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: validatedData.name,
          email: validatedData.email,
          message: validatedData.message
        }]);

      if (error) {
        throw error;
      }

      // Success
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({ name: "", email: "", message: "" });

    } catch (error) {
      if (error instanceof z.ZodError) {
        // Validation errors
        const firstError = error.errors[0];
        toast({
          title: "Validation Error",
          description: firstError.message,
          variant: "destructive",
        });
      } else {
        // Database or other errors
        console.error('Error submitting contact form:', error);
        toast({
          title: "Error Sending Message",
          description: "There was a problem sending your message. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Contact{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Stravex Technologies
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to discuss your tactical technology needs? Get in touch with our experts to learn how we can enhance your operational capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8 bg-card border-border">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground mb-2">Send us a Message</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-foreground">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    maxLength={100}
                    className="bg-input border-border text-foreground"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    maxLength={255}
                    className="bg-input border-border text-foreground"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    maxLength={1000}
                    rows={6}
                    className="bg-input border-border text-foreground resize-none"
                    placeholder="Tell us about your requirements, questions, or how we can help..."
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.message.length}/1000 characters
                  </p>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  size="lg" 
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="p-8 bg-card border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-full shrink-0">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-foreground">{info.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{info.description}</p>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Additional Information */}
            <Card className="p-8 bg-gradient-secondary border-border">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">Why Contact Us?</h3>
                <div className="space-y-3 text-muted-foreground">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                    <p className="text-sm">Technical consultations and system requirements analysis</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                    <p className="text-sm">Product demonstrations and capability briefings</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                    <p className="text-sm">Partnership opportunities and collaboration discussions</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                    <p className="text-sm">Support for existing systems and maintenance</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Security Notice */}
            <Card className="p-6 bg-card border-border">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground text-sm">Security Notice</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  All communications are secure and confidential. For classified or sensitive discussions, 
                  please contact us directly to arrange secure communication channels. We comply with all 
                  relevant export control regulations and security protocols.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;