import { Link } from 'react-router-dom';

const articles = [
  {
    title: 'La Identidad Dominicana',
    color: 'border-coral',
    content: `La identidad dominicana es el resultado de siglos de mezcla cultural entre pueblos taínos, africanos y europeos. Esta fusión ha dado lugar a una cultura rica y diversa que se expresa en la música, la gastronomía, el lenguaje y las tradiciones del pueblo dominicano.

    Reconocer esta diversidad es fundamental para entender quiénes somos como nación y para combatir los estereotipos que limitan nuestra comprensión de lo que significa ser dominicano.`,
  },
  {
    title: 'Raíces Taínas',
    color: 'border-yellow',
    content: `Los taínos fueron los habitantes originarios de la isla La Española. Aunque muchos murieron a consecuencia de la colonización, su legado permanece vivo en palabras, costumbres, y en el ADN de los dominicanos de hoy.

    Palabras como "hamaca", "canoa", "tabaco" y "huracán" son de origen taíno. Su cosmovisión y sus prácticas agrícolas también han dejado una huella indeleble en nuestra cultura.`,
  },
  {
    title: 'Herencia Africana',
    color: 'border-teal',
    content: `La diáspora africana ha dejado una marca profunda e irrenunciable en la República Dominicana. Desde la música (el merengue, la salsa, el palos) hasta la religiosidad popular, las tradiciones culinarias y el lenguaje, África está presente en cada aspecto de la cultura dominicana.

    Reconocer y celebrar esta herencia es un acto de justicia histórica y de amor propio colectivo.`,
  },
  {
    title: 'Influencia Europea',
    color: 'border-pink',
    content: `La colonización española trajo consigo el idioma, la religión católica y muchas tradiciones que se fusionaron con las culturas preexistentes. Esta influencia, aunque marcada por la violencia de la conquista, también ha contribuido a la rica síntesis cultural que hoy llamamos identidad dominicana.

    El español dominicano, con sus particularidades y riqueza expresiva, es quizás el ejemplo más visible de esta fusión.`,
  },
];

export default function Educacion() {
  return (
    <main className="min-h-screen bg-cream py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading font-black text-6xl md:text-8xl text-dark uppercase tracking-tight mb-4 text-center">
          Educación
        </h1>
        <p className="text-dark text-center mb-16 max-w-2xl mx-auto leading-relaxed">
          Aprende sobre la rica historia y diversidad étnica de la República Dominicana.
          Conocer nuestras raíces nos ayuda a construir una identidad más inclusiva y consciente.
        </p>

        <div className="space-y-10">
          {articles.map(({ title, color, content }) => (
            <article
              key={title}
              className={`bg-white rounded-sm border-l-4 ${color} p-8 shadow-sm`}
            >
              <h2 className="font-heading font-black text-3xl text-dark uppercase mb-4">
                {title}
              </h2>
              {content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-dark leading-relaxed mb-3 text-justify">
                  {paragraph.trim()}
                </p>
              ))}
            </article>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/unete"
            className="inline-block bg-coral text-white font-heading font-black text-xl tracking-widest uppercase px-10 py-4 hover:bg-red-700 transition-colors"
          >
            Sé parte de la campaña
          </Link>
        </div>
      </div>
    </main>
  );
}
