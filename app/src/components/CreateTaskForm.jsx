import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { createTask } from "../api/tasksApi"
import { fetchUserNames } from "../api/usersApi"
import '../styles/Form.css'

export default function CreateTaskForm() {

  const [userNames, setUserNames] = useState([])
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    const creationDate = new Date()
    const formattedDate = creationDate.toISOString().slice(0, 19).replace('T', ' ')
    const newTask = { ...data, creation_date: formattedDate }
    if (newTask.id_user === '') {
      newTask.id_user = 1
    }
    reset()
    createTask(newTask)
    alert('Tarea creada con éxito')
    navigate('/tasks')
  }

  useEffect(() => {
    const getUserNames = async () => {
      const data = await fetchUserNames()
      if (data) setUserNames(data)
      }
    getUserNames()
  }, [])

  return (
    <>
      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Crear nueva tarea</h1>
          <label htmlFor="title">Título</label>
          <input
            placeholder="Título de la tarea"
            type="text"
            {
              ...register('title', {
                required: {
                  value: true,
                  message: 'El título no puede estar vacío'
                },
                maxLength: {
                  value: 40,
                  message: 'El título no debe tener más de 40 caracteres'
                }
              })
            }
          />
          {
            errors.title && <span>{errors.title.message}</span>
          }

          <label htmlFor="description">Descripción</label>
          <input
            placeholder="Descripción de la tarea"
            type="text"
            {
              ...register('description', {
                required: {
                  value: true,
                  message: 'La descripción no puede estar vacío'
                },
                maxLength: {
                  value: 120,
                  message: 'La descripción no debe tener más de 120 caracteres'
                }
              })
            }
          />
          {
            errors.description && <span>{errors.description.message}</span>
          }

          <label htmlFor="priority">Prioridad</label>
          <select {...register('priority')}>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>

          <label htmlFor="status">Estado</label>
          <select {...register('status')}>
            <option value="Pendiente">Pendiente</option>
            <option value="En progreso">En progreso</option>
            <option value="Completada">Completada</option>
          </select>

          <label htmlFor="expiration_date">Fecha de expiración</label>
          <input 
            type="date" 
            {
              ...register('expiration_date', {
                required: {
                  value: true,
                  message: 'La fecha de expiración es obligatoria'
                },
                validate: (value) => {
                  if (new Date(value) < new Date()) {
                    return 'Fecha no válida';
                  }
                  return true;
                }
              })
            }
          />
          {
            errors.expiration_date && <span>{errors.expiration_date.message}</span>
          }

          <label htmlFor="id_user">Usuario asignado</label>
          <select {...register('id_user')}>
            {
              userNames.map(user => (
                <option key={user.id_user} value={user.id_user}>{user.name_user}</option>
              ))
            }
          </select>

          <button>Crear tarea</button>
        </form>

      </div>
    </>
  )
}