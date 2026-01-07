import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
            <div className="max-w-4xl mx-auto text-center space-y-8">
                <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    SmartCV Hub
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-300">
                    AI-Powered CV Builder with ATS Optimization
                </p>

                <div className="flex gap-4 justify-center flex-wrap">
                    <Link
                        href="/tools/cv-builder"
                        className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
                    >
                        Create CV
                    </Link>

                    <Link
                        href="/tools/analyzer"
                        className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
                    >
                        Analyze CV
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-12">
                    <div className="glass p-6 rounded-xl">
                        <div className="text-4xl mb-4">🎨</div>
                        <h3 className="font-bold text-lg mb-2">Modern Templates</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Professional, ATS-friendly designs
                        </p>
                    </div>

                    <div className="glass p-6 rounded-xl">
                        <div className="text-4xl mb-4">🤖</div>
                        <h3 className="font-bold text-lg mb-2">AI Analysis</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Intelligent suggestions powered by AI
                        </p>
                    </div>

                    <div className="glass p-6 rounded-xl">
                        <div className="text-4xl mb-4">📊</div>
                        <h3 className="font-bold text-lg mb-2">ATS Scoring</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Real-time compatibility checking
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
