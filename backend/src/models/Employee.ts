import { EmployeeModel } from '.'
import {
    BaseFilter,
    Create,
    DeleteById,
    GetAll,
    GetById,
    UpdateById,
} from '../lib'
import { DataUser } from './User'
import User from './db/User'

export interface DataEmployee {
    first_name: string
    last_name: string
    user_id: number
    is_admin?: boolean
}

class Employee {
    public static create: Create<DataEmployee, EmployeeModel> = async (
        data: DataEmployee,
    ) => {
        return await EmployeeModel.create(data, {
            include: { model: EmployeeModel, as: 'employee' },
        })
    }

    public static getById: GetById<EmployeeModel> = async (id: number) => {
        return await EmployeeModel.findByPk(id, {
            include: { model: EmployeeModel, as: 'employee' },
        })
    }

    public static getAll: GetAll<EmployeeModel> = async (
        filter: BaseFilter[] = [],
    ) => {
        return await EmployeeModel.findAll({
            where: filter
                ? Object.fromEntries(filter.map((f) => [f.filter, f.value]))
                : {},
            include: { model: EmployeeModel, as: 'employee' },
        })
    }

    public static updateById: UpdateById<DataEmployee, EmployeeModel> = async (
        id: number,
        data: DataEmployee,
    ) => {
        const [, [updatedEmployee]] = await EmployeeModel.update(data, {
            where: { id },
            returning: true,
        })
        return updatedEmployee
    }

    public static deleteById: DeleteById = async (id: number) => {
        await EmployeeModel.destroy({ where: { id } })
        return 'Funcionário deletado com sucesso.'
    }
}

export default Employee
