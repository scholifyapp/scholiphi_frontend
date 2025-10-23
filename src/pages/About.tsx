import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export function About() {
  const navigate = useNavigate();
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">About Scholiphi</h1>
      <p className="mb-4">This is the about page of your application.</p>
      <Button onClick={() => navigate('/')}>Go to Home</Button>
    </div>
  );
}
