import { type ReactNode } from 'react'
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface AppPageLayoutProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
  backButton?: boolean;
  onBack?: () => void;
}


const AuthPageLayout = ({
  children,
  header,
  footer,
  className = '',
  backButton = false,
  onBack = () => {},
}: AppPageLayoutProps) => {
  return (
    <div className="flex flex-col relative h-[calc(100vh-64px)]">
      {header && (
        <header className="flex items-center relative py-4">
            {backButton && <Button className='absolute' variant='ghost'  size='icon' onClick={onBack}><ChevronLeft /></Button>}
          <div className="max-w-7xl mx-auto">
           {header}
          </div>
        </header>
      )}
      
      <main className={`flex-1 ${className}`}>
          {children}
      </main>
      
      {footer && (
        <footer>
          <div className="absolute bottom-0 left-0 right-0 text-center px-8">
            {footer}
          </div>
        </footer>
      )}
    </div>
  );
}
export default AuthPageLayout