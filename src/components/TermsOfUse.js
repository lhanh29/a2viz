// src/components/TermsOfUse.js

import './index.css';
import React from "react";
import HeroLayout from "./HeroLayout";

const TermsOfUse = () => (
  <HeroLayout>
    <h2 className="text-3xl font-bold mb-6">Terms of Use</h2>
    <p className="mb-4">
      These Terms of Use govern your access and use of A2 Visualization services.
    </p>
    <p className="mb-4">
      You agree not to use the platform in violation of U.S. or international export control laws.
    </p>
    <p className="mb-4">
      A2 reserves the right to update these terms at any time without notice.
    </p>
  </HeroLayout>
);

export default TermsOfUse;
