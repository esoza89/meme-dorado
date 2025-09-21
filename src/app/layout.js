import './globals.css';
import { Nabla } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import Providers from './providers';
import { headers } from 'next/headers';

const nabla = Nabla({ subsets: ['latin'] });

export default async function RootLayout({ children }) {
  // 🔥 Must await in Next.js 15
  const incomingHeaders = await headers();
  const acceptLanguage = incomingHeaders.get('accept-language') || '';

  // Simple detection: Spanish browsers → es, otherwise en
  const locale = acceptLanguage.toLowerCase().startsWith('es') ? 'es' : 'en';

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body className={nabla.className}>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}

