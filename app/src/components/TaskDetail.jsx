import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { fetchTask, updateTask, deleteTask } from "../api/tasksApi"
import { fetchUserNames } from "../api/usersApi"
import { AiOutlineDelete } from "react-icons/ai";
import '../styles/TaskDetail.css'

export default function TaskDetail() {
  const { id } = useParams()
  const [task, setTask] = useState({})
  const [userNames, setUserNames] = useState([])

  const {
    register,
    handleSubmit,
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
    const getUserNames = async () => {
      try {
        const data = await fetchUserNames()
        if (data) setUserNames(data)
      } catch (error) {
        console.error('Error al obtener nombres de los usuarios', error)
      }
    }
    getUserNames()
  }, [id])

  useEffect(() => {
    if (task && Object.keys(task).length > 0) {
      setValue('id_task', task.id_task || '')
      setValue('id_user', task.id_user || '')
      setValue('title', task.title || '')
      setValue('description', task.description || '')
      setValue('priority', task.priority || '')
      setValue('status', task.status || '')
      setValue('creation_date', task.creation_date.slice(0, 10) || '')

      if (task.expiration_date) {
        const eDate = new Date(task.expiration_date)
        if (!isNaN(eDate.getTime())) { // Verifica que la fecha sea válida
          const newEDate = eDate.toISOString().slice(0, 10)
          setValue('expiration_date', newEDate)
        } else {
          console.warn('Fecha de expiración inválida:', task.expiration_date)
        }
      }
    }
  }, [task, setValue])

  const navigate = useNavigate()

  const onSubmit = (data) => {
    updateTask(data, id)
    alert('Tarea editada con éxito')
    navigate('/tasks')
  }

  const delTask = (id) => {
    deleteTask(id)
    alert('Se eliminó la tarea')
    navigate('/tasks')
  }

  return (
    <>
      <main className="task-detail">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Detalle de tarea</h2>
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
          <textarea
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
          <div className="form-grid">
            <div>
              <label htmlFor="id_task">ID de la tarea</label>
              <input
                type="text"
                {...register('id_task')}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="id_user">Usuario asignado</label>
              <select {...register('id_user')}>
                {
                  userNames.map(user => (
                    <option key={user.id_user} value={user.id_user}>{user.name_user}</option>
                  ))
                }
              </select>
            </div>
            <div>
              <label htmlFor="priority">Prioridad</label>
              <select {...register('priority')}>
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
            <div>
              <label htmlFor="status">Estado</label>
              <select {...register('status')}>
                <option value="Pendiente">Pendiente</option>
                <option value="En progreso">En progreso</option>
                <option value="Completada">Completada</option>
              </select>
            </div>
            <div>
              <label htmlFor="creation_date">Fecha de creación</label>
              <input
                type="date"
                {...register('creation_date')}
                readOnly
              />
            </div>
            <div>
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
                    if (new Date(value) < new Date(task.creation_date)) {
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
            </div>
          </div>
          <div className="form-buttons">
            <div>
              <button type="submit">Guardar cambios</button>
              <button type="button" onClick={() => navigate('/tasks')}>Cancelar</button>
            </div>
            <div>
              <button type="button" onClick={() => delTask(task.id_task)}><AiOutlineDelete /> Eliminar tarea</button>
            </div>
          </div>
        </form>
      </main>
    </>
  )
}