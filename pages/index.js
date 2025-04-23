import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main style={{ padding: '2rem' }}>
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ borderBottom: '1px solid #1d1d1f' }}>
            Hitos alcanzados <a href="#" style={{ fontWeight: 'normal', fontSize: '1rem' }}>(ver más)</a>
          </h2>
          <p style={{ marginTop: '1rem' }}>Gráfico temporal</p>
          <div style={{ border: '1px solid #1d1d1f', height: '150px', marginTop: '1rem' }}></div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ borderBottom: '1px solid #1d1d1f' }}>
            Noticias recientes <a href="#" style={{ fontWeight: 'normal', fontSize: '1rem' }}>(ver más)</a>
          </h2>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ backgroundColor: '#fff', padding: '1rem', flex: 1 }}>
              <h3>Declaraciones cumbre sobre integración europea</h3>
              <p>Leer más</p>
            </div>
            <div style={{ backgroundColor: '#fff', padding: '1rem', flex: 1 }}>
              <h3>Nuevo pacto de defensa firmado por naciones europeas</h3>
              <p>Leer más</p>
            </div>
            <div style={{ backgroundColor: '#fff', padding: '1rem', flex: 1 }}>
              <h3>Impacto geopolítico en el sector energético</h3>
              <p>Leer más</p>
            </div>
          </div>
        </section>

        <section>
          <h2 style={{ borderBottom: '1px solid #1d1d1f' }}>
            Productos destacados <a href="#" style={{ fontWeight: 'normal', fontSize: '1rem' }}>(ver más)</a>
          </h2>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <div><img src="/tshirt.png" alt="Camiseta" style={{ width: '150px' }} /></div>
            <div><img src="/mug.png" alt="Taza" style={{ width: '150px' }} /></div>
            <div><img src="/tote.png" alt="Bolsa" style={{ width: '150px' }} /></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
