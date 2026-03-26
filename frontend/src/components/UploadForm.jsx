import { useState, useRef, useEffect } from 'react';
import { validateCedula } from '../utils/validateCedula';
import { uploadPhoto } from '../services/api';

export default function UploadForm() {
  const [cedula, setCedula] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | uploading | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [cedulaError, setCedulaError] = useState('');
  const previewUrlRef = useRef(null);

  // Clean up object URL on unmount or when a new file is selected
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Revoke previous object URL
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    const url = URL.createObjectURL(file);
    previewUrlRef.current = url;
    setImageFile(file);
    setPreview(url);
    setStatus('idle');
    setErrorMessage('');
  }

  function handleCedulaChange(e) {
    setCedula(e.target.value);
    setCedulaError('');
  }

  function handleCedulaBlur() {
    if (cedula.trim()) {
      const result = validateCedula(cedula);
      if (!result.valid) setCedulaError(result.error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage('');

    // Client-side validation
    const cedulaResult = validateCedula(cedula);
    if (!cedulaResult.valid) {
      setCedulaError(cedulaResult.error);
      return;
    }
    if (!imageFile) {
      setErrorMessage('Por favor selecciona una imagen.');
      return;
    }

    const fd = new FormData();
    fd.append('image', imageFile);
    fd.append('cedula', cedula);

    setStatus('uploading');
    setProgress(0);

    try {
      await uploadPhoto(fd, setProgress);
      setStatus('success');
      setCedula('');
      setImageFile(null);
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
      setPreview(null);
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err.response?.data?.error || 'Error al subir la foto. Intenta de nuevo.'
      );
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      {status === 'success' ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🇩🇴</div>
          <h3 className="font-heading font-black text-3xl text-dark uppercase mb-3">
            ¡Gracias por participar!
          </h3>
          <p className="text-dark mb-6">Tu foto ha sido enviada exitosamente.</p>
          <button
            onClick={() => setStatus('idle')}
            className="bg-teal text-white font-heading font-black tracking-widest uppercase px-8 py-3 hover:bg-teal/80 transition-colors"
          >
            Subir otra foto
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image upload */}
          <div>
            <label className="block text-dark font-semibold mb-2">
              Tu foto
            </label>
            <div className="border-2 border-dashed border-dark/30 rounded-lg p-6 text-center hover:border-teal transition-colors cursor-pointer relative">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                required
              />
              {preview ? (
                <img
                  src={preview}
                  alt="Vista previa"
                  className="max-h-48 mx-auto rounded-lg object-cover"
                />
              ) : (
                <div className="text-dark/50">
                  <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  <p className="text-sm">Haz clic o arrastra tu foto aquí</p>
                  <p className="text-xs mt-1">JPEG, PNG o WebP · máx. 5 MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Cédula input */}
          <div>
            <label htmlFor="cedula" className="block text-dark font-semibold mb-2">
              Número de cédula
            </label>
            <input
              id="cedula"
              type="text"
              value={cedula}
              onChange={handleCedulaChange}
              onBlur={handleCedulaBlur}
              placeholder="000-0000000-0"
              maxLength={13}
              className={`w-full border-2 px-4 py-3 text-dark bg-white focus:outline-none focus:border-teal transition-colors rounded-sm ${
                cedulaError ? 'border-coral' : 'border-dark/30'
              }`}
              required
            />
            {cedulaError && (
              <p className="text-coral text-sm mt-1">{cedulaError}</p>
            )}
            <p className="text-dark/50 text-xs mt-1">
              Tu cédula no será almacenada en texto plano.
            </p>
          </div>

          {/* Upload progress */}
          {status === 'uploading' && (
            <div>
              <div className="flex justify-between text-sm text-dark mb-1">
                <span>Subiendo...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-dark/10 rounded-full h-2">
                <div
                  className="bg-teal h-2 rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Error message */}
          {status === 'error' && errorMessage && (
            <div className="bg-coral/10 border border-coral text-coral px-4 py-3 rounded-sm text-sm">
              {errorMessage}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={status === 'uploading'}
            className="w-full bg-teal text-white font-heading font-black text-xl tracking-widest uppercase py-4 hover:bg-teal/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {status === 'uploading' ? 'Enviando...' : 'Enviar foto'}
          </button>
        </form>
      )}
    </div>
  );
}
