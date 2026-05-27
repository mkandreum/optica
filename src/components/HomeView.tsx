import { motion } from 'motion/react';
import { Product, ViewState } from '../types';

interface HomeViewProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onNavigate: (view: ViewState) => void;
}

export function HomeView({ products, onSelectProduct, onNavigate }: HomeViewProps) {
  // Highlight some premium models for the collage
  const featuredProducts = products.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen bg-[#F9F9F7] text-[#1A1A1A] font-sans pb-24 select-none text-left"
    >
      {/* 1. Epic Hero / Editorial Entry Banner */}
      <section className="relative overflow-hidden border-b border-[#1A1A1A]/10 bg-white">
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a05_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <div className="max-w-6xl mx-auto px-4 md:px-12 pt-16 pb-20 md:pt-24 md:pb-28 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-6">
            <span className="inline-block text-[10px] uppercase tracking-[0.3em] font-extrabold text-neutral-500 bg-neutral-100 border border-neutral-200/50 px-4 py-1.5 rounded-full font-mono">
              Fundada en 1999 • Alcázar de San Juan
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tighter uppercase leading-[1.08] font-serif text-[#1A1A1A]">
              La precisión de un <span className="italic block mt-1 font-light text-[#1A1A1A]/70">gabinete clínico</span> con estilo de autor.
            </h1>
            <p className="text-xs sm:text-sm text-[#1A1A1A]/70 font-light leading-relaxed max-w-lg">
              Bajo la dirección técnica de <strong>Antonio García Sánchez</strong>, Colegiado Nº 11748. Cuidamos de tu salud visual con tecnología de última generación y te vestimos con las firmas ópticas independientes más prestigiosas del mundo.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onNavigate('catalog')}
                className="bg-[#1A1A1A] hover:bg-neutral-800 text-[#F9F9F7] font-semibold uppercase text-[10px] sm:text-xs tracking-widest py-4 px-8 rounded-full transition-all duration-300 shadow-sm cursor-pointer"
              >
                Explorar Catálogo &rarr;
              </button>
              <button
                onClick={() => onNavigate('appointments')}
                className="bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-900 font-semibold uppercase text-[10px] sm:text-xs tracking-widest py-4 px-8 rounded-full transition-all duration-300 cursor-pointer"
              >
                Pedir Cita Online
              </button>
            </div>
          </div>

          {/* Right Side Image Composition (Overlapping Editorial) */}
          <div className="md:col-span-5 relative h-72 sm:h-96 md:h-[420px]">
            <div className="absolute top-0 right-4 w-[75%] h-[85%] rounded-3xl overflow-hidden border border-neutral-200 shadow-lg z-10">
              <img
                src="https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=600&q=80"
                alt="Boutique Óptica Premium"
                className="w-full h-full object-cover grayscale brightness-95"
              />
            </div>
            <div className="absolute bottom-0 left-4 w-[60%] h-[60%] rounded-3xl overflow-hidden border-4 border-white shadow-2xl z-20">
              <img
                src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=400&q=80"
                alt="Detalle Gafas Exclusivas"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. curated collage section: "Nuestras Monturas Destacadas" */}
      <section className="max-w-6xl mx-auto px-4 md:px-12 py-16 sm:py-24">
        <div className="border-b border-[#1A1A1A]/10 pb-5 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-emerald-600 font-bold block mb-1">
              Selección Exclusiva de Temporada
            </span>
            <h2 className="text-2xl sm:text-3xl font-light font-serif uppercase tracking-tight text-[#1A1A1A]">
              Colección <span className="italic text-neutral-500">Boutique</span> en Venta
            </h2>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hover:underline cursor-pointer"
          >
            Ver catálogo completo <span className="group-hover:translate-x-1.5 transition-transform font-mono font-bold">&rarr;</span>
          </button>
        </div>

        {/* Mosaic/Collage Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {featuredProducts.map((prod) => (
            <div
              key={prod.id}
              onClick={() => onSelectProduct(prod)}
              className="group bg-transparent border-0 cursor-pointer flex flex-col justify-between text-center select-none"
            >
              <div className="w-full relative flex flex-col items-center">
                {/* Photo container (clean, no container frame/box background, just the photo directly) */}
                <div className="aspect-[16/10] w-full flex items-center justify-center relative py-4">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full max-h-[130px] object-contain mix-blend-multiply group-hover:scale-104 transition-transform duration-500"
                  />
                </div>
                
                {/* Elegant product details placed exactly centered below photo */}
                <div className="mt-3 flex flex-col items-center w-full px-2">
                  <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-widest text-[#1A1A1A] font-sans">
                    {prod.name}
                  </h3>
                  
                  <p className="text-[11px] text-neutral-500 font-light leading-relaxed max-w-[240px] mt-1.5 text-center line-clamp-2 min-h-[32px]">
                    {prod.description}
                  </p>

                  {/* Elegant Price typography */}
                  <div className="mt-2.5">
                    <span className="text-sm font-serif italic font-medium text-[#1A1A1A]/90">
                      {prod.price} €
                    </span>
                  </div>
                </div>
              </div>

              {/* View details button styled in cool modern aesthetic */}
              <div className="mt-4 w-full px-2 flex justify-center">
                <span className="inline-block text-[9.5px] uppercase font-bold tracking-[0.25em] text-[#1A1A1A]/85 border-b border-[#1A1A1A]/10 group-hover:border-[#1A1A1A]/50 pb-0.5 group-hover:text-emerald-700 transition-all font-sans">
                  CONOCER DETALLES &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Collage: Gabinete Clínico and Services */}
      <section className="bg-neutral-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 md:px-12 relative z-10">
          <div className="border-b border-white/10 pb-5 mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] font-mono text-emerald-400 font-bold block mb-1">
                Gabinete Optométrico de Alta Gama
              </span>
              <h2 className="text-2xl sm:text-3xl font-light font-serif uppercase tracking-tight text-[#F9F9F7]">
                Gabinete <span className="italic text-emerald-400 font-light">Especializado</span>
              </h2>
            </div>
            <button
              onClick={() => onNavigate('services')}
              className="text-xs font-bold uppercase tracking-wider text-white hover:text-emerald-300 hover:underline cursor-pointer"
            >
              Ver todos los servicios &rarr;
            </button>
          </div>

          {/* Grid Layout containing large highlights and list tiles */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Highlighted core feature box */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full border border-white/5" />
              <div>
                <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-widest block mb-1">Director Técnico</span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#FAFAF8] uppercase tracking-tight mb-2">Antonio García Sánchez</h3>
                <span className="text-[9.5px] font-mono uppercase bg-white/10 text-white/95 px-3 py-1 rounded-full font-semibold mb-6 inline-block">Colegiado 11748 CLM</span>
                <p className="text-xs opacity-75 leading-relaxed font-light font-sans">
                  "En nuestro gabinete óptico en Alcázar de San Juan, nos desmarcamos del modelo de óptica comercial estandarizada. Dedicamos a cada paciente el tiempo de gabinete minucioso necesario (30 a 40 minutos), diagnosticando alteraciones silenciosas para recuperar un sistema de enfoque binocular con un confort absoluto."
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onNavigate('appointments')}
                  className="bg-emerald-500 hover:bg-emerald-600 text-neutral-950 text-center font-bold uppercase text-[10px] tracking-widest py-3 px-5 rounded-full transition-all cursor-pointer shadow-sm flex-1"
                >
                  Agendar Cita Directa
                </button>
                <button
                  onClick={() => onNavigate('about')}
                  className="border border-white/20 hover:border-white/50 text-white text-center font-bold uppercase text-[10px] tracking-widest py-3 px-5 rounded-full transition-all cursor-pointer flex-1"
                >
                  Nuestra Óptica
                </button>
              </div>
            </div>

            {/* Micro bento items list of clinic specialties */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  id: "01",
                  title: "Control de Miopía Infantil",
                  desc: "Lentes de contacto ortoqueratológicas y tratamientos de desenfoque respaldados para frenar la elongación.",
                  view: "services"
                },
                {
                  id: "02",
                  title: "Terapia y Neuro-Entrenamiento",
                  desc: "Programas específicos adaptados de manera manual para mejorar la binocularidad, rendimiento escolar y fatiga.",
                  view: "services"
                },
                {
                  id: "03",
                  title: "Plan VEO Castilla-La Mancha",
                  desc: "Gafas de prescripción infantil autonómicas gratuitas tramitadas en nuestro centro oficial acreditado.",
                  view: "appointments"
                },
                {
                  id: "04",
                  title: "Contactología Avanzada",
                  desc: "Estudio y adaptaciones complejas esclerales y de control miópico para córneas irregulares o sequedad severa.",
                  view: "services"
                }
              ].map((item) => (
                <div
                  key={item.id}
                  className="border border-white/10 bg-white/[0.02] p-5 rounded-2xl flex flex-col justify-between hover:bg-white/[0.05] hover:border-white/20 transition-all text-left"
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-bold font-mono text-[#FAFAF8]/30">GABINETE // {item.id}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                    <h4 className="font-semibold text-xs sm:text-[13px] uppercase tracking-wider text-[#F9F9F7] mb-2">{item.title}</h4>
                    <p className="text-[11px] opacity-60 leading-relaxed font-light font-sans">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (item.view === 'appointments') {
                        onNavigate('appointments');
                      } else {
                        onNavigate('services');
                      }
                    }}
                    className="mt-4 text-[10px] font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors text-left flex items-center gap-1.5"
                  >
                    Saber Más &rarr;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Brand Spotlight Directory Section */}
      <section className="bg-[#FAFAF8] border-b border-[#1A1A1A]/5 py-16 sm:py-20 text-center select-none">
        <div className="max-w-3xl mx-auto px-4 space-y-5">
          <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-neutral-400 font-bold block">
            Distribución de Firmas de Autor
          </span>
          <h2 className="text-2xl sm:text-3xl font-light font-serif uppercase tracking-tight text-[#1A1A1A]">
            La Óptica como <span className="italic block mt-1 font-light text-neutral-500">manifestación artística</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed max-w-xl mx-auto font-sans">
            No vendemos logotipos ni reclamos de producción masiva. Trabajamos exclusivamente con creadores independientes franceses, italianos, alemanes y japoneses. Anne & Valentin, Caroline Abram, Face à Face, Lesca, entre otros.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {["Anne et Valentin", "Caroline Abram", "Face â Face", "Lesca", "Oliver Peoples", "Res-Rei", "Vuarnet", "Kelinse"].map(b => (
              <span
                key={b}
                className="px-3 py-1.5 border border-neutral-200 bg-white shadow-3xs rounded-xl font-sans text-[10px] sm:text-[11px] font-semibold text-neutral-800 tracking-wider"
              >
                {b}
              </span>
            ))}
          </div>
          <div className="pt-4">
            <button
              onClick={() => onNavigate('brands')}
              className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold uppercase text-[10px] tracking-widest py-3 px-6 rounded-full transition-all cursor-pointer"
            >
              Ver Todas las Firmas (Directory)
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
