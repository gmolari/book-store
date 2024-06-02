import { Request, Response } from 'express'
import Employee, { DataEmployee } from '../models/Employee'
import EmployeeModel from '../models/db/Employee'
import { ResponseApi } from '../lib'
import { ValidationError } from 'sequelize'
import { validationErrorMessagesGenerator } from '../utils'

export async function createEmployee(req: Request, res: Response) {
    const { first_name, last_name, user_id, is_admin }: DataEmployee = req.body

    const response: ResponseApi<EmployeeModel> = {
        errors: [],
        message: 'Funcionário criado com sucesso.',
    }

    try {
        const newEmployee = await Employee.create({
            first_name,
            last_name,
            user_id,
            is_admin,
        })

        response.data = newEmployee

        res.status(200).send(response)
    } catch (error) {
        response.message = 'Não foi possível criar o usuário.'

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

export async function getAllEmployees(req: Request, res: Response) {
    const response: ResponseApi<EmployeeModel[]> = {
        errors: [],
        message: 'Funcionários encontrados.',
    }

    try {
        response.data = await Employee.getAll()
        res.status(200).send(response)
    } catch (error) {
        response.errors = []
        response.message = 'Não foi possível encontrar usuários.'
        res.status(200).send(response)
    }
}

export async function deleteEmployeeById(req: Request, res: Response) {
    const { id } = req.params

    const response: ResponseApi<EmployeeModel> = {
        errors: [],
        message: 'Funcionário deletado com sucesso.',
    }

    try {
        await Employee.deleteById(Number(id))
        res.status(200).send(response)
    } catch (error) {
        response.errors = []
        response.message = 'Não foi possível deletar usuário.'
        res.status(200).send(response)
    }
}

export async function getEmployeeById(req: Request, res: Response) {
    const { id } = req.params

    const response: ResponseApi<EmployeeModel> = {
        errors: [],
        message: 'Funcionário encontrado com sucesso.',
    }

    try {
        const user = await Employee.getById(Number(id))
        response.data = user as EmployeeModel
        res.status(200).send(response)
    } catch (error) {
        response.errors = []
        response.message = 'Não foi possível encontrar usuário.'
        res.status(200).send(response)
    }
}
