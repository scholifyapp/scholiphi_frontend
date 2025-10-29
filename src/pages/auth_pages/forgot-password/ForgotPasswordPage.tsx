import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthPageLayout from '../components/AuthPageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const key = searchParams.get('key');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const verifyKey = async (_token: string) => {
   console.log('Verifying key:', _token);
    await new Promise(resolve => setTimeout(resolve, 500));

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate inputs
    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // Verify the key first
      if (key) {
        const isValid = await verifyKey(key);
        
        if (!isValid) {
          setError('Invalid or expired reset link. Please request a new one.');
          setIsLoading(false);
          return;
        }
      } else {
        setError('Invalid reset link');
        setIsLoading(false);
        return;
      }

      // Mock API call to update password
      await updatePassword(password, key);
      
      // Redirect to login page after successful password reset
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (newPassword: string, resetKey: string) => {

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For now, just log the data
    console.log('Password update called with:', { newPassword, resetKey });
  };

  return (
    <AuthPageLayout 
      backButton={true}
      onBack={() => navigate('/login')}
      header={<h2>Reset Password</h2>} 
      footer={
        <p>By using Scholifi, you agree to the <a href="/terms" className="hover:underline">Terms</a> and <a href="/privacy" className="hover:underline">Privacy Policy</a>.</p>
      }
    >
      <h1 className='mt-10'>Reset Your Password</h1>
      <p className="py-2">
        Enter your new password below to complete the reset process.
      </p>
      
      <form className="mt-6" onSubmit={handleSubmit}>
        <div className="mb-6 relative">
          <label htmlFor="password">New Password</label>
          <Input 
            id="password"
            type={showPassword ? "text" : "password"} 
            placeholder="Enter new password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 active:text-gray-700"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </Button>
          <span className="text-sm text-gray-600 mt-1 block">
            • At least 8 characters
          </span>
        </div>

        <div className="mb-6 relative">
          <label htmlFor="confirm-password">Confirm Password</label>
          <Input 
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"} 
            placeholder="Re-enter your password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-1 top-2/3 -translate-y-1/2 text-gray-500 active:text-gray-700"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
          disabled={isLoading || !password || !confirmPassword}
        >
          {isLoading ? 'Updating Password...' : 'Update Password'}
        </Button>
      </form>
    </AuthPageLayout>
  );
};

export default ForgotPasswordPage;

