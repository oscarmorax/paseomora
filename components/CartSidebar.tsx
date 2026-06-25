'use client';
import React from 'react';
import Link from 'next/link'; // ← Importante: Agregamos la importación para poder usar <Link>
import { X, ShoppingBag, Trash2, ArrowRight, Plus, Minus } from 'lucide-react';
import { useCart } from './CartContext';

export default function CartSidebar() {
  const { items, isOpen, setIsOpen, agregarAlCarrito, removerDelCarrito, obtenerTotal } = useCart();

  if (!isOpen) return null;

  // Lógica interna para restar cantidad directamente desde los botones del sidebar
  const manejarResta = (item: any) => {
    if (item.cantidad > 1) {
      // Si hay más de 1, reducimos modificando el estado del contexto de forma segura
      item.cantidad -= 2; // Restamos 2 porque agregarAlCarrito le va a sumar 1 en la línea siguiente
      agregarAlCarrito(item);
    } else {
      removerDelCarrito(item.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans select-none">
      {/* Fondo oscuro traslúcido con blur premium */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-500"
        onClick={() => setIsOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDFDFD] text-[#545454] shadow-2xl flex flex-col justify-between border-l border-gray-100">
          
          {/* HEADER */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-gray-900" />
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900">
                Tu Selección <span className="font-light lowercase italic text-gray-400">({items.length})</span>
              </h2>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer rounded-lg hover:bg-gray-50"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* CUERPO: Lista de Productos */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length > 0 ? (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-100/70 last:border-0 group">
                  {/* Imagen */}
                  <div className="w-20 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100/60 relative">
                    <img 
                      src={item.imagen} 
                      alt={item.titulo} 
                      className="w-full h-full object-cover grayscale-[10%] contrast-[1.02]"
                    />
                  </div>

                  {/* Detalles */}
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-xs font-black uppercase tracking-tight text-gray-900 leading-tight">
                          {item.titulo}
                        </h3>
                        <span className="text-xs font-bold font-mono text-gray-900 whitespace-nowrap">
                          {item.precio.toLocaleString('es-PY')} ₲
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
                        {item.tienda}
                      </p>
                    </div>

                    {/* CONTROL DE CANTIDADES Y ELIMINACIÓN */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-gray-100 rounded-lg bg-gray-50/50 p-0.5">
                        <button 
                          onClick={() => manejarResta(item)}
                          className="p-1 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold font-mono text-gray-900">
                          {item.cantidad}
                        </span>
                        <button 
                          onClick={() => agregarAlCarrito({ ...item, cantidad: 1 })}
                          className="p-1 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button 
                        onClick={() => removerDelCarrito(item.id)}
                        className="text-gray-300 hover:text-rose-600 transition-colors p-1.5 rounded-lg hover:bg-rose-50/50 cursor-pointer"
                        title="Quitar pieza"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              /* Estado Vacío */
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                  <ShoppingBag className="w-5 h-5 text-gray-300" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-black uppercase tracking-widest text-gray-900">Tu bolsa está vacía</p>
                  <p className="text-[11px] text-gray-400 max-w-[200px] mx-auto font-normal leading-relaxed">
                    Recorré la galería y seleccioná piezas únicas de autor.
                  </p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-[9px] font-black uppercase tracking-widest border-b-2 border-gray-950 text-gray-900 pb-0.5 hover:text-purple-900 transition-colors pt-2 cursor-pointer"
                >
                  Seguir Mirando
                </button>
              </div>
            )}
          </div>

          {/* FOOTER */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50/40 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Subtotal</span>
                  <span className="text-sm font-bold font-mono text-gray-900">
                    {obtenerTotal().toLocaleString('es-PY')} ₲
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Envío (Asunción/Central)</span>
                  <span className="text-[10px] font-bold font-mono text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md">
                    Cortesía
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3 flex justify-between items-baseline">
                <span className="text-xs font-black uppercase tracking-widest text-gray-900">Total Estimado</span>
                <span className="text-xl font-black font-mono text-gray-900">
                  {obtenerTotal().toLocaleString('es-PY')} ₲
                </span>
              </div>

              {/* AQUÍ ESTÁ EL CAMBIO SOLICITADO */}
              <Link href="/checkout" onClick={() => setIsOpen(false)} className="block w-full">
                <button 
                  className="w-full text-white font-bold py-4 rounded-xl text-[10px] uppercase tracking-[0.25em] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:opacity-95 transform hover:-translate-y-0.5 cursor-pointer mt-2"
                  style={{ backgroundColor: '#572364' }}
                >
                  Proceder al Pago
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}