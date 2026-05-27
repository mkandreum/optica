import { motion } from 'motion/react';

const VALUES = [
  {
    title: "Experiencia y Formación Continua",
    desc: "Con más de 25 años al frente de La Óptica de Antonio, nuestra pasión es la salud visual. Estamos en constante formación para ofrecerte los diagnósticos más precisos y los tratamientos más innovadores."
  },
  {
    title: "Tecnología de Vanguardia",
    desc: "Invertimos en la tecnología más avanzada del sector para realizar un estudio completo de tu sistema visual. Porque un diagnóstico preciso es el primer paso para una solución eficaz."
  },
  {
    title: "Atención Personalizada y sin Prisas",
    desc: "Dedicamos a cada paciente el tiempo que necesita. Escucharte es fundamental para entender tu problema y encontrar la mejor solución para tu caso particular. Aquí eres nuestro paciente."
  },
  {
    title: "Las Mejores Marcas y Garantías",
    desc: "Trabajamos exclusivamente con marcas líderes que garantizan la máxima calidad y durabilidad, tanto en lentes oftálmicas como en monturas. Tu satisfacción y tu salud visual son nuestra prioridad."
  }
];

export function AboutView() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen bg-[#F9F9F7] text-[#1A1A1A] pb-24 font-sans select-none text-left"
    >
      {/* Hero Header Section */}
      <section className="px-4 md:px-12 pt-10 pb-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">
        <div className="text-[9px] uppercase tracking-[0.3em] font-bold opacity-60 mb-5 border border-[#1A1A1A]/10 px-4 py-1.5 rounded-full select-none font-mono">
          Tu Óptica de Sanidad Visual y Estilo de Autor
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tighter uppercase leading-[1.12] max-w-3xl mb-4 font-serif text-[#1A1A1A]">
          Cuidamos tu visión con <span className="italic font-light text-[#1A1A1A]/70 lowercase">cercanía, confianza y experiencia</span>
        </h1>
        <p className="text-xs sm:text-sm opacity-70 max-w-xl leading-relaxed font-light mb-6 font-sans">
          Establecidos en Alcázar de San Juan desde hace más de 25 años. Combinamos la alta precisión tecnológica optométrica con firmas exclusivas independientes.
        </p>
      </section>

      <div className="w-full max-w-6xl mx-auto px-4 md:px-12">
        {/* Antonio Profile block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center border border-[#1A1A1A]/10 rounded-3xl p-6 sm:p-10 mb-16 bg-[#FAFAF8] shadow-[0_4px_30px_rgba(0,0,0,0.01)]">
          <div className="md:col-span-4 flex flex-col items-center text-center">
            {/* Antonio's real profile photo */}
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-2 border-[#1A1A1A]/15 overflow-hidden shadow-xs mb-5 relative group bg-[#F4F4F1] shrink-0 select-none">
              <img
                src="https://laopticadeantonio.es/wp-content/uploads/2025/11/antonio-garcia-sanchez-optico-optometrista.webp"
                alt="Antonio García Sánchez - Óptico-Optometrista"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale opacity-95 group-hover:grayscale-0 transition-all duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-[#1A1A1A]/5 group-hover:bg-transparent transition-all duration-300"></div>
            </div>
            <h2 className="text-xl sm:text-2xl tracking-tighter uppercase font-serif text-[#1A1A1A] font-light leading-none">
              Antonio García Sánchez
            </h2>
            <p className="text-[10px] md:text-[11px] uppercase tracking-widest text-[#1A1A1A]/60 mt-2 font-mono font-bold">
              Óptico-Optometrista
            </p>
            <div className="mt-4 inline-block px-4 py-1.5 rounded-full border border-[#1A1A1A]/10 text-[9px] uppercase tracking-widest font-semibold font-mono bg-white text-[#1A1A1A]/65 shadow-3xs select-all">
              Colegiado Nº 11748
            </div>
          </div>
          
          <div className="md:col-span-8 flex flex-col justify-center text-center md:text-left mt-4 md:mt-0">
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest opacity-40 mb-2 font-mono">Salud Ocular de Autor</span>
            <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-[#1A1A1A] uppercase mb-4 leading-tight font-serif">
              La tranquilidad <span className="italic font-light lowercase">de estar en las</span> mejores manos
            </h3>
            <p className="text-xs sm:text-sm md:text-base opacity-75 font-light leading-relaxed mb-6">
              Nos esforzamos diariamente en brindar un servicio clínico integral donde el principal foco eres tú. Analizamos a fondo tu sistema visual con los métodos de diagnóstico más avanzados del sector y te explicamos de forma llana lo que ocurre, resolviendo tus necesidades ópticas y estéticas sin intermediarios.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center md:text-left border-t border-[#1A1A1A]/5 pt-6">
              <div>
                <span className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1A1A1A]">25+</span>
                <p className="text-[9px] uppercase tracking-wider text-black/45 mt-1 font-mono">Años de experiencia</p>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1A1A1A]">100%</span>
                <p className="text-[9px] uppercase tracking-wider text-black/45 mt-1 font-mono">Tecnología Especializada</p>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1A1A1A]">11k+</span>
                <p className="text-[9px] uppercase tracking-wider text-black/45 mt-1 font-mono">Pacientes atendidos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Split layout: Values & Premium Boutique Image */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 space-y-5">
            <div className="text-center lg:text-left border-b border-[#1A1A1A]/10 pb-4">
              <span className="text-[9px] uppercase tracking-[0.25em] font-mono font-bold opacity-45">Garantía y Valores</span>
              <h2 className="text-xl sm:text-2xl uppercase tracking-tight font-serif italic mt-1 font-light text-[#1A1A1A]">Por Qué Elegirnos</h2>
            </div>
            <div className="relative h-[240px] sm:h-[300px] lg:h-[380px] rounded-3xl overflow-hidden border border-[#1A1A1A]/10 group shadow-xs">
              <img 
                src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80" 
                alt="Diseño boutique y elegancia óptica"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/85 via-[#1A1A1A]/20 to-transparent flex flex-col justify-end p-6 text-left">
                <span className="text-[9px] uppercase tracking-widest font-mono text-white/70 font-semibold mb-1">Espacio de Autor</span>
                <h4 className="text-sm sm:text-base font-serif text-white uppercase tracking-tight leading-tight">Diseño Independiente & Atención Personal</h4>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7 gallery-grid pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {VALUES.map((val, idx) => (
                <div key={idx} className="flex flex-col gap-3 p-5 sm:p-6 rounded-2xl border border-[#1A1A1A]/5 bg-white shadow-3xs text-left group hover:border-[#1A1A1A]/20 transition-all duration-300">
                  <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center font-serif italic text-xs shrink-0 select-none text-[#1A1A1A]/50 group-hover:bg-[#1A1A1A] group-hover:text-[#F9F9F7] transition-all duration-300">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold uppercase text-[10.5px] tracking-wider mb-2 text-[#1A1A1A]">{val.title}</h4>
                    <p className="text-xs text-[#1A1A1A]/65 leading-relaxed font-light">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Location & Schedule Banner */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border border-[#1A1A1A]/10 rounded-3xl p-6 sm:p-8 bg-[#1A1A1A] text-[#F9F9F7] mb-8">
          <div className="md:col-span-5 flex flex-col justify-between text-left">
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] opacity-50 font-mono text-white/60">Nuestra Ubicación</span>
              <h3 className="text-xl sm:text-2xl uppercase font-light tracking-tight mt-2 mb-4 font-serif">Alcázar de San Juan</h3>
              <p className="text-xs opacity-80 leading-relaxed font-light font-sans">
                Calle General Alcañiz, 11<br />
                13600 Alcázar de San Juan (Ciudad Real)
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-2">
              <a href="tel:926552690" className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/50 px-4 py-2.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all bg-white/5 hover:bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                926 55 26 90
              </a>
              <a href="https://wa.me/34606370960" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/50 px-4 py-2.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all bg-white/5 hover:bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                606 370 960
              </a>
            </div>
          </div>
          
          <div className="md:col-span-7 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8 text-left">
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] opacity-50 font-mono text-white/55">Horario Habitual de Consulta</span>
              <h3 className="text-lg uppercase font-light tracking-tight mt-2 mb-4 font-serif">Horario de Puertas Abiertas</h3>
              
              <div className="space-y-3 font-light text-xs font-sans">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="opacity-75">Lunes a Viernes</span>
                  <span className="font-semibold text-right text-white/95">09:30 a 13:30 h. / 17:00 a 20:30 h.</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="opacity-75">Horario Especial de Verano (Junio - Agosto)</span>
                  <span className="font-semibold text-right text-white/95">09:30 a 13:30 h. / 17:30 a 21:00 h.</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="opacity-75">Sábados</span>
                  <span className="font-semibold text-right text-white/95">10:00 a 13:30 h.</span>
                </div>
              </div>
            </div>
            <div className="mt-6 text-[10px] opacity-50 font-mono">
              * Para estudios específicos de terapia o baja visión, se ruega reservar con antelación para asegurar la disponibilidad del gabinete.
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
