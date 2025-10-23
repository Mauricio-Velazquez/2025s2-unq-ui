import { useNavigate } from 'react-router-dom'
import '../pages/Home/Home.css'
import { logout } from '../services/auth.js'
import { toastError } from '../utils/toastify.js'
import { useState } from 'react'

export default function Sidebar ({ currentUser }) {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      toastError(error)
    }
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      navigate(`/search?query=${searchTerm}`)
      setSearchTerm('') // opcional: limpiar el input después de buscar
    }
  }

  return (
    <aside className='sidebar'>
      <img
        className='sidebar__logo'
        src='/InstagramIcon.svg'
        alt='Instagram'
        onClick={() => navigate('/home')}
        style={{ cursor: 'pointer' }}
      />
      <div className='sidebar__search'>
        <input
          type='text'
          placeholder='Search'
          className='sidebar__input'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
        />
        <img src='/Search.svg' alt='Buscar' className='sidebar__searchIcon' />
      </div>
      <nav className='sidebar__nav'>
        <ul>
          <li onClick={() => navigate('/home')}>
            <img src='/HomeFilled.svg' alt='Inicio' />
            <span>Inicio</span>
          </li>
          <li onClick={() => navigate('/newPost')}>
            <img src='/Add box.svg' alt='Crear publicación' />
            <span>Crear publicación</span>
          </li>
          <li onClick={() => navigate(`/profile/${currentUser?.id}`)}>
            <img src={currentUser?.image} alt='Perfil' />
            <span>Perfil</span>
          </li>
        </ul>
      </nav>
      <div className='sidebar__footer' onClick={handleLogout}>
        <img src='/Logout.svg' alt='Salir' />
        <span>Salir</span>
      </div>
    </aside>
  )
}
