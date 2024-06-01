import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize'
import sequelize from '../database'
import Employee from './Employee'

class User extends Model<
    InferAttributes<User, { omit: 'employee' }>,
    InferCreationAttributes<User>
> {
    declare id?: number
    declare username: string
    declare password: string
    declare name?: string
    declare email: string
    declare age?: number
    declare avatar?: string
    declare employee?: Employee
}

User.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(16),
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(24),
            allowNull: false,
        },
        name: DataTypes.STRING(16),
        age: DataTypes.INTEGER,
        avatar: DataTypes.BLOB('medium'),
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    },
    {
        tableName: 'User',
        timestamps: false,
        sequelize,
    },
)

export default User
