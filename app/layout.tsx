import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "../components/CartContext";
import CartSidebar from "../components/CartSidebar";

export const metadata: Metadata = {
  title: "Paseo Mora - Tu paseo de compras online, sin límites.",
  description: "El marketplace unificado de las tiendas independientes de Paraguay.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        <CartProvider>
          {children}
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}