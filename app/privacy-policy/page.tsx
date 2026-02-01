import { Metadata } from 'next';
import { Navbar } from '@/components/home/navbar';
import { Footer } from '@/components/home/footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | Alleppey Tourism',
  description: 'Your privacy matters. Read how Alleppey Tourism secures your booking data, payments & personal details. Safe, transparent & secure transactions',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-24 md:py-32">
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-gray-500 text-lg">Last updated: January 29, 2026</p>
        </div>

        <div className="prose prose-lg prose-emerald max-w-none text-gray-600">
          <h3>1. Information We Collect</h3>
          <p>To provide you with the best booking experience, we may collect the following information:</p>
          <ul>
            <li>
              <strong>Personal Details:</strong> Name, phone number, and email address for booking confirmation.
            </li>
            <li>
              <strong>Identity Proof:</strong> Government-issued ID copies (Aadhaar, Passport, etc.) as mandated by local tourism
              authorities.
            </li>
            <li>
              <strong>Payment Information:</strong> Transaction details required for billing. We do not store your credit card or
              sensitive banking information.
            </li>
          </ul>

          <h3>2. How We Use Your Information</h3>
          <p>Your data is used solely for the purpose of facilitating your trip, including:</p>
          <ul>
            <li>Processing your booking and payments.</li>
            <li>Communicating with you regarding trip details, location, and schedule changes.</li>
            <li>Complying with legal and safety regulations mandated by the Alleppey Port Authority.</li>
          </ul>

          <h3>3. Data Sharing & Security</h3>
          <p>
            We value your privacy. Your personal information is <strong>never sold</strong> to third parties. We only share
            necessary details with:
          </p>
          <ul>
            <li>
              <strong>Boat Crew:</strong> To coordinate your pickup and preferences.
            </li>
            <li>
              <strong>Government Authorities:</strong> If required by law for guest registration.
            </li>
          </ul>

          <h3>4. Cookies & Tracking</h3>
          <p>
            Our website uses basic cookies to improve site performance and remember your preferences. We do not use invasive
            tracking technologies.
          </p>

          <h3>5. Your Rights</h3>
          <p>
            You have the right to request access to the personal data we hold about you or request its deletion after your trip is
            completed, subject to legal record-keeping requirements.
          </p>

          <h3>6. Contact Us</h3>
          <p>
            If you have any questions about our privacy practices, please reach out to us: <br />
            <strong>Email:</strong> privacy@alleppeytourism.com <br />
            <strong>Address:</strong> Finishing Point Road, Alappuzha, Kerala
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
