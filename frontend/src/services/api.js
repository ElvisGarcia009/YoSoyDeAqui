import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
});

export const getRandomPhotos = (limit = 9) =>
  api.get(`/api/photos/random?limit=${limit}`).then((r) => r.data.photos);

export const uploadPhoto = (formData, onProgress) =>
  api.post('/api/photos/upload', formData, {
    // Do NOT set Content-Type manually — let the browser set it with the correct boundary
    onUploadProgress: (e) => {
      if (onProgress && e.total) {
        onProgress(Math.round((e.loaded * 100) / e.total));
      }
    },
  });
