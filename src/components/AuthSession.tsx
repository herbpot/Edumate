'use client';
import { SessionProvider, useSession } from "next-auth/react";

type Props = ({
  children: React.ReactNode;
  });

export default function AuthSession({ children }: Props) {
    return (
    <SessionProvider>
        {children}
    </SessionProvider>
  );
}