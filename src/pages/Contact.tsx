import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { createContactSubmission } from "@/integrations/firebase/contactService";
import { Mail, Phone, MapPin, Clock, Send, Users, Linkedin, Instagram } from "lucide-react";
import { z } from "zod";
import SEO from "@/components/SEO";

const contactSchema = z.object({
  name: z.string().trim().nonempty({ message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  company: z.string().trim().max(100, { message: "Company name must be less than 100 characters" }).optional(),
  email: z.string().trim().email({ message: "Please enter a valid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  message: z.string().trim().nonempty({ message: "Message is required" }).max(1000, { message: "Message must be less than 1000 characters" })
});

const Contact = () => {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.stravextechnologies.com/" },
      { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.stravextechnologies.com/contact" }
    ]
  };
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: ["info@stravextechnologies.com"],
      description: "Get in touch via email"
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 84258 02309"],
      description: "Call us during business hours"
    },
    {
      icon: MapPin,
      title: "Address",
      details: [
        "Haware Fantasia Business Park, Vashi, Navi Mumbai"
      ],
      description: "Visit our office"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Sat: 10:00 AM - 7:00 PM"],
      description: "Our availability"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      details: ["https://www.linkedin.com/company/stravex-technologies/"],
      description: "Follow our updates"
    },
    {
      icon: Instagram,
      title: "Instagram",
      details: ["https://www.instagram.com/stravextechnologies"],
      description: "See behind the scenes"
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

      // Submit to Firebase
      await createContactSubmission({
        name: validatedData.name,
        company: validatedData.company || "",
        email: validatedData.email,
        message: validatedData.message
      });

      // Success
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({ name: "", company: "", email: "", message: "" });

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
    <div className="min-h-screen bg-gradient-hero bg-grid pt-24 pb-16">
      <SEO 
        title="Contact – Stravex Technologies"
        description="Contact Stravex Technologies. Talk to our experts about tactical detection, interception systems, and custom solutions."
        path="/contact"
        image="/stravex-logo.png"
        jsonLd={breadcrumbJsonLd}
      />
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
                  <Label htmlFor="company" className="text-sm font-medium text-foreground">
                    Company Name
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleInputChange}
                    maxLength={100}
                    className="bg-input border-border text-foreground"
                    placeholder="Enter your company name (optional)"
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
                {contactInfo.map((info, index) => {
                  const primaryDetail = info.details?.[0] ?? "";
                  let primaryHref = "";
                  if (info.title === "Email" && primaryDetail) {
                    primaryHref = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(primaryDetail)}`;
                  } else if (info.title === "Phone" && primaryDetail) {
                    primaryHref = `tel:${primaryDetail.replace(/\s+/g, "")}`;
                  } else if (info.title === "Address" && primaryDetail) {
                    primaryHref = primaryDetail.startsWith("http")
                      ? primaryDetail
                      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(primaryDetail)}`;
                  } else if ((info.title === "LinkedIn" || info.title === "Instagram") && primaryDetail) {
                    primaryHref = primaryDetail;
                  }

                  return (
                    <div key={index} className="flex items-start space-x-4">
                      {primaryHref ? (
                        <a
                          href={primaryHref}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={info.title}
                          className="p-3 bg-primary/10 rounded-full shrink-0 hover:bg-primary/20 transition-colors"
                        >
                          <info.icon className="h-5 w-5 text-primary" />
                        </a>
                      ) : (
                        <div className="p-3 bg-primary/10 rounded-full shrink-0">
                          <info.icon className="h-5 w-5 text-primary" />
                        </div>
                      )}
                      <div className="space-y-1">
                      <h3 className="font-semibold text-foreground">{info.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{info.description}</p>
                      {info.details.map((detail, detailIndex) => {
                        let href = "";
                        if (info.title === "Email") {
                          href = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(detail)}`;
                        } else if (info.title === "Phone") {
                          href = `tel:${detail.replace(/\s+/g, "")}`;
                        } else if (info.title === "Address") {
                          href = detail.startsWith("http") ? detail : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(detail)}`;
                        } else if (info.title === "LinkedIn" || info.title === "Instagram") {
                          href = detail;
                        }
                        const isLink = Boolean(href);
                        const displayText = info.title === "Address" && detail.startsWith("http")
                          ? "Open in Google Maps"
                          : detail;
                        return isLink ? (
                          <a
                            key={detailIndex}
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-primary hover:underline break-all"
                          >
                            {displayText}
                          </a>
                        ) : (
                          <p key={detailIndex} className="text-sm text-muted-foreground">
                            {detail}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                  );
                })}
              </div>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;