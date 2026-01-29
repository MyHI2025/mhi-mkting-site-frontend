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
    <h1
      className="text-4xl font-bold text-foreground mb-8"
      data-testid="terms-title"
    >
      Terms of Use
    </h1>

    <div className="prose prose-lg max-w-none text-foreground">
      <p className="text-lg text-muted-foreground mb-8">
        <strong>Effective Date:</strong> {new Date().toLocaleDateString()} <br />
        <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
      </p>
      {/* 1. Acceptance of Terms */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          1. Acceptance of Terms
        </h2>
        <p className="mb-4">
          Welcome to My Health Integral Ltd (“MHI,” “we,” “our,” or “us”). These
          Terms of Use (“Terms”) govern your access to and use of our digital
          healthcare platform, including our website, mobile applications,
          telemedicine services, diagnostic coordination tools, AI-enabled
          features, and related services (collectively, the “Services”).
        </p>
        <p className="mb-4">
          By accessing or using the Services, you confirm that you have read,
          understood, and agree to be legally bound by these Terms and our
          Privacy Policy. If you do not agree, you must not use the Services.
        </p>
        <p>
          Additional terms may apply to specific Services, including healthcare
          provider agreements, patient service terms, or partner arrangements.
          Where applicable, those terms form part of your agreement with MHI.
        </p>
      </section>

      {/* 2. Description of Services */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          2. Description of Services
        </h2>
        <p className="mb-4">
          MHI operates a digital healthcare platform that facilitates
          coordination between patients, licensed healthcare providers,
          diagnostic centres, laboratories, pharmacies, insurers, and other
          healthcare partners.
        </p>
        <ul className="space-y-2">
          <li>• Telemedicine consultations and virtual care coordination</li>
          <li>• Electronic health record storage and access</li>
          <li>• Diagnostic test coordination and laboratory result delivery</li>
          <li>• Prescription facilitation and pharmacy integrations</li>
          <li>• AI-powered administrative and decision-support tools</li>
          <li>• Health monitoring, wellness tools, and care reminders</li>
          <li>• Insurance and billing integrations</li>
          <li>• Emergency care coordination support (non-emergency only)</li>
        </ul>
        <p className="mt-4 font-semibold">
          MHI is a technology platform and does not provide medical care,
          diagnosis, or treatment.
        </p>
      </section>

      {/* 3. Eligibility */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          3. User Eligibility and Account Requirements
        </h2>

        <h3 className="text-xl font-semibold mb-3">3.1 Eligibility</h3>
        <p className="mb-4">
          You must be at least 18 years old and have legal capacity to enter into
          these Terms.
        </p>

        <h3 className="text-xl font-semibold mb-3">
          3.2 Account Registration
        </h3>
        <ul className="space-y-2">
          <li>• Provide accurate, current, and complete information</li>
          <li>• Keep account details up to date</li>
          <li>• Maintain confidentiality of login credentials</li>
          <li>• Be responsible for all account activity</li>
          <li>• Notify us immediately of unauthorized access</li>
        </ul>
      </section>

      {/* 4. Medical Disclaimer */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          4. Medical Disclaimers and Limitations
        </h2>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-3 text-yellow-800 dark:text-yellow-200">
            ⚠️ Important Medical Disclaimer
          </h3>
          <ul className="space-y-2 text-yellow-700 dark:text-yellow-300">
            <li>• Not intended for emergency medical situations</li>
            <li>• Information is not medical advice</li>
            <li>• AI tools are decision-support only</li>
            <li>• Providers are independent professionals</li>
          </ul>
        </div>

        <p>
          AI-generated insights and platform content are informational only and
          must not replace professional medical judgment.
        </p>
      </section>

      {/* 5. Acceptable Use */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          5. User Responsibilities and Acceptable Use
        </h2>
        <ul className="space-y-2">
          <li>• No false or misleading information</li>
          <li>• No impersonation or credential sharing</li>
          <li>• No fraud, malware, or unlawful activity</li>
          <li>• No unauthorized system access</li>
        </ul>
      </section>

      {/* 6. Privacy */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          6. Privacy and Data Protection
        </h2>
        <p>
          MHI complies with UK GDPR, the UK Data Protection Act 2018, Nigeria Data
          Protection Act 2023, and NDPR.
        </p>
      </section>

      {/* 7–16 condensed for readability */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          7–16. Legal, Financial & Administrative Terms
        </h2>
        <p>
          These sections cover fees, refunds, intellectual property, service
          availability, liability limitations, indemnification, termination,
          governing law, dispute resolution, severability, updates, and contact
          information.
        </p>
      </section>

      {/* Contact */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Contact Information
        </h2>
        <div className="bg-muted p-6 rounded-lg">
          <p><strong>My Health Integral Ltd</strong></p>
          <p>Email: info@myhealthintegral.com</p>
          <p>Phone: +234 813 746 3268</p>
          <p>UK: 53 Verulam Way, Cambridge, CB4 2HJ</p>
          <p>Nigeria: Adedoyin Olusoga Close, Millennium Estate, Gbagada, Lagos</p>
        </div>
      </section>
    </div>
  </div>
</main>

      <Footer />
    </div>
  );
}