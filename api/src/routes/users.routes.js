import { Router } from "express"
import { getUsers, getUser, createUser, updateUser, deleteUser, getUserNames } from '../controllers/users.controller.js'

const router = Router()

router.get('/users', getUsers)
router.get('/users/:id', getUser)
router.post('/users', createUser)
router.patch('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)
router.get('/usernames', getUserNames)

export default router