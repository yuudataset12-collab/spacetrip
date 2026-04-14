"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');
  const amount = searchParams.get('amount') ? parseInt(searchParams.get('amount') as string) : 0;

  return (
    <div className="card animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '4rem 2rem' }}>
      <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--success)', color: 'white', fontSize: '2rem', marginBottom: '2rem' }}>
        ✓
      </div>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Order Placed Successfully!</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Thank you for shopping at Spacetrip. Your order number is <strong style={{ color: 'var(--text-main)' }}>{orderNumber}</strong>
      </p>

      <div style={{ backgroundColor: 'var(--bg-color)', padding: '2rem', borderRadius: '8px', marginBottom: '2rem', textAlign: 'left' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Payment Instructions</h3>
        <p style={{ marginBottom: '1rem' }}>Please transfer exactly <strong>Rp {amount.toLocaleString('id-ID')}</strong> to the following bank account:</p>
        <ul style={{ listStyle: 'none', lineHeight: '1.8' }}>
          <li>Bank: <strong>BCA</strong></li>
          <li>Account Number: <strong>1234 5678 90</strong></li>
          <li>Account Name: <strong>PT Spacetrip Ltd</strong></li>
        </ul>
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>* Your order will be processed once we confirm your payment via WhatsApp.</p>
      </div>

      <Link href="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '4rem 1.5rem', minHeight: '80vh', backgroundColor: 'var(--bg-color)', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <Suspense fallback={<div>Loading...</div>}>
            <SuccessContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
