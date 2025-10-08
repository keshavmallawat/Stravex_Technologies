import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

type BlogPost = {
  id: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  cover: string;
};

const demoPosts: BlogPost[] = [
  {
    id: "edge-ai-radar",
    title: "Edge AI for Tactical Radar: Latency, Models, and Hardware",
    date: "2025-09-21",
    tags: ["Edge AI", "Radar", "Optimization"],
    excerpt:
      "A practical walkthrough of deploying compact CNNs and transformers on constrained edge hardware with deterministic latency goals.",
    cover: "/placeholder.svg",
  },
  {
    id: "ew-countermeasures",
    title: "Modern EW Countermeasures: Designing for Adversarial Robustness",
    date: "2025-08-10",
    tags: ["Electronic Warfare", "Security"],
    excerpt:
      "From signal agility to model hardening: techniques that improve survivability of autonomous sensing systems in contested environments.",
    cover: "/placeholder.svg",
  },
  {
    id: "sensor-fusion-pipelines",
    title: "Real-time Sensor Fusion Pipelines with React + WebGPU",
    date: "2025-07-02",
    tags: ["WebGPU", "Fusion", "Frontend"],
    excerpt:
      "Building a responsive situational UI that streams, fuses, and visualizes multi-sensor telemetry at 60 FPS on the web.",
    cover: "/placeholder.svg",
  },
];

const Blogs = () => {
  return (
    <div className="min-h-screen bg-gradient-hero bg-grid pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="bg-gradient-primary bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Engineering notes, deep dives, and product updates from the Stravex team.
          </p>
        </header>

        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {demoPosts.map((post) => (
          <Card key={post.id} className="bg-card border-border overflow-hidden hover:shadow-card transition-all duration-300 hover:-translate-y-1">
            <div className="aspect-[16/9] w-full bg-muted/30">
              <img
                src={post.cover}
                alt={post.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
                <div className="flex gap-2 flex-wrap">
                  {post.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="px-2 py-0.5">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
              <h3 className="text-xl font-semibold leading-snug text-foreground">{post.title}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
              <div className="mt-4">
                <Link
                  to={`#post-${post.id}`}
                  className="text-primary hover:underline text-sm font-medium"
                >
                  Read more
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
        </section>
      </div>
    </div>
  );
};

export default Blogs;


