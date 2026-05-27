import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { AppState, Product, CartItem, ViewState } from './types';
import { products } from './data';
import { CatalogView } from './components/CatalogView';
import { ProductView } from './components/ProductView';
import { ARView } from './components/ARView';
import { Header } from './components/Header';
import { CartOverlay } from './components/CartOverlay';
import { ServicesView } from './components/ServicesView';
import { AboutView } from './components/AboutView';
import { BrandsView } from './components/BrandsView';
import { AppointmentView } from './components/AppointmentView';
import { HomeView } from './components/HomeView';
import { Footer } from './components/Footer';

export default function App() {
  const [state, setState] = useState<AppState>({
    currentView: 'home',
    selectedProduct: null,
    menuOpen: false,
    cartOpen: false,
    cartItems: [],
  });

  const handleNavigate = (view: ViewState) => {
    setState((prev) => ({ ...prev, currentView: view, menuOpen: false, selectedProduct: null }));
  };

  const handleSelectProduct = (product: Product) => {
    setState((prev) => ({ ...prev, currentView: 'detail', selectedProduct: product }));
  };

  const handleNextProduct = () => {
    if (!state.selectedProduct) return;
    const currentIndex = products.findIndex(p => p.id === state.selectedProduct!.id);
    const nextIndex = (currentIndex + 1) % products.length;
    setState(prev => ({ ...prev, selectedProduct: products[nextIndex] }));
  };

  const handlePrevProduct = () => {
    if (!state.selectedProduct) return;
    const currentIndex = products.findIndex(p => p.id === state.selectedProduct!.id);
    const prevIndex = (currentIndex - 1 + products.length) % products.length;
    setState(prev => ({ ...prev, selectedProduct: products[prevIndex] }));
  };

  const handleBackToCatalog = () => {
    handleNavigate('catalog');
  };

  const handleTryOn = () => {
    setState((prev) => ({ ...prev, currentView: 'ar' }));
  };

  const handleBackFromAR = () => {
    setState((prev) => ({ ...prev, currentView: 'detail' }));
  };

  const toggleMenu = () => setState(prev => ({ ...prev, menuOpen: !prev.menuOpen, cartOpen: false }));
  const toggleCart = () => setState(prev => ({ ...prev, cartOpen: !prev.cartOpen, menuOpen: false }));

  const addToCart = (product: Product) => {
    setState(prev => {
      const existing = prev.cartItems.find(item => item.product.id === product.id);
      if (existing) {
        return {
          ...prev,
          cartItems: prev.cartItems.map(item => 
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
          cartOpen: true
        };
      }
      return { ...prev, cartItems: [...prev.cartItems, { product, quantity: 1 }], cartOpen: true };
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setState(prev => ({
      ...prev,
      cartItems: prev.cartItems.map(item => {
        if (item.product.id === productId) {
          return { ...item, quantity: Math.max(0, item.quantity + delta) };
        }
        return item;
      }).filter(item => item.quantity > 0)
    }));
  };

  return (
    <div className="w-full min-h-screen bg-[#F9F9F7] text-[#1A1A1A] overflow-x-hidden relative font-sans flex flex-col justify-between" style={{ touchAction: "manipulation" }}>
      <div className="flex-1 w-full">
        <Header 
          currentView={state.currentView}
          onNavigate={handleNavigate}
          onToggleCart={toggleCart}
          cartCount={state.cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        />
        
        {/* Global Cart Overlay */}
        <CartOverlay 
          isOpen={state.cartOpen} 
          onClose={toggleCart} 
          items={state.cartItems}
          updateQuantity={updateQuantity}
        />

        <AnimatePresence mode="wait">
          {state.currentView === 'home' && (
            <HomeView 
              key="home"
              products={products}
              onSelectProduct={handleSelectProduct}
              onNavigate={handleNavigate}
            />
          )}

          {state.currentView === 'catalog' && (
            <CatalogView 
              key="catalog" 
              products={products} 
              onSelect={handleSelectProduct}
              onToggleCart={toggleCart}
              cartCount={state.cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            />
          )}
          
          {state.currentView === 'detail' && state.selectedProduct && (
            <ProductView 
              key={`detail-${state.selectedProduct.id}`} 
              product={state.selectedProduct} 
              onBack={handleBackToCatalog} 
              onTryOn={handleTryOn}
              onAddToCart={() => addToCart(state.selectedProduct!)}
              onToggleCart={toggleCart}
              cartCount={state.cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              onNext={handleNextProduct}
              onPrev={handlePrevProduct}
            />
          )}

          {state.currentView === 'services' && (
            <ServicesView key="services" />
          )}

          {state.currentView === 'brands' && (
            <BrandsView key="brands" />
          )}

          {state.currentView === 'about' && (
            <AboutView key="about" />
          )}

          {state.currentView === 'appointments' && (
            <AppointmentView key="appointments" />
          )}

          {state.currentView === 'ar' && state.selectedProduct && (
            <ARView 
              key="ar" 
              product={state.selectedProduct} 
              onBack={handleBackFromAR} 
            />
          )}
        </AnimatePresence>
      </div>

      {state.currentView !== 'ar' && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}
