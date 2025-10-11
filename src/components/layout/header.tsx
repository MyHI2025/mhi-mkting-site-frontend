import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import mhiLogo from "@assets/Copy of MHI LOGO 1_1758583000209.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMediaPosition } from "@/hooks/use-media-position";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { data: logoPosition } = useMediaPosition("logo_header");

  const providerLinks = [
    { href: "/physicians", label: "Private Physicians" },
    { href: "/hospitals", label: "Hospitals" },
    { href: "/laboratories", label: "Medical Labs" },
    { href: "/pharmacies", label: "Pharmacies" },
    { href: "/emergency", label: "Emergency Services" },
    { href: "/insurance", label: "Insurance Providers" },
  ];

  return (
    <header className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3 flex-shrink-0" data-testid="logo-link">
              <img 
                src={logoPosition?.mediaUrl || mhiLogo} 
                alt={logoPosition?.mediaAlt || "My Health Integral Logo"} 
                className="h-10 w-auto object-contain"
              />
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-muted-foreground hover:text-foreground font-medium" data-testid="link-home">
                Home
              </Link>
              <Link href="/patients" className="text-muted-foreground hover:text-foreground font-medium" data-testid="link-patients">
                For Patients
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-muted-foreground hover:text-foreground font-medium flex items-center space-x-1" data-testid="providers-dropdown">
                  <span>For Healthcare Providers</span>
                  <ChevronDown className="h-3 w-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {providerLinks.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link href={link.href} className="w-full" data-testid={`link-${link.href.replace('/', '')}`}>
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/corporates" className="text-muted-foreground hover:text-foreground font-medium" data-testid="link-corporates">
                For Business
              </Link>
              <Link href="/pricing" className="text-muted-foreground hover:text-foreground font-medium" data-testid="link-pricing">
                Pricing
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground font-medium" data-testid="link-about">
                About
              </Link>
              <Link href="/blog" className="text-muted-foreground hover:text-foreground font-medium" data-testid="link-blog">
                Content Hub
              </Link>
              <Link href="/career" className="text-muted-foreground hover:text-foreground font-medium" data-testid="link-career">
                Careers
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground font-medium" data-testid="link-contact">
                Contact
              </Link>
              <Link href="/investors" className="text-muted-foreground hover:text-foreground font-medium" data-testid="link-investors">
                Investors
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="hidden sm:inline-flex" 
              data-testid="button-signin"
              title="Complete the waiting list form to be invited when we launch"
              onClick={() => {
                alert("Join our waiting list! Complete the contact form to be invited when we launch.");
                setLocation("/contact#contact-form");
              }}
            >
              Sign In
            </Button>
            <Button className="bg-primary hover:bg-primary/90" data-testid="button-get-started" asChild>
              <Link href="/contact#contact-form">
                Get Started
              </Link>
            </Button>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border py-4" data-testid="mobile-menu">
            <div className="space-y-4">
              <Link href="/" className="block text-muted-foreground hover:text-foreground font-medium" data-testid="mobile-link-home">
                Home
              </Link>
              <Link href="/patients" className="block text-muted-foreground hover:text-foreground font-medium" data-testid="mobile-link-patients">
                For Patients
              </Link>
              <div className="space-y-2">
                <div className="text-sm font-medium text-foreground">For Healthcare Providers</div>
                {providerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block pl-4 text-muted-foreground hover:text-foreground"
                    data-testid={`mobile-link-${link.href.replace('/', '')}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <Link href="/corporates" className="block text-muted-foreground hover:text-foreground font-medium" data-testid="mobile-link-corporates">
                For Business
              </Link>
              <Link href="/pricing" className="block text-muted-foreground hover:text-foreground font-medium" data-testid="mobile-link-pricing">
                Pricing
              </Link>
              <Link href="/about" className="block text-muted-foreground hover:text-foreground font-medium" data-testid="mobile-link-about">
                About
              </Link>
              <Link href="/blog" className="block text-muted-foreground hover:text-foreground font-medium" data-testid="mobile-link-blog">
                Content Hub
              </Link>
              <Link href="/career" className="block text-muted-foreground hover:text-foreground font-medium" data-testid="mobile-link-career">
                Careers
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-foreground font-medium" data-testid="mobile-link-contact">
                Contact
              </Link>
              <Link href="/investors" className="block text-muted-foreground hover:text-foreground font-medium" data-testid="mobile-link-investors">
                Investors
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
