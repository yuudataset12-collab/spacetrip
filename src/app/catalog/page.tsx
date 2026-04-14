import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';

// Mock data to be used when DB is empty or fails
const DUMMY_PRODUCTS = [
  { id: 1, name: 'Basic Oversize Tee', price: 150000, category: 'Kaos', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=60' },
  { id: 2, name: 'Vintage Washed Denim', price: 350000, category: 'Celana', imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=500&q=60' },
  { id: 3, name: 'Flannel Shirt Boxy Fit', price: 220000, category: 'Kemeja', imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?auto=format&fit=crop&w=500&q=60' },
  { id: 4, name: 'Classic Cargo Pants', price: 320000, category: 'Celana', imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=500&q=60' }
];

export default async function CatalogPage() {
  let products = [];
  try {
    const dbProducts = await prisma.product.findMany({
      where: { isActive: true },
      include: { category: true }
    });
    products = dbProducts;
  } catch (e) {
    console.error("Failed to fetch products from DB, using dummy data");
  }

  // Use dummy if no products in db
  const displayProducts = products.length > 0 ? products : DUMMY_PRODUCTS;

  return (
    <>
      <Navbar />
      <main style={{ padding: '4rem 0', minHeight: '80vh', backgroundColor: 'var(--bg-color)' }}>
        <div className="container animate-fade-in">
          <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '3rem' }}>Our Catalog</h1>
            <p style={{ color: 'var(--text-muted)' }}>Find the style that suits you</p>
          </header>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {displayProducts.map((product) => (
              <div key={product.id} className="card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
                <Link href={`/catalog/${product.id}`} style={{ display: 'block' }}>
                  <div style={{ 
                    height: '300px', 
                    backgroundColor: 'var(--border-color)',
                    backgroundImage: `url("${product.imageUrl || 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }} />
                </Link>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <Link href={`/catalog/${product.id}`}>
                    <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-sans)', fontWeight: 500, color: 'var(--text-main)' }}>{product.name}</h3>
                  </Link>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                    {(product as any).category?.name || (product as any).category || 'General'}
                  </p>
                  
                  <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>Rp {product.price.toLocaleString('id-ID')}</span>
                  </div>
                  <div style={{ marginTop: '1rem' }}>
                    <AddToCartButton product={{
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      imageUrl: product.imageUrl || undefined
                    }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
