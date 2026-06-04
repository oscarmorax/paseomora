import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
      <div className="max-w-2xl text-center bg-white p-12 rounded-2xl shadow-2xl border border-gray-100">
        
        {/* Tu Marca con tus Colores Corporativos Reales */}
        <h1 className="text-6xl font-extrabold tracking-tight mb-4">
          <span style={{ color: '#545454' }}>Paseo</span>{" "}
          <span style={{ color: '#572364' }}>Mora</span>
        </h1>
        
        {/* Slogan mucho más comercial */}
        <p className="text-gray-600 text-xl mb-8 font-medium tracking-wide">
          Tu paseo de compras online, sin límites.
        </p>

        <div className="inline-flex items-center gap-2 bg-purple-50 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase border border-purple-200 animate-pulse" style={{ color: '#572364' }}>
          🚀 Plataforma en Desarrollo
        </div>

        {/* Pilares de Paseo Mora */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
              <span>⚡</span> Todo Pago
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">Bancard, Dinelco y Pagopar integrados en un solo lugar.</p>
          </div>
          
          <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
              <span>💎</span> Premium
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">Experiencia de usuario fluida, rápida y diseñada para vender.</p>
          </div>
          
          <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
              <span>🚀</span> Neutral
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">Libertad total para comercios y usuarios sin ataduras bancarias.</p>
          </div>
        </div>

      </div>
    </main>
  );
}