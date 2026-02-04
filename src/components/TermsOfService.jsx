import React from "react";
import "./TermsOfService.css";

const TermsOfService = () => {
  return (
    <div className="terms-container">
      <div className="terms-content">
        <h1>Terms of Service</h1>
        <p className="last-updated">Last updated: January 2026</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to <strong>CryptoHub</strong>. By accessing or using our
            website and services, you agree to follow these Terms of Service.
            Please read them carefully.
          </p>
        </section>

        <section>
          <h2>2. Use of Our Services</h2>
          <ul>
            <li>You must be at least 18 years old to use our platform.</li>
            <li>You agree to provide accurate information when creating an account.</li>
            <li>You are responsible for keeping your login credentials secure.</li>
            <li>You agree not to misuse or harm the platform.</li>
          </ul>
        </section>

        <section>
          <h2>3. Account Responsibilities</h2>
          <p>
            You are fully responsible for all activities that occur under your
            account. If you notice unauthorized access, please contact us immediately.
          </p>
        </section>

        <section>
          <h2>4. Intellectual Property</h2>
          <p>
            All content on CryptoHub including logos, text, graphics, and design
            belongs to us and is protected by copyright laws. You may not copy,
            modify, or distribute without permission.
          </p>
        </section>

        <section>
          <h2>5. Payments and Subscriptions</h2>
          <p>
            If you purchase premium services, you agree to pay the listed fees.
            All payments are non-refundable unless otherwise stated.
          </p>
        </section>

        <section>
          <h2>6. Limitation of Liability</h2>
          <p>
            CryptoHub provides cryptocurrency information and analytics for
            educational purposes only. We are not responsible for financial
            losses resulting from trading decisions.
          </p>
        </section>

        <section>
          <h2>7. Termination</h2>
          <p>
            We reserve the right to suspend or terminate accounts that violate
            these terms without prior notice.
          </p>
        </section>

        <section>
          <h2>8. Changes to Terms</h2>
          <p>
            We may update these Terms of Service at any time. Continued use of
            the platform means you accept the updated terms.
          </p>
        </section>

        <section>
          <h2>9. Contact Us</h2>
          <p>
            If you have questions about these Terms, contact us at:
          </p>
          <p className="email">support@cryptohub.com</p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
