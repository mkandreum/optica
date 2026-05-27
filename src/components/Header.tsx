import { ViewState } from '../types';

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onToggleCart: () => void;
  cartCount: number;
}

const NAV_ITEMS: { id: ViewState; label: string }[] = [
  { id: 'home', label: 'Inicio' },
  { id: 'catalog', label: 'Tienda' },
  { id: 'services', label: 'Servicios' },
  { id: 'brands', label: 'Marcas' },
  { id: 'about', label: 'Nuestra Óptica' },
  { id: 'appointments', label: 'Pedir Cita' },
];

export function Header({ currentView, onNavigate, onToggleCart, cartCount }: HeaderProps) {
  if (currentView === 'ar') return null;

  return (
    <header className="w-full bg-[#F9F9F7] text-[#1A1A1A] border-b border-[#1A1A1A]/5 sticky top-0 z-50 transition-all select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 pt-4 pb-3 sm:py-5 flex flex-col items-center gap-5 sm:gap-5">
        
        {/* Top bar with Back button, Logo and Cart */}
        <div className="w-full grid grid-cols-3 items-center min-h-[110px] sm:min-h-[135px] md:min-h-[160px]">
          
          {/* Left Slot: Back button */}
          <div className="flex items-center justify-start z-10">
            {currentView === 'detail' ? (
              <button 
                onClick={() => onNavigate('catalog')}
                className="group flex items-center gap-2 h-10 px-3 rounded-full border border-[#1A1A1A]/10 text-[#1A1A1A]/80 hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-all cursor-pointer text-xs uppercase tracking-wider font-semibold bg-white/50 backdrop-blur-xs"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:-translate-x-0.5 transition-transform"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                <span className="hidden sm:inline font-sans">Volver</span>
              </button>
            ) : (
              <div className="w-10 h-10" />
            )}
          </div>

          {/* Centered Majestic Brand/Logo Area */}
          <div className="flex flex-col items-center justify-center z-20">
            <button 
              className="flex flex-col items-center cursor-pointer active:scale-[0.98] transition-all group mt-1 bg-transparent border-0 outline-none p-0" 
              onClick={() => onNavigate('home')}
            >
              {/* Eye-catching, highly exclusive "Ó" Monogram matching the exact brand geometry */}
              <div className="w-14 h-14 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center relative select-none group-hover:scale-105 transition-all duration-300">
                <svg 
                  viewBox="0 0 100 108" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-full h-full text-[#1A1A1A]"
                >
                  {/* Accent mark */}
                  <path 
                    d="M52 23V7H85L66 23H52Z" 
                    fill="currentColor" 
                  />
                  {/* Outer circle minus the centered custom cutout */}
                  <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M50 98C70.9868 98 88 81.0132 88 60C88 39.0132 70.9868 22 50 22C29.0132 22 12 39.0132 12 60C12 81.0132 29.0132 98 50 98ZM28 44L37 35H63L72 44V72C72 84.1503 62.1503 94 50 94C37.8497 94 28 84.1503 28 72V44Z" 
                    fill="currentColor" 
                  />
                </svg>
              </div>
              
              {/* Brand Typography */}
              <div className="flex flex-col items-center text-center mt-2.5">
                <span className="text-[13px] sm:text-xs md:text-[14px] uppercase tracking-[0.32em] font-semibold leading-none text-[#1A1A1A]/90 font-sans">
                  La Óptica
                </span>
                <span className="text-[11px] sm:text-[10px] md:text-[12px] uppercase tracking-[0.22em] font-serif italic opacity-[0.95] leading-none mt-1 sm:mt-1.5 text-[#1A1A1A]/80">
                  de Antonio
                </span>
                <span className="text-[8px] uppercase tracking-[0.18em] text-[#1A1A1A]/50 font-mono mt-1 font-bold">
                  desde 1999
                </span>
                <span className="text-[7.5px] sm:text-[7.5px] md:text-[8px] uppercase tracking-[0.25em] text-[#1A1A1A]/35 font-mono font-bold mt-1.5 whitespace-nowrap">
                  Alta Optometría • Diseño Independiente
                </span>
              </div>
            </button>
          </div>

          {/* Right Slot: Cart Trigger */}
          <div className="flex items-center justify-end z-10">
            <button 
              onClick={onToggleCart} 
              className="group flex items-center gap-2 h-10 px-3 sm:px-4 rounded-full border border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 active:scale-95 transition-all text-xs font-semibold uppercase tracking-wider bg-white/50 backdrop-blur-xs cursor-pointer text-[#1A1A1A]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 transform group-hover:scale-110 transition-transform">
                <circle cx="8" cy="21" r="1"/>
                <circle cx="19" cy="21" r="1"/>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
              </svg>
              <span className="text-[10px] bg-[#1A1A1A] text-[#F9F9F7] px-1.5 py-0.5 rounded-full font-mono leading-none">
                {cartCount}
              </span>
            </button>
          </div>

        </div>

        {/* Unified Navigation Pill buttons row */}
        <nav className="flex items-center justify-center max-w-full pb-1 mt-3.5 sm:mt-5">
          <ul className="flex flex-wrap items-center justify-center gap-1 bg-transparent sm:bg-neutral-100 p-0 sm:p-1.5 rounded-none sm:rounded-full border-0 sm:border border-neutral-200/50">
            {NAV_ITEMS.map((item) => {
              const isActive = currentView === item.id || (currentView === 'detail' && item.id === 'catalog');
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`px-3 sm:px-4 md:px-6 text-center justify-center flex py-1.5 sm:py-2.5 rounded-full text-[9px] sm:text-[11px] md:text-xs tracking-wider uppercase font-semibold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#1A1A1A] text-[#F9F9F7] shadow-xs font-bold border border-[#1A1A1A]'
                        : 'bg-white sm:bg-transparent border border-neutral-200/80 sm:border-transparent text-[#1A1A1A]/55 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

      </div>
    </header>
  );
}
