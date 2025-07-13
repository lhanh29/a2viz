// src/components/PrivacyPolicy.js

import '../index.css'; // Fixed path
import React from 'react';
import HeroLayout from './HeroLayout';

const PrivacyPolicy = () => (
  <HeroLayout>
    <div className="text-center max-w-3xl mx-auto px-4 py-10 text-sm md:text-base leading-relaxed space-y-6">
      <h2 className="text-3xl font-bold mb-6">Privacy Policy</h2>
      <p><strong>Last updated:</strong> March 26, 2024</p>

      <h3 className="font-bold">Introduction</h3>
      <p>
        A2 Visualization ("us", "we", or "our") operates the A2Viz.com website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal information when you use our Service.
      </p>
      <p>
        We use your personal information only for providing and improving the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.
      </p>

      <h3 className="font-bold">Information Collection and Use</h3>
      <p>
        While using our Service, we may ask you to provide us with certain personally identifiable information including your name, email address, and phone number. This information is used to identify, contact, and serve you better.
      </p>

      <h3 className="font-bold">Log Data</h3>
      <p>
        We may collect log data such as your IP address, browser type, pages visited, and time spent on pages. This helps us analyze and improve our Service. We may use third-party services like Google Analytics to monitor this data.
      </p>

      <h3 className="font-bold">Cookies</h3>
      <p>
        Cookies are small data files stored on your device. We use cookies to enhance user experience. You can choose to disable cookies through your browser settings, but doing so may limit some functionality.
      </p>

      <h3 className="font-bold">Service Providers</h3>
      <p>
        We may use third-party companies to assist in providing or analyzing the Service. These providers have access to your personal information only to perform tasks on our behalf and are not allowed to use it for other purposes.
      </p>

      <h3 className="font-bold">Security</h3>
      <p>
        We take precautions to protect your personal data. However, no online transmission or storage method is 100% secure. We strive to use commercially acceptable means but cannot guarantee absolute security.
      </p>

      <h3 className="font-bold">Links to Other Sites</h3>
      <p>
        Our Service may link to external websites not operated by us. We are not responsible for their content or privacy practices. Please review their Privacy Policies separately.
      </p>

      <h3 className="font-bold">Children’s Privacy</h3>
      <p>
        Our Service is not intended for users under the age of 13. We do not knowingly collect personal information from children. If you become aware that your child has provided personal information, please contact us immediately.
      </p>

      <h3 className="font-bold">Changes to This Privacy Policy</h3>
      <p>
        We may update this Privacy Policy from time to time. Changes become effective when posted on this page. Please review it periodically for updates.
      </p>

      <h3 className="font-bold">Contact Us</h3>
      <p>
        If you have any questions or concerns about this Privacy Policy, contact us at support@a2viz.com.
      </p>

      <p>
        By using our Service, you acknowledge that you have read and understand this Privacy Policy and agree to its terms.
      </p>
    </div>
  </HeroLayout>
);

export default PrivacyPolicy;
