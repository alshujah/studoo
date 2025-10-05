import type { Metadata } from 'next';
import { AppLayout } from '@/components/layout/app-layout';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { pt_sans, playfair_display } from '@/lib/fonts';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Rejoyn',
  description: 'Your partner in mental wellbeing.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-body antialiased', pt_sans.variable, playfair_display.variable)}>
        <FirebaseClientProvider>
          <AppLayout>
            {children}
          </AppLayout>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
