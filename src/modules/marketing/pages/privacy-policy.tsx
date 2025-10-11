import { useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useSEO } from "@/hooks/use-seo";

export default function PrivacyPolicy() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useSEO({
    title: "Privacy Policy - My Health Integral",
    description: "Learn how My Health Integral protects your personal health information and privacy. Comprehensive privacy policy covering data collection, use, and security.",
    ogTitle: "Privacy Policy - My Health Integral",
    ogDescription: "Learn how My Health Integral protects your personal health information and privacy.",
    canonical: `${window.location.origin}/privacy-policy`
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8" data-testid="privacy-title">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none text-foreground">
            <p className="text-lg text-muted-foreground mb-8">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="mb-4">
                My Health Integral ("we," "our," or "us") is committed to protecting your privacy and personal health information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our digital healthcare platform and services.
              </p>
              <p>
                We comply with the Health Insurance Portability and Accountability Act (HIPAA), General Data Protection Regulation (GDPR), and other applicable privacy laws to ensure your health information remains secure and confidential.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold mb-3">2.1 Personal Health Information</h3>
              <ul className="mb-4 space-y-2">
                <li>• Medical records and health history</li>
                <li>• Diagnostic test results and lab reports</li>
                <li>• Treatment plans and medication information</li>
                <li>• Vital signs and health monitoring data</li>
                <li>• Insurance and billing information</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">2.2 Personal Information</h3>
              <ul className="mb-4 space-y-2">
                <li>• Name, address, and contact information</li>
                <li>• Date of birth and demographic information</li>
                <li>• Emergency contact details</li>
                <li>• Account credentials and authentication data</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">2.3 Technical Information</h3>
              <ul className="space-y-2">
                <li>• Device information and IP address</li>
                <li>• Usage data and platform interactions</li>
                <li>• Location data (when permitted)</li>
                <li>• Cookies and tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <ul className="space-y-3">
                <li>• <strong>Healthcare Services:</strong> Provide telemedicine consultations, health monitoring, and care coordination</li>
                <li>• <strong>Treatment Support:</strong> Share information with your healthcare providers for diagnosis and treatment</li>
                <li>• <strong>Platform Operations:</strong> Maintain and improve our services, process payments, and provide customer support</li>
                <li>• <strong>Legal Compliance:</strong> Meet regulatory requirements and respond to legal requests</li>
                <li>• <strong>Research:</strong> Conduct de-identified research to improve healthcare outcomes (with appropriate consent)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Information Sharing and Disclosure</h2>
              
              <h3 className="text-xl font-semibold mb-3">4.1 Healthcare Providers</h3>
              <p className="mb-4">
                We may share your health information with healthcare providers involved in your care, including physicians, specialists, laboratories, pharmacies, and hospitals within our network.
              </p>

              <h3 className="text-xl font-semibold mb-3">4.2 Business Associates</h3>
              <p className="mb-4">
                We may share information with third-party service providers who assist us in delivering healthcare services, subject to appropriate business associate agreements and privacy protections.
              </p>

              <h3 className="text-xl font-semibold mb-3">4.3 Legal Requirements</h3>
              <p>
                We may disclose information when required by law, court order, or to protect public health and safety, prevent crime, or respond to emergencies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
              <p className="mb-4">
                We implement comprehensive security measures to protect your information:
              </p>
              <ul className="space-y-2">
                <li>• End-to-end encryption for all data transmission</li>
                <li>• Secure cloud storage with redundancy and backup</li>
                <li>• Multi-factor authentication and access controls</li>
                <li>• Regular security audits and vulnerability assessments</li>
                <li>• Employee training on privacy and security protocols</li>
                <li>• Incident response and breach notification procedures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
              <p className="mb-4">You have the following rights regarding your personal health information:</p>
              <ul className="space-y-2">
                <li>• <strong>Access:</strong> Request copies of your health information</li>
                <li>• <strong>Amendment:</strong> Request corrections to inaccurate information</li>
                <li>• <strong>Restriction:</strong> Request limits on use or disclosure of your information</li>
                <li>• <strong>Portability:</strong> Request transfer of your data to another provider</li>
                <li>• <strong>Deletion:</strong> Request deletion of your information (subject to legal requirements)</li>
                <li>• <strong>Communication:</strong> Request confidential communications through specific methods</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
              <p>
                We retain your health information as required by law and medical standards. Medical records are typically retained for at least 7 years after your last interaction with our services, or longer as required by applicable regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. International Data Transfers</h2>
              <p>
                If we transfer your information internationally, we ensure appropriate safeguards are in place to protect your privacy rights in accordance with applicable data protection laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
              <p>
                Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13 without verifiable parental consent. For minors aged 13-18, we require parental or guardian consent for certain services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically. We will notify you of significant changes by email or through our platform. Your continued use of our services after changes take effect constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>
              <div className="bg-muted p-6 rounded-lg">
                <p><strong>Privacy Officer</strong></p>
                <p>My Health Integral</p>
                <p>Email: privacy@myhealthintegral.com</p>
                <p>Phone: 1-800-MHI-CARE (1-800-644-2273)</p>
                <p>Address: [Company Address]</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">12. Complaints</h2>
              <p>
                If you believe your privacy rights have been violated, you may file a complaint with us or with the U.S. Department of Health and Human Services Office for Civil Rights. We will not retaliate against you for filing a complaint.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}