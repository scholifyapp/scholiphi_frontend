import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthPageLayout from '../components/AuthPageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate inputs
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setError('Invalid email or password. Please try again.');
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthPageLayout 
      backButton={true}
      onBack={() => navigate('/login')}
      header={<h2>Log into account</h2>} 
      footer={
        <p>By using Scholifi, you agree to the <a href="/terms" className="hover:underline">Terms</a> and <a href="/privacy" className="hover:underline">Privacy Policy</a>.</p>
      }
    >
      <h1 className='mt-10'>Welcome to Scholifi.</h1>
      <p className="py-2">
      Enter the School ID and Password you got from your school to continue.
      </p>
      
      <form className="mt-6" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="email">Email</label>
          <Input 
            id="email"
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6 relative">
          <label htmlFor="password">Password</label>
          <Input 
            id="password"
            type={visiblePassword ? "text" : "password"} 
            placeholder="Enter your password" 
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => setVisiblePassword(!visiblePassword)}
            className="absolute right-1 top-2/3 -translate-y-1/2 text-gray-500 active:text-gray-700"
          >
            {visiblePassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </Button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        
        <Button 
          type="submit" 
          className='w-full mt-6' 
          size='lg'
          disabled={isLoading || !email || !password}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>

      <p className="text-center mt-4">
        <a href="/forgot-password/request" className="text-sm text-primary-500 hover:underline">
          Forgot password?
        </a>
      </p>
    </AuthPageLayout>
  );
};

export default LoginPage;

