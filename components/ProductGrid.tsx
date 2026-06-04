import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';

// Datos de prueba simulando el inventario de las tiendas de Paseo Mora
const PRODUCTOS_MUESTRA = [
  {
    id: 1,
    titulo: "Smart TV 55\" Crystal UHD 4K",
    tienda: "Electrónica Central",
    precio: 3450000,
    imagen: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
  },
  {
    id: 2,
    titulo: "Cafetera Expresso Automática Premium",
    tienda: "Boutique del Hogar",
    precio: 1890000,
    imagen: "https://images.unsplash.com/photo-1510972527921-ce0415891ddf?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
  },
  {
    id: 3,
    titulo: "Notebook Pro 14\" M3 16GB/512GB",
    tienda: "TecnoPy",
    precio: 12400000,
    imagen: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
  },
  {
    id: 4,
    titulo: "Championes de Running Edición Limitada",
    tienda: "Maratón Sports",
    precio: 750000,
    imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
  }
];

export default function ProductGrid() {
  // Función para formatear los precios a Guaraníes de forma elegante
  const formatearGs = (monto: number) => {
    return new Intl.NumberFormat('es-PY', { style: 'currency', currency: 'PYG', minimumFractionDigits: 0 }).format(monto);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* BANNER PRINCIPAL / HERO */}
      <div className="relative rounded-3xl overflow-hidden mb-16 shadow-lg bg-gradient-to-r from-gray-900 to-purple-950 text-white p-8 md:p-16 flex flex-col justify-center min-h-[320px]">
        <div className="absolute inset-0 bg-black opacity-20 z-0"></div>
        <div className="relative z-10 max-w-xl">
          <span className="text-purple-300 font-bold tracking-wider text-xs uppercase bg-purple-900/50 px-3 py-1 rounded-full border border-purple-700/50">
            Lanzamiento Exclusivo
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-4 mb-4 leading-tight">
            El espacio donde compran los paraguayos.
          </h2>
          <p className="text-gray-300 text-base md:text-lg mb-8 font-light">
            Las mejores tiendas locales del país unificadas en un solo Paseo. Comprá con total libertad y con cualquier medio de pago.
          </p>
          <button className="bg-white text-gray-900 font-bold px-6 py-3 rounded-xl shadow-md hover:bg-gray-100 transition-all text-sm tracking-wide inline-flex items-center gap-2">
            Explorar Tiendas
          </button>
        </div>
      </div>

      {/* TÍTULO DE LA SECCIÓN DE PRODUCTOS */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">Productos Destacados</h3>
          <p className="text-xs text-gray-500 mt-1">Selección premium de comercios verificados en Paseo Mora</p>
        </div>
        <a href="#" className="text-sm font-semibold text-purple-700 hover:text-purple-900 transition-colors" style={{ color: '#572364' }}>
          Ver todo →
        </a>
      </div>

      {/* GRILLA RESPONSIVA DE TARJETAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRODUCTOS_MUESTRA.map((producto) => (
          <div key={producto.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer">
            
            {/* Contenedor de Imagen con Efecto Hover Zoom */}
            <div className="relative pt-[100%] bg-gray-50 overflow-hidden">
              <img 
                src={producto.imagen} 
                alt={producto.titulo}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Cuerpo de la Tarjeta */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                {/* Nombre de la Tienda Aliada */}
                <span className="text-[11px] font-bold text-purple-600 tracking-wider uppercase block mb-1" style={{ color: '#572364' }}>
                  {producto.tienda}
                </span>
                {/* Título del Producto */}
                <h4 className="text-sm font-bold text-gray-800 line-clamp-2 min-h-[40px] leading-snug group-hover:text-purple-900 transition-colors">
                  {producto.titulo}
                </h4>
              </div>

              {/* Fila de Calificación e Info */}
              <div className="mt-4 pt-4 border-t border-gray-50 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  {/* Precio Formateado en Guaraníes */}
                  <span className="text-base font-black text-gray-900">
                    {formatearGs(producto.precio)}
                  </span>
                  {/* Calificación en Estrellas */}
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg text-amber-700 text-xs font-bold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {producto.rating}
                  </div>
                </div>

                {/* Botón de Agregar al Carrito */}
                <button className="w-full bg-gray-900 text-white font-semibold py-2.5 rounded-xl hover:bg-gray-800 transition-colors text-xs flex items-center justify-center gap-2 shadow-sm group-hover:bg-purple-900" style={{ backgroundColor: '#572364' }}>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Agregar al Carrito
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
}