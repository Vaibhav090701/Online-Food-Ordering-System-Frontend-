import TopSection from "../TopSection";

export default function TermsConditionsPage() {

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--background-color)' }}
    >
      {/* Top Section */}
      <TopSection heading="T & C" />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h3
          className="text-lg font-medium mb-4"
          style={{ color: 'var(--text-color)' }}
        >
          Terms and Conditions
        </h3>
        <div className="prose">
  <p style={{ color: 'var(--secondary-color)' }}>
    By accessing and using foodiee, you agree to abide by the following Terms and Conditions. Please read them carefully before placing any orders or using our services.
  </p>

  <h4 style={{ color: 'var(--text-color)' }}>Account Responsibility</h4>
  <p style={{ color: 'var(--secondary-color)' }}>
    You are responsible for maintaining the confidentiality of your account information and for all activities
    that occur under your account. Please ensure that your information is accurate and up to date.
  </p>

  <h4 style={{ color: 'var(--text-color)' }}>Ordering and Payments</h4>
  <p style={{ color: 'var(--secondary-color)' }}>
    All orders placed through our platform are subject to restaurant availability and confirmation.
    Prices and menu items may vary based on location. Payments are securely processed, and refunds
    (if applicable) are handled according to our refund policy.
  </p>

  <h4 style={{ color: 'var(--text-color)' }}>Delivery</h4>
  <p style={{ color: 'var(--secondary-color)' }}>
    We aim to deliver your orders in a timely manner. However, delivery times may vary based on factors such as traffic,
    weather, and restaurant preparation time. We are not liable for delays beyond our control.
  </p>

  <h4 style={{ color: 'var(--text-color)' }}>User Conduct</h4>
  <p style={{ color: 'var(--secondary-color)' }}>
    Users must not misuse the platform by knowingly introducing harmful material or engaging in unlawful behavior.
    Any violation may lead to account suspension or legal action.
  </p>

  <h4 style={{ color: 'var(--text-color)' }}>Modifications</h4>
  <p style={{ color: 'var(--secondary-color)' }}>
    We reserve the right to modify or update these terms at any time without prior notice.
    Continued use of the platform after changes implies your acceptance of the updated terms.
  </p>

  <p style={{ color: 'var(--secondary-color)' }}>
    For more details or support regarding our Terms and Conditions, please contact us at support@foodiee.com.
  </p>
</div>

      </div>
    </div>
  );
}