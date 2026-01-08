import type { Metadata } from 'next';
import { Inter, Cairo } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

// Fonts
const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const cairo = Cairo({
    subsets: ['arabic'],
    variable: '--font-cairo',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'SmartCV Hub - Professional CV Builder & ATS Analyzer',
    description: 'Create professional CVs with AI assistance, analyze ATS compatibility, and enhance your photos - all in one place.',
    keywords: ['CV builder', 'resume', 'ATS analyzer', 'photo editor', 'AI assistant'],
    authors: [{ name: 'SmartCV Hub Team' }],
    openGraph: {
        title: 'SmartCV Hub - Professional CV Builder',
        description: 'Create professional CVs with AI assistance',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${cairo.variable} antialiased`}>
                {children}
                <Toaster
                    position="bottom-right"
                    theme="dark"
                    richColors
                    closeButton
                    duration={3000}
                />
            </body>
        </html>
    );
}
