import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'WELCOME TO BABYLS｜入間同學入魔了！非官方魔界學園',
  description: '走進惡魔學校巴比路斯。四季動畫、魔界角色圖鑑與第四季音樂祭的非官方沉浸式旅程。',
  robots: { index: false, follow: true },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant-TW"><body>{children}</body></html>;
}
