import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProductGrid } from './components/ProductGrid';
import { EcoCoinsBanner } from './components/EcoCoinsBanner';
import { Cart } from './components/Cart';
import { CartProvider } from './contexts/CartContext';
import { UserProvider } from './contexts/UserContext';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <UserProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Header onCartClick={() => setIsCartOpen(true)} />
          
          <main>
            <div className="max-w-7xl mx-auto px-4 py-8">
              <EcoCoinsBanner />
            </div>
            
            <ProductGrid />
          </main>

          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </CartProvider>
    </UserProvider>
  );
}

export default App;