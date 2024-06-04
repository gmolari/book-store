import { Request, Response } from 'express'
import User, { DataUser } from '../models/User'
import UserModel from '../models/db/User'
import { ResponseApi } from '../lib'
import { ValidationError } from 'sequelize'
import { validationErrorMessagesGenerator } from '../utils'

export async function createUser(req: Request, res: Response) {
    const { name, email, password, username, age, avatar }: DataUser = req.body

    const response: ResponseApi<UserModel> = {
        errors: [],
        message: 'Usuário criado com sucesso.',
    }

    try {
        const newUser = await User.create({
            name,
            email,
            password,
            username,
            age,
            avatar,
        })

        response.data = newUser

        res.status(200).send(response)
    } catch (error) {
        response.message = 'Não foi possível criar o usuário.'

        if (error instanceof ValidationError) {
            response.errors = validationErrorMessagesGenerator(error.errors, {
                username: `Nome de usuário`,
                email: `Email`,
                password: `Senha`,
            })
        }

        res.status(400).send(response)
    }
}

export async function updateUserById(req: Request, res: Response) {
    const { name, email, password, username, age, avatar }: DataUser = req.body
    const { id } = req.params

    const response: ResponseApi<UserModel> = {
        errors: [],
        message: 'Usuário alterado com sucesso.',
    }

    try {
        const data = {
            name,
            email,
            password,
            username,
            age,
            avatar,
        }

        const updatedUser = await User.updateById(Number(id), data)

        response.data = updatedUser

        res.status(200).send(response)
    } catch (error) {
        response.message = 'Não foi possível alterar o usuário.'

        console.log(error)

        if (error instanceof ValidationError) {
            response.errors = validationErrorMessagesGenerator(error.errors, {
                username: `Nome de usuário`,
                email: `Email`,
                password: `Senha`,
            })
        }

        res.status(400).send(response)
    }
}

export async function getAllUsers(req: Request, res: Response) {
    const response: ResponseApi<UserModel[]> = {
        errors: [],
        message: 'Usuários encontrados.',
    }

    try {
        response.data = await User.getAll()
        res.status(200).send(response)
    } catch (error) {
        response.errors = []
        response.message = 'Não foi possível encontrar usuários.'
        res.status(200).send(response)
    }
}

export async function deleteUserById(req: Request, res: Response) {
    const { id } = req.params

    const response: ResponseApi<UserModel> = {
        errors: [],
        message: 'Usuário deletado com sucesso.',
    }

    try {
        await User.deleteById(Number(id))
        res.status(200).send(response)
    } catch (error) {
        response.errors = []
        response.message = 'Não foi possível deletar usuário.'
        res.status(200).send(response)
    }
}

export async function getUserById(req: Request, res: Response) {
    const { id } = req.params

    const response: ResponseApi<UserModel> = {
        errors: [],
        message: 'Usuário encontrado com sucesso.',
    }

    try {
        const user = await User.getById(Number(id))
        response.data = user as UserModel
        res.status(200).send(response)
    } catch (error) {
        response.errors = []
        response.message = 'Não foi possível encontrar usuário.'
        res.status(200).send(response)
    }
}
