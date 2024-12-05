const API_URL = 'http://localhost:3000/users/'

export const fetchUsers = async () => {
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error('Error fetching users')
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    return null
  }
}

export const fetchUserProfile = async (userId) => {
  try {
    const response = await fetch(API_URL + userId)
    if (!response.ok) {
      throw new Error('Error fetching user')
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    return null
  }
}

export const fetchUserNames = async () => {
  try {
    const response = await fetch('http://localhost:3000/usernames')
    if (!response.ok) {
      throw new Error('Error fetching usernames')
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    return null
  }
}

export const createUser = async (userData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    if (!response.ok) {
      throw new Error('Error creating user')
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    return null
  }
}

export const updateUser = async (userData, userId) => {
  try {
    const response = await fetch((API_URL + userId), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    if (!response.ok) {
      throw new Error('Error updating user')
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    return null
  }
}

export const deleteUser = async (userId) => {
  try {
    const response = await fetch((API_URL + userId), {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Error deleting user')
    }
  } catch (error) {
    console.error(error)
    return null
  }
}