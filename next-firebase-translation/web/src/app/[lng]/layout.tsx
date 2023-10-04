import './globals.css'
import type { Metadata } from 'next'
import { Providers } from '@/contexts';

import { dir } from 'i18next'
import { languages } from '../i18n/settings';
import AppBar from '@/components/AppBar/AppBar';


export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export const metadata: Metadata = {
  title: '',
  description: '',
}

export default function RootLayout({
  children,
  params: {
    lng
  }
}: {
  children: React.ReactNode,
  params: {
    lng: string
  }
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body >
        <Providers>
          <AppBar lng={lng} />
          {children}
        </Providers>
      </body>
    </html>
  )
}
