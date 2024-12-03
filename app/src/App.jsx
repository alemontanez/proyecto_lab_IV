import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomeView from './views/HomeView'
import TaskListView from './views/TaskListView'
import TaskDetailView from './views/TaskDetailView'
import UsersView from './views/UsersView'
import UserProfileView from './views/UserProfileView'
import CreateTaskView from './views/CreateTaskView'
import CreateUserView from './views/CreateUserView'
import UpdateUserView from './views/UpdateUserView'
import UpdateTaskView from './views/UpdateTaskView'
import { ContextProvider } from './context/context'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ContextProvider>
          <Routes>
            <Route path='/' element={<HomeView />} />
            <Route path='/tasks' element={<TaskListView />} />
            <Route path='/tasks/:id' element={<TaskDetailView />} />
            <Route path='/users' element={<UsersView />} />
            <Route path='/users/:id' element={<UserProfileView />} />
            <Route path='/tasks/create-task' element={<CreateTaskView />} />
            <Route path='/tasks/:id/edit' element={<UpdateTaskView />} />
            <Route path='/users/create-user' element={<CreateUserView />} />
            <Route path='/users/:id/edit' element={<UpdateUserView />} />
            <Route path='/*' element={<Navigate to='/' />} />
          </Routes>
        </ContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
