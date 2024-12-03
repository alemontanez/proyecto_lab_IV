import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchUsers } from '../api/usersApi'
import '../styles/UsersList.css'

export default function UsersList() {

  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers()
      if (data) {
        setUsers(data)
      }
    }
    getUsers()
  }, [])

  return (
    <>
      <main className='users-container'>
        <h2>Listado de usuarios</h2>
        <section className='users-list'>
          <div>
            <span>ID</span>
            <span>Nombre</span>
            <span>Apellido</span>
            <span>Documento</span>
            <span>Teléfono</span>
            <span>Acciones</span>
          </div>
          {
              users.map(user =>
                <div key={user.id_user}>
                  <span>{user.id_user}</span>
                  <span>{user.first_name}</span>
                  <span>{user.last_name}</span>
                  <span>{user.document}</span>
                  <span>{user.phone_number}</span>
                  <button onClick={() => navigate(`/users/${user.id_user}`)}>Ver Perfil</button>
                </div>
              )
            }

        </section>
      </main>
    </>
  )
}