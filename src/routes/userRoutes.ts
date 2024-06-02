import express from 'express'
import {
    createUser,
    deleteUserById,
    getAllUsers,
    getUserById,
    updateUserById,
} from '../controllers/userController'

const router = express.Router()

router.post('/', createUser)
router.get('/', getAllUsers)
router.delete('/:id', deleteUserById)
router.put('/:id', updateUserById)
router.get('/:id', getUserById)

export default router
