import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Competition Aggregator | Architecture & Design',
  description: 'Find architecture and industrial design competitions worldwide',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}