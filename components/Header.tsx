'use client';
import React from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User } from 'lucide-react';
import { useCart } from './CartContext';

export default function Header() {
  const { obtenerCantidadTotal, setIsOpen } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        <div className="flex-shrink-0 cursor-pointer">
          <span className="text-2xl font-black tracking-tight" style={{ color: '#545454' }}>Paseo</span>
          <span className="text-2xl font-black tracking-tight" style={{ color: '#572364' }}>Mora</span>
        </div>

        <div className="flex-1 max-w-2xl hidden md:block">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Busca marcas, productos y tiendas..." 
              className="w-full bg-gray-50 text-gray-800 placeholder-gray-400 pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-300 focus:bg-white transition-all text-sm"
            />
            <Search className="absolute right-3 top-3 text-gray-400 w-4 h-4 cursor-pointer hover:text-purple-600 transition-colors" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-full md:hidden">
            <Search className="w-5 h-5" />
          </button>

          <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
            <User className="w-5 h-5 text-gray-500" />
            <span className="hidden sm:inline">Ingresar</span>
          </button>
          {/* ENLACE PARA VENDEDORES */}
          <Link
            href="/vendedor"
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-900 hover:text-purple-700 bg-purple-50 hover:bg-purple-100/70 px-3.5 py-2 rounded-xl transition-all"
            style={{ color: '#572364', backgroundColor: '#fcf7ff' }}
          >
            Vender en Paseo Mora
          </Link>

          <button 
            onClick={() => setIsOpen(true)}
            className="relative p-2.5 rounded-xl hover:bg-opacity-90 transition-all" 
            style={{ backgroundColor: '#fcf7ff', color: '#572364' }}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
              {obtenerCantidadTotal()}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}