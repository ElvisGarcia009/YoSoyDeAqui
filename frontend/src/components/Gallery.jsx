import { useState, useEffect } from 'react';
import { getRandomPhotos } from '../services/api';

// Placeholder colors cycling through the brand palette
const PLACEHOLDER_COLORS = [
  'bg-coral',
  'bg-teal',
  'bg-pink',
  'bg-yellow',
  'bg-coral',
  'bg-teal',
  'bg-yellow',
  'bg-pink',
  'bg-coral',
];

export default function Gallery() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    getRandomPhotos(9).then(setPhotos).catch(() => {});
  }, []);

  const cells = Array.from({ length: 9 }, (_, i) => ({
    photo: photos[i] || null,
    color: PLACEHOLDER_COLORS[i],
  }));

  return (
    <div className="grid grid-cols-3 gap-3 p-3">
      {cells.map((cell, i) => (
        <div key={i} className="aspect-square rounded-full overflow-hidden">
          {cell.photo ? (
            <img
              src={cell.photo}
              alt={`Participante ${i + 1}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full ${cell.color}`} />
          )}
        </div>
      ))}
    </div>
  );
}
