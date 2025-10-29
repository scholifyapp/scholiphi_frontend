import { Routes, Route } from 'react-router-dom';
import MethodSelectionStep from '../components/MethodSelectionStep';
import LoginPage from './LoginPage';

const LoginWrapper = () => {

  return (
    <Routes>
      <Route index element={<MethodSelectionStep />} />
      <Route path="email" element={<LoginPage />} />
    </Routes>
  );
};

export default LoginWrapper;
