import './RegisterForm.css'
import './Form.css'
import { registerUser } from '../../services/auth.js'
import { RegisterUserDTO } from '../../services/dtos/user.js'
import { useNavigate } from 'react-router'
import { toastError } from '../../utils/toastify.js'

export function RegisterForm ({ setCurrentUser }) {
  const navigate = useNavigate()
  const handleSubmit = formData => {
    // googleé y teóricamente las contraseñas pueden tener espacios, por eso no le hacemos trim()
    const data = Object.fromEntries(formData.entries())
    data.email = data.email.trim()
    const registerUserDto = new RegisterUserDTO(data)
    registerUser(registerUserDto)
      .then((res) => {
        setCurrentUser({
          id: res.data.id,
          image: res.data.image,
          name: res.data.name
        })
        navigate('home')
      })
      .catch(error => {
        toastError(error)
      })
  }

  return (
    <div className='register__container'>
      <img className='form__icon' src='/instagram-icon.png' alt='Instagram' />
      <p className='form__p'>Regístrate para ver fotos y videos de tus amigos.</p>
      <form
        className='auth__form' action={handleSubmit}
      >
        <label className='form__label' htmlFor='name'>
          <input className='form__input' type='text' name='name' placeholder='Nombre' />
        </label>
        <label className='form__label' htmlFor='email'>
          <input className='form__input' type='text' name='email' placeholder='Correo electrónico' />
        </label>
        <label className='form__label' htmlFor='password'>
          <input className='form__input' type='password' name='password' placeholder='Contraseña' />
        </label>
        <label className='form__label' htmlFor='image'>
          <input className='form__input' type='text' name='image' placeholder='Imagen' />
        </label>
        <label className='form__label'>
          <button className='form__input form__submit' type='submit'>Registrarse</button>
        </label>
        <p className='form__p'>Al registrarte, aceptas nuestras <a href='/condiciones'>Condiciones</a>, la
          <a href='/privacidad'> Política de privacidad </a> y la
          <a href='/politica-cookies'> Política de cookies</a>.
        </p>
      </form>
      <hr />
      <p className='form__p'>¿Tienes una cuenta? <br /> <a href='/login'>Iniciar sesión</a></p>
    </div>
  )
}
