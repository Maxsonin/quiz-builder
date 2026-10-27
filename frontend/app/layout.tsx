import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Quiz Builder',
  description: 'Create and browse quizzes',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <header className="sticky top-0 z-10 bg-background/20 backdrop-blur-sm">
          <nav className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
            <Link href="/quizzes" className="text-lg font-bold tracking-tight">
              Quiz <span className="text-primary">Builder</span>
            </Link>
            <div className="flex items-center gap-2 text-sm">
              <Link
                href="/quizzes"
                className="rounded-md px-3 py-1.5 font-medium text-muted hover:bg-card hover:text-foreground"
              >
                Quizzes
              </Link>
              <Link href="/create" className="btn-primary">
                Create
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
