import { Routes, Route } from 'react-router-dom';
import MethodSelectionStep from '../components/MethodSelectionStep';
import EmailStep from './components/EmailStep';
import OtpStep from './components/OtpStep';
import PasswordStep from './components/PasswordStep';
import SuccessPage from './components/SuccessPage';

const RegisterWrapper = () => {
  return (
    <Routes>
      <Route path="method" element={<MethodSelectionStep />} />
      <Route path="email" element={<EmailStep />} />
      <Route path="otp" element={<OtpStep />} />
      <Route path="password" element={<PasswordStep />} />
      <Route path="success" element={<SuccessPage />} />
      <Route index element={<MethodSelectionStep />} />
    </Routes>
  );
};

export default RegisterWrapper;
