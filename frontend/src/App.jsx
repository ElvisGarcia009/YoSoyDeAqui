import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contactos from './pages/Contactos';
import Educacion from './pages/Educacion';
import Unete from './pages/Unete';
import Campana from './pages/Campana';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-cream font-body overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/educacion" element={<Educacion />} />
          <Route path="/unete" element={<Unete />} />
          <Route path="/campana" element={<Campana />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
