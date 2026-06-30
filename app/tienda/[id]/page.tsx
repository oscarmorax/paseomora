'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../../components/Header';
import Link from 'next/link';
import { Store, ArrowLeft, Sparkles, MapPin, Loader2 } from 'lucide-react';
import { supabase } from '../../supabase';

interface Tienda {
  id: string;
  nombre: string;
  descripcion: string;
  ciudad: string;
  banner: string;
}

interface Producto {
  id: number;
  titulo: string;
  precio: number;
  imagen: string;
  marca_id: string;
}

export default function PerfilTiendaPage() {
  const params = useParams();
  const idTienda = params?.id as string;

  // Estados de carga de datos reales de Supabase
  const [tienda, setTienda] = useState<Tienda | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!idTienda) return;

    const cargarDatosTienda = async () => {
      setCargando(true);
      try {
        // 1. Traer la información de la marca desde Supabase
        const { data: datosTienda, error: errorTienda } = await supabase
          .from('tiendas')
          .select('*')
          .eq('id', idTienda)
          .single();

        if (errorTienda) throw errorTienda;
        setTienda(datosTienda);

        // 2. Traer los productos asociados exclusivamente a esta marca
        const { data: datosProductos, error: errorProductos } = await supabase
          .from('productos')
          .select('*')
          .eq('marca_id', idTienda);

        if (errorProductos) throw errorProductos;
        setProductos(datosProductos || []);

      } catch (error: any) {
        console.error('Error al sincronizar el perfil de marca:', error.message);
      } finally {
        setCargando(false);
      }
    };

    cargarDatosTienda();
  }, [idTienda]);

  if (cargando) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] flex flex-col justify-center items-center gap-3 text-gray-400">
        <Loader2 className="w-8 h-8 animate-spin text-[#4E3629]" />
        <p className="text-xs font-bold uppercase tracking-widest">Sincronizando con Paseo Mora...</p>
      </div>
    );
  }

  // Si la tienda no existe en Supabase, mostramos un estado controlado de error
  if (!tienda) {
    return (
      <div className="min-h-screen bg-[#FDFDFD]">
        <Header />
        <div className="max-w-md mx-auto text-center py-24 px-4 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Marca no registrada</h2>
          <p className="text-sm text-gray-500">La tienda que estás buscando no forma parte de la red de Paseo Mora todavía.</p>
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#4E3629] underline">
            <ArrowLeft className="w-3 h-3" /> Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#545454] antialiased tracking-tight">
      <Header />

      {/* BANNER DINÁMICO DESDE LA BASE DE DATOS */}
      <div className="relative h-64 md:h-80 bg-gray-900 overflow-hidden">
        <img 
          src={tienda.banner} 
          alt={tienda.nombre} 
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 inset-x-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="text-white space-y-2">
            <Link href="/" className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-white transition-colors mb-2">
              <ArrowLeft className="w-3 h-3" /> Volver al paseo
            </Link>
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/20">
                <Store className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl md:text-4xl font-black uppercase tracking-wider">{tienda.nombre}</h1>
            </div>
            <p className="text-xs md:text-sm text-gray-200 font-medium max-w-2xl leading-relaxed">{tienda.descripcion}</p>
          </div>
          
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest self-start md:self-end">
            <MapPin className="w-3 h-3 text-white" /> {tienda.ciudad}
          </div>
        </div>
      </div>

      {/* CATÁLOGO FILTRADO DESDE SUPABASE */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 border-b border-gray-100 pb-4">
          <Sparkles className="w-4 h-4 text-gray-400" />
          <h2 className="text-xs font-black uppercase tracking-widest text-gray-900">Colección Disponible ({productos.length})</h2>
        </div>

        {productos.length === 0 ? (
          <div className="text-center py-16 bg-gray-50/50 rounded-2xl border border-gray-100 text-xs text-gray-400 font-medium">
            Próximamente se listarán las nuevas colecciones de esta marca en Paseo Mora.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {productos.map((producto) => (
              <Link href={`/producto/${producto.id}`} key={producto.id} className="group block space-y-3 cursor-pointer">
                <div className="aspect-[3/4] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 relative">
                  <img 
                    src={producto.imagen} 
                    alt={producto.titulo} 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest text-gray-900 border border-gray-100">
                    {tienda.nombre}
                  </span>
                </div>
                <div className="space-y-0.5 px-1">
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight group-hover:text-gray-600 transition-colors line-clamp-1">
                    {producto.titulo}
                  </h3>
                  <p className="text-xs font-black font-mono text-gray-900">
                    {producto.precio.toLocaleString('es-PY')} ₲
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}