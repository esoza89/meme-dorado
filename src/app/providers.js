'use client';

import { NextIntlClientProvider } from 'next-intl';

export default function Providers({ children, locale, messages }) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="America/Mexico_City" // ✅ fixes the timeZone warning
    >
      {children}
    </NextIntlClientProvider>
  );
}
