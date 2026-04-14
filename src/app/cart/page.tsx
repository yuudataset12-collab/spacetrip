"use client";

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useCartStore from '@/store/cartStore';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <Navbar />
      <main className="container" style={{ padding: '4rem 1.5rem', minHeight: '70vh' }}>
        <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>Your Cart</h1>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', marginBottom: '2rem' }}>Your cart is empty.</p>
            <Link href="/catalog" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>
            {/* Cart Items List */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {items.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '1rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ 
                    width: '100px', 
                    height: '100px', 
                    backgroundColor: 'var(--bg-color)',
                    backgroundImage: `url("${item.imageUrl || 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=60'}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '8px'
                  }} />
                  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div className="flex justify-between">
                      <h3 style={{ fontSize: '1.125rem' }}>{item.name}</h3>
                      <span style={{ fontWeight: 600 }}>Rp {item.price.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between items-center" style={{ marginTop: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{ border: '1px solid var(--border-color)', width: '28px', height: '28px', borderRadius: '4px' }}>-</button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{ border: '1px solid var(--border-color)', width: '28px', height: '28px', borderRadius: '4px' }}>+</button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        style={{ color: 'var(--danger)', fontSize: '0.875rem' }}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="card" style={{ position: 'sticky', top: '100px' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Order Summary</h2>
              
              <div className="flex justify-between" style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
                <span>Subtotal</span>
                <span>Rp {totalAmount.toLocaleString('id-ID')}</span>
              </div>
              
              <div className="flex justify-between" style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              
              <div className="flex justify-between" style={{ marginBottom: '2rem', fontWeight: 600, fontSize: '1.25rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <span>Total</span>
                <span>Rp {totalAmount.toLocaleString('id-ID')}</span>
              </div>

              <Link href="/checkout" style={{ display: 'block', textAlign: 'center', width: '100%' }} className="btn-primary">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
