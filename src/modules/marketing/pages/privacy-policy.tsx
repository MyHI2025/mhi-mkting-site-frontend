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
        <strong>Effective Date:</strong> {new Date().toLocaleDateString()} <br />
        <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="mb-4">
          My Health Integral Ltd (“MHI,” “we,” “our,” or “us”) is committed to protecting the privacy,
          confidentiality, and security of personal data and personal health information entrusted to us.
        </p>
        <p className="mb-4">
          This Privacy Policy explains how we collect, use, disclose, store, retain, and protect personal
          data when you access or use our digital healthcare platform, website, mobile applications,
          telemedicine services, diagnostic coordination services, and related offerings (collectively,
          the “Services”).
        </p>
        <p className="mb-4">
          For the purposes of applicable data protection laws, My Health Integral Ltd acts as a Data
          Controller in respect of personal data processed through its platform and as a Data Processor
          where processing is carried out on behalf of healthcare providers using the platform.
        </p>
        <p>
          We process personal data in accordance with applicable laws, including the UK GDPR, UK Data
          Protection Act 2018, Nigeria Data Protection Regulation (NDPR), and other applicable healthcare,
          medical ethics, and data protection laws.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Scope of This Policy</h2>
        <ul className="space-y-2">
          <li>• Patients and individual users</li>
          <li>• Healthcare professionals and providers</li>
          <li>• Business and institutional users</li>
          <li>• Visitors to our websites and applications</li>
        </ul>
        <p className="mt-4">
          This policy does not apply to third-party websites, applications, or services that may be linked
          to or integrated with our platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Information We Collect</h2>

        <h3 className="text-xl font-semibold mb-3">
          3.1 Personal Health Information (Special Category Data)
        </h3>
        <ul className="mb-4 space-y-2">
          <li>• Medical records and health history</li>
          <li>• Diagnostic test results and laboratory reports</li>
          <li>• Treatment plans, prescriptions, and referrals</li>
          <li>• Vital signs and health monitoring data</li>
          <li>• Appointment records and clinical notes</li>
          <li>• Insurance and billing-related health information</li>
        </ul>
        <p className="mb-4">
          Personal health information is processed only where explicit consent has been obtained or
          another lawful basis applies.
        </p>

        <h3 className="text-xl font-semibold mb-3">3.2 Personal and Account Information</h3>
        <ul className="mb-4 space-y-2">
          <li>• Full name, address, email address, and phone number</li>
          <li>• Date of birth and demographic information</li>
          <li>• Emergency contact details</li>
          <li>• User account credentials and authentication data</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3">3.3 Technical and Usage Information</h3>
        <ul className="space-y-2">
          <li>• Device identifiers, IP addresses, and browser information</li>
          <li>• Platform usage logs and interaction data</li>
          <li>• Approximate location data (where permitted)</li>
          <li>• Cookies and similar tracking technologies</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Lawful Basis for Processing</h2>
        <ul className="space-y-2">
          <li>• Performance of a contract</li>
          <li>• Compliance with legal and regulatory obligations</li>
          <li>• Protection of vital interests</li>
          <li>• Legitimate interests</li>
          <li>• Explicit consent where required</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. How We Use Your Information</h2>
        <ul className="space-y-2">
          <li>• Telemedicine and virtual healthcare services</li>
          <li>• Diagnostic testing and laboratory coordination</li>
          <li>• Clinical care, referrals, and continuity of care</li>
          <li>• Platform operations and improvement</li>
          <li>• Payments, billing, and insurance processing</li>
          <li>• Customer support and communications</li>
          <li>• Analytics and de-identified research</li>
          <li>• Legal and regulatory compliance</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Information Sharing and Disclosure</h2>

        <h3 className="text-xl font-semibold mb-3">6.1 Healthcare Providers</h3>
        <p className="mb-4">
          We may share information with physicians, diagnostic centres, laboratories, pharmacies,
          hospitals, and clinics involved in your care.
        </p>

        <h3 className="text-xl font-semibold mb-3">6.2 Service Providers</h3>
        <p className="mb-4">
          Trusted third parties supporting hosting, payments, analytics, and technical operations are
          bound by confidentiality and data protection agreements.
        </p>

        <h3 className="text-xl font-semibold mb-3">6.3 Legal Disclosure</h3>
        <p>
          Information may be disclosed where required by law or regulatory authority.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
        <ul className="space-y-2">
          <li>• UK: Up to 8 years</li>
          <li>• Nigeria: 5–8 years</li>
          <li>• Inactive accounts: up to 2 years</li>
          <li>• Financial records: 6 years (UK), 5 years (Nigeria)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Cookies and Tracking</h2>
        <p>
          We use cookies for core functionality, analytics, and performance. Consent is obtained where
          required. See our Cookie Policy for more details.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Data Security</h2>
        <ul className="space-y-2">
          <li>• Encryption in transit and at rest</li>
          <li>• Secure cloud infrastructure</li>
          <li>• Role-based access and MFA</li>
          <li>• Continuous monitoring and audits</li>
          <li>• Staff training and incident response</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">10. Your Rights</h2>
        <ul className="space-y-2">
          <li>• Access and rectification</li>
          <li>• Erasure and restriction</li>
          <li>• Data portability</li>
          <li>• Withdrawal of consent</li>
          <li>• Objection to processing</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">11. International Transfers</h2>
        <p>
          Transfers outside the UK or Nigeria are protected using Standard Contractual Clauses or other
          lawful safeguards.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">12. Children’s Privacy</h2>
        <p>
          Services are intended for adults. Where minors are involved, verifiable parental consent is
          required.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">13. Changes to This Policy</h2>
        <p>
          Updates will be communicated via email, platform notifications, or website updates.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">14. Contact Information</h2>
        <div className="bg-muted p-6 rounded-lg">
          <p><strong>Privacy Officer / Data Protection Lead</strong></p>
          <p>My Health Integral Ltd</p>
          <p>Email: privacy@myhealthintegral.com</p>
          <p>Phone: +234 813 746 3268</p>
          <p className="mt-2">
            UK: 53 Verulam Way, Cambridge, England, CB4 2HJ<br />
            Nigeria: Adedoyin Olusoga Close, Millenium Estate, Gbagada, Lagos
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">15. Complaints</h2>
        <p>
          Complaints may be made to us or to the UK ICO or Nigeria Data Protection Commission. We do not
          retaliate against individuals exercising their rights.
        </p>
      </section>
    </div>
  </div>
</main>

      <Footer />
    </div>
  );
}