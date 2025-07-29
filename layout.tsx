import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Image Generator - Transform Text to Stunning Visuals',
  description: 'Create beautiful, unique images from text descriptions using advanced AI technology. Transform your imagination into reality with our powerful text-to-image generator.',
  keywords: ['AI', 'image generation', 'text to image', 'DALL-E', 'artificial intelligence', 'creative tools'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}