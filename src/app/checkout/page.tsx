"use client";

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useCartStore from '@/store/cartStore';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      customerName: formData.get('customerName'),
      customerEmail: formData.get('customerEmail'),
      customerPhone: formData.get('customerPhone'),
      shippingAddress: formData.get('shippingAddress'),
      items: items.map(i => ({ id: i.id, quantity: i.quantity, price: i.price })),
      totalAmount: items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      if (result.success) {
        clearCart();
        router.push(`/success?orderNumber=${result.order.orderNumber}&amount=${data.totalAmount}`);
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (e) {
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <Navbar />
      <main className="container" style={{ padding: '4rem 1.5rem', minHeight: '70vh' }}>
        <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>Checkout</h1>
        
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
          <div>
            <form onSubmit={handleSubmit} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Shipping Details</h2>
              
              <div>
                <label className="label">Full Name</label>
                <input type="text" name="customerName" required className="input-field" placeholder="John Doe" />
              </div>
              
              <div>
                <label className="label">Email Address</label>
                <input type="email" name="customerEmail" required className="input-field" placeholder="john@example.com" />
              </div>
              
              <div>
                <label className="label">Phone Number (WhatsApp)</label>
                <input type="text" name="customerPhone" required className="input-field" placeholder="08123456789" />
              </div>

              <div>
                <label className="label">Full Shipping Address</label>
                <textarea name="shippingAddress" required className="input-field" rows={4} placeholder="Jalan Sudirman No. 123..."></textarea>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ width: '100%', opacity: isSubmitting ? 0.7 : 1 }}>
                  {isSubmitting ? 'Processing...' : 'Place Order via Bank Transfer'}
                </button>
              </div>
            </form>
          </div>

          <div className="card" style={{ height: 'fit-content' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Order Summary</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
              {items.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.quantity}x {item.name}</span>
                  <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between" style={{ fontWeight: 600, fontSize: '1.25rem' }}>
              <span>Total to Pay</span>
              <span style={{ color: 'var(--primary)' }}>Rp {totalAmount.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
