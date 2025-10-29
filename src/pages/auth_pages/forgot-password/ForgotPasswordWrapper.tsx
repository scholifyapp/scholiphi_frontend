import { Routes, Route } from 'react-router-dom';
import ForgotPasswordPage from './ForgotPasswordPage';
import RequestPasswordResetPage from './RequestPasswordResetPage';

const ForgotPasswordWrapper = () => {
  return (
    <Routes>
      <Route index element={<ForgotPasswordPage />} />
      <Route path="request" element={<RequestPasswordResetPage />} />
    </Routes>
  );
};

export default ForgotPasswordWrapper;

