'use client';
import React from 'react';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from './CartContext';

export default function CartSidebar() {
  const { isOpen, setIsOpen, items, removerDelCarrito, obtenerTotal } = useCart();

  const formatearGs = (monto: number) => {
    return new Intl.NumberFormat('es-PY', { style: 'currency', currency: 'PYG', minimumFractionDigits: 0 }).format(monto);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Fondo oscuro traslúcido para enfocar el carrito */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Encabezado del Carrito */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-purple-700" style={{ color: '#572364' }} />
              Tu Carrito de Compras
            </h3>
            <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lista de Productos agregados */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                <ShoppingBag className="w-16 h-16 stroke-[1] mb-4 text-gray-300" />
                <p className="font-medium text-sm">Tu carrito está vacío</p>
                <p className="text-xs mt-1 max-w-[200px]">¡Recorré el paseo y agregá los mejores productos!</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border-b border-gray-50 pb-4">
                  <img src={item.imagen} alt={item.titulo} className="w-16 h-16 object-cover rounded-xl border border-gray-100" />
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-purple-600 block uppercase" style={{ color: '#572364' }}>{item.tienda}</span>
                    <h4 className="text-xs font-bold text-gray-800 line-clamp-1">{item.titulo}</h4>
                    <p className="text-xs text-gray-500 mt-1">Cant: {item.cantidad}</p>
                    <span className="text-sm font-black text-gray-900 block mt-0.5">{formatearGs(item.precio * item.cantidad)}</span>
                  </div>
                  <button onClick={() => removerDelCarrito(item.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Resumen de Pago y Botón de Acción */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-4">
              <div className="flex items-center justify-between text-base font-bold text-gray-900">
                <span>Subtotal Estimado:</span>
                <span className="text-xl font-black">{formatearGs(obtenerTotal())}</span>
              </div>
              <p className="text-[11px] text-gray-400 leading-snug">
                Los costos de envío e impuestos se calcularán en el siguiente paso de acuerdo a tu ubicación.
              </p>
              <button className="w-full text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2 group hover:bg-opacity-90" style={{ backgroundColor: '#572364' }}>
                Proceder al Pago Seguro
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}