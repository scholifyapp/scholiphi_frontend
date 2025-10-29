import { Routes, Route, Navigate } from 'react-router-dom';
import { AppPageLayout } from './components/AppPageLayout';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import RegisterWrapper from './pages/auth_pages/register/RegisterWrapper';
import LoginWrapper from './pages/auth_pages/login/LoginWrapper';
import ForgotPasswordWrapper from './pages/auth_pages/forgot-password/ForgotPasswordWrapper';

export function App() {
  return (
    <AppPageLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register/*" element={<RegisterWrapper />} />
        <Route path="/login/*" element={<LoginWrapper />} />
        <Route path="/forgot-password/*" element={<ForgotPasswordWrapper />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </AppPageLayout>
  );
}

export default App;
