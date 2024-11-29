import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchTasks } from '../api/tasksApi'

export default function TasksList() {

  const [tasks, setTasks] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getTasks = async () => {
      const data = await fetchTasks()
      if (data) {
        setTasks(data)
      }
    }
    getTasks()
  }, [])

  return (
    <>
      <ul>
        {
          tasks.map(task =>
            <li key={task.id_task}>
              <span>{task.id_task}. {task.title}</span>
              <button onClick={() => navigate(`/tasks/${task.id_task}`)}>Ver detalle</button>
            </li>
          )
        }
      </ul>
    </>
  )
}