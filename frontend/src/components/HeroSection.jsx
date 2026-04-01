import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getRandomPhotos } from '../services/api';
import banner from '../assets/banner.png';

export default function HeroSection() {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    getRandomPhotos(10).then(setPhotos).catch(() => {});
  }, []);

  useEffect(() => {
    if (photos.length < 2) return;

    intervalRef.current = setInterval(() => {
      setVisible(false);
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((i) => (i + 1) % photos.length);
        setVisible(true);
      }, 400);
    }, 4000);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [photos]);

  const currentPhoto = photos[currentIndex] || null;

  return (
    <>
      <img src={banner} alt="Banner de la campaña" className="w-full block" />
      <section className="flex flex-col md:flex-row min-h-[85vh]">
      {/* Photo side */}
      <div className="md:w-1/2 bg-gray-200 relative overflow-hidden min-h-64 md:min-h-0">
        {currentPhoto ? (
          <img
            src={currentPhoto}
            alt="Participante de la campaña"
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-400 ${
              visible ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className="w-full h-full bg-teal absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-white/20" />
          </div>
        )}
      </div>

      {/* Text side */}
      <div className="md:w-1/2 bg-cream flex flex-col justify-center px-10 py-16 md:px-16">
        <p className="text-dark leading-relaxed mb-4 text-justify">
          <strong>Tú ere&apos; de aquí</strong> es una campaña educativa sobre la diversidad étnica
          en la República Dominicana que busca desmontar la idea de que existe un único rostro o
          perfil cultural que define al dominicano. La iniciativa cuestiona los estereotipos que
          condicionan la pertenencia nacional a ciertos rasgos físicos o formas de ser, y afirma
          que la dominicanidad es diversa, plural y construida desde múltiples raíces.
        </p>
        <p className="text-dark leading-relaxed mb-8 text-justify">
          Tal vez alguna vez has usado o te han preguntado la expresión &ldquo;¿Tú ere&apos; de
          aquí?&rdquo;, debido a una apariencia física que no va con la idea de como el dominicano
          &ldquo;debe verse&rdquo;. Hoy afirmamos y quitamos la duda de esa expresión.
        </p>

        <Link
          to="/unete"
          className="inline-block bg-coral text-white font-heading font-black text-lg tracking-widest uppercase px-8 py-4 hover:bg-red-700 transition-colors duration-200 self-start"
        >
          Sé parte de la campaña
        </Link>
      </div>
      </section>
    </>
  );
}
