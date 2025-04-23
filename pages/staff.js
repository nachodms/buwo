import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function StaffPanel() {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [perfil, setPerfil] = useState(null)

  useEffect(() => {
    const fetchStaff = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: currentProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (currentProfile?.rol !== 'nivel_4') {
        alert('Acceso denegado')
        return
      }

      setPerfil(currentProfile)

      const { data: perfiles, error } = await supabase
        .from('profiles')
        .select('*')

      if (!error) setUsuarios(perfiles)
      setLoading(false)
    }

    fetchStaff()
  }, [])

  const actualizarVerificado = async (id, nuevoEstado) => {
    await supabase
      .from('profiles')
      .update({ verificado: nuevoEstado })
      .eq('id', id)

    setUsuarios((prev) =>
      prev.map((u) => (u.id === id ? { ...u, verificado: nuevoEstado } : u))
    )
  }

  if (loading) return <p>Cargando...</p>
  if (!perfil) return <p>Validando acceso...</p>

  return (
    <main style={{ padding: '2rem' }}>
      <h2>Panel del Staff (nivel 4)</h2>
      <p>Usuarios registrados:</p>
      <table border="1" cellPadding="10" style={{ marginTop: '1rem', width: '100%' }}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Rol</th>
            <th>Verificado</th>
            <th>Pasaporte caduca</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.rol}</td>
              <td>{u.verificado ? '✅' : '❌'}</td>
              <td>{u.pasaporte_caduca_en || '-'}</td>
              <td>
                <button onClick={() => actualizarVerificado(u.id, !u.verificado)}>
                  {u.verificado ? 'Revocar' : 'Verificar'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
