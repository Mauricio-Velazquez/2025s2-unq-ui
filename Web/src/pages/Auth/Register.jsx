import { RegisterForm } from '../../components/Auth/RegisterForm.jsx'
import './Register.css'

export default function Register ({ setCurrentUser }) {
  return (
    <main className='login__main'>
      <RegisterForm setCurrentUser={setCurrentUser} />
    </main>
  )
}
