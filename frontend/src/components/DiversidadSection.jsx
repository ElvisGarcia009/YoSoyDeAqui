import Gallery from './Gallery';

export default function DiversidadSection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-12">
        {/* Gallery grid */}
        <div className="w-full md:w-1/2">
          <Gallery />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2">
          <h2 className="font-heading font-black text-4xl md:text-5xl text-dark uppercase mb-3 tracking-tight">
            Diversidad Étnica
          </h2>
          <div className="w-24 h-1 bg-dark mb-6" />
          <p className="text-dark leading-relaxed mb-4 text-justify">
            La diversidad étnica es la convivencia de distintos grupos humanos con orígenes y
            culturas diferentes dentro de una misma sociedad. No se basa solo en rasgos físicos,
            sino en procesos históricos y construcciones sociales que forman identidades múltiples y
            enriquecen la vida cultural.
          </p>
          <p className="text-dark leading-relaxed text-justify">
            En la República Dominicana, esta diversidad surge de la mezcla de raíces taínas,
            europeas y africanas, que dieron forma a la identidad dominicana. Aunque ha habido
            prejuicios y estereotipos, esta pluralidad es esencial para comprender y fortalecer
            la dominicanidad.
          </p>
        </div>
      </div>
    </section>
  );
}
