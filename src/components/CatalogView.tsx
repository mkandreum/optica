import { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { motion } from 'motion/react';

interface LazyProductImageProps {
  src: string;
  alt: string;
}

function LazyProductImage({ src, alt }: LazyProductImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '250px', // Preload image 250px before entering viewport
        threshold: 0.01
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center relative overflow-hidden bg-transparent rounded-3xl">
      {/* Loading Spinner - absolute position fades/disappears elegantly */}
      {!isReady && (
        <div className="absolute inset-x-0 inset-y-0 flex items-center justify-center pointer-events-none select-none z-0">
          <div className="w-6 h-6 rounded-full border border-neutral-300 border-t-neutral-800 animate-spin opacity-20"></div>
        </div>
      )}

      {inView ? (
        <motion.img 
          src={src}
          alt={alt}
          onLoad={() => setIsReady(true)}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isReady ? 1 : 0, scale: isReady ? 1 : 0.95 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full object-contain pointer-events-none z-10 transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      ) : null}
    </div>
  );
}

interface CatalogViewProps {
  products: Product[];
  onSelect: (p: Product) => void;
  onToggleCart: () => void;
  cartCount: number;
}

export function CatalogView({ products, onSelect, onToggleCart, cartCount }: CatalogViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'graduado' | 'sol'>('all');

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="min-h-screen flex flex-col bg-[#F9F9F7] text-[#1A1A1A] select-none"
    >
      <main className="flex-1 px-4 md:px-12 pb-20 pt-4 sm:pt-6">
        
        {/* Title and Filter Bar */}
        <div className="mb-6 sm:mb-10 border-b border-[#1A1A1A]/10 pb-5 sm:pb-8 flex flex-col items-center justify-center gap-6 text-center">
          <div className="max-w-xl flex flex-col items-center text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tighter uppercase font-serif leading-none text-[#1A1A1A]">
              Colección <span className="italic font-light text-[#1A1A1A]/70 lowercase font-serif">de</span> Autor
            </h2>
            <p className="text-[11px] sm:text-xs tracking-wider opacity-60 max-w-[400px] mt-3.5 leading-relaxed font-sans font-light">
              Diseño boutique independiente y lentes graduadas de máxima precisión clínica. Cada montura representa la vanguardia de la óptica de autor.
            </p>
          </div>

          {/* Section Filters */}
          <div className="flex flex-wrap justify-center gap-1 bg-transparent sm:bg-neutral-100 p-0 sm:p-1.5 rounded-none sm:rounded-full border-0 sm:border border-neutral-200/50 mt-1">
            {[
              { id: 'all', label: 'Todas las Gafas' },
              { id: 'graduado', label: 'Gafas de Graduado' },
              { id: 'sol', label: 'Gafas de Sol' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4 sm:px-[18px] md:px-7 text-center justify-center flex py-1.5 sm:py-2 rounded-full text-[9px] sm:text-[11px] md:text-xs tracking-wider uppercase font-semibold transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#1A1A1A] text-[#F9F9F7] shadow-xs font-bold border border-[#1A1A1A]'
                    : 'bg-white sm:bg-transparent border border-neutral-200/80 sm:border-transparent text-[#1A1A1A]/55 hover:text-[#1A1A1A] hover:bg-neutral-200/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Items Shelf - Responsive Grid with 3 columns on computer/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 sm:gap-y-16 max-w-6xl mx-auto">
          {filteredProducts.map((product) => {
            return (
              <motion.div 
                key={product.id}
                onClick={() => onSelect(product)}
                className="group cursor-pointer flex flex-col border-b border-[#1A1A1A]/10 pb-8 hover:border-[#1A1A1A]/30 transition-all duration-300"
              >
                {/* Premium Real-Image Container */}
                <div className="w-full h-64 sm:h-60 relative flex items-center justify-center z-10 transform group-hover:-translate-y-1 transition-transform duration-500 ease-out bg-transparent overflow-hidden p-4">
                  <LazyProductImage src={product.image} alt={product.name} />
                  
                  {/* Subtle hover effect helper */}
                  <span className="absolute bottom-3 right-4 text-[9px] uppercase tracking-widest font-mono opacity-0 group-hover:opacity-45 transition-opacity duration-300 pointer-events-none">
                    Ver Detalles &rarr;
                  </span>
                </div>
                
                {/* Info Bar with exclusive luxury layout - Price sits below the Title on all viewports, aligned gracefully */}
                <div className="mt-4 w-full flex flex-col items-center sm:items-start justify-center sm:justify-start text-center sm:text-left px-1 sm:px-3 gap-0.5">
                  <h3 className="font-serif font-light text-[15px] sm:text-base md:text-[17px] uppercase tracking-[0.12em] text-[#1A1A1A]">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-serif italic font-light text-sm sm:text-[15px] md:text-base text-[#1A1A1A]/80 tracking-wide">
                      {product.price.toFixed(2)}€
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.15em] opacity-35 font-mono hidden sm:inline-block">
                      • Colección de Autor
                    </span>
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.15em] opacity-35 mt-1 block sm:hidden">
                    Colección de Autor • Ver detalles
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </motion.div>
  );
}
