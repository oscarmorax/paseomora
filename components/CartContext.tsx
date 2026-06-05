'use client';
import React, { createContext, useContext, useState } from 'react';

// Estructura de un producto dentro del carrito
interface CartItem {
  id: number;
  titulo: string;
  tienda: string;
  precio: number;
  imagen: string;
  cantidad: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  agregarAlCarrito: (producto: any) => void;
  removerDelCarrito: (id: number) => void;
  setIsOpen: (open: boolean) => void;
  obtenerTotal: () => number;
  obtenerCantidadTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const agregarAlCarrito = (producto: any) => {
    setItems((itemsPrevios) => {
      const existe = itemsPrevios.find((item) => item.id === producto.id);
      if (existe) {
        return itemsPrevios.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...itemsPrevios, { ...producto, cantidad: 1 }];
    });
    // setIsOpen(true); // Abre automáticamente el carrito lateral al agregar un producto para dar feedback visual
  };

  const removerDelCarrito = (id: number) => {
    setItems((itemsPrevios) => itemsPrevios.filter((item) => item.id !== id));
  };

  const obtenerTotal = () => items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const obtenerCantidadTotal = () => items.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider value={{ items, isOpen, agregarAlCarrito, removerDelCarrito, setIsOpen, obtenerTotal, obtenerCantidadTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de un CartProvider');
  return context;
}