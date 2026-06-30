'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import { CheckCircle2, ShoppingBag, MessageSquare, ArrowRight, ClipboardList } from 'lucide-react';

interface ItemCarrito {
  id: number;
  titulo: string;
  precio: number;
  cantidad: number;
}

export default function CheckoutExitoPage() {
  const [pedido, setPedido] = useState<ItemCarrito[]>([]);
  const [total, setTotal] = useState(0);
  const [nroPedido, setNroPedido] = useState('');

  useEffect(() => {
    // 1. Recuperamos temporalmente los productos que el usuario compró para armar el resumen
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      const items = JSON.parse(carritoGuardado);
      setPedido(items);
      
      // Calcular el total general
      const subtotal = items.reduce((acc: number, item: ItemCarrito) => acc + (item.precio * item.cantidad), 0);
      setTotal(subtotal);
    }

    // 2. Generamos un número de pedido único aleatorio para control de la tienda
    const idAleatorio = 'PM-' + Math.floor(100000 + Math.random() * 900000);
    setNroPedido(idAleatorio);

    // NOTA OPCIONAL: Si querés vaciar el carrito inmediatamente después de la compra, 
    // descomentá la siguiente línea. Por ahora la dejamos comentada para que pruebes.
    // localStorage.removeItem('carrito');
  }, []);

  // 3. Función para armar y disparar el mensaje dinámico de WhatsApp
  const enviarWhatsApp = () => {
    const nroTelefono = '595981123456'; // Aquí irá tu número real de Paseo Mora o de la tienda
    
    let mensaje = `*¡Hola Paseo Mora!* 🛍️\n`;
    mensaje += `Acabo de realizar un pedido en la web.\n\n`;
    mensaje += `*Orden:* #${nroPedido}\n`;
    mensaje += `-----------------------------------\n`;
    
    pedido.forEach(item => {
      mensaje += `• ${item.cantidad}x ${item.titulo} (${(item.precio * item.cantidad).toLocaleString('es-PY')} ₲)\n`;
    });
    
    mensaje += `-----------------------------------\n`;
    mensaje += `*Total General:* ${total.toLocaleString('es-PY')} ₲\n\n`;
    mensaje += `Quedo atento para coordinar el pago y el envío. ¡Muchas gracias!`;

    // Codificamos el texto para que sea una URL válida de WhatsApp
    const urlFormat = `https://wa.me/${nroTelefono}?text=${encodeURIComponent(mensaje)}`;
    
    // Abrimos en una pestaña nueva
    window.open(urlFormat, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#545454] antialiased tracking-tight">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-16 text-center space-y-8">
        
        {/* ICONO DE ÉXITO */}
        <div className="flex justify-center">
          <div className="bg-emerald-50 p-4 rounded-full border border-emerald-100 animate-pulse">
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </div>
        </div>

        {/* ENCABEZADO */}
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">¡Pedido Confirmado!</p>
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-gray-900">¡Gracias por tu compra!</h1>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Tu orden <span className="font-mono font-bold text-gray-900">#{nroPedido}</span> ha sido generada con éxito en nuestro sistema de Paseo Mora.
          </p>
        </div>

        {/* RESUMEN DE LA ORDEN DE COMPRA */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 text-left space-y-4 shadow-sm">
          <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
            <ClipboardList className="w-4 h-4 text-gray-400" />
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-900">Resumen del pedido</h2>
          </div>

          {pedido.length === 0 ? (
            <p className="text-xs text-gray-400 py-2">No se encontraron productos en la orden reciente.</p>
          ) : (
            <div className="divide-y divide-gray-50">
              {pedido.map((item) => (
                <div key={item.id} className="py-3 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-gray-900 uppercase">{item.titulo}</p>
                    <p className="text-gray-400 font-medium">Cantidad: {item.cantidad}</p>
                  </div>
                  <p className="font-mono font-bold text-gray-900">
                    {(item.precio * item.cantidad).toLocaleString('es-PY')} ₲
                  </p>
                </div>
              ))}
              
              <div className="pt-4 mt-2 flex justify-between items-center text-sm font-black uppercase tracking-wider text-gray-900 border-t border-gray-100">
                <span>Total a Pagar</span>
                <span className="font-mono text-base">{total.toLocaleString('es-PY')} ₲</span>
              </div>
            </div>
          )}
        </div>

        {/* ACCIÓN PRINCIPAL: BOTÓN WHATSAPP */}
        <div className="space-y-3 pt-2">
          <button
            onClick={enviarWhatsApp}
            className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100 group"
          >
            <MessageSquare className="w-4 h-4" />
            Notificar pedido por WhatsApp
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="text-[10px] text-gray-400 font-medium max-w-xs mx-auto">
            Hacé clic arriba para enviar los detalles exactos y coordinar de inmediato el método de pago y envío con la tienda.
          </p>
        </div>

        {/* ACCIÓN SECUNDARIA: VOLVER */}
        <div className="pt-4">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#4E3629] underline hover:text-gray-600 transition-colors">
            <ShoppingBag className="w-3 h-3" /> Seguir recorriendo el Paseo
          </Link>
        </div>

      </main>
    </div>
  );
}