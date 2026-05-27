import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
}

export function CartOverlay({ isOpen, onClose, items, updateQuantity }: CartOverlayProps) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex justify-end"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#F9F9F7]/90 backdrop-blur-md cursor-pointer" onClick={onClose} />
          
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full md:w-[450px] h-full bg-[#1A1A1A] text-[#F9F9F7] flex flex-col shadow-2xl"
          >
            <div className="px-10 py-8 flex justify-between items-center border-b border-[#F9F9F7]/10">
              <h2 className="text-xl font-normal tracking-tight uppercase">Tu Compra</h2>
              <button onClick={onClose} className="text-[10px] uppercase tracking-[0.2em] font-semibold opacity-60 hover:opacity-100 transition-opacity">
                Cerrar [X]
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-10 py-8 flex flex-col gap-8">
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 opacity-50">
                  <div className="w-12 h-12 border border-[#F9F9F7]/20 rounded-full flex items-center justify-center">0</div>
                  <p className="text-[10px] uppercase tracking-[0.2em]">El carrito está vacío</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.product.id} className="flex gap-6 items-center">
                    <div className="w-20 h-20 bg-[#F9F9F7] rounded-xl flex items-center justify-center shrink-0 border border-[#1A1A1A]">
                       {/* Abstract representation of the glasses since we don't render canvas here for perf */}
                       <div className="w-10 h-[2px] bg-[#1A1A1A] relative">
                         <div className="absolute w-4 h-4 rounded-full border-[1.5px] border-[#1A1A1A] -top-[7px] -left-2" style={{ borderColor: item.product.color }}></div>
                         <div className="absolute w-4 h-4 rounded-full border-[1.5px] border-[#1A1A1A] -top-[7px] -right-2" style={{ borderColor: item.product.color }}></div>
                       </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col gap-2">
                       <h3 className="uppercase tracking-tight text-sm">{item.product.name}</h3>
                       <span className="font-light tracking-tighter">€{item.product.price.toFixed(2)}</span>
                       
                       <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-3 border border-[#F9F9F7]/20 rounded-full px-3 py-1">
                             <button onClick={() => updateQuantity(item.product.id, -1)} className="opacity-50 hover:opacity-100">-</button>
                             <span className="text-[10px] w-3 text-center">{item.quantity}</span>
                             <button onClick={() => updateQuantity(item.product.id, 1)} className="opacity-50 hover:opacity-100">+</button>
                          </div>
                          <button onClick={() => updateQuantity(item.product.id, -item.quantity)} className="text-[9px] uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-red-400 transition-colors">
                            Eliminar
                          </button>
                       </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="px-10 py-8 bg-[#151515] border-t border-[#F9F9F7]/10 flex flex-col gap-6">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Total Estimado</span>
                  <span className="text-3xl font-light tracking-tighter">€{total.toFixed(2)}</span>
                </div>
                <button className="w-full py-4 bg-[#F9F9F7] text-[#1A1A1A] uppercase tracking-[0.2em] text-[10px] font-bold rounded-full hover:bg-white transition-colors">
                  Finalizar Compra
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
