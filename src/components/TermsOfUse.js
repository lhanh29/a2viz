// src/components/TermsOfUse.js

import '../index.css'; // fixed path
import React from 'react';
import HeroLayout from './HeroLayout';

const TermsOfUse = () => (
  <HeroLayout>
    <div className="text-center max-w-3xl mx-auto px-4 py-10 text-sm md:text-base leading-relaxed space-y-6">
      <h2 className="text-3xl font-bold mb-6">Terms of Service</h2>
      <p><strong>Last updated:</strong> March 26, 2024</p>

      <h3 className="font-bold">1. Introduction</h3>
      <p>
        These Terms of Service ("Terms") govern your access to and use of the A2 Visualization platform (the "Service").
        By accessing or using the Service, you agree to be bound by these Terms.
      </p>

      <h3 className="font-bold">2. Account Registration</h3>
      <p>
        You are responsible for your account security and any activity under it. Do not share your credentials. You must
        notify us immediately of any unauthorized use.
      </p>

      <h3 className="font-bold">3. Use of the Service</h3>
      <p>
        You agree not to misuse the platform or interfere with other users' access. Unauthorized access or use, including
        hacking, is prohibited.
      </p>

      <h3 className="font-bold">4. No Refunds</h3>
      <p>All purchases made on the Service are final and non-refundable.</p>

      <h3 className="font-bold">5. Commercial Usage</h3>
      <p>Images generated may be used commercially, royalty-free.</p>

      <h3 className="font-bold">6. Intellectual Property</h3>
      <p>
        The platform and its underlying models and technologies belong to A2 Visualization. You own your inputs and outputs,
        but not the service technology.
      </p>

      <h3 className="font-bold">7. User-Generated Content</h3>
      <p>
        You grant us a perpetual, royalty-free license to use your content for promotional, marketing, and research purposes.
      </p>

      <h3 className="font-bold">8. Termination</h3>
      <p>
        We may suspend or terminate your account for violations. You may stop using the service at any time.
      </p>

      <h3 className="font-bold">9. Disclaimer</h3>
      <p>
        The service is provided “as is” without warranties. We are not responsible for interruptions or third-party issues.
      </p>

      <h3 className="font-bold">10. Limitation of Liability</h3>
      <p>
        We are not liable for any indirect or consequential damages including data loss or service disruption.
      </p>

      <h3 className="font-bold">11. Indemnification</h3>
      <p>
        You agree to indemnify A2 Visualization against claims arising from your misuse or violation of the terms.
      </p>

      <h3 className="font-bold">12. Governing Law</h3>
      <p>
        These Terms are governed by the laws of the jurisdiction in which A2 Visualization is incorporated.
      </p>

      <h3 className="font-bold">13. Changes</h3>
      <p>
        We may update these Terms at any time. Continued use means you accept the revised Terms.
      </p>

      <h3 className="font-bold">14. Data Breach</h3>
      <p>
        We use third-party cloud services and are not liable for their breaches. Responsibility lies with the vendor.
      </p>

      <h3 className="font-bold">15. Contact</h3>
      <p>
        If you have any questions about these Terms, contact us at support@a2viz.com.
      </p>
    </div>
  </HeroLayout>
);

export default TermsOfUse;
