"use client";

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

 const navLinks = [
  { href: "/", label: "Home" },
  { href: "/patients", label: "For Patients" },
  {
    label: "For Healthcare Providers",
    dropdown: [
      { href: "/physicians", label: "Private Physicians" },
      { href: "/hospitals", label: "Hospitals" },
      { href: "/laboratories", label: "Medical Labs" },
      { href: "/pharmacies", label: "Pharmacies" },
      { href: "/emergency", label: "Emergency Services" },
      { href: "/insurance", label: "Insurance Providers" },
    ],
  },
  { href: "/corporates", label: "For Business" },
  {
    label: "Company",
    dropdown: [
      { href: "/about", label: "About" },
      { href: "/blog", label: "Content Hub" },
      { href: "/career", label: "Careers" },
    ],
  },
  { href: "/contact", label: "Contact" },
  { href: "/investors", label: "Investors" },
];


  const isActive = (path: string) =>
    path === "/" ? location === "/" : location.startsWith(path);

  const activeClass =
    "bg-slate-200 dark:bg-slate-700 rounded-md px-2 py-1 text-foreground";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white backdrop-blur-md">
      <nav className="container mx-auto">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img
              src={logoPosition?.mediaUrl || mhiLogo}
              alt={logoPosition?.mediaAlt || "My Health Integral Logo"}
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((item) =>
              item.dropdown ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger className="nav-link flex items-center gap-1">
                    {item.label}
                    <ChevronDown className="h-3 w-3" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {item.dropdown.map((sub) => (
                      <DropdownMenuItem key={sub.href} asChild>
                        <Link
                          href={sub.href}
                          className={`w-full ${
                            isActive(sub.href) ? activeClass : ""
                          }`}
                        >
                          {sub.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${
                    isActive(item.href) ? activeClass : ""
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              className="hidden sm:inline-flex"
              onClick={() => {
                alert(
                  "Join our waiting list! Complete the contact form to be invited when we launch."
                );
                setLocation("/contact#contact-form");
              }}
            >
              Sign In
            </Button>

            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/contact#contact-form">Get Started</Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border py-4">
          <div className="space-y-4 px-4">
            {navLinks.map((item) =>
              item.dropdown ? (
                <div key={item.label} className="space-y-2">
                  <div className="text-sm font-medium">{item.label}</div>
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className={`block pl-4 mobile-link ${
                        isActive(sub.href) ? activeClass : ""
                      }`}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block mobile-link ${
                    isActive(item.href) ? activeClass : ""
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
