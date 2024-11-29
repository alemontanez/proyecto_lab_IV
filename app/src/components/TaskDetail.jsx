import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { fetchTask, deleteTask } from "../api/tasksApi"

export default function TaskDetail() {

  const { id } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState([])

  useEffect(() => {
    const getTask = async () => {
      const data = await fetchTask(id)
      if (data) {
        setTask(data)
      }
    }
    getTask()
  }, [])

  const del = () => {
    deleteTask(id)
    alert('Se eliminó la tarea con éxito')
    navigate('/tasks')
  }

  return (
    <>
      <section>
        <p>Título: {task.title}</p>
        <p>Descripción: {task.description}</p>
        <p>Estado: {task.status}</p>
        <p>Fecha de creación: {task.creation_date}</p>
        <p>Fecha de expiración: {task.expiration_date}</p>
        <p>Usuario asignado: {task.id_user}</p>
      </section>
      <button onClick={() => del()}>Eliminar tarea</button>
    </>
  )
}