import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-6">The page you're looking for doesn't exist or has been moved.</p>
      <Button onClick={() => navigate('/')}>Return to Home</Button>
    </div>
  );
}
