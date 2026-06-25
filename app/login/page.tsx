'use client';
import React, { useState } from 'react';
import { ArrowLeft, Sparkle, Eye, EyeOff, ShieldCheck, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../supabase'; // Ajustá esta ruta si tu archivo supabase.ts está en otra carpeta

export default function AuthPage() {
  const router = useRouter();
  const [esLogin, setEsLogin] = useState(true);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);
  
  // Estados para el formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setErrorMensaje(null);

    try {
      if (esLogin) {
        // --- FLUJO DE INICIO DE SESIÓN ---
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        // Login exitoso -> Redireccionamos a la Home o al Panel
        router.push('/');
        router.refresh();
      } else {
        // --- FLUJO DE REGISTRO ---
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: nombre, // Guardamos el nombre premium en los metadatos del usuario
            },
          },
        });

        if (error) throw error;

        if (data?.user && data.session === null) {
          setErrorMensaje('¡Registro casi listo! Por favor, verificá tu correo electrónico para confirmar tu cuenta.');
        } else {
          router.push('/');
          router.refresh();
        }
      }
    } catch (err: any) {
      // Traducimos los errores comunes de Supabase para mantener la experiencia impecable
      if (err.message === 'Invalid login credentials') {
        setErrorMensaje('Las credenciales ingresadas no son válidas. Revisá tu correo o contraseña.');
      } else if (err.message === 'User already registered') {
        setErrorMensaje('Este correo electrónico ya se encuentra registrado.');
      } else {
        setErrorMensaje(err.message || 'Ocurrió un error inesperado. Intentá de nuevo.');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#545454] antialiased flex font-sans select-none">
      
      {/* COLUMNA IZQUIERDA: FORMULARIO PREMIUM */}
      <div className="w-full lg:w-[45%] flex flex-col justify-between p-8 sm:p-12 md:p-16 relative z-10 bg-[#FDFDFD]">
        
        {/* Header del Formulario */}
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 hover:text-gray-950 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            Volver al Paseo
          </Link>
          
          <div className="text-sm tracking-tight uppercase font-black">
            <span className="text-gray-900 font-light">Paseo</span>
            <span style={{ color: '#572364' }}>Mora</span>
          </div>
        </div>

        {/* Bloque Central: El Formulario */}
        <div className="max-w-sm w-full mx-auto my-auto space-y-8 py-12">
          <div className="space-y-2">
            <span className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: '#572364' }}>
              {esLogin ? 'Acceso Exclusivo' : 'Crear Identidad'}
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight uppercase leading-none">
              {esLogin ? 'Bienvenido de ' : 'Formar parte del '}
              <br />
              <span className="font-light tracking-wide lowercase italic text-gray-500">
                {esLogin ? 'vuelta.' : 'manifiesto.'}
              </span>
            </h1>
          </div>

          {/* Banner de Feedback de Errores o Alertas */}
          {errorMensaje && (
            <div className={`p-4 rounded-xl text-xs font-medium leading-relaxed border ${
              errorMensaje.includes('¡Registro casi listo!') 
                ? 'bg-emerald-50/60 text-emerald-800 border-emerald-100' 
                : 'bg-rose-50/60 text-rose-800 border-rose-100'
            }`}>
              {errorMensaje}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Campo Nombre (Solo visible en Registro) */}
            {!esLogin && (
              <div className="space-y-1.5 transform transition-all duration-300">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block">
                  Nombre Completo
                </label>
                <input 
                  type="text"
                  required
                  disabled={cargando}
                  placeholder="Tu nombre o firma"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full bg-gray-50/50 border border-gray-100 focus:border-gray-900 focus:bg-white text-sm px-4 py-3.5 rounded-xl transition-all duration-300 outline-none font-medium text-gray-900 placeholder:text-gray-300 placeholder:font-light disabled:opacity-50"
                />
              </div>
            )}

            {/* Campo Email */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block">
                Correo Electrónico
              </label>
              <input 
                type="email"
                required
                disabled={cargando}
                placeholder="ejemplo@paseomora.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50/50 border border-gray-100 focus:border-gray-900 focus:bg-white text-sm px-4 py-3.5 rounded-xl transition-all duration-300 outline-none font-medium text-gray-900 placeholder:text-gray-300 placeholder:font-light disabled:opacity-50"
              />
            </div>

            {/* Campo Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block">
                  Contraseña
                </label>
                {esLogin && (
                  <a href="#" className="text-[9px] font-bold uppercase tracking-wider text-gray-400 hover:text-gray-900 transition-colors">
                    ¿Olvidaste?
                  </a>
                )}
              </div>
              <div className="relative">
                <input 
                  type={mostrarPassword ? "text" : "password"}
                  required
                  disabled={cargando}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50/50 border border-gray-100 focus:border-gray-900 focus:bg-white text-sm px-4 py-3.5 rounded-xl transition-all duration-300 outline-none font-medium text-gray-900 placeholder:text-gray-300 font-mono disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors p-1"
                >
                  {mostrarPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Botón Principal Accionable con Spinner */}
            <div className="pt-2">
              <button 
                type="submit"
                disabled={cargando}
                className="w-full text-white font-bold py-4 rounded-xl text-[10px] uppercase tracking-[0.25em] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-900/10 hover:opacity-95 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
                style={{ backgroundColor: '#572364' }}
              >
                {cargando ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Procesando Solicitud...
                  </>
                ) : (
                  esLogin ? 'Ingresar a la Galería' : 'Crear Cuenta Premium'
                )}
              </button>
            </div>
          </form>

          {/* Toggle de Modo (Login / Registro) */}
          <div className="text-center pt-2">
            <p className="text-xs text-gray-400 font-normal">
              {esLogin ? '¿No tenés una invitación activa?' : '¿Ya formas parte de Paseo Mora?'}
              <button 
                type="button"
                disabled={cargando}
                onClick={() => {
                  setEsLogin(!esLogin);
                  setErrorMensaje(null);
                  setNombre('');
                  setEmail('');
                  setPassword('');
                }}
                className="block mx-auto mt-2 text-[10px] font-black uppercase tracking-widest border-b-2 border-gray-950 text-gray-900 pb-0.5 hover:text-[#572364] hover:border-[#572364] transition-all cursor-pointer disabled:opacity-50"
              >
                {esLogin ? 'Registrarme Ahora' : 'Iniciar Sesión'}
              </button>
            </p>
          </div>
        </div>

        {/* Footer del Formulario */}
        <div className="flex items-center justify-center gap-4 text-[10px] text-gray-400 font-normal border-t border-gray-100/60 pt-6">
          <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-gray-400" /> Datos Encriptados</span>
          <span>•</span>
          <a href="#" className="hover:text-gray-900 transition-colors">Soporte</a>
        </div>

      </div>

      {/* COLUMNA DERECHA: DIRECCIÓN DE ARTE EDITORIAL IMPECABLE */}
      <div className="hidden lg:block lg:w-[55%] relative bg-gray-900 overflow-hidden">
        <img 
          src={esLogin 
            ? "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80" 
            : "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80" 
          } 
          alt="Paseo Mora Editorial" 
          className="w-full h-full object-cover grayscale-[20%] contrast-[1.08] transition-all duration-1000 ease-in-out scale-102"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40"></div>
        <div className="absolute bottom-16 left-16 right-16 text-white space-y-4 max-w-md">
          <div className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-purple-200/80 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
            <Sparkle className="w-3 h-3 text-purple-200" /> Filosofía de Diseño
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tight leading-none text-white">
            El verdadero lujo <br />
            no grita; <span className="font-light tracking-wide lowercase italic text-purple-200">se nota.</span>
          </h2>
          <p className="text-xs font-normal text-white/60 leading-relaxed tracking-wide">
            Cada pieza disponible en Paseo Mora ha pasado por un riguroso proceso de curaduría. Accedés al epicentro del diseño contemporáneo de autor en Asunción.
          </p>
        </div>
        <div className="absolute top-12 right-12 text-white/50 text-[9px] font-black uppercase tracking-[0.25em]">
          Asunción, Py // ©2026
        </div>
      </div>

    </div>
  );
}