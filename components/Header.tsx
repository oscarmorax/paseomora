'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, User, ShoppingCart, X, Loader2 } from 'lucide-react';
import { supabase } from '../app/supabase';
import { useCart } from './CartContext';

export default function Header() {
  const [busquedaAbierta, setBusquedaAbierta] = useState(false);
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);
  const [cargandoAuth, setCargandoAuth] = useState(true);
  
  // Enganchamos el estado global del carrito
  const { setIsOpen, obtenerCantidadTotal } = useCart();

  useEffect(() => {
    async function chequearUsuario() {
      const { data: { session } } = await supabase.auth.getSession();
      setUsuarioLogueado(!!session);
      setCargandoAuth(false);
    }
    chequearUsuario();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuarioLogueado(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="bg-[#FDFDFD] border-b border-gray-100 sticky top-0 z-50 shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 relative">
        
        {/* LOGO OFICIAL */}
        <div className={`flex items-center flex-shrink-0 ${busquedaAbierta ? 'hidden md:flex' : 'flex'}`}>
          <Link href="/" className="flex items-center">
            <img 
              src="/logo-paseomora.png" 
              alt="Paseo Mora" 
              className="h-50 w-auto object-contain" 
            />
          </Link>
        </div>

        {/* BUSCADOR - ESCRITORIO */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <input 
            type="text" 
            placeholder="Buscar marcas, prendas y tiendas..."
            className="w-full bg-gray-50 text-gray-800 placeholder-gray-400 pl-4 pr-10 py-2.5 rounded-xl border border-gray-100 focus:outline-none focus:border-purple-200 focus:bg-white transition-all text-xs tracking-wide"
          />
          <Search className="w-4 h-4 text-gray-400 absolute right-3 top-3.5" />
        </div>

        {/* BUSCADOR - MÓVIL EXPANDIDO */}
        {busquedaAbierta && (
          <div className="flex md:hidden items-center flex-1">
            <div className="w-full relative flex items-center gap-2">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Buscar en la galería..."
                  className="w-full bg-gray-50 text-gray-800 placeholder-gray-400 pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 focus:outline-none text-xs"
                />
                <Search className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
              </div>
              <button 
                onClick={() => setBusquedaAbierta(false)}
                className="p-2 text-gray-400 bg-gray-100 rounded-xl"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* BOTONES DE ACCIÓN */}
        <div className={`items-center gap-2 md:gap-4 flex-shrink-0 ${busquedaAbierta ? 'hidden md:flex' : 'flex'}`}>
          
          <button 
            onClick={() => setBusquedaAbierta(true)}
            className="p-2.5 text-[#545454] hover:bg-gray-50 rounded-xl md:hidden"
          >
            <Search className="w-5 h-5" />
          </button>

          <Link 
            href={usuarioLogueado ? "/vendedor" : "/login"}
            className="hidden md:inline-block font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-opacity-90 transition-all uppercase tracking-widest border"
            style={{ backgroundColor: '#FDFDFD', color: '#572364', borderColor: '#572364' }}
          >
            Vender en Paseo Mora
          </Link>

         {/* CUENTA / INGRESO */}
         {cargandoAuth ? (
            <div className="p-2.5 text-gray-300">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          ) : (
            <Link 
              href={usuarioLogueado ? "/vendedor" : "/login"} 
              className="p-2.5 text-[#545454] hover:bg-gray-50 rounded-xl transition-all flex items-center gap-2"
            >
              <div className="relative">
                <User className="w-5 h-5" style={usuarioLogueado ? { color: '#572364' } : {}} />
                {usuarioLogueado && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border border-white"></span>
                )}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider hidden lg:inline text-gray-600">
                {usuarioLogueado ? 'Mi Panel' : 'Ingresar'}
              </span>
            </Link>
          )}

          {/* CARRITO - Abre el panel e incluye indicador numérico dinámico */}
          <button 
            onClick={() => setIsOpen(true)}
            className="p-2.5 text-[#545454] hover:bg-gray-50 rounded-xl transition-all relative cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" />
            {obtenerCantidadTotal() > 0 && (
              <span className="absolute top-1 right-1 bg-gray-950 text-white font-mono text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#FDFDFD]">
                {obtenerCantidadTotal()}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
}