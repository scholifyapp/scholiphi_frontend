import type { ReactNode } from 'react';

interface AppPageLayoutProps {
  children: ReactNode;
}

export function AppPageLayout({
  children,
}: AppPageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen px-4 py-8">
      {children}
    </div>
  );
}
