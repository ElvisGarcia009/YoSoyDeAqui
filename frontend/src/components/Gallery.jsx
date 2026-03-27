import { useState, useEffect } from 'react';
import { getRandomPhotos } from '../services/api';

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
    getRandomPhotos(9).then(setPhotos).catch(() => {});
  }, []);

  const cells = Array.from({ length: 9 }, (_, i) => ({
    photo: photos[i] || null,
    ...CELL_STYLES[i],
  }));

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {cells.map((cell, i) => (
        <div key={i} className={`aspect-square ${cell.bg} p-3`}>
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
        </div>
      ))}
    </div>
  );
}
