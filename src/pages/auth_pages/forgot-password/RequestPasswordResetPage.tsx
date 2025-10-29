import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthPageLayout from '../components/AuthPageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const RequestPasswordResetPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();

  const sendResetLink = async (userEmail: string) => {
    console.log('Sending reset link to:', userEmail);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return ;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate email
    if (!email) {
      setError('Please enter your email address');
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

    try {
      await sendResetLink(email);
      setIsEmailSent(true);
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <AuthPageLayout 
        backButton={true}
        onBack={() => navigate('/login')}
        header={<h2>Check Your Email</h2>} 
        footer={
          <p>By using Scholifi, you agree to the <a href="/terms" className="hover:underline">Terms</a> and <a href="/privacy" className="hover:underline">Privacy Policy</a>.</p>
        }
      >
        <div className="mt-10">
          <h1 className='mb-4'>Check Your Email</h1>
          <p className="py-2 text-gray-600">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          
          <div className="mt-8">
            <p className="text-sm text-gray-600 mb-6">
              Please check your inbox and click on the link to reset your password. If you don't see it, check your spam folder.
            </p>
            
            <Button 
              variant="outline"
              className='w-full' 
              size='lg'
              onClick={() => navigate('/login')}
            >
              Back to Login
            </Button>
          </div>
        </div>
      </AuthPageLayout>
    );
  }

  return (
    <AuthPageLayout 
      backButton={true}
      onBack={() => navigate('/login')}
      header={<h2>Forgot Password</h2>} 
      footer={
        <p>By using Scholifi, you agree to the <a href="/terms" className="hover:underline">Terms</a> and <a href="/privacy" className="hover:underline">Privacy Policy</a>.</p>
      }
    >
      <h1 className='mt-10'>Reset Your Password</h1>
      <p className="py-2">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      
      <form className="mt-6" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="email">Email Address</label>
          <Input 
            id="email"
            type="email" 
            placeholder="Enter your email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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
          disabled={isLoading || !email}
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>

      <p className="text-center mt-4 text-sm text-gray-600">
        Remember your password?{' '}
        <a href="/login" className="text-primary-500 hover:underline">
          Back to Login
        </a>
      </p>
    </AuthPageLayout>
  );
};

export default RequestPasswordResetPage;

