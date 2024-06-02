import { EmployeeModel, UserModel } from '.'
import { Create, DeleteById, GetAll, GetById, UpdateById } from '../lib'

export interface DataUser {
    name?: string
    email: string
    password: string
    username: string
    age?: number
    avatar?: string
}

class User {
    public static create: Create<DataUser, UserModel> = async (
        data: DataUser,
    ) => {
        const usersCount = await UserModel.count()

        if (usersCount > 0) console.log('Primeiro usuário a ser criado.')

        return await UserModel.create(data, {
            include: { model: EmployeeModel, as: 'employee' },
        })
    }

    public static getById: GetById<UserModel> = async (id: number) => {
        return await UserModel.findByPk(id, {
            include: { model: EmployeeModel, as: 'employee' },
        })
    }

    public static getAll: GetAll<UserModel> = async () => {
        return await UserModel.findAll({
            include: { model: EmployeeModel, as: 'employee' },
        })
    }

    public static updateById: UpdateById<DataUser, UserModel> = async (
        id: number,
        user: DataUser,
    ) => {
        const [, [updatedUser]] = await UserModel.update(user, {
            where: { id },
            returning: true,
        })
        return updatedUser
    }

    public static deleteById: DeleteById = async (id: number) => {
        await UserModel.destroy({ where: { id } })
        return 'Usuário deletado com sucesso.'
    }
}

export default User
