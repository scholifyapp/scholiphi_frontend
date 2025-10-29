import { useState } from 'react';
import { useRegisterStore } from '../../../../store/useRegisterStore';
import AuthPageLayout from '../../components/AuthPageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const EmailStep = () => {
  const [email, setEmail] = useState('');
  const { updateData } = useRegisterStore();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateData({ email });
    navigate('/register/otp');
  };

  return (
    <AuthPageLayout 
      backButton={true}
      onBack={() => navigate('/register/method')}
      header={<h1>Add your email</h1>} 
      footer={
        <p>By using Scholifi, you agree to the <a href="/terms" className="hover:underline">Terms</a> and <a href="/privacy" className="hover:underline">Privacy Policy</a>.</p>
      }
    >
      <p className="text-center pt-6">
        Please provide your email address to continue the registration process.
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
        
        <Button 
          type="submit" 
          className='w-full mt-6' 
          size='lg'
          disabled={email === ''}
        >
          Continue
        </Button>
      </form>
    </AuthPageLayout>
  );
};

export default EmailStep;