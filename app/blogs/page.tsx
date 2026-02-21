import { Metadata } from 'next';
import { Navbar } from '@/components/home/navbar';
import { Footer } from '@/components/home/footer';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Blogs | Alleppey Tourism',
    description: 'Read the latest blogs and travel guides about Alleppey houseboats, backwaters, and Kerala tourism from Alleppey Tourism.',
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: '/blogs',
    },
};

import { blogs } from '@/lib/blogs-data';

export default function BlogsPage() {
    return (
        <div className="bg-white min-h-screen font-sans">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                <div className="mb-12">
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Travel Blogs & Guides</h1>
                    <p className="text-gray-500 text-lg max-w-2xl">
                        Explore our curated guides and stories about the mesmerizing Alleppey backwaters, houseboats, and Kerala culture.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <Link href={`/blogs/${blog.slug}`} key={blog.slug} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer">
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-emerald-800 shadow-sm border border-white/20">
                                        {blog.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow bg-white">
                                <div className="flex items-center text-xs text-gray-400 font-medium mb-3 tracking-wide uppercase">
                                    <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {blog.date}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors leading-snug">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-600 mb-6 line-clamp-3 text-sm flex-grow leading-relaxed">
                                    {blog.excerpt}
                                </p>
                                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                                    <span className="inline-flex items-center text-emerald-600 font-semibold text-sm group-hover:text-emerald-700 transition-colors">
                                        Read Article
                                        <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}
