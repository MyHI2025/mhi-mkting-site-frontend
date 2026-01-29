import { Link } from "wouter";
import { Linkedin, Facebook, MessageCircle, Instagram, Youtube } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { useLiveChat } from "@/components/ui/live-chat-provider";
import mhiLogo from "@assets/Copy of MHI LOGO 1_1758583000209.png";

export default function Footer() {
  const { openChat } = useLiveChat();
  
  return (
    <footer className="bg-foreground text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src={mhiLogo} 
                alt="My Health Integral Logo" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-white/70 leading-relaxed">
              Revolutionizing healthcare through comprehensive digital solutions that connect patients, providers, and healthcare partners globally.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://www.linkedin.com/company/my-health-integral/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors" 
                data-testid="social-linkedin"
                aria-label="Visit our LinkedIn page"
              >
                <Linkedin className="text-white h-4 w-4" />
              </a>
              <a 
                href="https://www.facebook.com/myhealthintegral/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors" 
                data-testid="social-facebook"
                aria-label="Visit our Facebook page"
              >
                <Facebook className="text-white h-4 w-4" />
              </a>
              <a 
                href="https://x.com/mhi_hub" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors" 
                data-testid="social-x"
                aria-label="Visit our X (Twitter) page"
              >
                <svg className="text-white h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/myhealthintegral" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors" 
                data-testid="social-instagram"
                aria-label="Visit our Instagram page"
              >
                <Instagram className="text-white h-4 w-4" />
              </a>
              <a 
                href="https://www.tiktok.com/@myhealthintegral" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors" 
                data-testid="social-tiktok"
                aria-label="Visit our TikTok page"
              >
                <FaTiktok className="text-white h-4 w-4" />
              </a>
              <a 
                href="https://www.youtube.com/@myhealthintegral" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors" 
                data-testid="social-youtube"
                aria-label="Visit our YouTube channel"
              >
                <Youtube className="text-white h-4 w-4" />
              </a>
            </div>
          </div>
          
          {/* For Patients */}
          <div>
            <h3 className="text-lg font-semibold mb-6">For Patients</h3>
            <ul className="space-y-3">
              <li><Link href="/patients" className="text-white/70 hover:text-white hover:underline underline-offset-4 decoration-1 hover:decoration-2 transition-colors" data-testid="footer-telemedicine">Telemedicine</Link></li>
              <li><Link href="/patients" className="text-white/70 hover:text-white hover:underline underline-offset-4 decoration-1 hover:decoration-2 transition-colors" data-testid="footer-health-records">Health Records</Link></li>
              <li><Link href="/patients" className="text-white/70 hover:text-white hover:underline underline-offset-4 decoration-1 hover:decoration-2 transition-colors" data-testid="footer-lab-tests">Lab Tests</Link></li>
              <li><Link href="/patients" className="text-white/70 hover:text-white hover:underline underline-offset-4 decoration-1 hover:decoration-2 transition-colors" data-testid="footer-pharmacy-services">Pharmacy Services</Link></li>
              <li><Link href="/patients" className="text-white/70 hover:text-white hover:underline underline-offset-4 decoration-1 hover:decoration-2 transition-colors" data-testid="footer-emergency-care">Emergency Care</Link></li>
            </ul>
          </div>
          
          {/* For Providers */}
          <div>
            <h3 className="text-lg font-semibold mb-6">For Providers</h3>
            <ul className="space-y-3">
              <li><Link href="/physicians" className="text-white/70 hover:text-white hover:underline underline-offset-4 decoration-1 hover:decoration-2 transition-colors" data-testid="footer-physicians">Physicians</Link></li>
              <li><Link href="/hospitals" className="text-white/70 hover:text-white hover:underline underline-offset-4 decoration-1 hover:decoration-2 transition-colors" data-testid="footer-hospitals">Hospitals</Link></li>
              <li><Link href="/laboratories" className="text-white/70 hover:text-white hover:underline underline-offset-4 decoration-1 hover:decoration-2 transition-colors" data-testid="footer-laboratories">Laboratories</Link></li>
              <li><Link href="/pharmacies" className="text-white/70 hover:text-white hover:underline underline-offset-4 decoration-1 hover:decoration-2 transition-colors" data-testid="footer-pharmacies">Pharmacies</Link></li>
              <li><Link href="/insurance" className="text-white/70 hover:text-white hover:underline underline-offset-4 decoration-1 hover:decoration-2 transition-colors" data-testid="footer-insurance">Insurance</Link></li>
            </ul>
          </div>
          
          {/* For Business/Corporate */}
          <div>
            <h3 className="text-lg font-semibold mb-6">For Business/Corporate</h3>
            <ul className="space-y-3">
              <li><Link href="/corporates" className="text-white/70 hover:text-white hover:underline underline-offset-4 decoration-1 hover:decoration-2 transition-colors" data-testid="footer-corporate-wellness">Corporate Wellness</Link></li>
              <li><Link href="/corporates" className="text-white/70 hover:text-white hover:underline underline-offset-4 decoration-1 hover:decoration-2 transition-colors" data-testid="footer-employee-health">Employee Health</Link></li>
              <li><Link href="/corporates" className="text-white/70 hover:text-white hover:underline underline-offset-4 decoration-1 hover:decoration-2 transition-colors" data-testid="footer-enterprise-solutions">Enterprise Solutions</Link></li>
              {/* <li><Link href="/pricing?type=corporates" className="text-white/70 hover:text-white hover:underline underline-offset-4 decoration-1 hover:decoration-2 transition-colors" data-testid="footer-corporate-pricing">Corporate Pricing</Link></li> */}
            </ul>
          </div>
          
          {/* Company & Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-white/70 hover:text-white hover:underline underline-offset-4 decoration-1 hover:decoration-2 transition-colors" data-testid="footer-about">About Us</Link></li>
              <li><Link href="/career" className="text-white/70 hover:text-white hover:underline underline-offset-4 decoration-1 hover:decoration-2 transition-colors" data-testid="footer-career">Careers</Link></li>
              <li><Link href="/blog" className="text-white/70 hover:text-white hover:underline underline-offset-4 decoration-1 hover:decoration-2 transition-colors" data-testid="footer-blog">Content Hub</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-white hover:underline underline-offset-4 decoration-1 hover:decoration-2 transition-colors" data-testid="footer-contact-us">Contact Us</Link></li>
              <li><button onClick={openChat} className="text-white/70 hover:text-white hover:underline underline-offset-4 decoration-1 hover:decoration-2 transition-colors flex items-center space-x-2" data-testid="footer-live-chat">
                <MessageCircle className="h-4 w-4" />
                <span>Live Chat</span>
              </button></li>
              <li><Link href="/privacy-policy" className="text-white/70 hover:text-white hover:underline underline-offset-4 decoration-1 hover:decoration-2 transition-colors" data-testid="footer-privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms-of-use" className="text-white/70 hover:text-white hover:underline underline-offset-4 decoration-1 hover:decoration-2 transition-colors" data-testid="footer-terms-of-use">Terms of Use</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/70 text-sm" data-testid="footer-copyright">
            © 2024 My Health Integral. All rights reserved.
          </div>
          <div className="text-white/70 text-sm mt-4 md:mt-0" data-testid="footer-tagline">
            Made with ❤️ for global healthcare transformation
          </div>
        </div>
      </div>
    </footer>
  );
}
