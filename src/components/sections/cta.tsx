import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Rocket, Play, Lock } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 hero-gradient text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" data-testid="cta-title">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto" data-testid="cta-description">
            Join thousands of patients and healthcare providers who are already experiencing the future of digital healthcare.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/contact#contact-form">
              <Button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/95 transition-colors shadow-lg min-w-[200px]" data-testid="button-final-cta">
                <Rocket className="mr-2 h-5 w-5" />
                Get Started Today
              </Button>
            </Link>
            
             <Link href="/contact#contact-form">
            <Button 
              variant="outline"
              className="text-white border-2 border-white/60 bg-white/15 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/25 transition-colors min-w-[200px]"
              data-testid="button-demo"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
            </Link>
          </div>
          
          <div className="text-white/80 text-sm flex items-center justify-center" data-testid="cta-security">
            <Lock className="mr-2 h-4 w-4" />
            Your data is protected with enterprise-grade security
          </div>
        </div>
      </div>
    </section>
  );
}
