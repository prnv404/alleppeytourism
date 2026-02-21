import { blogs } from '@/lib/blogs-data';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/home/navbar';
import { Footer } from '@/components/home/footer';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ slug: string }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const blog = blogs.find((b) => b.slug === params.slug);

    if (!blog) {
        return { title: 'Not Found | Alleppey Tourism' };
    }

    return {
        title: `${blog.title} | Alleppey Tourism`,
        description: blog.excerpt,
        alternates: {
            canonical: `/blogs/${blog.slug}`,
        },
    };
}

export default async function BlogDetailPage(props: Props) {
    const params = await props.params;
    const blog = blogs.find((b) => b.slug === params.slug);

    if (!blog) {
        notFound();
    }

    return (
        <div className="bg-white min-h-screen font-sans">
            <Navbar />

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                <header className="mb-10 text-center">
                    <div className="flex items-center justify-center space-x-2 text-sm text-emerald-600 font-semibold mb-4 tracking-wide uppercase">
                        <span>{blog.category}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-500">{blog.date}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-8 tracking-tight">
                        {blog.title}
                    </h1>
                    <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">
                        {blog.excerpt}
                    </p>
                </header>

                <figure className="mb-14 rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                    />
                </figure>

                <div
                    className="max-w-none text-gray-700 leading-relaxed [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mb-6 [&>h2]:mt-12 [&>h2]:text-gray-900 [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mb-4 [&>h3]:mt-8 [&>h3]:text-gray-900 [&>p]:text-gray-600 [&>p]:mb-8 [&>p]:text-lg [&>p]:leading-loose"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />
            </article>

            <Footer />
        </div>
    );
}
