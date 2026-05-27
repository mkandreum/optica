import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const CLINICAL_SERVICES = [
  {
    num: "01",
    title: "Optometría General",
    desc: "Mucho más que una agudeza visual clásica. Analizamos más de 20 parámetros de tu sistema visual para garantizar que tus ojos enfoquen y coordinen con confort y eficacia.",
    action: "Examen de más de 20 parámetros"
  },
  {
    num: "02",
    title: "Control de Miopía",
    desc: "Tratamientos clínicos personalizados (lentes de desenfoque, orto-k) respaldados científicamente para frenar de forma segura la progresión de la miopía en menores.",
    action: "Freno de elongación ocular"
  },
  {
    num: "03",
    title: "Terapia Visual",
    desc: "Un gimnasio para tus ojos y cerebro. Programas específicos para optimizar tus reflejos, corregir problemas de coordinación y potenciar el aprendizaje infantil.",
    action: "Neuro-entrenamiento personalizado"
  },
  {
    num: "04",
    title: "Baja Visión",
    desc: "Ayudas de aumento avanzadas, telescopios y filtros de contraste óptimo para pacientes con limitaciones severas. Devolvemos la autonomía en tareas cotidianas.",
    action: "Dispositivos de alta magnificación"
  },
  {
    num: "05",
    title: "Contactología Avanzada",
    desc: "Adaptaciones complejas de lentes de contacto permeables al gas, esclerales y de control miópico para córneas irregulares o sequedad severa.",
    action: "Confort corneal excepcional"
  },
  {
    num: "06",
    title: "Optometría Digital / SVI",
    desc: "Diagnósticos específicos de SVI (Síndrome Visual Informático). Tratamos la fatiga del trabajador digital y adaptamos lentes con bloqueadores de azul nocivo.",
    action: "Protección estrés digital"
  },
  {
    num: "07",
    title: "Programa Visión Senior",
    desc: "Evaluaciones minuciosas preventivas de cataratas, glaucoma y degeneración macular (DMAE) orientadas a mantener el confort y la independencia en la madurez.",
    action: "Salud ocular en la madurez"
  }
];

const SYMPTOMS = [
  { num: "1", text: "Dolores de cabeza o fatiga visual cuando trabajas con pantallas, sobre todo al final del día." },
  { num: "2", text: "Visión borrosa en cerca o en lejos, de forma permanente o de manera intermitente." },
  { num: "3", text: "Dificultad para enfocar con rapidez cuando cambias la mirada de lejos a cerca, o viceversa." },
  { num: "4", text: "Necesidad de entornar o entreabrir los ojos para intentar mejorar tu nitidez de lejos." },
  { num: "5", text: "Bajo rendimiento escolar o dificultades de concentración de la lectura en niños." },
  { num: "6", text: "Excesiva sensibilidad a la luz ambiental o deslumbramientos nocturnos frecuentes." },
  { num: "7", text: "Han pasado más de dos años desde tu última revisión optométrica completa en un centro." }
];

const PROTOCOLS = [
  { step: "1", title: "Anamnesis: Te escuchamos", desc: "Todo empieza contigo. Escuchamos tus síntomas, tus antecedentes de salud general y ocular, y analizamos en detalle tus hábitos de trabajo diarios." },
  { step: "2", title: "Examen Refractivo Especializado", desc: "Graduamos tu vista con máxima precisión alternando pruebas objetivas y subjetivas mediante autorrefractómetro, topógrafo de córnea, retinoscopio y foróptero." },
  { step: "3", title: "Evaluación de Salud Ocular", desc: "Usamos el oftalmoscopio y la lámpara de hendidura de última generación para inspeccionar el cristalino, la córnea y la retina, descartando signos patológicos." },
  { step: "4", title: "Estudio de Visión Binocular", desc: "Analizamos cómo coordinan ambos ojos. Una mala binocularidad produce fatiga silenciosa, mala percepción de profundidad o sutil visión doble." },
  { step: "5", title: "Tonometría de Precisión", desc: "Medida de la presión intraocular. Una prueba indolora y rápida clave para la prevención precoz del Glaucoma Silencioso." },
  { step: "6", title: "Diagnóstico Clínico de Autor", desc: "Preparamos un informe visual explicándote de manera transparente lo que ocurre, y decidimos juntos la mejor corrección (gafas, lentillas o terapia)." }
];

const FAQS = [
  {
    q: "¿Cuánto dura un examen visual completo?",
    a: "Nos tomamos nuestro tiempo. De media, una consulta completa dura entre 30 y 40 minutos para realizar toda la batería de pruebas diagnósticas sin prisas."
  },
  {
    q: "¿Tengo que venir con las lentillas puestas?",
    a: "Si vienes a graduarte o a revisar tu salud ocular general, lo idóneo es quitarse las lentillas blandas al menos 24 horas antes de la prueba para no alterar la topografía corneal natural. Si es para un control exclusivo de tus lentillas, puedes traerlas puestas."
  },
  {
    q: "¿Cada cuánto tiempo debo revisarme la vista?",
    a: "Por norma general, es recomendable una revisión completa cada año en niños y adultos mayores de 45 años, y de un año y medio a dos años en el resto de edades si no hay patología previa."
  },
  {
    q: "¿El examen visual clínico duele?",
    a: "Absolutamente no. Todas nuestras pruebas de gabinete (incluyendo la tonometría y la exploración de retina) son totalmente indoloras, no invasivas y seguras."
  }
];

export function ServicesView() {
  const [selectedSymptom, setSelectedSymptom] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#F9F9F7] text-[#1A1A1A] font-sans pb-24"
    >
      <main className="px-4 md:px-12 w-full max-w-6xl mx-auto pt-6">
        
        {/* Editorial Title Banner */}
        <div className="mb-14 border-b border-[#1A1A1A]/10 pb-8 flex flex-col items-center justify-center gap-4 text-center">
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold opacity-50 font-mono">
            Gabinete Técnico Optométrico Especializado
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tighter uppercase font-serif text-[#1A1A1A] leading-none">
            Soluciones <span className="italic font-light text-[#1A1A1A]/70">para tu</span> Salud Visual
          </h1>
          <p className="text-xs sm:text-sm tracking-wider opacity-60 max-w-[500px] mt-2 leading-relaxed font-light">
            Realizamos diagnósticos avanzados y tratamientos a medida que van mucho más allá de una simple agudeza visual. Tu bienestar ocular es nuestra prioridad.
          </p>
        </div>

        {/* 1. Clinical Services Shelf */}
        <section className="mb-20">
          <div className="border-b border-[#1A1A1A]/10 pb-3 mb-8 text-left">
            <span className="text-[9px] uppercase tracking-[0.2em] font-mono opacity-50 block">Servicios del Gabinete</span>
            <h2 className="text-xl sm:text-2xl font-light font-serif uppercase tracking-tight text-[#1A1A1A]">Alta Optometría Clínica</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {CLINICAL_SERVICES.map((serv) => (
              <div 
                key={serv.num} 
                className="flex flex-col justify-between border border-[#1A1A1A]/5 p-6 sm:p-8 rounded-2xl bg-white shadow-2xs hover:border-[#1A1A1A]/20 transition-all duration-300 text-left"
              >
                <div>
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-[10px] font-mono font-bold text-neutral-400">{serv.num} // CLÍNICA</span>
                    <span className="text-[8px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-neutral-50 border border-neutral-100 font-mono font-medium opacity-70">
                      Excelente
                    </span>
                  </div>
                  <h3 className="text-base sm:text-[17px] font-serif font-medium uppercase tracking-tight text-neutral-950 mb-3">{serv.title}</h3>
                  <p className="text-xs sm:text-sm text-[#1A1A1A]/70 font-light leading-relaxed mb-6">{serv.desc}</p>
                </div>
                <div className="border-t border-neutral-100 pt-4 flex items-center justify-between">
                  <span className="text-[9px] font-mono uppercase opacity-55">Objetivo Clínico:</span>
                  <span className="text-[10px] uppercase tracking-wide font-sans font-semibold text-neutral-900">{serv.action}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Interactive Symptoms Checkboard - A custom micro-feature for healthcare engagement */}
        <section className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-neutral-900 text-[#F9F9F7] p-6 sm:p-10 md:p-12 rounded-3xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full border border-white/5 pointer-events-none"></div>
          
          <div className="lg:col-span-5 text-left flex flex-col justify-between h-full">
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] opacity-50 font-mono text-emerald-400 font-bold block mb-3">Diagnóstico Preventivo Precoz</span>
              <h3 className="text-2xl sm:text-3xl font-light font-serif tracking-tight uppercase leading-tight text-white mb-4">
                ¿Te identificas <span className="italic font-light text-emerald-400 lowercase">con</span> alguno de estos síntomas?
              </h3>
              <p className="text-xs opacity-70 font-light leading-relaxed mb-6 sm:mb-8">
                El cansancio ocular, dolor de cabeza o visión fluctuante nunca son normales. Selecciona un síntoma de la lista para ver nuestra recomendación clínica inmediata.
              </p>
            </div>

            {/* recommendation overlay based on selected symptom */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 min-h-[110px] flex flex-col justify-between">
              {selectedSymptom !== null ? (
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-mono text-emerald-400 font-semibold">Consejo Profesional</span>
                  <p className="text-[11px] opacity-90 leading-relaxed font-light mt-1 text-white/95">
                    {selectedSymptom === 1 && "Es muy probable un desajuste acomodativo o exceso de convergencia por pantallas (SVI). Requiere revisión de alineación visual y un filtro protector."}
                    {selectedSymptom === 2 && "La visión borrosa puntual o permanente suele ligarse a astigmatismo o miopía oculta. Graduación exhaustiva recomendada."}
                    {selectedSymptom === 3 && "Retraso en el enfoque de lejos/cerca. Típico inicio de presbicia o disfunción de acomodación. Evaluamos tu flexibilidad visual."}
                    {selectedSymptom === 4 && "Entornar es el reflejo natural para generar estenopeico y enfocar. Esto provoca fuerte tensión en músculo ciliar y dolor orbitario."}
                    {selectedSymptom === 5 && "Clave: un 80% del aprendizaje es visual. Disfunciones funcionales binoculares se confunden con falta de concentración."}
                    {selectedSymptom === 6 && "Fotofobia excesiva. Podría revelar sequedad corneal o pupilas dilatadas por fatiga extrema. Recomendamos lentes con filtros específicos."}
                    {selectedSymptom === 7 && "El sistema visual se deteriora de forma imperceptible. Prevén patologías silenciosas como tonías elevadas antes de notar pérdida."}
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-center text-center h-full">
                  <p className="text-[10px] opacity-40 font-mono uppercase tracking-widest">Selecciona un síntoma para ver consejo</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-2 w-full text-left pt-2 lg:pt-0">
            {SYMPTOMS.map((symp, idx) => {
              const isActive = selectedSymptom === parseInt(symp.num);
              return (
                <button
                  key={symp.num}
                  type="button"
                  onClick={() => setSelectedSymptom(isActive ? null : parseInt(symp.num))}
                  className={`w-full text-left px-5 py-3.5 rounded-xl text-xs flex items-start gap-4 transition-all duration-300 border cursor-pointer ${
                    isActive 
                      ? 'bg-white text-neutral-950 border-white shadow-xs font-medium' 
                      : 'bg-white/5 border-white/15 hover:border-white/30 text-white/90'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] shrink-0 font-bold ${
                    isActive ? 'bg-neutral-900 text-white' : 'bg-white/10 text-white/80'
                  }`}>
                    {symp.num}
                  </span>
                  <span className="leading-relaxed font-light">{symp.text}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. Clinical Study Protocol Steps */}
        <section className="mb-20">
          <div className="border-b border-[#1A1A1A]/10 pb-3 mb-8 text-left">
            <span className="text-[9px] uppercase tracking-[0.2em] font-mono opacity-50 block">Cómo Cuidamos De Ti</span>
            <h2 className="text-xl sm:text-2xl font-light font-serif uppercase tracking-tight text-[#1A1A1A]">Protocolo De Examen Completo</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROTOCOLS.map((p) => (
              <div 
                key={p.step} 
                className="flex flex-col gap-4 border border-neutral-200/45 p-6 rounded-2xl bg-white hover:border-[#1A1A1A]/20 transition-all duration-300 text-left relative"
              >
                <span className="absolute top-5 right-6 font-serif italic text-4xl font-light opacity-10 text-[#1A1A1A]">{p.step}</span>
                <span className="text-[9px] font-mono font-bold text-neutral-400">PASO {p.step} // GABINETE</span>
                <div>
                  <h4 className="font-semibold uppercase tracking-wider text-xs text-neutral-900 mb-2">{p.title}</h4>
                  <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Resolved FAQ blocks */}
        <section className="mb-8 max-w-3xl mx-auto">
          <div className="border-b border-[#1A1A1A]/10 pb-3 mb-8 text-center sm:text-left">
            <span className="text-[9px] uppercase tracking-[0.2em] font-mono opacity-50 block">Resolvemos tus dudas</span>
            <h2 className="text-xl sm:text-2xl font-light font-serif uppercase tracking-tight text-[#1A1A1A]">Preguntas Frecuentes Clínicas</h2>
          </div>

          <div className="space-y-2 text-left">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className="border border-[#1A1A1A]/5 rounded-xl bg-white transition-all overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex justify-between items-center py-4 px-5 text-left text-xs sm:text-sm font-semibold uppercase tracking-tight text-neutral-900 cursor-pointer hover:bg-neutral-50"
                  >
                    <span>{faq.q}</span>
                    <span className="text-lg font-light leading-none text-neutral-400">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm font-light leading-relaxed text-neutral-600 border-t border-neutral-100">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

      </main>
    </motion.div>
  );
}
