export default function Footer() {
  return (
    <footer style={{ 
      backgroundColor: 'var(--text-main)', 
      color: 'var(--bg-color)',
      padding: '4rem 0 2rem 0',
      marginTop: 'auto'
    }}>
      <div className="container grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div>
          <h3 style={{ color: 'var(--bg-secondary)', marginBottom: '1rem', fontSize: '1.5rem' }}>Spacetrip.</h3>
          <p style={{ color: '#CFC3BB', fontSize: '0.9rem', maxWidth: '300px' }}>
            Elevating your casual style with high-quality, trendy fashion pieces designed for everyday confidence.
          </p>
        </div>
        <div>
          <h4 style={{ color: 'var(--secondary)', marginBottom: '1rem' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><a href="/" style={{ color: '#CFC3BB' }}>Home</a></li>
            <li><a href="/catalog" style={{ color: '#CFC3BB' }}>Catalog</a></li>
            <li><a href="/about" style={{ color: '#CFC3BB' }}>About Us</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: 'var(--secondary)', marginBottom: '1rem' }}>Contact Us</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#CFC3BB', fontSize: '0.9rem' }}>
            <li>Email: hello@spacetrip.ltd</li>
            <li>WhatsApp: +62 812 3456 7890</li>
            <li>Bandung, Indonesia</li>
          </ul>
        </div>
      </div>
      <div className="container" style={{ textAlign: 'center', borderTop: '1px solid #5A4A40', paddingTop: '1.5rem', color: '#A08E83', fontSize: '0.875rem' }}>
        <p>&copy; {new Date().getFullYear()} Spacetrip Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
}
