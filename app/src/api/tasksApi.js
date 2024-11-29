const API_URL = 'http://localhost:3000/tasks/'

export const fetchTasks = async () => {
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error('Error fetching tasks')
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    return null
  }
}

export const fetchTask = async (taskId) => {
  try {
    const response = await fetch(API_URL + taskId)
    if (!response.ok) {
      throw new Error('Error fetching task')
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    return null
  }
}

export const createTask = async (taskData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    })
    if (!response.ok) {
      throw new Error('Error creating task')
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    return null
  }
}

export const updateTask = async (taskData, taskId) => {
  try {
    const response = await fetch((API_URL + taskId), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    })
    if (!response.ok) {
      throw new Error('Error updating task')
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    return null
  }
}

export const deleteTask = async (taskId) => {
  try {
    const response = await fetch((API_URL + taskId), {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Error deleting task')
    }
  } catch (error) {
    console.error(error)
    return null
  }
}