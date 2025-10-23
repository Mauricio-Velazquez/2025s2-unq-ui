import { LoginForm } from '../../components/Auth/LoginForm.jsx'
import './Login.css'

export default function Login ({ setCurrentUser }) {
  return (
    <main className='login__main'>
      <aside>
        <img className='login__img' src='/imagen-login.png' alt='Bienvenido a Instagram' />
      </aside>
      <LoginForm setCurrentUser={setCurrentUser} />
    </main>
  )
}
