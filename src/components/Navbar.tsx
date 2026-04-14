"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import useCartStore from '@/store/cartStore';

export default function Navbar() {
  const pathname = usePathname();
  const cartItems = useCartStore((state) => state.items);
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header style={{ 
      backgroundColor: 'var(--bg-secondary)', 
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div className="container flex justify-between items-center" style={{ height: '80px' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-main)' }}>
          Spacetrip<span style={{ color: 'var(--primary)' }}>.</span>
        </Link>

        <nav style={{ display: 'flex', gap: '2rem' }}>
          <Link href="/" style={{ color: pathname === '/' ? 'var(--primary)' : 'var(--text-main)', fontWeight: pathname === '/' ? 600 : 400 }}>
            Home
          </Link>
          <Link href="/catalog" style={{ color: pathname === '/catalog' ? 'var(--primary)' : 'var(--text-main)', fontWeight: pathname === '/catalog' ? 600 : 400 }}>
            Catalog
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/cart" style={{ position: 'relative', color: 'var(--text-main)' }} aria-label="Cart">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: 'var(--primary)',
                color: '#fff',
                fontSize: '0.75rem',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold'
              }}>
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
