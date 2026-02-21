import { Metadata } from 'next';
import { Navbar } from '@/components/home/navbar';
import { Footer } from '@/components/home/footer';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Contact Us | Alleppey Tourism',
    description: 'Get in touch with Alleppey Tourism to book your houseboat, shikara, kayak or speedboat. Our team is ready to help you plan your perfect Kerala backwater trip.',
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: '/contact',
    },
};

export default function ContactPage() {
    return (
        <div className="bg-white min-h-screen font-sans">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                <div className="mb-12">
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Contact Us</h1>
                    <p className="text-gray-500 text-lg max-w-2xl">
                        Have questions about booking a houseboat or planning your Alleppey backwater trip? Our team is here to help you every step of the way.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>

                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 bg-emerald-100 p-3 rounded-full mt-1">
                                <MapPin className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Our Office</h3>
                                <p className="mt-1 text-gray-500 leading-relaxed">
                                    Finishing Point Road, Alappuzha, <br />
                                    Kerala, India 688013
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 bg-emerald-100 p-3 rounded-full mt-1">
                                <Phone className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                                <p className="mt-1 text-gray-500 leading-relaxed">
                                    <a href="tel:+919947753154" className="hover:text-emerald-600 transition-colors">+91 9947753154</a>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 bg-emerald-100 p-3 rounded-full mt-1">
                                <Mail className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Email</h3>
                                <p className="mt-1 text-gray-500 leading-relaxed">
                                    <a href="mailto:info@alleppeytourism.com" className="hover:text-emerald-600 transition-colors">info@alleppeytourism.com</a>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 bg-emerald-100 p-3 rounded-full mt-1">
                                <Clock className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Working Hours</h3>
                                <p className="mt-1 text-gray-500 leading-relaxed">
                                    Everyday: 9:00 AM - 8:00 PM <br />
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="bg-gray-100 rounded-2xl overflow-hidden h-[450px] shadow-sm border border-gray-200">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.132808064375!2d76.32943365!3d9.5027582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b08846ff3c1624b%3A0xea4ccaa927c8a49c!2sFinishing%20Point%2C%20Alappuzha!5e0!3m2!1sen!2sin!4v1706692800000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Alleppey Tourism Office Location Map"
                        ></iframe>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
