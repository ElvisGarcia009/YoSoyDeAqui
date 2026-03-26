import UploadForm from '../components/UploadForm';

export default function Unete() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero call-to-action */}
      <section className="text-center py-20 px-6">
        <h1 className="font-heading font-black text-6xl md:text-8xl text-dark uppercase tracking-tight mb-6 leading-none">
          ¡Puedes ser parte!
        </h1>
        <p className="text-dark text-lg md:text-xl max-w-xl mx-auto mb-3 leading-relaxed">
          Al mandarnos tu foto junto con la comprobación de que eres de nacionalidad dominicana puedes
        </p>
        <p className="font-bold text-coral text-lg md:text-xl mb-10">
          ser la imágen de nuestra gran campaña.
        </p>
      </section>

      {/* Upload form */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-lg mx-auto">
          <h2 className="font-heading font-black text-3xl text-dark uppercase tracking-wide text-center mb-10">
            Participa aquí
          </h2>
          <UploadForm />
        </div>
      </section>

      {/* Privacy note */}
      <section className="py-10 px-6 text-center">
        <p className="text-dark/50 text-sm max-w-md mx-auto">
          Tu cédula nunca es almacenada en texto plano. Solo usamos un hash criptográfico
          para asegurar que cada persona pueda participar una sola vez.
        </p>
      </section>
    </main>
  );
}
