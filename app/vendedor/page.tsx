'use client';
import React, { useState, useEffect } from 'react';
import { Package, DollarSign, ShoppingBag, PlusCircle, ArrowLeft, CheckCircle, Loader2, LogOut, ArrowUpRight, Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { supabase } from '../supabase'; 

export default function VendedorDashboard() {
  const router = useRouter();
  
  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [tienda, setTienda] = useState('');
  const [cargando, setCargando] = useState(false);
  const [notificacion, setNotificacion] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autenticando, setAutenticando] = useState(true);

  // Verificación estricta de sesión
  useEffect(() => {
    async function chequearSesion() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
      } else {
        setAutenticando(false);
      }
    }
    chequearSesion();
  }, [router]);

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

      // Curaduría de imágenes de alta costura urbanas por defecto ante la falta de uploader
      const imagenesRandom = [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80", 
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80", 
        "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=600&q=80", 
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80"  
      ];
      const imagenSeleccionada = imagenesRandom[Math.floor(Math.random() * imagenesRandom.length)];

      const { error: errorSupabase } = await supabase
        .from('productos')
        .insert([
          { 
            titulo: nombre, 
            tienda: tienda, 
            precio: parseFloat(precio), 
            imagen: imagenSeleccionada,
            rating: parseFloat((Math.random() * (5.0 - 4.5) + 4.5).toFixed(1)) 
          }
        ]);

      if (errorSupabase) throw errorSupabase;

      setNotificacion(true);
      setNombre('');
      setPrecio('');
      setTienda('');

      setTimeout(() => setNotificacion(false), 4000);

    } catch (err: any) {
      console.error("Error al subir el producto:", err);
      setError(err.message || "No se pudo procesar el alta del producto.");
    } finally {
      setCargando(false);
    }
  };

  if (autenticando) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] flex flex-col items-center justify-center gap-4 text-[#545454]">
        <Loader2 className="w-6 h-6 animate-spin" style={{ color: '#572364' }} />
        <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">Verificando Credenciales de Seguridad</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col font-sans antialiased text-[#545454]">
      
      {/* NAVEGACIÓN SUPERIOR EDITORIAL */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-900 transition-colors p-1.5">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center font-serif text-xl tracking-tight">
              <span style={{ color: '#545454', fontWeight: 400 }}>Paseo</span>
              <span style={{ color: '#572364', fontWeight: 600 }}>Mora</span>
              <span className="ml-3 border-l border-gray-200 pl-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                Seller Center
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center font-serif text-xs font-bold bg-gray-50 text-[#572364]">
                M
              </div>
              <span className="text-xs font-medium text-gray-800 hidden sm:inline tracking-wide">Studio Asunción</span>
            </div>
            
            <button 
              onClick={manejarCerrarSesion}
              className="text-[10px] font-bold text-gray-400 hover:text-red-600 transition-colors uppercase tracking-widest flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              Salir
            </button>
          </div>
        </div>
      </nav>

      {/* CUERPO PRINCIPAL DEL DASHBOARD */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Encabezado */}
        <div className="border-b border-gray-100 pb-6">
          <h2 className="text-3xl font-normal text-gray-900 font-serif tracking-tight">Panel de Gestión</h2>
          <p className="text-xs font-light text-gray-400 mt-1 tracking-wide">
            Monitoreo analítico de stock, órdenes y rendimiento exclusivo en tiempo real.
          </p>
        </div>

        {/* Notificaciones Pulcras */}
        {notificacion && (
          <div className="bg-emerald-50/60 border border-emerald-100 text-emerald-900 px-5 py-4 rounded-xl flex items-center gap-3 shadow-inner text-xs font-medium tracking-wide">
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>El artículo ha sido incorporado con éxito a la base de datos de Paseo Mora.</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50/60 border border-red-100 text-red-900 px-5 py-4 rounded-xl text-xs font-medium tracking-wide">
            Huelga de sistema: {error}
          </div>
        )}

        {/* MATRIZ DE MÉTRICAS PREMIUM */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
            <div className="space-y-2">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Facturación Mensual</span>
              <p className="text-xl font-bold text-gray-900 tracking-tight font-mono">Gs. 8.450.000</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl text-gray-400 border border-gray-100">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
            <div className="space-y-2">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Órdenes Activas</span>
              <p className="text-xl font-bold text-gray-900 tracking-tight font-mono">12 Pedidos</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl text-gray-400 border border-gray-100">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
            <div className="space-y-2">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Catálogo Exclusivo</span>
              <p className="text-xl font-bold text-gray-900 tracking-tight font-mono">45 Ítems</p>
            </div>
            <div className="p-3 bg-gray-50/80 rounded-xl border border-gray-100" style={{ color: '#572364' }}>
              <Package className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* FORMULARIO Y REGISTROS ASIMÉTRICOS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Carga de Productos */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <div>
              <h3 className="text-md font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2 font-serif">
                <PlusCircle className="w-4 h-4" style={{ color: '#572364' }} />
                Registrar Ítem
              </h3>
              <p className="text-[11px] font-light text-gray-400 mt-1 leading-relaxed">
                Asigná las propiedades clave para indexar la pieza de autor de inmediato.
              </p>
            </div>

            <form onSubmit={manejarSubidaProducto} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block pl-1">Firma / Atelier</label>
                <input 
                  type="text" 
                  value={tienda}
                  onChange={(e) => setTienda(e.target.value)}
                  placeholder="Ej. Studio Asunción o Mora Atelier" 
                  className="w-full bg-gray-50/50 text-gray-800 placeholder-gray-400/70 px-4 py-3 rounded-xl border border-gray-100 focus:outline-none focus:border-purple-200 focus:bg-white transition-all text-xs tracking-wide"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block pl-1">Nombre del Producto</label>
                <input 
                  type="text" 
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Sobretodo Lino Estructurado '90s" 
                  className="w-full bg-gray-50/50 text-gray-800 placeholder-gray-400/70 px-4 py-3 rounded-xl border border-gray-100 focus:outline-none focus:border-purple-200 focus:bg-white transition-all text-xs tracking-wide"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block pl-1">Valor Comercial (Gs.)</label>
                <input 
                  type="number" 
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  placeholder="Ej. 1850000" 
                  className="w-full bg-gray-50/50 text-gray-800 placeholder-gray-400/70 px-4 py-3 rounded-xl border border-gray-100 focus:outline-none focus:border-purple-200 focus:bg-white transition-all text-xs tracking-wide font-mono"
                  required
                />
              </div>

              <button 
                type="submit"
                disabled={cargando}
                className="w-full text-white font-bold py-3.5 rounded-xl transition-all text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-md shadow-purple-900/5 hover:bg-opacity-95 disabled:opacity-50 mt-2 transform hover:-translate-y-0.5"
                style={{ backgroundColor: '#572364' }}
              >
                {cargando ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sincronizando...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Publicar Pieza
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Tabla Editorial de Pedidos */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <div>
              <h3 className="text-md font-semibold text-gray-900 uppercase tracking-wider font-serif">
                Historial de Órdenes
              </h3>
              <p className="text-[11px] font-light text-gray-400 mt-1 leading-relaxed">
                Seguimiento logístico de los despachos exclusivos en el territorio nacional.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-500 tracking-wide">
                <thead>
                  <tr className="border-b border-gray-100 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    <th className="pb-4">Código</th>
                    <th className="pb-4">Cliente / Región</th>
                    <th className="pb-4">Monto</th>
                    <th className="pb-4 text-right">Estado Logístico</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr className="hover:bg-gray-50/40 transition-colors group">
                    <td className="py-4 font-bold text-gray-800 font-mono">#PM-9842</td>
                    <td className="py-4 text-gray-600 font-light">Carlos Giménez <span className="text-[10px] text-gray-400 block font-normal">Asunción</span></td>
                    <td className="py-4 font-semibold text-gray-900 font-mono">Gs. 750.000</td>
                    <td className="py-4 text-right">
                      <span className="bg-gray-50 text-gray-700 border border-gray-100 font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md">
                        Entregado
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/40 transition-colors group">
                    <td className="py-4 font-bold text-gray-800 font-mono">#PM-9841</td>
                    <td className="py-4 text-gray-600 font-light">María Paz Cáceres <span className="text-[10px] text-gray-400 block font-normal">San Lorenzo</span></td>
                    <td className="py-4 font-semibold text-gray-900 font-mono">Gs. 1.890.000</td>
                    <td className="py-4 text-right">
                      <span className="text-purple-700 font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md" style={{ backgroundColor: '#fcf7ff' }}>
                        En Proceso
                      </span>
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