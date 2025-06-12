
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopSection from '../TopSection';

export default function HelpSupportPage() {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate =useNavigate();
  const handleSubmit = () => {
    if (!message.trim()) {
      alert('Please enter a message.');
      return;
    }

    setIsSubmitting(true);
    // Simulate submitting support request (replace with API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setMessage('');
      alert('Your support request has been submitted!');
    }, 2000);
  };

  const handleBack = () => {
    navigate('/myProfile/setting');
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--background-color)' }}
    >
      {/* Top Section */}
      <TopSection heading="Help & Support" />

      {/* Main Content */}
      <div className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* FAQ Link */}
          <div>
            <h3
              className="text-lg font-medium mb-2"
              style={{ color: 'var(--text-color)' }}
            >
              Frequently Asked Questions
            </h3>
            <p
              className="text-sm"
              style={{ color: 'var(--secondary-color)' }}
            >
              Find answers to common questions in our FAQ section.
            </p>
            <button
              onClick={() => router.push('/faq')}
              className="mt-2 hover:underline"
              style={{ color: 'var(--primary-color)' }}
            >
              Visit FAQ
            </button>
          </div>

          {/* Contact Support */}
          <div>
            <h3
              className="text-lg font-medium mb-2"
              style={{ color: 'var(--text-color)' }}
            >
              Contact Support
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: 'var(--secondary-color)' }}
            >
              Need help? Send us a message, and our team will get back to you.
            </p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors duration-200"
              placeholder="Describe your issue or question..."
              rows="5"
              style={{
                backgroundColor: 'var(--input-bg, var(--card-bg))',
                color: 'var(--text-color)',
                borderColor: 'var(--card-border)',
                borderWidth: '1px',
                focusRingColor: 'var(--primary-color)',
              }}
            />
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full mt-4 py-2 px-4 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
              style={{
                backgroundColor: isSubmitting
                  ? 'var(--disabled-bg, #9ca3af)'
                  : 'var(--primary-color)',
                color: '#ffffff',
                focusRingColor: 'var(--primary-color)',
                opacity: isSubmitting ? 0.5 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}