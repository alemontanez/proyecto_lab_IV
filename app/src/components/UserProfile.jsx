import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { fetchUserProfile, deleteUser } from "../api/usersApi"

export default function UserProfile() {

  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState([])

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
      <section>
        <p>Nombre: {user.first_name}</p>
        <p>Apellido: {user.last_name}</p>
        <p>Documento: {user.document}</p>
        <p>Fecha de nacimiento: {user.birthdate}</p>
        <p>Teléfono: {user.phone_number}</p>
        <p>Dirección: {user.address}</p>
      </section>
      <button onClick={() => del(id)}>Eliminar usuario</button>
    </>
  )
}