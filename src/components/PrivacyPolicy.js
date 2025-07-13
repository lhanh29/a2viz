import '../index.css'; // ✅ Fixed path
import React from "react";
import HeroLayout from "./HeroLayout";

const PrivacyPolicy = () => (
  <HeroLayout>
    <h2 className="text-3xl font-bold mb-6">Privacy Policy</h2>
    <p className="mb-4">
      A2 Visualization is committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your information.
    </p>
    <p className="mb-4">
      We do not sell or share your personal data with third parties, except as required by law or for platform operation.
    </p>
    <p className="mb-4">
      By using our services, you consent to the data practices described in this policy. Updates to this policy will be posted on this page.
    </p>
  </HeroLayout>
);

export default PrivacyPolicy;
