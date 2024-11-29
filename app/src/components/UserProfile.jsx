import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { fetchUserProfile, deleteUser } from "../api/usersApi"
import '../styles/UserProfile.css'

export default function UserProfile() {

  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState([])
  const date = user.birthdate.slice(0, 10).replaceAll('-', '/')

  useEffect(() => {
    const getUser = async () => {
      const data = await fetchUserProfile(id)
      if (data) {
        setUser(data)
      }
    }
    getUser()
  }, [])

  const del = (id) => {
    deleteUser(id)
    alert('Se eliminó el usuario con éxito')
    navigate('/users')
  }

  return (
    <>
      <section className="user-profile">
        <article>
          <h1>Perfil de Usuario</h1>
        </article>
        <article>
          <div>
            <img src="https://img.icons8.com/?size=80&id=vrjuWgj4Ipxl&format=png" alt="" />
          </div>
          <div>
            <span><b>{user.first_name} {user.last_name}</b></span>
            <span>ID: {user.id_user}</span>
          </div>
        </article>
        <article>
          <div>
            <p>Documento</p>
            <p>{user.document}</p>
          </div>
          <div>
            <p>Fecha de nacimiento</p>
            <p>{date}</p>
          </div>
          <div>
            <p>Teléfono</p>
            <p>{user.phone_number}</p>
          </div>
          <div>
            <p>Dirección</p>
            <p>{user.address}</p>
          </div>
        </article>
        <article>
          <button onClick={() => navigate(`/users/${id}/edit`)}>Editar usuario</button>
          <button onClick={() => del(id)}>Eliminar usuario</button>
        </article>
      </section>
    </>
  )
}