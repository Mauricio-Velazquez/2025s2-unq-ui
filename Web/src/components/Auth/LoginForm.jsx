import './LoginForm.css'
import { loginUser } from '../../services/auth.js'
import { LoginUserDTO } from '../../services/dtos/user.js'
import { toastError } from '../../utils/toastify.js'
import { useNavigate } from 'react-router'

export function LoginForm ({ setCurrentUser }) {
  const navigate = useNavigate()

  const handleSubmit = formData => {
    const data = Object.fromEntries(formData.entries())
    data.email = data.email.trim()
    const loginUserDTO = new LoginUserDTO(data)
    loginUser(loginUserDTO)
      .then((res) => {
        setCurrentUser({
          id: res.data.id,
          image: res.data.image
        })
        navigate('home')
      })
      .catch(error => {
        toastError(error)
      })
  }

  return (
    <div className='login__container'>
      <img className='form__icon' src='/instagram-icon.png' alt='Instagram' />
      <form className='auth__form' action={handleSubmit}>
        <label className='form__label'>
          <input className='form__input' type='text' name='email' placeholder='Correo electrónico' />
        </label>
        <label className='form__label'>
          <input className='form__input' type='password' name='password' placeholder='Contraseña' />
        </label>
        <label className='form__label'>
          <button className='form__input form__submit' type='submit'>Iniciar sesión</button>
        </label>
      </form>
      <hr />
      <p className='form__p'>¿No tienes una cuenta? <a href='/register'>Regístrate</a></p>
    </div>
  )
}
