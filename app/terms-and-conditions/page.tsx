import { Metadata } from 'next';
import { Navbar } from '@/components/home/navbar';
import { Footer } from '@/components/home/footer';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Alleppey Tourism',
  description: 'Read our Terms & Conditions for booking Houseboats, Shikara & Speed boats in Alleppey. View policies on payments, cancellations & guest safety.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-24 md:py-32">
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Terms & Conditions</h1>
          <p className="text-gray-500 text-lg">Last updated: January 29, 2026</p>
        </div>

        <div className="prose prose-lg prose-emerald max-w-none text-gray-600">
          <h3>1. Introduction</h3>
          <p>
            Welcome to Alleppey Tourism ("we," "our," or "us"). By booking any service (Houseboat, Shikara, Kayak, or Speed Boat)
            through our platform, you agree to these terms and conditions. Please read them carefully before confirming your
            booking.
          </p>

          <h3>2. Booking & Confirmation</h3>
          <p>
            All bookings are subject to availability. A booking is considered confirmed only after the receipt of the required
            advance payment. We reserve the right to cancel any unconfirmed booking without prior notice.
          </p>

          <h3>3. Payment Policy</h3>
          <ul>
            <li>
              <strong>Advance Payment:</strong> A 50% advance payment is required to confirm your reservation.
            </li>
            <li>
              <strong>Balance Payment:</strong> The remaining balance must be paid prior to check-in or boarding.
            </li>
            <li>
              <strong>Modes of Payment:</strong> We accept UPI, Bank Transfers, and Cash.
            </li>
          </ul>

          <h3>4. Cancellation & Refund Policy</h3>
          <p>Cancellations made by the customer are subject to the following charges:</p>
          <ul>
            <li>
              <strong>15+ days before trip:</strong> 90% refund of the advance amount.
            </li>
            <li>
              <strong>7-14 days before trip:</strong> 50% refund of the advance amount.
            </li>
            <li>
              <strong>Less than 7 days:</strong> No refund.
            </li>
          </ul>
          <p>
            In case of technical issues or bad weather conditions where we cancel the trip, a full refund or an alternative date
            will be offered.
          </p>

          <h3>5. Check-in & Check-out</h3>
          <ul>
            <li>
              <strong>Houseboats:</strong> Check-in at 12:00 PM, Check-out at 09:00 AM.
            </li>
            <li>
              <strong>Shikara/Speed Boats:</strong> As per the booked time slot. Please arrive 15 minutes early.
            </li>
          </ul>

          <h3>6. Guest Guidelines</h3>
          <ul>
            <li>Government ID proof is mandatory for all guests before boarding.</li>
            <li>Illegal activities, including the consumption of banned substances, are strictly prohibited on board.</li>
            <li>Guests are responsible for their belongings. Management is not liable for theft or loss.</li>
            <li>Damage to the boat or property caused by guests will be charged accordingly.</li>
          </ul>

          <h3>7. Safety & Liability</h3>
          <p>
            While we take all safety precautions, including providing life jackets and certified staff, Alleppey Tourism is not
            liable for any personal injury or accidents caused by negligence or failure to follow crew instructions.
          </p>

          <h3>8. Contact Us</h3>
          <p>
            For any queries regarding these terms, please contact us at: <br />
            <strong>Email:</strong> help@alleppeytourism.com <br />
            <strong>Phone:</strong> +91 95672 96056
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
