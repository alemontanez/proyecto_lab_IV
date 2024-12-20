import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

export default function Navbar() {
  return (
    <>
      <nav className='navbar'>
        <ul>
        
          <Link to={'/'}>
            <li>
              <img src="https://cdn-icons-png.flaticon.com/128/3093/3093615.png" alt="" />
            </li>
          </Link>
          <Link to={'/'}>
            <li>Inicio</li>
          </Link>
          <Link to={'/users'}>
            <li>Ver usuarios</li>
          </Link>
          <Link to={'/tasks'}>
            <li>Ver tareas</li>
          </Link>
        </ul>
        <ul>
          <Link to={'/users/create-user'}>
            <li>Crear usuario</li>
          </Link>
          <Link to={'/tasks/create-task'}>
            <li>Crear tarea</li>
          </Link>
        </ul>
      </nav>
    </>
  )
}