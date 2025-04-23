export default function Header() {
  return (
    <header style={{ backgroundColor: '#000', color: '#fff', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Bulls & Wolves</div>
      <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Inicio</a>
        <a href="/informes" style={{ color: '#fff', textDecoration: 'none' }}>Informes</a>
        <a href="/comunidad" style={{ color: '#fff', textDecoration: 'none' }}>Comunidad</a>
        <a href="/productos" style={{ color: '#fff', textDecoration: 'none' }}>Tienda</a>
        <a href="/sobre" style={{ color: '#fff', textDecoration: 'none' }}>Sobre nosotros</a>
        <a href="/contacto" style={{ color: '#fff', textDecoration: 'none' }}>Contacto</a>
        <a href="/legal" style={{ color: '#fff', textDecoration: 'none' }}>Aviso legal</a>
        <button
			onClick={onLoginClick}
			style={{
				background: 'none',
				border: 'none',
				color: '#90ee90',
				textDecoration: 'none',
				marginLeft: '1rem',
				cursor: 'pointer',
				fontSize: '1rem'
			}}
		>
			Iniciar sesión
		</button>

      </nav>
    </header>
  );
}
