import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const probe = new Image();
    probe.src = "/stravex-logo.png";
    probe.onload = () => setLogoError(false);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Team", path: "/team" },
    { name: "Technologies", path: "/technologies" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact Us", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        {/* Single-row header: logo left, nav right (no pill styling) */}
        <div className="flex items-center justify-between py-0 min-h-12">
          <Link to="/" className="flex items-center gap-1 min-w-0 overflow-visible">
            {!logoError ? (
              <img
                src="/stravex-logo.png"
                alt="Stravex Technologies"
                className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto max-w-none object-contain select-none shrink-0 transition-transform duration-300 hover:scale-110 scale-150"
                draggable={false}
                onError={() => setLogoError(true)}
              />
            ) : (
              <>
                <span className="font-heading tracking-wide text-lg sm:text-xl md:text-2xl font-extrabold bg-gradient-primary bg-clip-text text-transparent">STRAVEX</span>
                <span className="hidden sm:inline text-xs sm:text-sm text-muted-foreground">TECHNOLOGIES</span>
              </>
            )}
            <span className="sr-only">Stravex Technologies</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={
                  `rounded-full px-2.5 py-2 text-sm font-semibold transition-all ` +
                  (isActive(item.path)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/40")
                }
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="h-10 w-10"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="md:hidden mt-2 overflow-hidden rounded-2xl border border-border bg-card/95 backdrop-blur">
            <div className="py-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-4 py-3 text-base font-semibold transition-colors ${isActive(item.path)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;