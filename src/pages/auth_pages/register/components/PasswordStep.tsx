import AuthPageLayout from '../../components/AuthPageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRegisterStore } from '../../../../store/useRegisterStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

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


const PasswordStep = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { data, updateData, reset } = useRegisterStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    try {
      updateData({ password });
      console.log('Registration data:', { ...data, password });
      
      reset();
      navigate('/register/success');
      
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

    const [requirements, setRequirements] = useState<PasswordRequirements>({
    minLength: false,
    hasNumber: false,
    hasSymbol: false,
  })
  const [strength, setStrength] = useState<PasswordStrength>({
    score: 0,
    level: "weak",
    color: "bg-red-500",
  })

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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setPassword(e.target.value)
  }

  return (
    <AuthPageLayout 
      backButton={true}
      onBack={() => navigate('/register/otp')}
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
     <form onSubmit={handleSubmit}>   
     <div className="mb-6 mt-4">
          <label className="block text-sm font-medium text-gray-900 mb-2">Password</label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter password"
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
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
        </div>

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
        >
          Complete Registration
        </Button>
      </form>
    </AuthPageLayout>
  );
};

export default PasswordStep;
