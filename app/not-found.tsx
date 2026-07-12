export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins, sans-serif',
        background: '#f5f5f5',
        color: '#2F3853',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '4rem', fontWeight: 800, margin: 0 }}>
        404
      </h1>
      <p style={{ fontSize: '1.1rem', color: '#5D6C7C', margin: '1rem 0 2rem' }}>
        This page doesn&apos;t exist.
      </p>
      <a
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.5rem',
          background: '#2F3853',
          color: '#fff',
          borderRadius: '9999px',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '0.9rem',
        }}
      >
        ← Back to home
      </a>
    </div>
  );
}
