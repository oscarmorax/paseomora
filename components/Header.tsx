import React from 'react';
import { Search, ShoppingCart, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* LOGO / MARCA */}
        <div className="flex-shrink-0 cursor-pointer">
          <span className="text-2xl font-black tracking-tight" style={{ color: '#545454' }}>Paseo</span>
          <span className="text-2xl font-black tracking-tight" style={{ color: '#572364' }}>Mora</span>
        </div>

        {/* BUSCADOR CENTRAL */}
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

        {/* ACCIONES (Carrito, Usuario) */}
        <div className="flex items-center gap-4">
          {/* Buscador para celular (Icono soluble) */}
          <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-full md:hidden">
            <Search className="w-5 h-5" />
          </button>

          {/* Cuenta del Usuario */}
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
            <User className="w-5 h-5 text-gray-500" />
            <span className="hidden sm:inline">Ingresar</span>
          </button>

          {/* Carrito de Compras con Notificación */}
          <button className="relative p-2.5 bg-purple-50 text-purple-900 rounded-xl hover:bg-purple-100 transition-colors" style={{ backgroundColor: '#fcf7ff', color: '#572364' }}>
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}