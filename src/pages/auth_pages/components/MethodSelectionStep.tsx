import { Mail } from 'lucide-react';
import AuthPageLayout from './AuthPageLayout';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const MethodSelectionStep = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname.includes('/login');

  const handleMethodSelect = (method: 'email' | 'apple' | 'google' | 'facebook') => {
    if (isLogin) {
      navigate(`/login/${method}`);
    } else {
      navigate(`/register/${method}`);
    }
  };

  return (
    <AuthPageLayout
      backButton={false}
      header={<h1>{isLogin ? 'Login to your account' : 'Create new account'}</h1>}
      footer={
        <p>
          By using Scholifi, you agree to the{' '}
          <a href="/terms" className=" hover:underline">
            Terms
          </a>{' '}
          and{' '}
          <a href="/privacy" className=" hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      }
    >
      <p className="text-center py-6 mx-auto">
        {isLogin 
          ? 'Welcome back! \n\n Let\'s continue learning.' 
          : 'Begin with creating new free account. This helps you keep your learning way easier.'}
      </p>

      <Button
        className="w-full mt-6"
        size="lg"
        onClick={() => handleMethodSelect('email')}
      >
        <Mail/>
        {isLogin ? 'Login with email' : 'Continue with email'}
      </Button>

      <p className="text-center my-6">or</p>

      <div className="flex flex-col gap-4">
        <Button
          variant="outline"
          className="w-full justify-center"
          size="lg"
          onClick={() => handleMethodSelect('apple')}
        >
          <svg
            fill="#000000"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
          </svg>
          {isLogin ? 'Login with Apple' : 'Continue with Apple'}
        </Button>
        <Button
          variant="outline"
          className="w-full justify-center"
          size="lg"
          onClick={() => handleMethodSelect('google')}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          {isLogin ? 'Login with Google' : 'Continue with Google'}
        </Button>
        <Button
          variant="outline"
          className="w-full justify-center"
          size="lg"
          onClick={() => handleMethodSelect('facebook')}
        >
          <svg className="text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.563V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
          </svg>
          {isLogin ? 'Login with Facebook' : 'Continue with Facebook'}
        </Button>
        <p className="text-center my-6">
        
          {isLogin ? 'Already have an account? ' : 'Don\'t have an account? '}
          <a href={isLogin ? '/register' : '/login'} className="text-primary hover:underline">
            {isLogin ? 'Register' : 'Login'}
          </a>
        </p>
      </div>
    </AuthPageLayout>
    );
};

export default MethodSelectionStep;
