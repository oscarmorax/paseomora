import React from 'react';
import Header from '../components/Header';
import ProductGrid from '../components/ProductGrid';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Fijo Superior */}
      <Header />

      {/* Cuerpo Principal del Marketplace */}
      <main className="flex-1">
        <ProductGrid />
      </main>

      {/* Footer Minimalista de Cierre */}
      <footer className="bg-white border-t border-gray-100 py-6 mt-12 text-center text-xs text-gray-400 font-medium">
        &copy; {new Date().getFullYear()} Paseo Mora. Todos los derechos reservados.
      </footer>
    </div>
  );
}