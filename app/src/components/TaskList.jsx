import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchTasks } from '../api/tasksApi'
import '../styles/TaskList.css'

export default function TaskList() {

  const [tasks, setTasks] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getTasks = async () => {
      const data = await fetchTasks()
      if (data) {
        data.forEach(task => {
          task.creation_date = task.creation_date.slice(0, 10).replaceAll('-', '/')
          task.creation_date = task.creation_date.split('/').reverse().join('/')
          task.expiration_date = task.expiration_date.slice(0, 10).replaceAll('-', '/')
          task.expiration_date = task.expiration_date.split('/').reverse().join('/')
        })
        setTasks(data)
      }
    }
    getTasks()
  }, [])

  function getClass(prop) {
    switch (prop) {
      case 'Alta':
        return 'priority-high'
      case 'Media':
        return 'priority-medium'
      case 'Baja':
        return 'priority-low'
      case 'Pendiente':
        return 'status-pending'
      case 'En progreso':
        return 'status-inProgress'
      case 'Completada':
        return 'status-completed'
      default:
        return ''
    }
  }

  return (
    <>
      <main className='task-container'>
        <h2>Listado de tareas</h2>
        <section className='task-list'>
          <div>
            <span>ID</span>
            <span>Título</span>
            <span>Prioridad</span>
            <span>Estado</span>
            <span>Fecha de creación</span>
            <span>Fecha de expiración</span>
            <span>Usuario asignado</span>
            <span>Acciones</span>
          </div>
          {
            tasks.map(task =>
              <div key={task.id_task}>
                <span>{task.id_task}</span>
                <span>{task.title}</span>
                <span className={`item ${getClass(task.priority)}`}>{task.priority}</span>
                <span className={`item ${getClass(task.status)}`}>{task.status}</span>
                <span>{task.creation_date}</span>
                <span>{task.expiration_date}</span>
                <span>{task.user_assigned}</span>
                <button onClick={() => navigate(`/tasks/${task.id_task}`)}>Ver Detalle</button>
              </div>
            )
          }
        </section>
      </main>
    </>
  )
}