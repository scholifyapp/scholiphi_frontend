import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AuthPageLayout from '../components/AuthPageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import api from '@/lib/apiInstance';
import { AxiosError } from 'axios';
import { useUserStore } from '@/store/useUserStore';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', {
        email: values.email,
        password: values.password,
      });
      if (response.data.user) {
        useUserStore.getState().setUser(response.data.user);
      }

      // Navigate to dashboard page on success
      navigate('/');
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }> & { formattedMessage?: string };
      setError(axiosError?.formattedMessage || 'An error occurred. Please try again.');
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
        <p>
          By using Scholifi, you agree to the{' '}
          <a href="/terms" className="hover:underline">
            Terms
          </a>{' '}
          and{' '}
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      }
    >
      <h1 className="mt-10">Welcome to Scholifi.</h1>
      <p className="py-2">Enter the School ID and Password you got from your school to continue.</p>

      <Form {...form}>
        <form className="mt-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={visiblePassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      {...field}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={() => setVisiblePassword(!visiblePassword)}
                      className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 active:text-gray-700"
                    >
                      {visiblePassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </Button>
                  </div>
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
            className="w-full mt-6"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Form>

      <p className="text-center mt-4">
        <a href="/forgot-password/request" className="text-sm text-primary-500 hover:underline">
          Forgot password?
        </a>
      </p>
    </AuthPageLayout>
  );
};

export default LoginPage;
