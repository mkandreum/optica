import { useEffect, useState, useRef } from 'react';
import { Product } from '../types';
import { motion } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight, Sparkles, ShoppingBag } from 'lucide-react';

function LazyProductDetailImage({ src, alt }: { src: string; alt: string }) {
  const [isReady, setIsReady] = useState(false);
  const prevSrcRef = useRef(src);

  // Reset ready transition state on source change (next/prev switching)
  if (prevSrcRef.current !== src) {
    isReady && setIsReady(false);
    prevSrcRef.current = src;
  }

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-transparent rounded-2xl">
      {!isReady && (
        <div className="absolute inset-x-0 inset-y-0 flex items-center justify-center pointer-events-none select-none z-0">
          <div className="w-8 h-8 rounded-full border border-neutral-200 border-t-neutral-800 animate-spin opacity-30"></div>
        </div>
      )}

      <motion.img 
        src={src}
        alt={alt}
        key={src}
        onLoad={() => setIsReady(true)}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: isReady ? 1 : 0, scale: isReady ? 1 : 0.96 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-full max-h-full object-contain pointer-events-none z-10 select-none"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

interface ProductViewProps {
  product: Product;
  onBack: () => void;
  onTryOn: () => void;
  onAddToCart: () => void;
  onToggleCart: () => void;
  cartCount: number;
  onNext: () => void;
  onPrev: () => void;
}

export function ProductView({ product, onBack, onTryOn, onAddToCart, onToggleCart, cartCount, onNext, onPrev }: ProductViewProps) {
  useEffect(() => {
    // Force standard scroll-to-top on route load
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [product.id]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-12 pt-6 pb-20 select-none text-[#1A1A1A] bg-[#F9F9F7]"
    >
      {/* Detail View Header / Back Navigation */}
      <div className="w-full flex justify-between items-center mb-3 sm:mb-5 pt-1">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] sm:text-[11.5px] uppercase tracking-[0.15em] font-medium text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-all cursor-pointer group"
        >
          <ArrowLeft size={12} className="transform group-hover:-translate-x-0.5 transition-transform" />
          <span>Volver al Catálogo</span>
        </button>
      </div>

      {/* Main product side-by-side or stacked responsive grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Side: Product Image Viewport */}
        <div className="lg:col-span-7 flex flex-col gap-4 w-full">
          <div className="relative w-full h-[280px] sm:h-[360px] md:h-[450px] bg-white rounded-3xl border border-[#1A1A1A]/5 overflow-hidden group flex items-center justify-center p-6 shadow-2xs">
            
            {/* Real Product Image with Load Animation */}
            <div className="absolute inset-0 z-10 w-full h-full p-6 sm:p-10 flex items-center justify-center">
              <LazyProductDetailImage src={product.image} alt={product.name} />
            </div>
          </div>

          {/* Navigation Controls placed elegantly under the 3D viewer (below the "360 degrees available" cue) */}
          <div className="flex justify-center items-center gap-5 mt-1">
            <button 
              onClick={onPrev} 
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-[#1A1A1A]/10 hover:border-[#1A1A1A]/25 text-[#1A1A1A] hover:bg-neutral-50 shadow-3xs cursor-pointer transition-all"
              title="Anterior"
            >
              <ChevronLeft size={15} strokeWidth={1.5} />
            </button>
            <button 
              onClick={onNext} 
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-[#1A1A1A]/10 hover:border-[#1A1A1A]/25 text-[#1A1A1A] hover:bg-neutral-50 shadow-3xs cursor-pointer transition-all"
              title="Siguiente"
            >
              <ChevronRight size={15} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Right Side: Product Details & Purchase Controls */}
        <div className="lg:col-span-5 flex flex-col text-left space-y-6 sm:space-y-8">
          <div className="space-y-3">
            <span className="text-[9px] uppercase tracking-[0.25em] font-mono font-bold text-neutral-400 block">
              Colección Boutique • {product.category === 'sol' ? 'Gafas de Sol' : 'Gafas de Graduado'}
            </span>
            <h1 className="text-3xl sm:text-4xl font-light tracking-tighter uppercase font-serif text-[#1A1A1A] leading-tight">
              {product.name}
            </h1>
            <div className="text-2xl sm:text-3xl font-light text-[#1A1A1A] font-sans tracking-tight">
              {product.price.toFixed(2)}€
            </div>
          </div>

          <div className="border-t border-b border-[#1A1A1A]/8 py-5 space-y-2.5">
            <span className="text-[10px] uppercase font-bold tracking-widest opacity-50 block font-mono">Presentación</span>
            <p className="text-xs sm:text-sm text-[#1A1A1A]/75 font-light leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Color Selection Aesthetic Indicator */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-widest opacity-50 block font-mono">Características de Diseño</span>
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div 
                  className="w-5 h-5 rounded-full border border-[#1A1A1A]/20 shadow-xs flex items-center justify-center p-0.5"
                  title="Color seleccionado"
                >
                  <div className="w-full h-full rounded-full" style={{ backgroundColor: product.color }}></div>
                </div>
                <div className="w-5 h-5 rounded-full bg-neutral-200/50 border border-transparent cursor-pointer"></div>
                <div className="w-5 h-5 rounded-full bg-stone-300 border border-transparent cursor-pointer"></div>
              </div>
              <span className="text-xs tracking-wide text-[#1A1A1A]/60 font-sans">
                Edición Limitada en Acetato Italiano
              </span>
            </div>
          </div>

          {/* Action button triggers */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <button 
              onClick={onTryOn} 
              className="flex-1 px-5 py-3.5 bg-[#1A1A1A] text-[#F9F9F7] rounded-xl text-[11px] uppercase tracking-widest font-bold hover:bg-[#1A1A1A]/90 hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm text-center"
            >
              <Sparkles size={13} className="opacity-90" />
              Prueba Virtual AR
            </button>
            <button 
              onClick={onAddToCart} 
              className="flex-1 px-5 py-3.5 border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F9F9F7] rounded-xl text-[11px] uppercase tracking-widest font-bold hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2 text-center"
            >
              <ShoppingBag size={13} className="opacity-90" />
              Añadir al Carrito
            </button>
          </div>

          {/* Certifications and guarantees */}
          <div className="grid grid-cols-2 gap-4 border-t border-[#1A1A1A]/8 pt-6 select-none font-sans">
            <div>
              <span className="text-[9px] uppercase font-mono tracking-wider opacity-40">Salud Garantizada</span>
              <p className="text-[11px] font-bold text-[#1A1A1A]/85 mt-0.5 leading-none">Estudio Clínico Completo</p>
            </div>
            <div>
              <span className="text-[9px] uppercase font-mono tracking-wider opacity-40">Lentes de Autor</span>
              <p className="text-[11px] font-bold text-[#1A1A1A]/85 mt-0.5 leading-none">Graduación Certificada</p>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
