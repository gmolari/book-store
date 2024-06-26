import { EmployeeModel, UserModel } from '.'
import {
    BaseFilter,
    Create,
    DeleteById,
    GetAll,
    GetById,
    UpdateById,
} from '../lib'
import bcrypt from 'bcrypt'

export interface DataUser {
    name?: string
    email: string
    password: string
    username: string
    age?: number
    avatar?: string
}

class User {
    public static create: Create<
        DataUser,
        UserModel | { user: UserModel; employee: EmployeeModel }
    > = async (data: DataUser) => {
        let isFirstUser = await this.firstUser()

        data.password = await bcrypt.hash(
            data.password,
            await bcrypt.genSalt(10),
        )

        if (isFirstUser) {
            const firstUser = await UserModel.create(data, {
                include: { model: EmployeeModel, as: 'employee' },
            })

            const firstEmployee = await EmployeeModel.create(
                {
                    first_name: (data.name || data.username || ''),
                    last_name: '',
                    user_id: firstUser.id as number,
                    is_admin: true,
                },
                { include: { model: UserModel, as: 'user' } },
            )

            // firstUser.save()

            return { user: firstUser, employee: firstEmployee }
        }

        return await UserModel.create(data, {
            include: { model: EmployeeModel, as: 'employee' },
        })
    }

    public static getById: GetById<UserModel> = async (id: number) => {
        return await UserModel.findByPk(id, {
            include: { model: EmployeeModel, as: 'employee' },
        })
    }

    public static getAll: GetAll<UserModel> = async (
        filter: BaseFilter[] = [],
    ) => {
        return await UserModel.findAll({
            where: filter
                ? Object.fromEntries(filter.map((f) => [f.filter, f.value]))
                : {},
            include: { model: EmployeeModel, as: 'employee' },
        })
    }

    public static updateById: UpdateById<DataUser, UserModel> = async (
        id: number,
        data: DataUser,
    ) => {
        const currentUser = await this.getById(id)

        if (!currentUser) throw new Error('Usuário não encontrado.')

        data.password = data.password
            ? await bcrypt.hash(data.password, await bcrypt.genSalt(10))
            : currentUser.password

        currentUser.update(data)
        currentUser.save()

        return currentUser
    }

    public static deleteById: DeleteById = async (id: number) => {
        await UserModel.destroy({ where: { id } })
        return 'Usuário deletado com sucesso.'
    }

    public static firstUser = async () => {
        const users = await UserModel.count()
        if (users > 0) return false
        return true
    }
}

export default User
