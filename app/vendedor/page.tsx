'use client';
import React, { useState, useEffect } from 'react';
import { Package, DollarSign, ShoppingBag, PlusCircle, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { supabase } from '../supabase'; 

export default function VendedorDashboard() {
  const router = useRouter(); // <--- Para poder redirigir al usuario entrometido
  
  // Estados para capturar lo que escribe el usuario
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [tienda, setTienda] = useState('');
  const [cargando, setCargando] = useState(false);
  const [notificacion, setNotificacion] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autenticando, setAutenticando] = useState(true); // Nuevo estado de control

  // EL ESCUDO PROTECTOR (Verifica si el usuario inició sesión)
  useEffect(() => {
    async function chequearSesion() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // ¡Alerta! No está logueado, lo mandamos al login de una patada
        router.push('/login');
      } else {
        // Todo en orden, puede ver el panel
        setAutenticando(false);
      }
    }
    chequearSesion();
  }, [router]);

  // Función para cerrar sesión de forma segura
  const manejarCerrarSesion = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const manejarSubidaProducto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !precio || !tienda) return;

    try {
      setCargando(true);
      setError(null);

      // Una lista de imágenes espectaculares de Unsplash al azar
      const imagenesRandom = [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80", 
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80", 
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80", 
        "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=600&q=80"  
      ];
      const imagenSeleccionada = imagenesRandom[Math.floor(Math.random() * imagenesRandom.length)];

      // ENVIAR LOS DATOS EN CALIENTE A SUPABASE
      const { error: errorSupabase } = await supabase
        .from('productos')
        .insert([
          { 
            titulo: nombre, 
            tienda: tienda, 
            precio: parseFloat(precio), 
            imagen: imagenSeleccionada,
            rating: parseFloat((Math.random() * (5.0 - 4.2) + 4.2).toFixed(1)) 
          }
        ]);

      if (errorSupabase) throw errorSupabase;

      // Si todo sale bien, disparamos el éxito y limpiamos los inputs
      setNotificacion(true);
      setNombre('');
      setPrecio('');
      setTienda('');

      // Apagar notificación tras 4 segundos
      setTimeout(() => setNotificacion(false), 4000);

    } catch (err: any) {
      console.error("Error al subir el producto:", err);
      setError(err.message || "No se pudo guardar el producto.");
    } finally {
      setCargando(false);
    }
  };

  // Si todavía está verificando la sesión con Supabase, mostramos una pantalla de carga sutil
  if (autenticando) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-3 text-gray-500">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#572364' }} />
        <p className="text-sm font-medium">Verificando credenciales de seguridad...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* BARRA SUPERIOR DEL PANEL */}
      <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-50 rounded-xl transition-all">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight" style={{ color: '#545454' }}>Paseo</span>
              <span className="text-xl font-black tracking-tight" style={{ color: '#572364' }}>Mora</span>
              <span className="ml-2 bg-purple-50 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider" style={{ backgroundColor: '#fcf7ff', color: '#572364' }}>
                Seller Center
              </span>
            </div>
          </div>
          
          {/* SECCIÓN ACTUALIZADA CON EL BOTÓN SALIR */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs" style={{ backgroundColor: '#fcf7ff', color: '#572364' }}>
                MT
              </div>
              <span className="text-xs font-semibold text-gray-700 hidden sm:inline">Mi Tienda Aliada</span>
            </div>
            
            {/* BOTÓN DE CERRAR SESIÓN */}
            <button 
              onClick={manejarCerrarSesion}
              className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100/70 px-3 py-2 rounded-xl transition-all uppercase tracking-wider"
            >
              Salir
            </button>
          </div>
        </div>
      </nav>

      {/* CUERPO DEL PANEL */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">¡Bienvenido de vuelta, socio!</h2>
          <p className="text-xs text-gray-500 mt-1">Acá tenés el control en tiempo real del rendimiento de tu comercio en Paseo Mora.</p>
        </div>

        {/* NOTIFICACIÓN DE ÉXITO REAL */}
        {notificacion && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-4 rounded-xl flex items-center gap-3 shadow-sm">
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span className="text-sm font-medium">¡Golazo! El producto fue insertado de forma real en la base de datos de Paseo Mora.</span>
          </div>
        )}

        {/* ALERTA DE ERROR RESTRICCIONES */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-900 p-4 rounded-xl text-sm font-medium">
            ⚠️ Ups, tuvimos un inconveniente: {error}
          </div>
        )}

        {/* TARJETAS DE MÉTRICAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Ventas del Mes</span>
              <p className="text-2xl font-black text-gray-900">Gs. 8.450.000</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Órdenes Nuevas</span>
              <p className="text-2xl font-black text-gray-900">12 Pedidos</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Productos Activos</span>
              <p className="text-2xl font-black text-gray-900">45 Ítems</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl text-purple-600" style={{ backgroundColor: '#fcf7ff', color: '#572364' }}>
              <Package className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* SECCIÓN DOS COLUMNAS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* FORMULARIO REAL CONECTADO */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6 h-fit">
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <PlusCircle className="w-5 h-5" style={{ color: '#572364' }} />
                Cargar Nuevo Producto
              </h3>
              <p className="text-xs text-gray-400 mt-1">Añadí stock a la vitrina en segundos.</p>
            </div>

            <form onSubmit={manejarSubidaProducto} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 uppercase">Nombre de la Tienda / Marca</label>
                <input 
                  type="text" 
                  value={tienda}
                  onChange={(e) => setTienda(e.target.value)}
                  placeholder="Ej. Casa Paraná o Tu marca propia" 
                  className="w-full bg-gray-50 text-gray-800 placeholder-gray-400 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-300 focus:bg-white transition-all text-sm"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 uppercase">Nombre del Producto</label>
                <input 
                  type="text" 
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Termo Coleman 1.9L Edición Especial" 
                  className="w-full bg-gray-50 text-gray-800 placeholder-gray-400 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-300 focus:bg-white transition-all text-sm"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 uppercase">Precio (en Guaraníes)</label>
                <input 
                  type="number" 
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  placeholder="Ej. 380000" 
                  className="w-full bg-gray-50 text-gray-800 placeholder-gray-400 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-300 focus:bg-white transition-all text-sm"
                  required
                />
              </div>

              <button 
                type="submit"
                disabled={cargando}
                className="w-full text-white font-bold py-3 rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-2 hover:bg-opacity-90 disabled:opacity-50"
                style={{ backgroundColor: '#572364' }}
              >
                {cargando ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Subiendo a la nube...
                  </>
                ) : (
                  'Publicar en Paseo Mora'
                )}
              </button>
            </form>
          </div>

          {/* TABLA DE PEDIDOS */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Últimos Pedidos Recibidos</h3>
              <p className="text-xs text-gray-400 mt-1">Monitoreá los estados de envío de tus compradores.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead>
                  <tr className="border-b border-gray-100 text-xs text-gray-400 font-bold uppercase">
                    <th className="pb-3">Pedido</th>
                    <th className="pb-3">Cliente</th>
                    <th className="pb-3">Monto</th>
                    <th className="pb-3">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 font-bold text-gray-800">#PM-9842</td>
                    <td className="py-4">Carlos Giménez (Asunción)</td>
                    <td className="py-4 font-semibold text-gray-900">Gs. 750.000</td>
                    <td className="py-4">
                      <span className="bg-emerald-50 text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded-full">Entregado</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 font-bold text-gray-800">#PM-9841</td>
                    <td className="py-4">María Paz Cáceres (San Lorenzo)</td>
                    <td className="py-4 font-semibold text-gray-900">Gs. 1.890.000</td>
                    <td className="py-4">
                      <span className="bg-amber-50 text-amber-700 font-bold text-[10px] px-2 py-0.5 rounded-full">En Proceso</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}