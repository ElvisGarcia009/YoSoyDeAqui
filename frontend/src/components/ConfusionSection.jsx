import { Link } from 'react-router-dom';

const concepts = [
  {
    title: 'Etnia',
    bg: 'bg-pink',
    text: 'La etnicidad se refiere al sentido de pertenencia a un grupo que comparte historia, cultura, tradiciones, lengua y, en muchos casos, un origen común. A diferencia de la raza, no se centra solo en lo físico, sino en elementos culturales e identitarios.',
  },
  {
    title: 'Raza',
    bg: 'bg-yellow',
    text: 'La raza es una clasificación social basada principalmente en características físicas visibles, como el color de piel, los rasgos faciales o el tipo de cabello. Aunque históricamente se utilizó como categoría biológica, hoy se entiende que es una construcción social sin base científica sólida.',
  },
  {
    title: 'Nacionalidad',
    bg: 'bg-teal',
    text: 'La nacionalidad es el vínculo jurídico y político que une a una persona con un Estado. Define la pertenencia legal a un país, otorgando derechos y deberes. Una persona puede compartir etnicidad con otros grupos fuera de su país.',
  },
];

export default function ConfusionSection() {
  return (
    <section className="py-16 px-6 bg-cream">
      <div className="max-w-5xl mx-auto">
        {/* Title with decorative lines */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-dark opacity-40" />
          <h2 className="font-body text-dark text-lg md:text-xl tracking-wide whitespace-nowrap text-center px-4">
            Para aclarar una común confusión...
          </h2>
          <div className="flex-1 h-px bg-dark opacity-40" />
        </div>

        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-12">
          {concepts.map(({ title, bg, text }) => (
            <div key={title} className="text-center">
              <div className={`${bg} inline-block px-6 py-2 mb-4`}>
                <span className="font-heading font-black text-xl tracking-widest uppercase text-dark">
                  {title}
                </span>
              </div>
              <p className="text-dark text-sm leading-relaxed text-justify">{text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/educacion"
            className="inline-block bg-coral text-white font-heading font-black text-lg tracking-widest uppercase px-10 py-4 hover:bg-red-700 transition-colors duration-200"
          >
            Aprende más
          </Link>
        </div>
      </div>
    </section>
  );
}
