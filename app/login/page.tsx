'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../supabase';
import { Lock, Mail, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const manejarLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCargando(true);
      setError(null);

      // Intentamos iniciar sesión en el backend de Supabase
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Si las credenciales son correctas, lo redireccionamos al panel del vendedor
      router.push('/vendedor');
      router.refresh(); // Refresca la ruta para que Next.js valide que ya está logueado
    } catch (err: any) {
      console.error('Error en la autenticación:', err);
      setError(err.message || 'Credenciales inválidas. Verificá tu correo o contraseña.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative">
      
      {/* Botón sutil para volver al Home */}
      <div className="absolute top-6 left-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Volver a la tienda
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <span className="text-3xl font-black tracking-tight" style={{ color: '#545454' }}>Paseo</span>
          <span className="text-3xl font-black tracking-tight" style={{ color: '#572364' }}>Mora</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          Ingreso exclusivo para tiendas aliadas
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Gestioná tus productos, stock y pedidos en tiempo real.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-100 sm:rounded-2xl sm:px-10 space-y-6">
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-900 p-3 rounded-xl text-xs font-semibold text-center animate-shake">
              ⚠️ {error === 'Invalid login credentials' ? 'El correo o la contraseña son incorrectos.' : error}
            </div>
          )}

          <form onSubmit={manejarLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase">Correo Electrónico</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@tienda.com"
                  className="w-full bg-gray-50 text-gray-800 placeholder-gray-400 pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-300 focus:bg-white transition-all text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 text-gray-800 placeholder-gray-400 pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-300 focus:bg-white transition-all text-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="w-full text-white font-bold py-3 rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-2 hover:bg-opacity-90 disabled:opacity-50 mt-2"
              style={{ backgroundColor: '#572364' }}
            >
              {cargando ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verificando credenciales...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}