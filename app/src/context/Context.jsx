import { useState, createContext, useEffect } from "react"
import { fetchUsers } from "../api/usersApi"

export const Context = createContext()

export function ContextProvider({ children }) {
  
  const [userInfo, setUserInfo] = useState([])

  const getUsersInfo = async () => {
    try {
      const users = await fetchUsers()
      if (users) {
        const newUsersArray = users.map(user => ({
          id: user.id_user,
          name: user.first_name + ' ' + user.last_name,
        }))
        setUserInfo(newUsersArray)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getUsersInfo()
  }, [])
  
  return (
    <Context.Provider value={[ userInfo ]}>
      {children}
    </Context.Provider>
  )
}
