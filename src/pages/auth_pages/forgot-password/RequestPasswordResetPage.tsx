import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AuthPageLayout from '../components/AuthPageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/lib/apiInstance';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const requestResetSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

type RequestResetFormValues = z.infer<typeof requestResetSchema>;

const RequestPasswordResetPage = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();

  const form = useForm<RequestResetFormValues>({
    resolver: zodResolver(requestResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: RequestResetFormValues) => {
    setError('');
    setIsLoading(true);

    try {
      await api.post('/auth/forgot-password', {
        email: values.email,
      });
      setIsEmailSent(true);
    } catch (err: any) {
      setError(err?.formattedMessage || 'An error occurred. Please try again.');
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
            We've sent a password reset link to <strong>{form.getValues('email')}</strong>
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
      
      <Form {...form}>
        <form className="mt-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="Enter your email address" 
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          <Button 
            type="submit" 
            className='w-full mt-6' 
            size='lg'
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>
      </Form>

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

