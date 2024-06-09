import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize'
import sequelize from '../../database'
import Employee from './Employee'

class Book extends Model<
    InferAttributes<
        Book,
        { omit: 'employee_id' | 'category' | 'employee' | 'category_id' }
    >,
    InferCreationAttributes<Book>
> {
    declare id?: number
    declare name: string
    declare price: string
    declare desc: string
    declare category_id: number
    declare employee_id: number
    declare category?: any
    declare employee?: Employee
}

Book.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        desc: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(2).UNSIGNED,
            allowNull: false,
        },
    },
    {
        tableName: 'Book',
        timestamps: false,
        sequelize,
    },
)

export default Book
