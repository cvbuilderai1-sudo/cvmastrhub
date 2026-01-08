import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';

const locales = ['en', 'fr', 'ar'];

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!locales.includes(locale as any)) {
        notFound();
    }

    const messages = await getMessages();
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    const fontClass = locale === 'ar' ? 'font-cairo' : 'font-inter';

    return (
        <html lang={locale} dir={dir} suppressHydrationWarning>
            <body className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 ${fontClass}`}>
                <NextIntlClientProvider messages={messages}>
                    <div className="relative min-h-screen">
                        {/* Background effects */}
                        <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none opacity-20" />

                        {/* Main content */}
                        <div className="relative z-10">
                            {children}
                        </div>
                    </div>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
