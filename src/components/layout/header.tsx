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
      ]
    },
    { href: "/corporates", label: "For Business" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Content Hub" },
    { href: "/career", label: "Careers" },
    { href: "/contact", label: "Contact" },
    { href: "/investors", label: "Investors" }
  ];

  const isActive = (path: string) =>
  path === "/" ? location === "/" : location.startsWith(path);


  const activeClass = "bg-slate-200 dark:bg-slate-700 rounded-md px-2 py-1 text-foreground";

  return (
    <header className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <nav className="container mx-auto px-0">
        <div className="flex justify-between items-center h-16 w-full">

          {/* LEFT: LOGO */}
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="flex items-center space-x-2 flex-shrink-0"
              data-testid="logo-link"
            >
              <img
                src={logoPosition?.mediaUrl || mhiLogo}
                alt={logoPosition?.mediaAlt || "My Health Integral Logo"}
                className="h-10 w-auto object-contain"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((item) =>
                item.dropdown ? (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger className="nav-link flex items-center space-x-1">
                      <span>{item.label}</span>
                      <ChevronDown className="h-3 w-3" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-56">
                      {item.dropdown.map((sub) => (
                        <DropdownMenuItem key={sub.href} asChild>
                          <Link
                            href={sub.href}
                            className={`w-full ${isActive(sub.href) ? activeClass : ""}`}
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
                    className={`nav-link ${isActive(item.href) ? activeClass : ""}`}
                  >
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/corporates" className="nav-link">For Business</Link>
          {/* <Link href="/pricing" className="nav-link">Pricing</Link> */}
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/blog" className="nav-link">Content Hub</Link>
          <Link href="/career" className="nav-link">Careers</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
          <Link href="/investors" className="nav-link">Investors</Link>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center space-x-3">
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

        <Button className="bg-primary hover:bg-primary/90" asChild>
          <Link href="/contact#contact-form">Get Started</Link>
        </Button>

        {/* Mobile Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
    </div>

    {/* Mobile Navigation */}
    {isMobileMenuOpen && (
      <div className="lg:hidden border-t border-border py-4">
        <div className="space-y-4">
          <Link href="/" className="mobile-link">Home</Link>
          <Link href="/patients" className="mobile-link">For Patients</Link>

          <div className="space-y-2">
            <div className="text-sm font-medium text-foreground">
              For Healthcare Providers
            </div>
          </div>

          <Link href="/corporates" className="mobile-link">For Business</Link>
          {/* <Link href="/pricing" className="mobile-link">Pricing</Link> */}
          <Link href="/about" className="mobile-link">About</Link>
          <Link href="/blog" className="mobile-link">Content Hub</Link>
          <Link href="/career" className="mobile-link">Careers</Link>
          <Link href="/contact" className="mobile-link">Contact</Link>
          <Link href="/investors" className="mobile-link">Investors</Link>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border py-4">
            <div className="space-y-4">
              {navLinks.map((item) =>
                item.dropdown ? (
                  <div key={item.label} className="space-y-2">
                    <div className="text-sm font-medium">{item.label}</div>
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={`block pl-4 mobile-link ${isActive(sub.href) ? activeClass : ""}`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`mobile-link block ${isActive(item.href) ? activeClass : ""}`}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}




// import { useState } from "react";
// import { Link, useLocation } from "wouter";
// import { Menu, X, ChevronDown } from "lucide-react";
// import mhiLogo from "@assets/Copy of MHI LOGO 1_1758583000209.png";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useMediaPosition } from "@/hooks/use-media-position";

// export default function Header() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [location, setLocation] = useLocation();
//   const { data: logoPosition } = useMediaPosition("logo_header");

//   const providerLinks = [
//     { href: "/physicians", label: "Private Physicians" },
//     { href: "/hospitals", label: "Hospitals" },
//     { href: "/laboratories", label: "Medical Labs" },
//     { href: "/pharmacies", label: "Pharmacies" },
//     { href: "/emergency", label: "Emergency Services" },
//     { href: "/insurance", label: "Insurance Providers" },
//   ];

//   return (
//    <header className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
//   <nav className="container mx-auto px-0">
//     <div className="flex justify-between items-center h-16 w-full">

//       {/* LEFT: LOGO (no padding, starts at left edge) */}
//       <div className="flex items-center space-x-6">
//         <Link
//           href="/"
//           className="flex items-center space-x-2 flex-shrink-0"
//           data-testid="logo-link"
//         >
//           <img
//             src={logoPosition?.mediaUrl || mhiLogo}
//             alt={logoPosition?.mediaAlt || "My Health Integral Logo"}
//             className="h-10 w-auto object-contain"
//           />
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden lg:flex items-center space-x-6">
//           <Link href="/" className="nav-link">Home</Link>
//           <Link href="/patients" className="nav-link">For Patients</Link>

//           {/* Providers Dropdown */}
//           <DropdownMenu>
//             <DropdownMenuTrigger
//               className="nav-link flex items-center space-x-1"
//               data-testid="providers-dropdown"
//             >
//               <span>For Healthcare Providers</span>
//               <ChevronDown className="h-3 w-3" />
//             </DropdownMenuTrigger>

//             <DropdownMenuContent className="w-56">
//               {providerLinks.map((link) => (
//                 <DropdownMenuItem key={link.href} asChild>
//                   <Link href={link.href} className="w-full">
//                     {link.label}
//                   </Link>
//                 </DropdownMenuItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <Link href="/corporates" className="nav-link">For Business</Link>
//           {/* <Link href="/pricing" className="nav-link">Pricing</Link> */}
//           <Link href="/about" className="nav-link">About</Link>
//           <Link href="/blog" className="nav-link">Content Hub</Link>
//           <Link href="/career" className="nav-link">Careers</Link>
//           <Link href="/contact" className="nav-link">Contact</Link>
//           <Link href="/investors" className="nav-link">Investors</Link>
//         </div>
//       </div>

//       {/* RIGHT SECTION */}
//       <div className="flex items-center space-x-3">
//         <Button
//           variant="ghost"
//           className="hidden sm:inline-flex"
//           data-testid="button-signin"
//           title="Complete the waiting list form to be invited when we launch"
//           onClick={() => {
//             alert("Join our waiting list! Complete the contact form to be invited when we launch.");
//             setLocation("/contact#contact-form");
//           }}
//         >
//           Sign In
//         </Button>

//         <Button className="bg-primary hover:bg-primary/90" asChild>
//           <Link href="/contact#contact-form">Get Started</Link>
//         </Button>

//         {/* Mobile Toggle */}
//         <Button
//           variant="ghost"
//           size="icon"
//           className="lg:hidden"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//         </Button>
//       </div>
//     </div>

//     {/* Mobile Navigation */}
//     {isMobileMenuOpen && (
//       <div className="lg:hidden border-t border-border py-4">
//         <div className="space-y-4">
//           <Link href="/" className="mobile-link">Home</Link>
//           <Link href="/patients" className="mobile-link">For Patients</Link>

//           <div className="space-y-2">
//             <div className="text-sm font-medium text-foreground">
//               For Healthcare Providers
//             </div>
//             {providerLinks.map((link) => (
//               <Link key={link.href} href={link.href} className="block pl-4 text-muted-foreground hover:text-foreground">
//                 {link.label}
//               </Link>
//             ))}
//           </div>

//           <Link href="/corporates" className="mobile-link">For Business</Link>
//           {/* <Link href="/pricing" className="mobile-link">Pricing</Link> */}
//           <Link href="/about" className="mobile-link">About</Link>
//           <Link href="/blog" className="mobile-link">Content Hub</Link>
//           <Link href="/career" className="mobile-link">Careers</Link>
//           <Link href="/contact" className="mobile-link">Contact</Link>
//           <Link href="/investors" className="mobile-link">Investors</Link>
//         </div>
//       </div>
//     )}
//   </nav>
// </header>

//   );
// }
