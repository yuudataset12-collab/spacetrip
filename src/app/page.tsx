import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section style={{ 
          minHeight: '80vh', 
          display: 'flex', 
          alignItems: 'center', 
          backgroundColor: 'var(--bg-secondary)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div className="container grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div className="animate-fade-in delay-100">
              <span style={{ color: 'var(--primary)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.875rem' }}>
                New Collection 2026
              </span>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1, margin: '1rem 0' }}>
                Elevate Your <br />
                <span style={{ fontStyle: 'italic', color: 'var(--primary)' }}>Casual Style</span>
              </h1>
              <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '450px' }}>
                Discover our curated collection of contemporary fashion. Designed for modern individuals who appreciate quality and aesthetics.
              </p>
              <div className="flex gap-4">
                <Link href="/catalog" className="btn-primary">
                  Shop Now
                </Link>
                <Link href="#featured" className="btn-secondary">
                  View Featured
                </Link>
              </div>
            </div>
            
            <div className="animate-fade-in delay-300" style={{ position: 'relative', height: '600px' }}>
              <div style={{
                position: 'absolute',
                top: '5%',
                right: '5%',
                width: '90%',
                height: '90%',
                backgroundColor: 'var(--secondary)',
                borderRadius: '50% 30% 60% 40% / 40% 60% 30% 50%',
                opacity: 0.2,
                zIndex: 0
              }} />
              {/* Using a placeholder aesthetic div for the image since we don't have actual assets */}
              <div style={{
                position: 'absolute',
                top: '10%',
                left: '10%',
                width: '80%',
                height: '80%',
                backgroundColor: 'var(--border-color)',
                borderRadius: '20px',
                zIndex: 1,
                boxShadow: 'var(--shadow-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                backgroundImage: 'url("https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Section */}
        <section id="featured" style={{ padding: '6rem 0', backgroundColor: 'var(--bg-color)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '2.5rem' }}>Trending Now</h2>
              <p style={{ color: 'var(--text-muted)' }}>The pieces everyone is talking about</p>
            </div>
            
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
              {/* Dummy Products Setup */}
              {[1, 2, 3, 4].map((item) => (
                <Link href="/catalog" key={item} className="card" style={{ display: 'block', padding: 0, overflow: 'hidden' }}>
                  <div style={{ 
                    height: '350px', 
                    backgroundColor: 'var(--border-color)',
                    backgroundImage: `url("https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }} />
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-sans)', fontWeight: 500, color: 'var(--text-main)' }}>Essential Oversized Tee</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Kaos</p>
                    <div className="flex justify-between items-center">
                      <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>Rp 149.000</span>
                      <span style={{ color: 'var(--primary)', fontWeight: 500 }}>View Details</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
              <Link href="/catalog" className="btn-secondary">
                View All Products
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
