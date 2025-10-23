import type { ReactNode } from 'react';

interface AppPageLayoutProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function AppPageLayout({
  children,
  header,
  footer,
  className = '',
}: AppPageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      {header && (
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {header}
          </div>
        </header>
      )}
      
      <main className={`flex-1 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
      
      {footer && (
        <footer className="bg-white border-t border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {footer}
          </div>
        </footer>
      )}
    </div>
  );
}
