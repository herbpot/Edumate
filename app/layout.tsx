import './globals.css'
import Link from 'next/link'
import { Nanum_Gothic } from "next/font/google";
import AuthSession from '@/src/components/AuthSession'
import Nav from '@/src/components/Nav';

const nanum_gothic = Nanum_Gothic({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

export const metadata = {
  title: '???',
  encoding: 'utf-8'
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({
  children,
}: Props) {
  return (
	  <html lang="ko" className={nanum_gothic.className}>
      <AuthSession>
        <body>
          <Nav/>
          {children}
        </body>
      </AuthSession>
    </html>
  )
}
