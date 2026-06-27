'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../../components/Header';
import Link from 'next/link';
import { Store, ArrowLeft, Sparkles, MapPin } from 'lucide-react';

// Simulamos una base de datos de tiendas (Próximamente la vincularemos a Supabase de ser necesario)
const DATOS_TIENDAS: Record<string, { nombre: string; descripcion: string; ciudad: string; banner: string }> = {
  'mora-atelier': {
    nombre: 'Mora Atelier',
    descripcion: 'Prendas de cuero auténtico hechas a mano en Paraguay. Diseños atemporales con cortes contemporáneos y materia prima seleccionada.',
    ciudad: 'Asunción, PY',
    banner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80'
  },
  'studio-asuncion': {
    nombre: 'Studio Asunción',
    descripcion: 'Sastrería y streetwear minimalista independiente. Redefiniendo los básicos urbanos con siluetas oversized y alta calidad textil.',
    ciudad: 'San Lorenzo, PY',
    banner: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=1600&auto=format&fit=crop&q=80'
  }
};

// Simulamos la base de datos de productos para filtrar en tiempo real
const TODOS_PRODUCTOS = [
  { id: 1, titulo: "Lentes de sol 'Blackout' Acetato", precio: 1250000, marcaSlug: 'mora-atelier', imagen: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80' },
  { id: 2, titulo: "Campera Bomber de Cuero Oversized '90s", precio: 3400000, marcaSlug: 'mora-atelier', imagen: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80' },
  { id: 3, titulo: "Pantalón Sastrero Negro Wide-Leg", precio: 850000, marcaSlug: 'studio-asuncion', imagen: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80' }
];

export default function PerfilTiendaPage() {
  const params = useParams();
  const idTienda = params?.id as string;

  // Buscar la información de la tienda actual según el slug de la URL
  const tienda = DATOS_TIENDAS[idTienda] || {
    nombre: idTienda?.replace('-', ' '),
    descripcion: 'Diseñador independiente aliado a la red de talentos de Paseo Mora.',
    ciudad: 'Paraguay',
    banner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80'
  };

  // Filtrar los productos para que pertenezcan EXCLUSIVAMENTE a esta marca
  const productosTienda = TODOS_PRODUCTOS.filter(p => p.marcaSlug === idTienda);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#545454] antialiased tracking-tight">
      <Header />

      {/* BANNER DE LA MARCA (Hero Section de alta gama) */}
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

      {/* SECCIÓN DE CATÁLOGO EXCLUSIVO */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 border-b border-gray-100 pb-4">
          <Sparkles className="w-4 h-4 text-gray-400" />
          <h2 className="text-xs font-black uppercase tracking-widest text-gray-900">Colección Disponible ({productosTienda.length})</h2>
        </div>

        {productosTienda.length === 0 ? (
          <div className="text-center py-16 bg-gray-50/50 rounded-2xl border border-gray-100 text-xs text-gray-400 font-medium">
            Próximamente se listarán las nuevas colecciones de esta marca en Paseo Mora.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {productosTienda.map((producto) => (
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