import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import ModalAviso from '../components/ModalAviso'

export default function Comunidad() {
  const [perfil, setPerfil] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mostrarModal, setMostrarModal] = useState(false)

  useEffect(() => {
    const fetchPerfil = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return setLoading(false)

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) console.error(error)
      else {
        setPerfil(data)
        const caducado = data.pasaporte_caduca_en
          ? new Date(data.pasaporte_caduca_en) < new Date()
          : true
        if (!data.verificado || caducado) setMostrarModal(true)
      }

      setLoading(false)
    }

    fetchPerfil()
  }, [])

  if (loading) return <p>Cargando...</p>

  const pasaporteCaducado = perfil?.pasaporte_caduca_en
    ? new Date(perfil.pasaporte_caduca_en) < new Date()
    : true

  if (!perfil?.verificado || pasaporteCaducado) {
    return (
      <>
        <ModalAviso visible={mostrarModal} onClose={() => setMostrarModal(false)} />
        <main style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
          <h2>Acceso restringido</h2>
          <p>No puedes publicar en el foro hasta que actualices tu documento.</p>
        </main>
      </>
    )
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>Bienvenido a la comunidad</h2>
      <p>Puedes crear hilos, responder y participar.</p>
    </main>
  )
}
