'use client';
import React from 'react';
import Header from '../components/Header';
import { ShoppingBag, ArrowUpRight, ShieldCheck, Sparkles, Compass, Eye, Shirt, Sparkle } from 'lucide-react';

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

const CATEGORIAS_CURADAS = [
  {
    id: "cat-1",
    titulo: "Sastrería & Líneas Crudas",
    subtitulo: "Inspiración Jacob Elordi",
    imagen: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&w=800&q=80",
    ancho: "lg:col-span-7"
  },
  {
    id: "cat-2",
    titulo: "Siluetas Vanguardistas",
    subtitulo: "Estilo Kendall Jenner",
    imagen: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    ancho: "lg:col-span-5"
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

        {/* Grilla de Catálogo */}
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
      </section>

      {/* NUEVA SECCIÓN: ENFOQUE DE DISEÑO ASIMÉTRICO (Estilo Kendall & Jacob) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=1000&q=80" 
              alt="Estilo Contemporáneo Urbano" 
              className="w-full h-full object-cover grayscale-[20%]"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          <div className="space-y-8 max-w-lg">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#572364' }}>
              <Shirt className="w-3.5 h-3.5" /> Estética Contemporánea
            </div>
            
            <h2 className="text-3xl md:text-5xl font-normal text-gray-900 font-serif leading-tight tracking-tight">
              Líneas limpias. <br />
              Identidad <span className="italic font-light text-gray-700">sin esfuerzo</span>.
            </h2>
            
            <p className="text-sm font-light leading-relaxed text-gray-600 space-y-4">
              Nuestra propuesta rompe el molde tradicional. Fusionamos prendas de corte impecable, siluetas amplias y una paleta neutra pensada para quienes entienden que el verdadero lujo no grita; se nota a la distancia.
            </p>

            <blockquote className="border-l-2 pl-4 italic text-sm text-gray-500" style={{ borderColor: '#572364' }}>
              "La sofisticación moderna no distingue géneros, celebra la estructura y la libertad de portar una pieza única."
            </blockquote>

            <div className="pt-2">
              <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest pb-1 border-b-2 border-gray-900 hover:text-[#572364] hover:border-[#572364] transition-all">
                Explorar el Manifiesto Urbano <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* NUEVA SECCIÓN: GRANDES CATEGORÍAS EDITORIALES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-20">
        <div className="mb-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: '#572364' }}>
            Curaduría de Armario
          </span>
          <h2 className="text-3xl font-normal text-gray-900 font-serif tracking-tight mt-1">
            Explorar por Inspiración
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {CATEGORIAS_CURADAS.map((cat) => (
            <div 
              key={cat.id} 
              className={`${cat.ancho} relative aspect-[16/10] sm:aspect-[21/10] lg:aspect-auto lg:h-[450px] rounded-3xl overflow-hidden group shadow-md`}
            >
              <img 
                src={cat.imagen} 
                alt={cat.titulo}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103 grayscale-[15%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                <div className="text-white space-y-1">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-purple-200">
                    {cat.subtitulo}
                  </p>
                  <h3 className="text-xl md:text-2xl font-normal font-serif tracking-wide">
                    {cat.titulo}
                  </h3>
                </div>
                <button className="bg-white/90 backdrop-blur-md p-4 rounded-full text-gray-900 shadow-xl transition-all duration-300 transform group-hover:scale-110 hover:bg-white">
                  <Compass className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PIE DE PÁGINA (FOOTER) INSTITUCIONAL */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-gray-100">
            
            {/* Columna Marca */}
            <div className="space-y-4">
              <div className="font-serif text-xl tracking-tight">
                <span className="text-gray-800 font-normal">Paseo</span>
                <span style={{ color: '#572364', fontWeight: 600 }}>Mora</span>
              </div>
              <p className="text-xs font-light leading-relaxed text-gray-400">
                La plataforma definitiva de moda de autor y piezas curadas en Paraguay.
              </p>
            </div>

            {/* Columna Enlaces - Plataforma */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Plataforma</h4>
              <ul className="space-y-2 text-xs font-light text-gray-500">
                <li><a href="#" className="hover:text-gray-950 transition-all">Diseñadores Locales</a></li>
                <li><a href="#" className="hover:text-gray-950 transition-all">Nuevos Lanzamientos</a></li>
                <li><a href="#" className="hover:text-gray-950 transition-all">Cómo Vender</a></li>
              </ul>
            </div>

            {/* Columna Enlaces - Soporte */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Soporte Premium</h4>
              <ul className="space-y-2 text-xs font-light text-gray-500">
                <li><a href="#" className="hover:text-gray-950 transition-all">Garantía de Autenticidad</a></li>
                <li><a href="#" className="hover:text-gray-950 transition-all">Envíos y Entregas</a></li>
                <li><a href="#" className="hover:text-gray-950 transition-all">Contacto Directo</a></li>
              </ul>
            </div>

            {/* Columna Filosofía */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 flex items-center gap-1">
                <Sparkle className="w-3 h-3" style={{ color: '#572364' }} /> Nuestra Visión
              </h4>
              <p className="text-xs font-light leading-relaxed text-gray-400">
                Apostamos por la permanencia del diseño sobre lo masivo. Cada firma dentro de Paseo Mora comparte un estándar riguroso de confección.
              </p>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-gray-400">
            <p>© 2026 Paseo Mora. Todos los derechos reservados. Asunción, Paraguay.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-900 transition-all">Privacidad</a>
              <a href="#" className="hover:text-gray-900 transition-all">Términos de Uso</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}