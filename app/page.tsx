'use client';
import React from 'react';
import Header from '../components/Header';
import Link from 'next/link'; // ← Importante: Agregamos esto para que funcione el componente <Link>
import { ShoppingBag, ArrowUpRight, ShieldCheck, Sparkles, Compass, Shirt, Sparkle } from 'lucide-react';
import { useCart } from '../components/CartContext';

const CATALOGO_EXCLUSIVO = [
  {
    id: 1,
    titulo: "Lentes de Sol 'Blackout' Acetato Italiano",
    tienda: "Studio Asunción",
    precio: 1250000, 
    precioTexto: "Gs. 1.250.000",
    imagen: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    categoria: "Accesorios"
  },
  {
    id: 2,
    titulo: "Campera Bomber de Cuero Oversized '90s",
    tienda: "Mora Atelier",
    precio: 3400000,
    precioTexto: "Gs. 3.400.000",
    imagen: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    categoria: "Abrigos"
  },
  {
    id: 3,
    titulo: "Botas de Asfalto en Cuero Crudo Estilizado",
    tienda: "The Baseline",
    precio: 1850000,
    precioTexto: "Gs. 1.850.000",
    imagen: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80",
    categoria: "Calzados"
  },
  {
    id: 4,
    titulo: "Vestido Acanalado 'Sienna' Espalda Descubierta",
    tienda: "Mora Atelier",
    precio: 2100000,
    precioTexto: "Gs. 2.100.000",
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
  const { agregarAlCarrito, setIsOpen } = useCart();

  const handleComprar = (prod: any) => {
    agregarAlCarrito(prod);
    setIsOpen(true); 
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#545454] antialiased selection:bg-purple-100 font-sans tracking-tight">
      <Header />

      {/* SECCIÓN PRINCIPAL ASIMÉTRICA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 border-b border-[#572364]/20 pb-2">
              <span className="text-[9px] font-black uppercase tracking-[0.4em]" style={{ color: '#572364' }}>
                Galería de Moda Seleccionada
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.05] text-gray-900 uppercase">
              El arte de <br />
              vestir con <span className="font-light tracking-wide lowercase italic" style={{ color: '#572364' }}>actitud</span>.
            </h1>
            <p className="text-xs md:text-sm font-normal tracking-wide leading-relaxed max-w-sm mx-auto lg:mx-0 opacity-80">
              Una selección exclusiva de las prendas y marcas más codiciadas de Asunción. Diseñado para quienes dictan la tendencia, no para quienes la siguen.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button 
                className="text-white font-bold text-[10px] uppercase tracking-[0.25em] px-10 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-900/20 hover:opacity-95 transform hover:-translate-y-0.5 cursor-pointer"
                style={{ backgroundColor: '#572364' }}
              >
                Explorar Colecciones
              </button>
              <button 
                className="bg-transparent font-bold text-[10px] uppercase tracking-[0.25em] px-10 py-4 rounded-xl border border-gray-200 hover:border-gray-900 transition-all duration-300 text-gray-800 cursor-pointer"
              >
                Ver Diseñadores
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-gray-50 rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-200/50 group">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                poster="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80"
                className="w-full h-full object-cover grayscale-[25%] contrast-[1.05] transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-fashion-woman-with-silver-makeup-40343-large.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 right-6 text-white text-[9px] font-bold uppercase tracking-[0.25em] flex items-center gap-2 bg-black/40 backdrop-blur-lg px-4 py-2 rounded-xl border border-white/10">
                <Sparkles className="w-3 h-3 text-purple-200 animate-pulse" /> Edición Verano 01
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE GARANTÍAS */}
      <section className="bg-gray-50/50 border-y border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4 group">
            <div className="p-3 bg-white rounded-xl border border-gray-100">
              <ShieldCheck className="w-5 h-5" style={{ color: '#572364' }} />
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-900">Autenticidad Verificada</h3>
              <p className="text-xs font-normal text-gray-400 mt-0.5">Alianza directa con las marcas autorizadas del país.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 group">
            <div className="p-3 bg-white rounded-xl border border-gray-100">
              <ShoppingBag className="w-5 h-5" style={{ color: '#572364' }} />
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-900">Lanzamientos Limitados</h3>
              <p className="text-xs font-normal text-gray-400 mt-0.5">Piezas únicas seleccionadas para un armario exigente.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 group">
            <div className="p-3 bg-white rounded-xl border border-gray-100 relative">
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></div>
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <Shirt className="w-5 h-5" style={{ color: '#572364' }} />
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-900">Envío Premium en Asunción</h3>
              <p className="text-xs font-normal text-gray-400 mt-0.5">Entregas protegidas directamente en tu puerta.</p>
            </div>
          </div>
        </div>
      </section>

      {/* VITRINA DE PRODUCTOS CON CONEXIÓN AL CARRITO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4 border-b border-gray-100 pb-8">
          <div>
            <span className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: '#572364' }}>
              Catálogo de Tendencias
            </span>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight uppercase mt-1">
              Piezas Destacadas
            </h2>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
            Filtrando el mejor design local
          </div>
        </div>

        {/* AQUÍ ESTÁ EL CAMBIO SOLICITADO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATALOGO_EXCLUSIVO.map((prod) => (
            <div key={prod.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-purple-900/[0.02] transition-all duration-500">
              
              {/* IMAGEN: Ahora es un Link dinámico */}
              <Link href={`/producto/${prod.id}`} className="relative aspect-[3/4] w-full bg-gray-50 overflow-hidden cursor-pointer">
                <img 
                  src={prod.imagen} 
                  alt={prod.titulo} 
                  className="w-full h-full object-cover grayscale-[10%] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-gray-900 text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-black/5 shadow-sm">
                  {prod.categoria}
                </span>
              </Link>

              <div className="p-6 flex flex-col justify-between flex-1 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-black tracking-widest uppercase">
                    <span style={{ color: '#572364' }}>{prod.tienda}</span>
                    {/* LINK EN "VER" */}
                    <Link href={`/producto/${prod.id}`} className="text-gray-400 font-bold flex items-center gap-0.5 group-hover:text-gray-900 transition-colors cursor-pointer">
                      Ver <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                  
                  {/* TÍTULO: Ahora es un Link dinámico */}
                  <Link href={`/producto/${prod.id}`} className="block cursor-pointer">
                    <h3 className="text-sm font-semibold text-gray-900 tracking-tight leading-snug line-clamp-2 hover:text-[#572364] transition-colors">
                      {prod.titulo}
                    </h3>
                  </Link>
                  <p className="text-sm font-medium pt-1 font-mono text-gray-600">
                    {prod.precioTexto}
                  </p>
                </div>

                {/* BOTÓN CON FUNCIÓN CONECTADA */}
                <button 
                  onClick={() => handleComprar(prod)}
                  className="w-full text-white font-bold py-3.5 rounded-xl text-[10px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:bg-opacity-95 transform hover:-translate-y-0.5 cursor-pointer"
                  style={{ backgroundColor: '#572364' }}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Agregar al carrito
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* MANIFIESTO URBANO ASIMÉTRICO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-[4/5] bg-gray-50 rounded-[2.5rem] overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=1000&q=80" 
              alt="Estilo Contemporáneo Urbano" 
              className="w-full h-full object-cover grayscale-[20%] contrast-[1.05]"
            />
          </div>
          <div className="space-y-8 max-w-md">
            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: '#572364' }}>
              <Shirt className="w-3.5 h-3.5" /> Estética Contemporánea
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight uppercase">
              Líneas limpias. <br />
              Identidad <span className="font-light tracking-wide lowercase italic text-gray-500">sin esfuerzo</span>.
            </h2>
            <p className="text-xs font-normal leading-relaxed text-gray-500">
              Nuestra propuesta rompe el molde tradicional. Fusionamos prendas de corte impecable, siluetas amplias y una paleta neutra pensada para quienes entienden que el verdadero lujo no grita; se nota a la distancia.
            </p>
            <div className="pt-2">
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest pb-1 border-b-2 border-gray-950 hover:text-[#572364] hover:border-[#572364] transition-all cursor-pointer">
                Explorar el Manifiesto Urbano <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORÍAS EDITORIALES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-16">
        <div className="mb-12 border-b border-gray-100 pb-6">
          <span className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: '#572364' }}>
            Curaduría de Armario
          </span>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight uppercase mt-1">
            Explorar por Inspiración
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {CATEGORIAS_CURADAS.map((cat) => (
            <div key={cat.id} className={`${cat.ancho} relative aspect-[16/10] sm:aspect-[21/10] lg:aspect-auto lg:h-[480px] rounded-[2rem] overflow-hidden group shadow-sm`}>
              <img src={cat.imagen} alt={cat.titulo} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 grayscale-[15%] contrast-[1.02]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                <div className="text-white space-y-1">
                  <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-purple-200/80">{cat.subtitulo}</p>
                  <h3 className="text-2xl font-bold tracking-tight uppercase">{cat.titulo}</h3>
                </div>
                <button className="bg-white/95 backdrop-blur-md p-4 rounded-full text-gray-900 shadow-xl transition-all border border-white/20 cursor-pointer">
                  <Compass className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 pt-20 pb-12 text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-gray-100">
            <div className="space-y-4">
              <div className="text-xl tracking-tight uppercase font-black">
                <span className="text-gray-900 font-light">Paseo</span>
                <span style={{ color: '#572364' }}>Mora</span>
              </div>
              <p className="text-xs font-normal leading-relaxed text-gray-400">La plataforma definitiva de moda de autor y piezas curadas en Paraguay.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-900">Plataforma</h4>
              <ul className="space-y-2.5 text-xs font-normal text-gray-400">
                <li><a href="#" className="hover:text-gray-950">Diseñadores Locales</a></li>
                <li><a href="#" className="hover:text-gray-950">Nuevos Lanzamientos</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-900">Soporte Premium</h4>
              <ul className="space-y-2.5 text-xs font-normal text-gray-400">
                <li><a href="#" className="hover:text-gray-950">Garantía de Autenticidad</a></li>
                <li><a href="#" className="hover:text-gray-950">Envíos y Entregas</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-900 flex items-center gap-1">
                <Sparkle className="w-3 h-3" style={{ color: '#572364' }} /> Nuestra Visión
              </h4>
              <p className="text-xs font-normal leading-relaxed text-gray-400">Apostamos por la permanencia del design sobre lo masivo.</p>
            </div>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-normal text-gray-400">
            <p>© 2026 Paseo Mora. Todos los derechos reservados. Asunción, Paraguay.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}