'use client';
import React, { useState } from 'react';
import Header from '../../components/Header';
import { useCart } from '../../components/CartContext';
import { CreditCard, Landmark, QrCode, ShieldCheck, ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
// IMPORTAMOS EL CLIENTE DE SUPABASE
import { supabase } from '../supabase'; 

export default function CheckoutPage() {
  const { items, obtenerTotal, vaciarCarrito } = useCart(); // Agregamos vaciarCarrito para limpiar la bolsa al terminar
  
  // Estados del Formulario
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ciudad, setCiudad] = useState('Asunción');
  const [direccion, setDireccion] = useState('');
  const [metodoPago, setMetodoPago] = useState('tarjeta');
  const [cargando, setCargando] = useState(false); // Estado para bloquear el botón mientras se procesa

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cargando) return;

    setCargando(true);
    
    try {
      // Insertamos los datos en la tabla exacta de Supabase
      const { data, error } = await supabase
        .from('pedidos')
        .insert([
          {
            nombre,
            telefono,
            ciudad,
            direccion,
            metodo_pago: metodoPago,
            productos: items, // Mandamos el array completo en formato JSONB
            total: obtenerTotal(),
            estado: 'Pendiente'
          }
        ]);

      if (error) throw error;

      // Si todo sale bien
      alert("¡Pedido confirmado! Tu orden fue registrada en Paseo Mora de manera exitosa.");
      
      // Limpiamos los estados locales y el carrito
      setNombre('');
      setTelefono('');
      setDireccion('');
      vaciarCarrito(); // Resetea el carrito en el contexto global

    } catch (error: any) {
      console.error("Error al guardar el pedido:", error.message);
      alert("Ocurrió un error al procesar tu pedido. Por favor, intentá de nuevo.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#545454] antialiased font-sans tracking-tight select-none">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* VOLVER ATRÁS */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Continuar mirando
          </Link>
        </div>

        <h1 className="text-2xl font-black text-gray-900 uppercase tracking-wider mb-12">Finalizar Compra</h1>

        {/* SI NO HAY ITEMS */}
        {items.length === 0 ? (
          <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-gray-100 flex flex-col items-center justify-center space-y-4">
            <ShoppingBag className="w-8 h-8 text-gray-300" />
            <p className="text-xs font-black uppercase tracking-widest text-gray-900">No tenés productos en el carrito</p>
            <Link href="/" className="text-xs font-bold text-[#572364] border-b border-[#572364] pb-0.5">
              Ir a la galería
            </Link>
          </div>
        ) : (
          /* DOS COLUMNAS ASIMÉTRICAS */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* COLUMNA IZQUIERDA: FORMULARIO (7 Columnas) */}
            <form id="checkout-form" onSubmit={manejarSubmit} className="lg:col-span-7 space-y-10">
              
              {/* SECCIÓN 1: Datos de Entrega */}
              <div className="space-y-6">
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center text-[9px] font-mono">1</span>
                  Datos de Entrega
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Nombre y Apellido *</label>
                    <input 
                      type="text" required placeholder="Ej. Juan Pérez"
                      disabled={cargando}
                      value={nombre} onChange={(e) => setNombre(e.target.value)}
                      className="w-full bg-gray-50/60 border border-gray-100 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gray-900 font-medium transition-colors disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Teléfono / WhatsApp *</label>
                    <input 
                      type="tel" required placeholder="Ej. 0981 123 456"
                      disabled={cargando}
                      value={telefono} onChange={(e) => setTelefono(e.target.value)}
                      className="w-full bg-gray-50/60 border border-gray-100 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gray-900 font-medium transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Ciudad *</label>
                    <select 
                      value={ciudad} onChange={(e) => setCiudad(e.target.value)}
                      disabled={cargando}
                      className="w-full bg-gray-50/60 border border-gray-100 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gray-900 font-medium transition-colors disabled:opacity-50"
                    >
                      <option value="Asunción">Asunción</option>
                      <option value="Fernando de la Mora">Fernando de la Mora</option>
                      <option value="San Lorenzo">San Lorenzo</option>
                      <option value="Luque">Luque</option>
                      <option value="Lambaré">Lambaré</option>
                      <option value="Otra Ciudad">Otra ciudad (Interior)</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Dirección Completa *</label>
                    <input 
                      type="text" required placeholder="Ej. Avda. Mariscal López 1234 c/ Perú"
                      disabled={cargando}
                      value={direccion} onChange={(e) => setDireccion(e.target.value)}
                      className="w-full bg-gray-50/60 border border-gray-100 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gray-900 font-medium transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* SECCIÓN 2: Métodos de Pago */}
              <div className="space-y-6">
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center text-[9px] font-mono">2</span>
                  Forma de Pago
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Tarjeta */}
                  <div 
                    onClick={() => !cargando && setMetodoPago('tarjeta')}
                    className={`p-4 rounded-xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                      metodoPago === 'tarjeta' ? 'border-gray-900 bg-gray-950 text-white' : 'border-gray-100 bg-gray-50/40 hover:border-gray-300'
                    } ${cargando ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Tarjeta Débito/Crédito</span>
                  </div>

                  {/* Transferencia */}
                  <div 
                    onClick={() => !cargando && setMetodoPago('transferencia')}
                    className={`p-4 rounded-xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                      metodoPago === 'transferencia' ? 'border-gray-900 bg-gray-950 text-white' : 'border-gray-100 bg-gray-50/40 hover:border-gray-300'
                    } ${cargando ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Landmark className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Transferencia</span>
                  </div>

                  {/* QR */}
                  <div 
                    onClick={() => !cargando && setMetodoPago('qr')}
                    className={`p-4 rounded-xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                      metodoPago === 'qr' ? 'border-gray-900 bg-gray-950 text-white' : 'border-gray-100 bg-gray-50/40 hover:border-gray-300'
                    } ${cargando ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Pago Seguro QR</span>
                  </div>
                </div>

                {/* Info dinámica del método seleccionado */}
                <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 text-[11px] leading-relaxed text-gray-400">
                  {metodoPago === 'tarjeta' && "Serás redirigido de forma segura a la pasarela de Bancard (Zimple/Infonet) para procesar tus datos."}
                  {metodoPago === 'transferencia' && "Te mostraremos los datos de nuestra cuenta bancaria Itaú al confirmar tu orden para que realices el depósito."}
                  {metodoPago === 'qr' && "Se generará un código QR dinámico de Bancard compatible con la app de cualquier banco o cooperativa de Paraguay."}
                </div>
              </div>

              {/* Botón de envío exclusivo para móvil (se oculta en lg:) */}
              <button 
                type="submit"
                disabled={cargando}
                className="w-full lg:hidden text-white font-bold py-4 rounded-xl text-[10px] uppercase tracking-[0.25em] transition-all shadow-lg hover:opacity-95 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#572364' }}
              >
                {cargando ? "Procesando..." : `Confirmar Pedido • ${obtenerTotal().toLocaleString('es-PY')} ₲`}
              </button>
            </form>

            {/* COLUMNA DERECHA: RESUMEN DE COMPRA (5 Columnas) */}
            <div className="lg:col-span-5 bg-gray-50/40 border border-gray-100 rounded-3xl p-6 lg:p-8 space-y-6 lg:sticky lg:top-28">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-900">Resumen del Pedido</h3>
              
              {/* Lista compacta de items */}
              <div className="max-h-60 overflow-y-auto space-y-4 pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center justify-between pb-3 border-b border-gray-100/70 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200/50">
                        <img src={item.imagen} alt={item.titulo} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-tight line-clamp-1">{item.titulo}</h4>
                        <p className="text-[10px] text-gray-400 font-mono">Cant: {item.cantidad}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold font-mono text-gray-900">
                      {(item.precio * item.cantidad).toLocaleString('es-PY')} ₲
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex justify-between text-[10px] uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold text-gray-900">{obtenerTotal().toLocaleString('es-PY')} ₲</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-widest">
                  <span>Envío</span>
                  <span className="font-mono font-bold text-emerald-600 uppercase tracking-wider">Cortesía</span>
                </div>
                <div className="flex justify-between items-baseline pt-3 border-t border-gray-100">
                  <span className="text-xs font-black uppercase tracking-widest text-gray-900">Total Final</span>
                  <span className="text-xl font-black font-mono text-gray-900">{obtenerTotal().toLocaleString('es-PY')} ₲</span>
                </div>
              </div>

              {/* Botón de envío exclusivo para Escritorio con tipo SUBMIT vinculado al formulario */}
              <button 
                type="submit"
                form="checkout-form"
                disabled={cargando}
                className="hidden lg:flex w-full text-white font-bold py-4 rounded-xl text-[10px] uppercase tracking-[0.25em] transition-all items-center justify-center shadow-lg hover:opacity-95 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#572364' }}
              >
                {cargando ? "Procesando..." : "Confirmar Pedido"}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 pt-2">
                <ShieldCheck className="w-3.5 h-3.5" style={{ color: '#572364' }} />
                <span>Transacción protegida por Paseo Mora</span>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}