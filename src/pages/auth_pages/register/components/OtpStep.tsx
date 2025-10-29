import AuthPageLayout from '../../components/AuthPageLayout';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useNavigate } from 'react-router-dom';

const OtpStep = () => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(20);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

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

  const handleResend = () => {
    // Here you would typically send the OTP again
    setTimer(60);
    setCanResend(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically verify the OTP
    if (otp.length === 6) {
      navigate('/register/password');
    }
  };

  return (
    <AuthPageLayout 
      backButton={true}
      onBack={() => navigate('/register/email')} 
      header={<h1>Verify your email</h1>}
      footer={
        <p>By using Scholifi, you agree to the <a href="/terms" className="hover:underline">Terms</a> and <a href="/privacy" className="hover:underline">Privacy Policy</a>.</p>
      }
    >
      <p className="text-center pt-6">
        We've sent a 6-digit verification code to your email. Please enter it below.
      </p>
      
      <form className="mt-6" onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="mb-2">
            <label htmlFor="verification-code" className="block mb-4 text-sm font-medium">
              Verification Code
            </label>
            <div className="flex justify-center">
              <InputOTP
                id="verification-code"
                maxLength={6}
                value={otp}
                onChange={setOtp}
                disabled={false}
              >
                <InputOTPGroup >
                  <InputOTPSlot  index={0} className='text-lg h-12 w-12 font-semibold' />
                  <InputOTPSlot index={1} className='text-lg h-12 w-12 font-semibold' />
                  <InputOTPSlot index={2} className='text-lg h-12 w-12 font-semibold' />
                  <InputOTPSlot index={3} className='text-lg h-12 w-12 font-semibold' />
                  <InputOTPSlot index={4} className='text-lg h-12 w-12 font-semibold' />
                  <InputOTPSlot index={5} className='text-lg h-12 w-12 font-semibold' />
                </InputOTPGroup>
              </InputOTP>
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
                onClick={handleResend}
              >
                Resend code
              </Button>
            )}
          </div>
        </div>
        
        <Button 
          type="submit" 
          className='w-full mt-6' 
          size='lg'
        >
          Verify
        </Button>
      </form>
      
      <p className="text-sm text-gray-500 mt-4 text-center">
        This helps us keep your account secure.
      </p>
    </AuthPageLayout>
  );
};

export default OtpStep;
