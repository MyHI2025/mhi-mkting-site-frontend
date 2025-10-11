import { useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useSEO } from "@/hooks/use-seo";

export default function TermsOfUse() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useSEO({
    title: "Terms of Use - My Health Integral",
    description: "Terms of Use for My Health Integral digital healthcare platform. Learn about user responsibilities, service limitations, and legal agreements.",
    ogTitle: "Terms of Use - My Health Integral",
    ogDescription: "Terms of Use for My Health Integral digital healthcare platform.",
    canonical: `${window.location.origin}/terms-of-use`
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8" data-testid="terms-title">
            Terms of Use
          </h1>
          
          <div className="prose prose-lg max-w-none text-foreground">
            <p className="text-lg text-muted-foreground mb-8">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                Welcome to My Health Integral ("MHI," "we," "our," or "us"). These Terms of Use ("Terms") govern your access to and use of our digital healthcare platform, website, mobile applications, and related services (collectively, the "Services").
              </p>
              <p>
                By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree with these Terms, please do not use our Services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Description of Services</h2>
              <p className="mb-4">
                MHI provides a comprehensive digital healthcare platform that connects patients, healthcare providers, and healthcare partners. Our Services include:
              </p>
              <ul className="space-y-2">
                <li>• Telemedicine consultations and virtual care</li>
                <li>• Health record management and storage</li>
                <li>• AI-powered health insights and diagnostics support</li>
                <li>• Prescription management and pharmacy integration</li>
                <li>• Laboratory test coordination and results delivery</li>
                <li>• Emergency care coordination</li>
                <li>• Insurance and billing integration</li>
                <li>• Health monitoring and tracking tools</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. User Eligibility and Account Requirements</h2>
              
              <h3 className="text-xl font-semibold mb-3">3.1 Eligibility</h3>
              <p className="mb-4">
                You must be at least 18 years old to use our Services independently. Users under 18 may use the Services with parental or guardian consent and supervision.
              </p>

              <h3 className="text-xl font-semibold mb-3">3.2 Account Registration</h3>
              <p className="mb-4">
                To access certain features, you must create an account by providing accurate, complete, and current information. You are responsible for:
              </p>
              <ul className="space-y-2">
                <li>• Maintaining the confidentiality of your account credentials</li>
                <li>• All activities that occur under your account</li>
                <li>• Immediately notifying us of any unauthorized account use</li>
                <li>• Keeping your contact information current</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Medical Disclaimer and Limitations</h2>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-3 text-yellow-800 dark:text-yellow-200">⚠️ Important Medical Disclaimer</h3>
                <ul className="space-y-2 text-yellow-700 dark:text-yellow-300">
                  <li>• Our Services are not intended to replace in-person medical care</li>
                  <li>• Always seek immediate medical attention for emergencies</li>
                  <li>• AI-powered insights are for informational purposes only</li>
                  <li>• Healthcare providers make all medical decisions</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold mb-3">4.1 Not Emergency Services</h3>
              <p className="mb-4">
                Our Services are not intended for emergency medical situations. If you are experiencing a medical emergency, call 911 or go to your nearest emergency room immediately.
              </p>

              <h3 className="text-xl font-semibold mb-3">4.2 AI and Diagnostic Tools</h3>
              <p className="mb-4">
                AI-powered features and diagnostic support tools provide informational assistance only. They do not constitute medical advice, diagnosis, or treatment recommendations. All medical decisions must be made by qualified healthcare professionals.
              </p>

              <h3 className="text-xl font-semibold mb-3">4.3 Provider Independence</h3>
              <p>
                Healthcare providers using our platform are independent practitioners responsible for their own medical decisions and patient care. MHI does not practice medicine or provide medical advice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. User Responsibilities and Conduct</h2>
              
              <h3 className="text-xl font-semibold mb-3">5.1 Acceptable Use</h3>
              <p className="mb-4">You agree to use our Services only for lawful purposes and in accordance with these Terms. You will not:</p>
              <ul className="space-y-2">
                <li>• Provide false, inaccurate, or misleading health information</li>
                <li>• Attempt to diagnose or treat other users</li>
                <li>• Share your account credentials with others</li>
                <li>• Violate any applicable laws or regulations</li>
                <li>• Interfere with the operation of our Services</li>
                <li>• Upload malicious software or harmful content</li>
                <li>• Attempt unauthorized access to our systems</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">5.2 Information Accuracy</h3>
              <p>
                You are responsible for providing accurate and complete health information. Inaccurate information may affect the quality of care you receive and could pose health risks.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Privacy and Data Protection</h2>
              <p className="mb-4">
                Your privacy is important to us. Our collection, use, and protection of your personal health information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
              <p>
                We comply with HIPAA, GDPR, and other applicable privacy laws to protect your health information and maintain appropriate security safeguards.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Fees and Payment</h2>
              
              <h3 className="text-xl font-semibold mb-3">7.1 Service Fees</h3>
              <p className="mb-4">
                Certain Services may require payment of fees. All fees are clearly disclosed before you incur any charges. Fees are non-refundable except as required by law or as specifically stated.
              </p>

              <h3 className="text-xl font-semibold mb-3">7.2 Insurance and Billing</h3>
              <p className="mb-4">
                We may work with your insurance provider to process claims. You are responsible for:
              </p>
              <ul className="space-y-2">
                <li>• Verifying your insurance coverage and benefits</li>
                <li>• Paying any applicable co-pays, deductibles, or uncovered charges</li>
                <li>• Providing accurate insurance information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Intellectual Property</h2>
              
              <h3 className="text-xl font-semibold mb-3">8.1 Our Property</h3>
              <p className="mb-4">
                The Services, including software, content, trademarks, and other intellectual property, are owned by MHI and our licensors. You may not copy, modify, distribute, or create derivative works without our written permission.
              </p>

              <h3 className="text-xl font-semibold mb-3">8.2 Your Content</h3>
              <p>
                You retain ownership of your personal health information. By using our Services, you grant us a limited license to use your information as necessary to provide the Services and as described in our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Service Availability and Modifications</h2>
              <p className="mb-4">
                We strive to maintain continuous service availability but cannot guarantee uninterrupted access. We may:
              </p>
              <ul className="space-y-2">
                <li>• Perform scheduled maintenance that temporarily limits access</li>
                <li>• Modify or discontinue features with reasonable notice</li>
                <li>• Update these Terms periodically</li>
                <li>• Suspend access for violations of these Terms</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Disclaimers and Limitations of Liability</h2>
              
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-3 text-red-800 dark:text-red-200">Limitation of Liability</h3>
                <p className="text-red-700 dark:text-red-300">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, MHI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR GOODWILL.
                </p>
              </div>

              <h3 className="text-xl font-semibold mb-3">10.1 Service Warranty</h3>
              <p className="mb-4">
                Our Services are provided "AS IS" and "AS AVAILABLE." We make no warranties regarding the accuracy, reliability, or availability of our Services, except as required by law.
              </p>

              <h3 className="text-xl font-semibold mb-3">10.2 Third-Party Services</h3>
              <p>
                We may integrate with third-party services (laboratories, pharmacies, insurance providers). We are not responsible for the performance or availability of third-party services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Indemnification</h2>
              <p>
                You agree to indemnify and hold MHI harmless from any claims, damages, or expenses arising from your use of the Services, violation of these Terms, or violation of any third-party rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">12. Termination</h2>
              
              <h3 className="text-xl font-semibold mb-3">12.1 Termination by You</h3>
              <p className="mb-4">
                You may terminate your account at any time by contacting us. Upon termination, you will lose access to the Services, but we may retain your information as required by law.
              </p>

              <h3 className="text-xl font-semibold mb-3">12.2 Termination by Us</h3>
              <p>
                We may terminate your access immediately if you violate these Terms or engage in conduct that we determine is harmful to other users or our Services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">13. Governing Law and Dispute Resolution</h2>
              <p className="mb-4">
                These Terms are governed by the laws of [Jurisdiction] without regard to conflict of law principles. Any disputes will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
              </p>
              <p>
                You waive any right to participate in class-action lawsuits or class-wide arbitration, except where prohibited by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">14. Severability and Entire Agreement</h2>
              <p className="mb-4">
                If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
              </p>
              <p>
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and MHI regarding the Services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">15. Contact Information</h2>
              <p className="mb-4">
                If you have questions about these Terms, please contact us:
              </p>
              <div className="bg-muted p-6 rounded-lg">
                <p><strong>Legal Department</strong></p>
                <p>My Health Integral</p>
                <p>Email: legal@myhealthintegral.com</p>
                <p>Phone: 1-800-MHI-CARE (1-800-644-2273)</p>
                <p>Address: [Company Address]</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">16. Updates to Terms</h2>
              <p>
                We may update these Terms periodically to reflect changes in our Services or applicable law. We will notify you of material changes by email or through our platform. Continued use of our Services after changes take effect constitutes acceptance of the updated Terms.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}