'use client';
import React from 'react';
import Header from '../components/Header';
import { ShoppingBag, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';

const CATALOGO_EXCLUSIVO = [
  {
    id: 1,
    titulo: "Lentes de Sol 'Blackout' Acetato Italiano",
    tienda: "Studio Asunción",
    precio: "Gs. 1.250.000",
    imagen: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    categoria: "Accesorios"
  },
  {
    id: 2,
    titulo: "Campera Bomber de Cuero Oversized '90s",
    tienda: "Mora Atelier",
    precio: "Gs. 3.400.000",
    imagen: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    categoria: "Abrigos"
  },
  {
    id: 3,
    titulo: "Botas de Asfalto en Cuero Crudo Estilizado",
    tienda: "The Baseline",
    precio: "Gs. 1.850.000",
    imagen: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80",
    categoria: "Calzados"
  },
  {
    id: 4,
    titulo: "Vestido Acanalado 'Sienna' Espalda Descubierta",
    tienda: "Mora Atelier",
    precio: "Gs. 2.100.000",
    imagen: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
    categoria: "Prendas"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#545454] antialiased selection:bg-purple-100">
      <Header />

      {/* SECCIÓN PRINCIPAL ASIMÉTRICA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Textos en Español Claro */}
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 border-b border-[#572364]/30 pb-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: '#572364' }}>
                Galería de Moda Seleccionada
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-normal tracking-tight leading-tight text-gray-900 font-serif">
              El arte de <br className="hidden md:inline" />
              vestir con <span className="italic font-light" style={{ color: '#572364' }}>actitud</span>.
            </h1>
            
            <p className="text-sm md:text-base font-light tracking-wide leading-relaxed max-w-md mx-auto lg:mx-0" style={{ color: '#545454' }}>
              Una selección exclusiva de las prendas y marcas más codiciadas de Asunción. Diseñado para quienes dictan la tendencia, no para quienes la siguen.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button 
                className="text-white font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-xl transition-all duration-300 shadow-xl hover:shadow-purple-900/10 hover:opacity-95"
                style={{ backgroundColor: '#572364' }}
              >
                Explorar Colecciones
              </button>
              <button 
                className="bg-transparent font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-xl border border-gray-300 hover:border-gray-900 transition-all duration-300 text-gray-700"
              >
                Ver Diseñadores
              </button>
            </div>
          </div>

          {/* Bloque de Video e Imagen Asegurada contra Fallas */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-gray-100 rounded-3xl overflow-hidden shadow-2xl group">
              
              {/* Agregamos la imagen de poster fija para evitar la caja gris vacía */}
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                poster="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80"
                className="w-full h-full object-cover grayscale-[10%] transition-transform duration-1000 ease-out group-hover:scale-101"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-fashion-woman-with-silver-makeup-40343-large.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 right-6 text-white text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-xl">
                <Sparkles className="w-3 h-3 text-purple-200" /> Edición Verano 01
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECCIÓN DE GARANTÍAS LOCALES */}
      <section className="bg-gray-50 border-y border-gray-100 py-10 my-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <ShieldCheck className="w-6 h-6 flex-shrink-0" style={{ color: '#572364' }} />
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">Autenticidad Verificada</h3>
              <p className="text-xs font-light text-gray-500 mt-0.5">Alianza directa con las marcas autorizadas del país.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <ShoppingBag className="w-6 h-6 flex-shrink-0" style={{ color: '#572364' }} />
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">Lanzamientos Limitados</h3>
              <p className="text-xs font-light text-gray-500 mt-0.5">Piezas únicas seleccionadas para un armario exigente.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mx-2 hidden md:block"></div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">Envío Premium en Asunción</h3>
              <p className="text-xs font-light text-gray-500 mt-0.5">Entregas protegidas directamente en tu puerta.</p>
            </div>
          </div>
        </div>
      </section>

      {/* VITRINA DE PRODUCTOS SEMÁNTICA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4 border-b border-gray-100 pb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#572364' }}>
              Catálogo de Tendencias
            </span>
            <h2 className="text-3xl font-normal text-gray-900 font-serif tracking-tight mt-1">
              Piezas Destacadas
            </h2>
          </div>
          <div className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Filtrando el mejor diseño local
          </div>
        </div>

        {/* Grilla */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {CATALOGO_EXCLUSIVO.map((prod) => (
            <div key={prod.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100/60 shadow-sm hover:shadow-xl hover:shadow-purple-900/[0.02] transition-all duration-500">
              
              <div className="relative aspect-[3/4] w-full bg-gray-50 overflow-hidden">
                <img 
                  src={prod.imagen} 
                  alt={prod.titulo} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                />
                <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-gray-900 text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-md shadow-sm">
                  {prod.categoria}
                </span>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1 space-y-5">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold tracking-wider uppercase">
                    <span style={{ color: '#572364' }}>
                      {prod.tienda}
                    </span>
                    <span className="text-gray-400 font-light flex items-center gap-0.5">
                      Ver <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 tracking-tight leading-snug line-clamp-2">
                    {prod.titulo}
                  </h3>
                  <p className="text-base font-black pt-1" style={{ color: '#545454' }}>
                    {prod.precio}
                  </p>
                </div>

                <button 
                  className="w-full text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-[0.15em] transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:bg-opacity-95 transform hover:-translate-y-0.5"
                  style={{ backgroundColor: '#572364' }}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Comprar Ahora
                </button>
              </div>

            </div>
          ))}
        </div>
      </main>
    </div>
  );
}