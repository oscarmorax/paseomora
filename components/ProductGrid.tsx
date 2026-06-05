'use client';
import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Check, Loader2, SlidersHorizontal } from 'lucide-react';
import { useCart } from './CartContext';
import { supabase } from '../app/supabase';

interface Producto {
  id: number;
  titulo: string;
  tienda: string;
  precio: number;
  imagen: string;
  rating: number;
}

function BotonAgregar({ producto }: { producto: Producto }) {
  const { agregarAlCarrito } = useCart();
  const [agregado, setAgregado] = useState(false);

  const manejarClick = () => {
    agregarAlCarrito(producto);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1200);
  };

  return (
    <button 
      onClick={manejarClick}
      className={`w-full text-white font-semibold py-2.5 rounded-xl transition-all duration-300 text-xs flex items-center justify-center gap-2 shadow-sm ${
        agregado 
          ? 'bg-emerald-600 hover:bg-emerald-700' 
          : 'bg-purple-900 hover:bg-purple-950'
      }`}
      style={!agregado ? { backgroundColor: '#572364' } : {}}
    >
      {agregado ? (
        <>
          <Check className="w-3.5 h-3.5" />
          ¡Agregado! ✓
        </>
      ) : (
        <>
          <ShoppingCart className="w-3.5 h-3.5" />
          Agregar al Carrito
        </>
      )}
    </button>
  );
}

export default function ProductGrid() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [tiendas, setTiendas] = useState<string[]>([]); // Estado para guardar las tiendas únicas
  const [tiendaSeleccionada, setTiendaSeleccionada] = useState<string>('Todas'); // Filtro activo
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarProductos() {
      try {
        setCargando(true);
        const { data, error: supabaseError } = await supabase
          .from('productos')
          .select('*')
          .order('id', { ascending: true });

        if (supabaseError) throw supabaseError;
        
        if (data) {
          setProductos(data as Producto[]);
          
          // Magia extra: Extraemos los nombres de las tiendas sin repetir ninguno
          const tiendasUnicas = Array.from(new Set(data.map((p: any) => p.tienda)));
          setTiendas(tiendasUnicas as string[]);
        }
      } catch (err: any) {
        console.error('Error cargando productos:', err);
        setError(err.message || 'Error al conectar con la base de datos');
      } finally {
        setCargando(false);
      }
    }

    cargarProductos();
  }, []);

  const formatearGs = (monto: number) => {
    return new Intl.NumberFormat('es-PY', { style: 'currency', currency: 'PYG', minimumFractionDigits: 0 }).format(monto);
  };

  // Lógica de filtrado en tiempo de ejecución
  const productosFiltrados = tiendaSeleccionada === 'Todas'
    ? productos
    : productos.filter(p => p.tienda === tiendaSeleccionada);

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">Productos Destacados</h3>
          <p className="text-xs text-gray-500 mt-1">Selección premium de comercios verificados en Paseo Mora</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            En vivo
          </span>
        </div>
      </div>

      {/* BARRA DE FILTROS INTELIGENTES (Solo se muestra si no está cargando) */}
      {!cargando && !error && (
        <div className="flex items-center gap-3 overflow-x-auto pb-6 scrollbar-none mb-4">
          <div className="flex items-center gap-1.5 text-gray-400 bg-gray-100/70 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex-shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Tiendas:
          </div>
          
          {/* Botón para mostrar todo */}
          <button
            onClick={() => setTiendaSeleccionada('Todas')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all duration-200 border flex-shrink-0 ${
              tiendaSeleccionada === 'Todas'
                ? 'text-white shadow-sm border-transparent'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            style={tiendaSeleccionada === 'Todas' ? { backgroundColor: '#572364' } : {}}
          >
            Ver Todas
          </button>

          {/* Botones dinámicos generados desde la base de datos */}
          {tiendas.map((nombreTienda) => (
            <button
              key={nombreTienda}
              onClick={() => setTiendaSeleccionada(nombreTienda)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all duration-200 border flex-shrink-0 ${
                tiendaSeleccionada === nombreTienda
                  ? 'text-white shadow-sm border-transparent'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              style={tiendaSeleccionada === nombreTienda ? { backgroundColor: '#572364' } : {}}
            >
              {nombreTienda}
            </button>
          ))}
        </div>
      )}

      {/* ESTADO DE CARGA */}
      {cargando && (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-500">
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#572364' }} />
          <p className="text-sm font-medium">Conectando con el servidor...</p>
        </div>
      )}

      {/* ESTADO DE ERROR */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-900 p-4 rounded-xl text-sm text-center my-10 font-medium">
          ⚠️ Ocurrió un inconveniente al cargar el stock: {error}. Verificá tus credenciales en el archivo .env.local.
        </div>
      )}

      {/* GRILLA RESPONSIVA FILTRADA */}
      {!cargando && !error && (
        <>
          {productosFiltrados.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-sm font-medium text-gray-500">Esta tienda aún no tiene productos disponibles.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {productosFiltrados.map((producto) => (
                <div key={producto.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer">
                  
                  <div className="relative pt-[100%] bg-gray-50 overflow-hidden">
                    <img 
                      src={producto.imagen} 
                      alt={producto.titulo}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-purple-600 tracking-wider uppercase block mb-1" style={{ color: '#572364' }}>
                        {producto.tienda}
                      </span>
                      <h4 className="text-sm font-bold text-gray-800 line-clamp-2 min-h-[40px] leading-snug group-hover:text-purple-900 transition-colors">
                        {producto.titulo}
                      </h4>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-50 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-black text-gray-900">
                          {formatearGs(producto.precio)}
                        </span>
                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg text-amber-700 text-xs font-bold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {producto.rating}
                        </div>
                      </div>

                      <BotonAgregar producto={producto} />
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

    </section>
  );
}