'use client';
import React, { useState } from 'react';
import Header from '../../components/Header';
import { supabase } from '../supabase';
import { PlusCircle, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export default function MiPanelPage() {
  // Estados para capturar la información del formulario
  const [titulo, setTitulo] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');
  const [marcaId, setMarcaId] = useState('mora-atelier'); // Por defecto
  const [categoria, setCategoria] = useState('Camperas');  // Por defecto
  const [tienda, setTienda] = useState('Mora Atelier');

  // Estados de control de la interfaz
  const [cargando, setCargando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sincronizar el nombre legible de la tienda según el id interno seleccionado
  const manejarCambioMarca = (id: string) => {
    setMarcaId(id);
    if (id === 'mora-atelier') setTienda('Mora Atelier');
    if (id === 'studio-asuncion') setTienda('Studio Asunción');
    if (id === 'the-baseline') setTienda('The Baseline');
  };

  const manejarGuardarProducto = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setErrorMsg('');
    setMensajeExito(false);

    // Validaciones básicas
    if (!titulo || !precio || !imagen) {
      setErrorMsg('Por favor, completa los campos requeridos (Título, Precio e Imagen).');
      setCargando(false);
      return;
    }

    try {
      // Insertar directo en la tabla "productos" de Supabase
      const { error } = await supabase
        .from('productos')
        .insert([
          {
            titulo: titulo,
            precio: Number(precio),
            imagen: imagen,
            marca_id: marcaId,
            tienda: tienda,
            categoria: categoria
          }
        ]);

      if (error) throw error;

      // Éxito completo: limpiamos el formulario excepto marca y categoría
      setMensajeExito(true);
      setTitulo('');
      setPrecio('');
      setImagen('');

    } catch (error: any) {
      console.error('Error insertando producto:', error.message);
      setErrorMsg(`Error de base de datos: ${error.message}`);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#545454] antialiased tracking-tight font-sans">
      <Header />

      <main className="max-w-xl mx-auto px-4 py-12 md:py-16 space-y-8">
        
        {/* ENCABEZADO PANEL */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-purple-50 px-3 py-1 rounded-full border border-purple-100 text-[#572364] text-[9px] font-black uppercase tracking-widest">
            <Sparkles className="w-3 h-3" /> Panel Interno
          </div>
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-gray-900">
            Carga de Colecciones
          </h1>
          <p className="text-xs text-gray-400 max-w-xs mx-auto">
            Subí nuevas piezas de autor directamente al inventario global de Paseo Mora en tiempo real.
          </p>
        </div>

        {/* MENSAJES DE ESTADO */}
        {mensajeExito && (
          <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-4 rounded-xl flex items-center gap-3 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>¡Pieza guardada de forma nativa e indexada en Supabase con éxito!</span>
          </div>
        )}

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-100 text-rose-800 p-4 rounded-xl flex items-center gap-3 text-xs font-medium">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* FORMULARIO PREMIUM */}
        <form onSubmit={manejarGuardarProducto} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
          
          {/* TÍTULO DE LA PRENDA */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-900 block">Título de la Pieza *</label>
            <input 
              type="text" 
              placeholder="Ej: Campera de Jean Deshilachada"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-gray-300 text-gray-900 transition-colors"
            />
          </div>

          {/* PRECIO EN GUARANÍES */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-900 block">Precio (Solo Números en ₲) *</label>
            <input 
              type="number" 
              placeholder="Ej: 1450000"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3 text-xs font-bold font-mono focus:outline-none focus:border-gray-300 text-gray-900 transition-colors"
            />
          </div>

          {/* URL DE LA IMAGEN */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-900 block">URL de la Imagen (Unsplash u otro) *</label>
            <input 
              type="text" 
              placeholder="https://images.unsplash.com/photo-..."
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
              className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-gray-300 text-gray-400 focus:text-gray-900 transition-colors"
            />
          </div>

          {/* GRUPO MARCA Y CATEGORÍA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* MARCA DESIGNADA */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-900 block">Marca Diseñadora</label>
              <select 
                value={marcaId}
                onChange={(e) => manejarCambioMarca(e.target.value)}
                className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-3 py-3 text-xs font-bold uppercase tracking-wider text-gray-900 focus:outline-none focus:border-gray-300 cursor-pointer"
              >
                <option value="mora-atelier">Mora Atelier</option>
                <option value="studio-asuncion">Studio Asunción</option>
                <option value="the-baseline">The Baseline</option>
              </select>
            </div>

            {/* CATEGORÍA DE FILTRADO */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-900 block">Categoría de Filtro</label>
              <select 
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-3 py-3 text-xs font-bold uppercase tracking-wider text-gray-900 focus:outline-none focus:border-gray-300 cursor-pointer"
              >
                <option value="Camperas">Camperas</option>
                <option value="Pantalones">Pantalones</option>
                <option value="Calzados">Calzados</option>
                <option value="Accesorios">Accesorios</option>
              </select>
            </div>

          </div>

          {/* BOTÓN SUBIR AL PASEO */}
          <button
            type="submit"
            disabled={cargando}
            className="w-full text-white font-bold py-4 rounded-xl text-[10px] uppercase tracking-[0.25em] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:opacity-95 transform hover:-translate-y-0.5 cursor-pointer pt-3 disabled:opacity-50 disabled:pointer-events-none mt-2"
            style={{ backgroundColor: '#572364' }}
          >
            <PlusCircle className="w-4 h-4" />
            {cargando ? 'Subiendo Pieza...' : 'Publicar en el Paseo'}
          </button>

        </form>

      </main>
    </div>
  );
}