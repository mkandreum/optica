import { motion } from 'motion/react';

const BRANDS = [
  "Alium", "Anne et Valentin", "Bollé", "Brill Pharma", "Caroline Abram", "Disop", "Eschenbach", 
  "Eyepetizer", "Face â Face", "Flama", "Flippan'Look", "Julbo", "Kelinse", "Konus", "Lesca", 
  "LÖKI EYEWEAR", "Louis Belgium", "Minima", "Möller-Therm", "Nano Vista", "Nifties", "Okki", 
  "Oliver Peoples", "Polo Ralph Lauren", "Prodesign", "Ray Ban", "Res-Rei", "Ross & Brown", 
  "Schweizer", "Seeoo", "Sheets Eyewear", "Talla Eyewear", "Techno Line", "Tête â lunettes", 
  "Tiedra", "VerSport", "Vuarnet", "Woow", "X-Sun"
];

export function BrandsView() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen flex flex-col bg-[#F9F9F7] text-[#1A1A1A] select-none"
    >
      <main className="flex-1 px-4 md:px-12 pb-24 w-full max-w-6xl mx-auto pt-6">
        
        {/* Header Block */}
        <div className="mb-12 border-b border-[#1A1A1A]/10 pb-8 flex flex-col items-center justify-center gap-4 text-center">
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold opacity-50 font-mono">
            Diseño Independiente Global / Premium Boutique
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tighter uppercase font-serif text-[#1A1A1A]">
            Nuestras <span className="italic font-light text-[#1A1A1A]/70">Firmas y Marcas</span>
          </h1>
          <p className="text-xs tracking-wider opacity-60 max-w-[460px] leading-relaxed font-sans font-light">
            Seleccionamos minuciosamente marcas de todo el mundo que representan la excelencia de la óptica alternativa: materiales orgánicos, titanio japonés, acetatos pulidos a mano y patentes exclusivas.
          </p>
        </div>

        {/* Feature Brand Highlight Banner */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-white border border-[#1A1A1A]/5 p-6 sm:p-8 rounded-3xl mb-12 shadow-2xs">
          <div className="md:col-span-8 text-left p-1">
            <span className="text-[9px] font-mono font-bold text-emerald-600 uppercase tracking-widest mb-1.5 block">Distribuidor Oficial de Autor</span>
            <h3 className="text-xl sm:text-2xl font-light font-serif text-[#1A1A1A] uppercase tracking-tight mb-3">Estética Sin Concesiones</h3>
            <p className="text-xs sm:text-sm font-light leading-relaxed text-[#1A1A1A]/75">
              Creemos en el valor de las piezas producidas por artesanos y creadores apasionados. Por eso trabajamos en exclusiva con talleres independientes franceses, italianos, alemanes y japoneses. No vendemos logotipos comerciales de masas; ofrecemos monturas con identidad, estructura arquitectónica y durabilidad excepcional.
            </p>
          </div>
          <div className="md:col-span-4 h-44 w-full rounded-2xl overflow-hidden border border-neutral-200/50 shadow-3xs relative">
            <img 
              src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=500&q=80" 
              alt="Marcas Internacionales de Autor"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale contrast-115 hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-[#1A1A1A]/5"></div>
          </div>
        </div>

        {/* Organized Alphabetical Directory of Brands */}
        <div className="space-y-12 text-left">
          {(() => {
            const groups: { [key: string]: string[] } = {};
            BRANDS.forEach(brand => {
              const firstLetter = brand.charAt(0).toUpperCase();
              if (!groups[firstLetter]) {
                groups[firstLetter] = [];
              }
              groups[firstLetter].push(brand);
            });
            
            return Object.keys(groups).sort().map(letter => (
              <div key={letter} className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 border-b border-[#1A1A1A]/10 pb-8">
                <div className="md:col-span-2 flex items-baseline gap-2 mb-2 md:mb-0">
                  <span className="text-3xl font-light font-serif text-[#1A1A1A]/40 leading-none">{letter}</span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[#1A1A1A]/15 to-transparent hidden md:block"></div>
                </div>
                <div className="md:col-span-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {groups[letter].sort().map(brand => (
                    <div
                      key={brand}
                      className="px-4 py-3 border border-neutral-200/50 bg-white rounded-xl text-left flex items-center gap-2.5 font-sans font-medium text-[11px] sm:text-xs text-[#1A1A1A] hover:border-[#1A1A1A]/20 hover:shadow-2xs transition-all duration-300 cursor-default select-all"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]/25 shrink-0"></span>
                      <span className="tracking-wide">{brand}</span>
                    </div>
                  ))}
                </div>
              </div>
            ));
          })()}
        </div>

      </main>
    </motion.div>
  );
}
