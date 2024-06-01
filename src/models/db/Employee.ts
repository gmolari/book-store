import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize'
import sequelize from '../../database'
import User from './User'

class Employee extends Model<
    InferAttributes<Employee, { omit: 'user_id' | 'user' }>,
    InferCreationAttributes<Employee>
> {
    declare id?: number
    declare first_name: string
    declare last_name: string
    declare is_admin?: boolean
    declare user_id: number
    declare user?: User
}

Employee.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        first_name: { type: DataTypes.STRING(24), allowNull: false },
        last_name: { type: DataTypes.STRING(24), allowNull: false },
        is_admin: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
        tableName: 'Employee',
        timestamps: false,
        sequelize: sequelize,
    },
)

export default Employee
