import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AuthPageLayout from '../../components/AuthPageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRegisterStore } from '../../../../store/useRegisterStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import api from '@/lib/apiInstance';
import { useUserStore } from '@/store/useUserStore';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface PasswordRequirements {
  minLength: boolean
  hasNumber: boolean
  hasSymbol: boolean
}

interface PasswordStrength {
  score: number
  level: "weak" | "medium" | "strong"
  color: string
}

const passwordSchema = z.object({
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'Password must contain at least one symbol'),
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

const PasswordStep = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { data, updateData } = useRegisterStore();
  const navigate = useNavigate();

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
    },
  });

  const password = form.watch('password');

  const [requirements, setRequirements] = useState<PasswordRequirements>({
    minLength: false,
    hasNumber: false,
    hasSymbol: false,
  });
  const [strength, setStrength] = useState<PasswordStrength>({
    score: 0,
    level: "weak",
    color: "bg-red-500",
  });

  useEffect(() => {
    const minLength = password.length >= 8
    const hasNumber = /\d/.test(password)
    const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)

    setRequirements({
      minLength,
      hasNumber,
      hasSymbol,
    })

    let score = 0
    let level: "weak" | "medium" | "strong" = "weak"
    let color = "bg-red-500"

    if (password.length > 0) {
      // Calculate score based on requirements met
      if (minLength) score++
      if (hasNumber) score++
      if (hasSymbol) score++

      // Set level and color based on score
      if (score === 3) {
        level = "strong"
        color = "bg-green-600"
      } else if (score >= 2) {
        level = "medium"
        color = "bg-amber-400"
      } else {
        level = "weak"
        color = "bg-red-500"
      }
    }

    setStrength({ score, level, color })
  }, [password])

  const onSubmit = async (values: PasswordFormValues) => {
    setError('');
    
    // Validate that all required data is available
    if (!data.email || !data.firstName || !data.lastName) {
      setError('Missing registration data. Please start over.');
      navigate('/register/email');
      return;
    }

    setIsLoading(true);

    try {
      // Update store with password
      updateData({ password: values.password });

      // Call signup API (backend will automatically send OTP)
      const signupResponse = await api.post('/auth/signup', {
        email: data.email,
        password: values.password,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role || 'student',
      });

      // Store user data (account is created but email not verified yet)
      if (signupResponse.data?.user) {
        useUserStore.getState().setUser(signupResponse.data.user);
      }

      // Navigate to OTP step with email in URL
      navigate(`/register/otp?email=${encodeURIComponent(data.email)}`);
    } catch (err: any) {
      setError(err?.formattedMessage || 'An unexpected error occurred. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthPageLayout 
      backButton={true}
      onBack={() => navigate('/register/email')}
      header={<h1>Create a password</h1>}
      footer={
        <p>By using Scholifi, you agree to the{" "}
        <a href="#" className=" hover:text-gray-700">
          Terms
        </a>
        and
        <a href="#" className=" hover:text-gray-700">
          Privacy Policy
        </a>
        .
      </p>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>   
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-6 mt-4">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      {...field}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-1 top-2 text-gray-500 active:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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

        {password && (
          <div className="mb-6">
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${strength.color} transition-all duration-300`}
                style={{ width: `${(strength.score / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center ${requirements.minLength ? "bg-green-600" : "bg-gray-200"}`}
            >
              {requirements.minLength && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <span className={`text-sm ${requirements.minLength ? "text-gray-900 font-medium" : "text-gray-600"}`}>
              8 characters minimum
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center ${requirements.hasNumber ? "bg-green-600" : "bg-gray-200"}`}
            >
              {requirements.hasNumber && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <span className={`text-sm ${requirements.hasNumber ? "text-gray-900 font-medium" : "text-gray-600"}`}>
              a number
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center ${requirements.hasSymbol ? "bg-green-600" : "bg-gray-200"}`}
            >
              {requirements.hasSymbol && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <span className={`text-sm ${requirements.hasSymbol ? "text-gray-900 font-medium" : "text-gray-600"}`}>
              one symbol minimum
            </span>
          </div>
        </div>
        
          <Button 
            type="submit" 
            className='w-full mt-8' 
            size='lg'
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Complete Registration'}
          </Button>
        </form>
      </Form>
    </AuthPageLayout>
  );
};

export default PasswordStep;
