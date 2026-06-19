/**
 * App root — two-page routing.
 * Karpathy: minimum structure. Router + two pages.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Showcase from './pages/Showcase';
import Admin from './pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Showcase />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
