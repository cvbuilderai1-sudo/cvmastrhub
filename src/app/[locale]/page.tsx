import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HomePage({ params }: { params: { locale: string } }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
            {/* Hero Section */}
            <div className="max-w-5xl mx-auto text-center">
                {/* Glass Card */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12 shadow-2xl">
                    <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        SmartCV Hub
                    </h1>
                    <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
                        Create professional CVs with AI assistance, analyze ATS compatibility, and enhance your photos - all in one place.
                    </p>

                    {/* Tools Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        {/* CV Builder */}
                        <Link
                            href={`/${params.locale}/tools/cv-builder`}
                            className="group relative backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105"
                        >
                            <div className="text-5xl mb-4">📝</div>
                            <h3 className="text-2xl font-semibold text-white mb-3">CV Builder</h3>
                            <p className="text-gray-300">
                                Create stunning CVs with AI-powered suggestions and professional templates
                            </p>
                        </Link>

                        {/* Photo Editor */}
                        <Link
                            href={`/${params.locale}/tools/photo-editor`}
                            className="group relative backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105"
                        >
                            <div className="text-5xl mb-4">📸</div>
                            <h3 className="text-2xl font-semibold text-white mb-3">Photo Editor</h3>
                            <p className="text-gray-300">
                                Enhance and crop your professional photo with smart AI tools
                            </p>
                        </Link>

                        {/* ATS Analyzer */}
                        <Link
                            href={`/${params.locale}/tools/cv-analyzer`}
                            className="group relative backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105"
                        >
                            <div className="text-5xl mb-4">🎯</div>
                            <h3 className="text-2xl font-semibold text-white mb-3">ATS Analyzer</h3>
                            <p className="text-gray-300">
                                Check your CV's compatibility with Applicant Tracking Systems
                            </p>
                        </Link>
                    </div>

                    {/* Language Switcher */}
                    <div className="mt-12 flex items-center justify-center gap-4">
                        <Link
                            href="/en"
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${params.locale === 'en'
                                    ? 'bg-white/20 text-white'
                                    : 'text-gray-300 hover:bg-white/10'
                                }`}
                        >
                            English
                        </Link>
                        <Link
                            href="/fr"
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${params.locale === 'fr'
                                    ? 'bg-white/20 text-white'
                                    : 'text-gray-300 hover:bg-white/10'
                                }`}
                        >
                            Français
                        </Link>
                        <Link
                            href="/ar"
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${params.locale === 'ar'
                                    ? 'bg-white/20 text-white'
                                    : 'text-gray-300 hover:bg-white/10'
                                }`}
                        >
                            العربية
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
