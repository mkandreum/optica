import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewState } from '../types';

const ARTICLES = [
  {
    id: "art-1",
    date: "Abril 2026",
    category: "Escaparates",
    title: "Colección Face a Face 3.0",
    excerpt: "Arquitectura volumétrica francesa y patentes exclusivas en acetato orgánico.",
    body: "La firma francesa Face a Face vuelve a sorprendernos con su entrega 3.0. Inspirada en los movimientos artísticos del cubismo y el constructivismo, cada gafa es una auténtica escultura para vestir. Los artesanos pulen a mano los frentes creando escalones tridimensionales que capturan la luz de maneras asombrosas. En nuestro escaparate en Alcázar de San Juan puedes ver y probarte estas piezas exclusivas donde el confort en el apoyo nasal se une con la audacia de sus varillas translúcidas."
  },
  {
    id: "art-2",
    date: "Marzo 2026",
    category: "Noticias",
    title: "Avances en Control de Miopía ",
    excerpt: "Análisis y colaboraciones con la revista nacional OPTIMODA.",
    body: "Colaboramos con la revista OPTIMODA aportando datos clínicos de seguimiento en tratamientos infantiles. Los resultados de lentes de contacto de ortoqueratología y lentes blandas de desenfoque periférico corroboran un freno de hasta el 59% en la elongación del ojo miope. Nos enorgullece estar al frente de la vanguardia divulgativa en España."
  }
];

interface FooterProps {
  onNavigate: (view: ViewState) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [modalType, setModalType] = useState<string | null>(null);
  const [activeArticle, setActiveArticle] = useState<typeof ARTICLES[0] | null>(null);

  const openModal = (type: string) => setModalType(type);
  const closeModal = () => setModalType(null);

  return (
    <footer className="w-full bg-[#1A1A1A] text-[#F9F9F7] pt-12 pb-8 border-t border-white/5 select-none font-sans text-left">
      
      {/* 1. Slim Magazine Row */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 mb-10 pb-8 border-b border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <span className="text-[9px] uppercase tracking-[0.25em] opacity-50 font-mono text-emerald-400 font-bold block">Espacio Divulgativo</span>
            <h3 className="text-lg font-light tracking-tight uppercase text-white mt-1">El Blog / Magazine Clínico</h3>
          </div>
          <span className="text-[10px] uppercase tracking-wider opacity-40 font-mono hidden md:inline">Actualidad de Salud Ocular</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ARTICLES.map((art) => (
            <div 
              key={art.id} 
              onClick={() => setActiveArticle(art)}
              className="group cursor-pointer border border-white/10 p-4 rounded-xl hover:border-white/20 hover:bg-white/2 transition-all flex justify-between items-center"
            >
              <div className="pr-4 max-w-sm">
                <div className="flex gap-2 items-center text-[8px] uppercase tracking-wider opacity-40 mb-1 font-mono">
                  <span>{art.date}</span>
                  <span>•</span>
                  <span>{art.category}</span>
                </div>
                <h4 className="font-semibold text-xs group-hover:text-white group-hover:underline text-[#FAFAF8] uppercase tracking-tight">
                  {art.title}
                </h4>
                <p className="text-[11px] opacity-60 leading-tight font-light mt-1 truncate">
                  {art.excerpt}
                </p>
              </div>
              <span className="text-[11px] text-white/50 group-hover:text-white font-mono shrink-0 font-bold">
                Leer &rarr;
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Compact Structured Footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
        
        {/* Brand/Slogan column */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 cursor-pointer mb-4 text-left group" onClick={() => onNavigate('home')}>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center font-serif text-sm text-white group-hover:border-white/50 transition-colors">
                <span className="relative top-[-0.5px]">Ó</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white leading-none">La Óptica</span>
                <span className="text-[8px] uppercase tracking-[0.15em] font-serif italic text-white/80 mt-1 leading-none">de Antonio</span>
              </div>
            </div>
            <p className="text-[11px] opacity-55 font-light leading-relaxed max-w-xs">
              Desde 1999, cuidamos de tu salud visual con máxima precisión optométrica clínica e innovación independiente en Alcázar de San Juan.
            </p>
          </div>

          <div className="mt-6">
            <span className="text-[8px] uppercase tracking-widest opacity-40 font-mono block mb-1">Tfnos Directos Gabinete</span>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="opacity-40">Fijo:</span>
                <a href="tel:926552690" className="opacity-90 hover:opacity-100 hover:underline font-mono">926 55 26 90</a>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="opacity-40">WhatsApp:</span>
                <a href="https://wa.me/34606370960" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 hover:underline font-mono">606 370 960</a>
              </span>
            </div>
          </div>
        </div>

        {/* Reorganized Columns */}
        <div className="md:col-span-7 grid grid-cols-2 gap-4">
          {/* Column 1: Sections */}
          <div>
            <h4 className="text-[9px] uppercase tracking-[0.2em] font-bold border-b border-white/10 pb-1.5 mb-3 text-white">Nuestra Óptica</h4>
            <ul className="space-y-2 text-xs font-light text-[#F9F9F7]/70">
              <li><button onClick={() => onNavigate('home')} className="hover:text-white text-left cursor-pointer uppercase text-[9px] tracking-wide font-medium">0. Inicio</button></li>
              <li><button onClick={() => onNavigate('catalog')} className="hover:text-white text-left cursor-pointer uppercase text-[9px] tracking-wide font-medium">1. Catalogo Gafas</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-white text-left cursor-pointer uppercase text-[9px] tracking-wide font-medium">2. Gabinete Clinico</button></li>
              <li><button onClick={() => onNavigate('brands')} className="hover:text-white text-left cursor-pointer uppercase text-[9px] tracking-wide font-medium">3. Marcas Autorizadas</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-white text-left cursor-pointer uppercase text-[9px] tracking-wide font-medium">4. Quienes Somos</button></li>
              <li><button onClick={() => onNavigate('appointments')} className="hover:text-white text-left cursor-pointer uppercase text-[9px] tracking-wide font-bold text-emerald-400">5. Reservar Cita Online &rarr;</button></li>
            </ul>
          </div>

          {/* Column 2: Legal Info */}
          <div>
            <h4 className="text-[9px] uppercase tracking-[0.2em] font-bold border-b border-white/10 pb-1.5 mb-3 text-white">Garantías & Legal</h4>
            <ul className="space-y-2 text-xs font-light text-[#F9F9F7]/60">
              <li><button onClick={() => openModal('envio')} className="hover:text-white text-left cursor-pointer">Envíos y Devolución</button></li>
              <li><button onClick={() => openModal('terminos')} className="hover:text-white text-left cursor-pointer">Términos de Compra</button></li>
              <li><button onClick={() => openModal('aviso')} className="hover:text-white text-left cursor-pointer font-semibold text-white/90">Aviso Legal (SLP Info)</button></li>
              <li><button onClick={() => openModal('privacidad')} className="hover:text-white text-left cursor-pointer">Política de Privacidad</button></li>
              <li><button onClick={() => openModal('cookies')} className="hover:text-white text-left cursor-pointer">Cookies</button></li>
              <li><button onClick={() => openModal('veo')} className="hover:text-white text-left cursor-pointer font-medium text-emerald-400">Plan VEO Junta CLM</button></li>
            </ul>
          </div>
        </div>

      </div>

      {/* 3. Consolidated Minimal Funding Stripe */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 mb-8">
        <div className="border border-white/5 bg-white/[0.01] p-4 rounded-xl">
          <div className="flex flex-wrap items-center gap-2 mb-2 select-none">
            <span className="px-1.5 py-0.5 rounded bg-[#004494] text-white text-[8px] font-bold font-sans">
              ★ UNIÓN EUROPEA
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#E4002B] text-white text-[8px] font-bold font-sans">
              MINISTERIO DE HACIENDA
            </span>
            <span className="px-1.5 py-0.5 rounded bg-neutral-800 border border-white/10 text-white text-[8px] font-bold font-sans">
              PYME INNOVA 2024
            </span>
          </div>
          <p className="text-[9.5px] opacity-40 leading-normal text-left font-light font-sans text-white/80">
            <strong>LA ÓPTICA DE ANTONIO 1999, SLP</strong> ha sido beneficiaria del Fondo Europeo de Desarrollo Regional para promover la competitividad Pyme (Plan de Acción 2024), contando con el apoyo de la Cámara de Comercio de Ciudad Real. <strong>#EuropaSeSiente</strong>
          </p>
        </div>
      </div>

      {/* 4. Bottom Line */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 border-t border-white/10 pt-4 flex flex-col sm:flex-row justify-between items-center text-[9px] opacity-40 gap-3">
        <span>La Óptica de Antonio © 2026. Todos los derechos reservados. CIF B-13589423 • Colegiado 11748 CLM.</span>
        <span>Diseño de Autor para Alcázar de San Juan.</span>
      </div>

      {/* 5. Article Details Modal */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-neutral-950/80 flex items-center justify-center p-4 backdrop-blur-xs"
            onClick={() => setActiveArticle(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white text-[#1A1A1A] w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full border border-neutral-200 hover:border-black flex items-center justify-center text-neutral-500 hover:text-black transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="flex gap-2 items-center text-[9px] font-mono font-bold uppercase opacity-45 mb-3 select-none">
                <span>{activeArticle.date}</span>
                <span>//</span>
                <span>{activeArticle.category}</span>
              </div>

              <h2 className="text-lg sm:text-2xl font-semibold uppercase tracking-tight leading-tight mb-4 border-b border-neutral-100 pb-3 font-serif">
                {activeArticle.title}
              </h2>

              <p className="text-xs sm:text-sm opacity-90 leading-relaxed font-light text-neutral-600 mb-6">
                {activeArticle.body}
              </p>

              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/50 flex justify-between items-center text-xs select-none">
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-[9px] uppercase font-mono opacity-55">Canal Divulgativo</span>
                  <span className="font-semibold text-[#1A1A1A]">La Óptica de Antonio</span>
                </div>
                <button 
                  onClick={() => {
                    setActiveArticle(null);
                    onNavigate('appointments');
                  }}
                  className="bg-[#1A1A1A] text-white hover:bg-neutral-800 text-[10px] font-bold uppercase tracking-widest py-2 px-4 rounded-full transition-all cursor-pointer"
                >
                  Pedir Cita &rarr;
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Legal Info Modals */}
      <AnimatePresence>
        {modalType && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-neutral-950/80 flex items-center justify-center p-4 backdrop-blur-xs"
            onClick={closeModal}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white text-[#1A1A1A] w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative select-text"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full border border-neutral-200 hover:border-black flex items-center justify-center text-neutral-500 hover:text-black transition-colors cursor-pointer animate-none"
              >
                ✕
              </button>

              <h3 className="text-base font-bold uppercase tracking-tight mb-4 border-b border-neutral-100 pb-2 flex items-center gap-2 select-none">
                {modalType === 'envio' && "📬 Envíos y Devoluciones"}
                {modalType === 'terminos' && "📄 Términos y Condiciones"}
                {modalType === 'aviso' && "⚖️ Aviso Legal (SLP)"}
                {modalType === 'privacidad' && "🛡️ Política de Privacidad"}
                {modalType === 'cookies' && "🍪 Política de Cookies"}
                {modalType === 'veo' && "🧒 Plan VEO: Gafas Infantiles CLM"}
              </h3>

              <div className="text-xs sm:text-sm leading-relaxed text-neutral-600 space-y-3.5 font-light overflow-y-auto max-h-[55vh] pr-2 scrollbar-thin text-left">
                
                {modalType === 'envio' && (
                  <>
                    <p>En **La Óptica de Antonio** garantizamos envíos rápidos y embalajes de alta resistencia en toda España peninsular e Islas Baleares.</p>
                    <h5 className="font-semibold uppercase text-[10px] tracking-wider text-black mt-2">Plazos de Entrega</h5>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Gafas de Sol / Stock:</strong> Envío inmediato, tiempo de entrega 24 a 48 horas laborables gratuito.</li>
                      <li><strong>Gafas Graduadas personalizadas:</strong> De 3 a 5 días laborables según la complejidad del tallado.</li>
                    </ul>
                    <h5 className="font-semibold uppercase text-[10px] tracking-wider text-black mt-2">Devolución Gratuita</h5>
                    <p>Dispones de **14 días naturales** desde la recepción de tu pedido para solicitar una devolucion gratuita de monturas no personalizadas.</p>
                  </>
                )}

                {modalType === 'terminos' && (
                  <>
                    <p>Los presentes términos regulan la adquisición de monturas, lentes oftálmicas y accesorios en la boutique online de **La Óptica de Antonio 1999, SLP**.</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Garantía Oficial:</strong> 3 años de garantía nacional oficial contra defectos de fabricación.</li>
                      <li><strong>Graduaciones:</strong> El montaje final se realiza en nuestros laboratorios propios bajo supervisión de Antonio García Sánchez, Colegiado 11748.</li>
                      <li><strong>Precios:</strong> Todos los precios indicados incluyen el 10% de IVA de sanidad aplicable en España.</li>
                    </ul>
                  </>
                )}

                {modalType === 'aviso' && (
                  <>
                    <p>En cumplimiento de la Ley de Servicios de la Sociedad de la Información y de Comercio Electrónico:</p>
                    <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-100 font-mono text-[10px] space-y-1 select-all">
                      <div><strong>Razón Social:</strong> LA OPTICA DE ANTONIO 1999, SLP</div>
                      <div><strong>NIF:</strong> B-13589423</div>
                      <div><strong>Domicilio:</strong> Calle General Alcañiz 11, CP 13600 Alcázar de San Juan (Ciudad Real)</div>
                      <div><strong>Nº de Registro Sanitario:</strong> SLP Acreditada CLM</div>
                      <div><strong>Dirección Técnica:</strong> Antonio García Sánchez (Colegiado Nº 11748)</div>
                    </div>
                  </>
                )}

                {modalType === 'privacidad' && (
                  <>
                    <p>De conformidad con el Reglamento General de Protección de Datos (RGPD) informamos:</p>
                    <p>Los datos aportados en formularios de cita o compras serán custodiados por **LA OPTICA DE ANTONIO 1999, SLP** con el único fin de gestionar tu asistencia en la agenda clínica o el envío de tus productos ópticos, amparados bajo el secreto profesional sanitario.</p>
                  </>
                )}

                {modalType === 'cookies' && (
                  <>
                    <p>Este portal utiliza únicamente cookies técnicas estrictamente indispensables para mantener activa tu cesta de la compra y gestionar de forma óptima el rendimiento de la web.</p>
                    <p>No empleamos cookies analíticas invasivas ni rastreadores para publicidad exterior.</p>
                  </>
                )}

                {modalType === 'veo' && (
                  <>
                    <p>El **Plan VEO** de Castilla-La Mancha facilita subvenciones autonómicas gratuitas para la adquisición de gafas de graduado prescritas a menores de edad (hasta 18 años).</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Requiere tarjeta sanitaria en vigor expedida por Castilla-La Mancha (SESCAM).</li>
                      <li>Cubre monturas ópticas estándar de alta durabilidad y cristales de prescripción refractora homologada con filtros antirreflejantes.</li>
                    </ul>
                    <p className="mt-3">Puedes solicitar la tramitación oficial de la ayuda del SESCAM en nuestro centro. Reserva tu cita pulsando abajo:</p>
                    <button 
                      onClick={() => {
                        closeModal();
                        onNavigate('appointments');
                      }}
                      className="w-full mt-3 bg-neutral-950 text-white hover:bg-neutral-800 text-[10px] font-bold uppercase tracking-widest py-3 rounded-full transition-all text-center block cursor-pointer"
                    >
                      Solicitar Cita Plan VEO &rarr;
                    </button>
                  </>
                )}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </footer>
  );
}
