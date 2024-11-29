import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { Context } from "../context/context"
import { fetchTask, updateTask } from "../api/tasksApi"
import '../styles/Form.css'

export default function UpdateTask() {
  const [userInfo] = useContext(Context)
  const { id } = useParams()
  const [task, setTask] = useState({})

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    const getTask = async () => {
      try {
        const data = await fetchTask(id)
        if (data) {
          setTask(data)
        }
      } catch (error) {
        console.error('Error al obtener la tarea:', error)
      }
    }
    getTask()
  }, [id])

  
  useEffect(() => {
    if (task && Object.keys(task).length > 0) {
      setValue('title', task.title || '')
      setValue('description', task.description || '')
      setValue('status', task.status || '')
  
      if (task.expiration_date) {
        const eDate = new Date(task.expiration_date)
        if (!isNaN(eDate.getTime())) { // Verifica que la fecha sea válida
          const newEDate = eDate.toISOString().slice(0, 10)
          setValue('expiration_date', newEDate)
        } else {
          console.warn('Fecha de expiración inválida:', task.expiration_date)
        }
      }
      setValue('id_user', task.id_user || '')
    }
  }, [task, setValue])

  const navigate = useNavigate()

  const onSubmit = (data) => {
    const creationDate = new Date()
    const formattedDate = creationDate.toISOString().slice(0, 19).replace('T', ' ')
    const newTask = { ...data, creation_date: formattedDate }
    if (newTask.id_user === '') {
      newTask.id_user = 1
    }
    reset()
    updateTask(newTask, id)
    alert('Tarea editada con éxito')
    navigate('/tasks')
  }

  return (
    <>
      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Editar tarea</h1>
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
              userInfo.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))
            }
          </select>

          <button>Guardar cambios</button>
        </form>

      </div>
    </>
  )
}