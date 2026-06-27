'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  DollarSign, 
  RefreshCw, 
  Truck, 
  User, 
  Phone, 
  MapPin 
} from 'lucide-react';

interface Pedido {
  id: string;
  created_at: string;
  nombre: string;
  telefono: string;
  ciudad: string;
  direccion: string;
  metodo_pago: string;
  total: number;
  estado: string;
  productos: any[];
}

export default function DashboardPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState('Todos');

  // Cargar pedidos desde Supabase
  const consultarPedidos = async () => {
    setCargando(true);
    try {
      const { data, error } = await supabase
        .from('pedidos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPedidos(data || []);
    } catch (error: any) {
      console.error('Error cargando pedidos:', error.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    consultarPedidos();
  }, []);

  // Cambiar el estado de un pedido de forma instantánea
  const actualizarEstado = async (id: string, nuevoEstado: string) => {
    try {
      const { error } = await supabase
        .from('pedidos')
        .update({ estado: nuevoEstado })
        .eq('id', id);

      if (error) throw error;
      
      // Actualizar interfaz localmente sin recargar todo de la BD
      setPedidos(prev => prev.map(p => p.id === id ? { ...p, estado: nuevoEstado } : p));
    } catch (error: any) {
      alert('Error al actualizar estado: ' + error.message);
    }
  };

  // Filtrado de la lista
  const pedidosFiltrados = pedidos.filter(p => filtroEstado === 'Todos' || p.estado === filtroEstado);

  // Cálculos de Métricas
  const ingresosTotales = pedidos.filter(p => p.estado === 'Entregado').reduce((sum, p) => sum + p.total, 0);
  const pendientesContador = pedidos.filter(p => p.estado === 'Pendiente' || p.estado === 'En Preparación').length;
  const completadosContador = pedidos.filter(p => p.estado === 'Entregado').length;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#545454]">
      {/* Header del Admin */}
      <header className="bg-white border-b border-gray-100 shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-[#4E3629] p-2 rounded-lg text-white font-bold text-xl">PM</div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Panel de Control</h1>
            <p className="text-xs text-gray-500">Gestión de Órdenes y Logística — Paseo Mora</p>
          </div>
        </div>
        <button 
          onClick={consultarPedidos} 
          className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-sm font-medium py-2 px-4 rounded-lg transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${cargando ? 'animate-spin' : ''}`} />
          Sincronizar
        </button>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Grilla de Métricas Reales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">Ventas Completadas</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">Gs. {ingresosTotales.toLocaleString('es-PY')}</h3>
            </div>
            <div className="bg-emerald-50 text-emerald-600 p-3 rounded-lg"><DollarSign className="w-6 h-6" /></div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">Órdenes Totales</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{pedidos.length}</h3>
            </div>
            <div className="bg-blue-50 text-blue-600 p-3 rounded-lg"><ShoppingBag className="w-6 h-6" /></div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">Por Procesar</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{pendientesContador}</h3>
            </div>
            <div className="bg-amber-50 text-amber-600 p-3 rounded-lg"><Clock className="w-6 h-6" /></div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">Entregados con Éxito</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{completadosContador}</h3>
            </div>
            <div className="bg-purple-50 text-purple-600 p-3 rounded-lg"><CheckCircle2 className="w-6 h-6" /></div>
          </div>
        </div>

        {/* Barra de Filtros */}
        <div className="flex gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
          {['Todos', 'Pendiente', 'En Preparación', 'Despachado', 'Entregado'].map((estado) => (
            <button
              key={estado}
              onClick={() => setFiltroEstado(estado)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
                filtroEstado === estado 
                  ? 'border-[#4E3629] text-[#4E3629] bg-orange-50/40' 
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {estado}
            </button>
          ))}
        </div>

        {/* Listado Principal de Pedidos */}
        {cargando ? (
          <div className="text-center py-12 text-gray-400 font-medium animate-pulse">Cargando flujos de órdenes de Supabase...</div>
        ) : pedidosFiltrados.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100 text-gray-400">No hay pedidos en este estado en este momento.</div>
        ) : (
          <div className="space-y-4">
            {pedidosFiltrados.map((pedido) => (
              <div key={pedido.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Columna 1: Datos del Cliente */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-gray-500">#{pedido.id.slice(0,8)}</span>
                    <span className="text-xs text-gray-400">{new Date(pedido.created_at).toLocaleDateString('es-PY', {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 flex items-center gap-2"><User className="w-4 h-4 text-gray-400" /> {pedido.nombre}</h4>
                  <p className="text-sm flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" /> {pedido.telefono}</p>
                  <p className="text-sm flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400" /> {pedido.direccion} ({pedido.ciudad})</p>
                </div>

                {/* Columna 2: Productos Comprados */}
                <div className="bg-gray-50/50 p-4 rounded-lg space-y-2 border border-gray-50">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Productos</p>
                  <div className="divide-y divide-gray-100 max-h-[120px] overflow-y-auto pr-1">
                    {pedido.productos?.map((item: any, idx: number) => (
                      <div key={idx} className="py-2 flex justify-between text-sm">
                        <span className="text-gray-700">{item.titulo || item.productotitulo || 'Prenda'} <strong className="text-gray-400 font-normal">x{item.cantidad}</strong></span>
                        <span className="font-medium text-gray-900">Gs. {((item.precio || 0) * (item.cantidad || 1)).toLocaleString('es-PY')}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-500">Pago: {pedido.metodo_pago.toUpperCase()}</span>
                    <span className="font-bold text-base text-[#4E3629]">Gs. {pedido.total.toLocaleString('es-PY')}</span>
                  </div>
                </div>

                {/* Columna 3: Control Operativo de Estados */}
                <div className="flex flex-col justify-between lg:items-end gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">Estado:</span>
                    <select
                      value={pedido.estado}
                      onChange={(e) => actualizarEstado(pedido.id, e.target.value)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:outline-none transition-colors ${
                        pedido.estado === 'Pendiente' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        pedido.estado === 'En Preparación' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        pedido.estado === 'Despachado' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      <option value="Pendiente">⏳ Pendiente</option>
                      <option value="En Preparación">📦 En Preparación</option>
                      <option value="Despachado">🚚 Despachado</option>
                      <option value="Entregado">✅ Entregado</option>
                    </select>
                  </div>
                  
                  <div className="text-xs text-gray-400 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5" /> Cambiar estado impacta al instante.
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}