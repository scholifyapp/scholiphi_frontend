import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Scholiphi</h1>
      <p className="mb-4">This is the home page of your application.</p>
      <Button onClick={() => navigate('/login')}>Go to Login</Button>
      <Button onClick={() => navigate('/register')}>Go to Register</Button>
    </div>
  );
}
