import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminDashboard() {
  let orders = [];
  let products = [];
  let dbError = false;

  try {
    orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10
    });
    products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { category: true }
    });
  } catch (e) {
    dbError = true;
    console.error("Database connection failed", e);
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', backgroundColor: 'var(--text-main)', color: 'white', padding: '2rem 1.5rem' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--bg-secondary)', fontFamily: 'var(--font-serif)', fontSize: '1.5rem' }}>
            Spacetrip<span style={{ color: 'var(--primary)' }}>.</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Admin Panel</p>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link href="/admin" style={{ color: 'var(--primary)', fontWeight: 600 }}>Dashboard</Link>
          <Link href="/admin/products" style={{ color: '#CFC3BB' }}>Products</Link>
          <Link href="/admin/orders" style={{ color: '#CFC3BB' }}>Orders</Link>
          <Link href="/" style={{ color: '#CFC3BB', marginTop: '2rem' }}>&larr; Back to Store</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flexGrow: 1, padding: '3rem 4rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Dashboard Overview</h1>

        {dbError && (
          <div style={{ backgroundColor: 'var(--danger)', color: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
            <strong>Database Error:</strong> Could not connect to SQLite database. Ensure you have run <code>npx prisma db push</code>.
          </div>
        )}

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          <div className="card">
            <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '0.5rem' }}>Recent Orders</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 600 }}>{orders.length}</div>
          </div>
          <div className="card">
            <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '0.5rem' }}>Total Revenue (Recent)</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 600, color: 'var(--primary)' }}>
              Rp {orders.reduce((acc, o) => acc + o.totalAmount, 0).toLocaleString('id-ID')}
            </div>
          </div>
          <div className="card">
            <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '0.5rem' }}>Active Products</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 600 }}>{products.length}</div>
          </div>
        </div>

        <div className="grid" style={{ gridTemplateColumns: '1fr', gap: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Latest Orders</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '2px solid var(--border-color)' }}>
                    <th style={{ padding: '1rem' }}>Order No</th>
                    <th style={{ padding: '1rem' }}>Customer</th>
                    <th style={{ padding: '1rem' }}>Total Amount</th>
                    <th style={{ padding: '1rem' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr><td colSpan={4} style={{ padding: '1rem', textAlign: 'center' }}>No orders yet.</td></tr>
                  ) : (
                    orders.map(order => (
                      <tr key={order.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '1rem', fontWeight: 500 }}>{order.orderNumber}</td>
                        <td style={{ padding: '1rem' }}>{order.customerName}</td>
                        <td style={{ padding: '1rem' }}>Rp {order.totalAmount.toLocaleString('id-ID')}</td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{ 
                            padding: '0.25rem 0.5rem', 
                            borderRadius: '4px', 
                            fontSize: '0.8rem', 
                            backgroundColor: order.status === 'PENDING' ? '#FEEBC8' : '#C6F6D5',
                            color: order.status === 'PENDING' ? '#9C4221' : '#22543D'
                          }}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
