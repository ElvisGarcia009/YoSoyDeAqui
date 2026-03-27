import logo from '../assets/logo.png';

// Para cambiar el video de la campaña, actualiza la URL a continuación:
const YOUTUBE_URL = 'https://youtu.be/UlKhI4VmJjI?si=edo-EMcb2Sih_1Dq';

function getEmbedUrl(url) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function Campana() {
  const embedUrl = getEmbedUrl(YOUTUBE_URL);

  return (
    <div className="min-h-screen bg-cream py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="bg-dark px-12 py-8 inline-flex" style={{ borderRadius: '20px' }}>
            <img src={logo} alt="Tú ere' de aquí" className="h-48 w-auto" />
          </div>
        </div>

        {/* Descripción */}
        <p className="text-dark/70 mb-12 text-xl text-center max-w-2xl mx-auto">
          Conoce el video oficial de la campaña que celebra la diversidad e identidad dominicana.
        </p>

        {/* Video */}
        {embedUrl ? (
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full rounded-xl shadow-xl"
              src={embedUrl} 
              title="Video de la campaña Tú ere' de aquí"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="w-full aspect-video bg-teal/20 rounded-xl flex items-center justify-center">
            <p className="text-dark/50 text-sm">
              Actualiza <code className="bg-dark/10 px-1 rounded">YOUTUBE_URL</code> en{' '}
              <code className="bg-dark/10 px-1 rounded">src/pages/Campana.jsx</code> para mostrar el video.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
