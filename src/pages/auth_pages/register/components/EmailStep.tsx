import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRegisterStore } from '../../../../store/useRegisterStore';
import AuthPageLayout from '../../components/AuthPageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const emailStepSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters long')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters long')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

type EmailStepFormValues = z.infer<typeof emailStepSchema>;

const EmailStep = () => {
  const { updateData } = useRegisterStore();
  const navigate = useNavigate();

  const form = useForm<EmailStepFormValues>({
    resolver: zodResolver(emailStepSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  const onSubmit = (values: EmailStepFormValues) => {
    // Update store with email and names
    updateData({ email: values.email, firstName: values.firstName, lastName: values.lastName });

    // Navigate to password step
    navigate('/register/password');
  };

  return (
    <AuthPageLayout 
      backButton={true}
      onBack={() => navigate('/register/method')}
      header={<h1>Add your details</h1>} 
      footer={
        <p>By using Scholifi, you agree to the <a href="/terms" className="hover:underline">Terms</a> and <a href="/privacy" className="hover:underline">Privacy Policy</a>.</p>
      }
    >
      <p className="text-center pt-6">
        Please provide your details to continue the registration process.
      </p>
      
      <Form {...form}>
        <form className="mt-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input 
                    type="text" 
                    placeholder="First Name" 
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input 
                    type="text" 
                    placeholder="Last Name" 
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
        
          <Button 
            type="submit" 
            className='w-full mt-6' 
            size='lg'
          >
            Continue
          </Button>
        </form>
      </Form>
    </AuthPageLayout>
  );
};

export default EmailStep;