import React from 'react'

export default function ModalAviso({ visible, onClose }) {
  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0, 0, 0, 0.5)', display: 'flex',
      justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{
        background: '#fff', padding: '2rem', borderRadius: '10px',
        maxWidth: '500px', textAlign: 'center'
      }}>
        <h2>Documento caducado</h2>
        <p>Tu pasaporte ha caducado. Por favor, actualízalo para continuar participando en la comunidad.</p>
        <button onClick={onClose} style={{ marginTop: '1rem' }}>Cerrar</button>
      </div>
    </div>
  )
}
