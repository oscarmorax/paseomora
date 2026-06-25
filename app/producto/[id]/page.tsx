'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../../components/Header';
import { useCart } from '../../../components/CartContext';
import { ShoppingBag, ShieldCheck, Truck, Plus, Minus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Simulación de Base de Datos
const BASE_PRODUCTOS = [
  {
    id: 1,
    titulo: "Lentes de Sol 'Blackout' Acetato Italiano",
    tienda: "Studio Asunción",
    precio: 1250000,
    precioTexto: "Gs. 1.250.000",
    imagen: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    categoria: "Accesorios",
    descripcion: "Protección UV400 absoluta montada sobre un marco de acetato curado a mano en Italia. El modelo 'Blackout' redefine las líneas clásicas con un perfil asimétrico y patillas robustas que graban la identidad de Studio Asunción. Diseñado para resistir tendencias y durar generaciones.",
    talles: ["Único"],
    especificaciones: ["100% Protección UVA/UVB", "Bisagras de alta resistencia de 5 ejes", "Incluye estuche rígido de cuero y paño de microfibra"]
  },
  {
    id: 2,
    titulo: "Campera Bomber de Cuero Oversized '90s",
    tienda: "Mora Atelier",
    precio: 3400000,
    precioTexto: "Gs. 3.400.000",
    imagen: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    categoria: "Abrigos",
    descripcion: "Confeccionada en cuero vacuno crudo con tratamiento de ablandamiento premium. Esta silueta rescata el volumen icónico de las chaquetas de aviador de los años 90, adaptada con hombros caídos y puños de rib elástico reforzado. Una pieza de declaración atemporal.",
    talles: ["S", "M", "L"],
    especificaciones: ["Forrería interna en satén italiano", "Bolsillos laterales con cremalleras YKK ocultas", "Cuero de origen certificado de curtiembres locales"]
  },
  {
    id: 3,
    titulo: "Botas de Asfalto en Cuero Crudo Estilizado",
    tienda: "The Baseline",
    precio: 1850000,
    precioTexto: "Gs. 1.850.000",
    imagen: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80",
    categoria: "Calzados",
    descripcion: "Diseño híbrido entre la rigidez utilitaria y las líneas urbanas estilizadas. Construidas en cuero granulado resistente al agua con suela de caucho vulcanizado antideslizante. Plantilla con tecnología amortiguadora para el uso diario en el asfalto.",
    talles: ["39", "40", "41", "42", "43"],
    especificaciones: ["Construcción con vira reforzada", "Cordones de algodón encerado de alta densidad", "Altura de caña media: 15cm"]
  },
  {
    id: 4,
    titulo: "Vestido Acanalado 'Sienna' Espalda Descubierta",
    tienda: "Mora Atelier",
    precio: 2100000,
    precioTexto: "Gs. 2.100.000",
    imagen: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
    categoria: "Prendas",
    descripcion: "Tejido de punto acanalado de alta densidad que moldea la figura con suavidad y confort. El diseño destaca por un cuello semi-alto en el frente que contrasta dramáticamente con una espalda completamente descubierta y corte asimétrico inferior.",
    talles: ["XS", "S", "M"],
    especificaciones: ["Composición: 85% Algodón orgánico, 15% Elastano", "Textura de rib fino de alto retorno", "Lavado delicado a máquina"]
  }
];

export default function DetalleProducto() {
  const { id } = useParams();
  const { agregarAlCarrito, setIsOpen } = useCart();
  
  const producto = BASE_PRODUCTOS.find((p) => p.id === Number(id));

  const [talleSeleccionado, setTalleSeleccionado] = useState(producto ? producto.talles[0] : '');
  const [cantidad, setCantidad] = useState(1);

  if (!producto) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] flex flex-col items-center justify-center font-sans space-y-4">
        <p className="text-sm font-black uppercase tracking-widest text-gray-900">Pieza no encontrada</p>
        <Link href="/" className="text-xs font-bold text-[#572364] border-b border-[#572364] pb-0.5">
          Volver a la Galería
        </Link>
      </div>
    );
  }

  const manejarSumar = () => setCantidad(prev => prev + 1);
  const manejarRestar = () => setCantidad(prev => prev > 1 ? prev - 1 : 1);

  const alAnadirAlCarrito = () => {
    agregarAlCarrito({
      id: producto.id,
      titulo: producto.talles.includes("Único") ? producto.titulo : `${producto.titulo} (${talleSeleccionado})`,
      tienda: producto.tienda,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: cantidad
    });
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#545454] antialiased font-sans tracking-tight select-none">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* BOTÓN VOLVER ATRÁS */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Volver a la galería
          </Link>
        </div>

        {/* CONTENEDOR ASIMÉTRICO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* BLOQUE IZQUIERDO: Corrección sticky solo para escritorio (lg:) */}
          <div className="block lg:col-span-7 lg:sticky lg:top-28">
            <div className="relative aspect-[3/4] bg-gray-50 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-md">
              <img 
                src={producto.imagen} 
                alt={producto.titulo} 
                className="w-full h-full object-cover grayscale-[5%] contrast-[1.02]"
              />
              <span className="absolute top-4 left-4 md:top-6 md:left-6 bg-white/95 backdrop-blur-md text-gray-900 text-[8px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border border-black/5 shadow-sm">
                Diseño Exclusivo
              </span>
            </div>
          </div>

          {/* BLOQUE DERECHO */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: '#572364' }}>
                  {producto.tienda}
                </span>
                <span className="text-[9px] text-emerald-600 bg-emerald-50 font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                  Disponible
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight uppercase">
                {producto.titulo}
              </h1>
              <p className="text-2xl font-black font-mono text-gray-900 pt-1">
                {producto.precioTexto} <span className="text-[11px] font-sans font-normal text-gray-400 uppercase tracking-widest pl-1">₲ / PY</span>
              </p>
            </div>

            <hr className="border-gray-100" />

            <div className="space-y-2">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-900">Manifiesto de la Prenda</h2>
              <p className="text-xs font-normal leading-relaxed text-gray-500 opacity-95">
                {producto.descripcion}
              </p>
            </div>

            {/* Selección de Talles */}
            {producto.talles.length > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-gray-900">Seleccionar Talle</span>
                  <span className="text-gray-400 font-medium lowercase italic underline cursor-pointer">Guía de medidas</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {producto.talles.map((talle) => (
                    <button
                      key={talle}
                      onClick={() => setTalleSeleccionado(talle)}
                      className={`min-w-[50px] px-4 py-3 rounded-xl text-xs font-bold transition-all border duration-300 cursor-pointer ${
                        talleSeleccionado === talle 
                          ? 'text-white border-gray-900 bg-gray-950 shadow-sm' 
                          : 'text-gray-800 border-gray-200 hover:border-gray-900 bg-transparent'
                      }`}
                    >
                      {talle}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selectores y Botón Unificado en Castellano Paraguayo */}
            <div className="space-y-4 pt-2">
              <div className="flex gap-4">
                
                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50/50 p-1">
                  <button onClick={manejarRestar} className="p-2 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-sm font-bold font-mono text-gray-900">
                    {cantidad}
                  </span>
                  <button onClick={manejarSumar} className="p-2 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button 
                  onClick={alAnadirAlCarrito}
                  className="flex-1 text-white font-bold py-4 rounded-xl text-[10px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:opacity-95 transform hover:-translate-y-0.5 cursor-pointer"
                  style={{ backgroundColor: '#572364' }}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Agregar al carrito
                </button>
              </div>
            </div>

            <hr className="border-gray-100" />

            <div className="space-y-4 bg-gray-50/50 p-5 rounded-2xl border border-gray-100/70">
              <div className="flex items-start gap-3 text-xs">
                <ShieldCheck className="w-4 h-4 text-gray-700 flex-shrink-0 mt-0.5" style={{ color: '#572364' }} />
                <div>
                  <h4 className="font-bold text-gray-900 uppercase text-[9px] tracking-widest">Garantía Paseo Mora</h4>
                  <p className="text-gray-400 font-normal mt-0.5">Pieza 100% auténtica despachada de forma directa por el taller de la marca autorizada.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-xs">
                <Truck className="w-4 h-4 text-gray-700 flex-shrink-0 mt-0.5" style={{ color: '#572364' }} />
                <div>
                  <h4 className="font-bold text-gray-900 uppercase text-[9px] tracking-widest">Envío Asegurado</h4>
                  <p className="text-gray-400 font-normal mt-0.5">Entrega prioritaria y protegida dentro de Asunción y Gran Asunción sin costo.</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-900">Detalles de Confección</h3>
              <ul className="space-y-1.5 list-disc list-inside text-xs text-gray-500 font-normal opacity-90 pl-1">
                {producto.especificaciones.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}