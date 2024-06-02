import express from 'express'
import { createUser, deleteUserById, getAllUsers, getUserById } from '../controllers/userController'

const router = express.Router()

router.post('/', createUser)
router.get('/', getAllUsers)
router.delete('/:id', deleteUserById)
router.get('/:id', getUserById)

export default router
