import Link from 'next/link';

export default function CVAnalyzerPage({ params }: { params: { locale: string } }) {
    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <Link
                        href={`/${params.locale}`}
                        className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                    >
                        ← Back to Home
                    </Link>
                </div>

                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12">
                    <h1 className="text-5xl font-bold text-white mb-6">
                        ATS Analyzer
                    </h1>
                    <p className="text-xl text-gray-200 mb-8">
                        Check your CV's ATS compatibility score
                    </p>

                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-8 text-center">
                        <div className="text-6xl mb-4">🎯</div>
                        <h2 className="text-3xl font-semibold text-white mb-4">
                            Coming Soon
                        </h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            Analyze your CV against Applicant Tracking Systems, get detailed feedback,
                            and improve your chances of getting noticed by recruiters.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
