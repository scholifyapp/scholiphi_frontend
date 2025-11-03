import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AuthPageLayout from '../../components/AuthPageLayout';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRegisterStore } from '../../../../store/useRegisterStore';
import api from '@/lib/apiInstance';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const otpSchema = z.object({
  otp: z
    .string()
    .min(1, 'Verification code is required')
    .length(6, 'Verification code must be exactly 6 digits')
    .regex(/^\d+$/, 'Verification code must contain only numbers'),
});

type OtpFormValues = z.infer<typeof otpSchema>;

const OtpStep = () => {
  const [searchParams] = useSearchParams();
  const emailFromUrl = searchParams.get('email');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const { reset } = useRegisterStore();

  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  // Check if email is in URL
  useEffect(() => {
    if (!emailFromUrl) {
      setError('Missing email. Please start over.');
      navigate('/register/email');
    }
  }, [emailFromUrl, navigate]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResend = async () => {
    if (!emailFromUrl) {
      setError('Email not found. Please go back and re-enter your email.');
      return;
    }

    setIsResending(true);
    setError('');

    try {
      await api.post('/auth/send-otp', {
        email: emailFromUrl,
        type: 'email_verification',
      });

      setTimer(60);
      setCanResend(false);
    } catch (err: any) {
      setError(err?.formattedMessage || 'Failed to resend verification code. Please try again.');
      console.error('Resend OTP error:', err);
    } finally {
      setIsResending(false);
    }
  };

  const onSubmit = async (values: OtpFormValues) => {
    if (!emailFromUrl) {
      setError('Email not found. Please start over.');
      navigate('/register/email');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Verify OTP (this will also update emailVerified to true)
      await api.post('/auth/verify-otp', {
        email: emailFromUrl,
        code: values.otp,
        type: 'email_verification',
      });

      // Reset registration store
      reset();

      // Navigate to success page
      navigate('/register/success');
    } catch (err: any) {
      setError(err?.formattedMessage || 'Verification failed. Please try again.');
      console.error('OTP verification error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthPageLayout 
      backButton={true}
      onBack={() => navigate('/register/password')} 
      header={<h1>Verify your email</h1>}
      footer={
        <p>By using Scholifi, you agree to the <a href="/terms" className="hover:underline">Terms</a> and <a href="/privacy" className="hover:underline">Privacy Policy</a>.</p>
      }
    >
      <p className="text-center pt-6">
        We've sent a 6-digit verification code to <span className="font-semibold">{emailFromUrl || 'your email'}</span>. Please enter it below.
      </p>
      
      <Form {...form}>
        <form className="mt-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="mb-6">
                <div className="mb-2">
                  <FormLabel className="block mb-4 text-sm font-medium">
                    Verification Code
                  </FormLabel>
                  <div className="flex justify-center">
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        {...field}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} className='text-lg h-12 w-12 font-semibold' />
                          <InputOTPSlot index={1} className='text-lg h-12 w-12 font-semibold' />
                          <InputOTPSlot index={2} className='text-lg h-12 w-12 font-semibold' />
                          <InputOTPSlot index={3} className='text-lg h-12 w-12 font-semibold' />
                          <InputOTPSlot index={4} className='text-lg h-12 w-12 font-semibold' />
                          <InputOTPSlot index={5} className='text-lg h-12 w-12 font-semibold' />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                  </div>
                </div>
                
                <div className="text-end mt-2">
                  {!canResend ? (
                    <p className="text-sm text-gray-500">
                      Resend code in <span className="font-semibold text-gray-700">{timer}s</span>
                    </p>
                  ) : (
                    <Button
                      size='sm'
                      variant='link'
                      className='font-semibold text-primary'
                      type="button"
                      onClick={handleResend}
                      disabled={isResending}
                    >
                      {isResending ? 'Resending...' : 'Resend code'}
                    </Button>
                  )}
                </div>
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
            {isLoading ? 'Verifying...' : 'Verify'}
          </Button>
        </form>
      </Form>
      
      <p className="text-sm text-gray-500 mt-4 text-center">
        This helps us keep your account secure.
      </p>
    </AuthPageLayout>
  );
};

export default OtpStep;
