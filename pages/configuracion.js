import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Configuracion() {
  const [perfil, setPerfil] = useState(null)
  const [fecha, setFecha] = useState('')
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    const obtenerPerfil = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setPerfil(data)
      setFecha(data?.pasaporte_caduca_en || '')
    }
    obtenerPerfil()
  }, [])

  const guardarNuevaFecha = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .update({ pasaporte_caduca_en: fecha })
      .eq('id', perfil.id)

    if (error) setMensaje('Error al actualizar')
    else setMensaje('Fecha actualizada correctamente')
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>Configuración de cuenta</h2>
      <p><strong>Email:</strong> {perfil?.email}</p>
      <p>
        <strong>Fecha de caducidad del pasaporte:</strong><br />
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        <button onClick={guardarNuevaFecha} style={{ marginLeft: '1rem' }}>Actualizar</button>
      </p>
      {mensaje && <p>{mensaje}</p>}
    </main>
  )
}
