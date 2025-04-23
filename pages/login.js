import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else router.push('/')
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setError(error.message)
        return
      }
      // Crear perfil en tabla "profiles"
      await supabase.from('profiles').insert([
        { id: data.user.id, email: data.user.email, rol: 'nivel_1' }
      ])
      router.push('/')
    }
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h1>{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Entrar' : 'Crear cuenta'}</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <p style={{ marginTop: '1rem' }}>
        {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
        <button onClick={() => setIsLogin(!isLogin)} style={{ textDecoration: 'underline', background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>
          {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
        </button>
      </p>
    </main>
  )
}
