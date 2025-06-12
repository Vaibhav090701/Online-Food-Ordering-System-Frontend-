import TopSection from "../TopSection";

export default function PrivacyPolicyPage() {

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--background-color)' }}
    >
      {/* Top Section */}
      <TopSection heading="Privacy Policy" />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 mb-5">
        <h3
          className="text-lg font-medium mb-4"
          style={{ color: 'var(--text-color)' }}
        >
          Privacy Policy
        </h3>
<div className="prose">
  <p style={{ color: 'var(--secondary-color)' }}>
    At foodiee, we value your privacy. This Privacy Policy outlines how we collect,
    use, and protect your information when you interact with our platform.
  </p>

  <h4 style={{ color: 'var(--text-color)' }}>Information We Collect</h4>
  <p style={{ color: 'var(--secondary-color)' }}>
    We may collect personal information such as your name, contact number, email address, delivery location,
    payment details, and order history when you sign up or place an order on our platform.
  </p>

  <h4 style={{ color: 'var(--text-color)' }}>How We Use Your Information</h4>
  <p style={{ color: 'var(--secondary-color)' }}>
    Your information is used to process your orders, ensure timely delivery, personalize recommendations,
    improve our service quality, and send important notifications related to your orders or account.
  </p>

  <h4 style={{ color: 'var(--text-color)' }}>Data Security</h4>
  <p style={{ color: 'var(--secondary-color)' }}>
    We implement industry-standard encryption and security protocols to protect your data from unauthorized
    access, misuse, or disclosure. Your payment information is securely processed through trusted third-party providers.
  </p>

  <h4 style={{ color: 'var(--text-color)' }}>Third-Party Services</h4>
  <p style={{ color: 'var(--secondary-color)' }}>
    We may share necessary data with third-party vendors (e.g., delivery partners, payment gateways)
    only to the extent required to complete your orders and improve user experience. These parties are
    contractually obligated to protect your data.
  </p>

  <h4 style={{ color: 'var(--text-color)' }}>Your Choices</h4>
  <p style={{ color: 'var(--secondary-color)' }}>
    You may review, update, or delete your account information at any time by accessing your profile settings.
    You can also opt out of promotional communications through the preferences section.
  </p>

  <p style={{ color: 'var(--secondary-color)' }}>
    For questions or the full privacy policy, please contact our support team at support@foodiee.com.
  </p>
</div>
      </div>
    </div>
  );
}