import { useState, useEffect } from 'react';
import { getRandomPhotos } from '../services/api';
import logo from '../assets/logo.png';

// Square background + inner circle color pairs cycling through the brand palette
const CELL_STYLES = [
  { bg: 'bg-coral',  circle: 'bg-teal'   },
  { bg: 'bg-teal',   circle: 'bg-pink'   },
  { bg: 'bg-pink',   circle: 'bg-coral'  },
  { bg: 'bg-yellow', circle: 'bg-coral'  },
  { bg: 'bg-coral',  circle: 'bg-yellow' },
  { bg: 'bg-teal',   circle: 'bg-yellow' },
  { bg: 'bg-yellow', circle: 'bg-teal'   },
  { bg: 'bg-pink',   circle: 'bg-yellow' },
  { bg: 'bg-coral',  circle: 'bg-pink'   },
];

export default function Gallery() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    getRandomPhotos(5).then(setPhotos).catch(() => {});
  }, []);

  // Even indices (0,2,4,6,8) stay empty; odd indices (1,3,5,7) show a photo
  let photoIndex = 0;
  const cells = Array.from({ length: 9 }, (_, i) => ({
    photo: i % 2 !== 0 ? (photos[photoIndex++] || null) : null,
    ...CELL_STYLES[i],
  }));

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {cells.map((cell, i) => (
        <div key={i} className={`aspect-square ${i === 4 ? 'bg-dark' : cell.bg} p-3`}>
          {i === 4 ? (
            <div className="w-full h-full flex items-center justify-center">
              <img src={logo} alt="Tú ere' de aquí" className="w-full h-full object-contain" />
            </div>
          ) : (
            <div className="w-full h-full rounded-full overflow-hidden">
              {cell.photo ? (
                <img
                  src={cell.photo}
                  alt={`Participante ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`w-full h-full ${cell.circle}`} />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
