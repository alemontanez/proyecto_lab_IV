import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchUsers } from '../api/usersApi'

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
      <ul>
        {
          users.map(user =>
            <li key={user.id_user}>
              <span>{user.id_user}. {user.first_name}</span>
              <button onClick={() => navigate(`/users/${user.id_user}`)}>Ver perfil</button>
            </li>
          )
        }
      </ul>
    </>
  )
}