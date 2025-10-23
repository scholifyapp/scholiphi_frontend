import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppPageLayout } from './components/AppPageLayout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';

export function App() {
  return (
      <AppPageLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </AppPageLayout>
  );
}

export default App;
