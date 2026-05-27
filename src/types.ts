export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  color: string;
  glassColor: string;
  category: 'graduado' | 'sol';
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ViewState = 'home' | 'catalog' | 'detail' | 'services' | 'brands' | 'about' | 'appointments';

export interface AppState {
  currentView: ViewState;
  selectedProduct: Product | null;
  menuOpen: boolean;
  cartOpen: boolean;
  cartItems: CartItem[];
}
