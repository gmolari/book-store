import Employee from './Employee'
import User from './User'

Employee.belongsTo(User, {
    foreignKey: { name: 'user_id', allowNull: false },
    as: 'user',
})
User.hasOne(Employee, {
    foreignKey: 'user_id',
    as: 'employee',
})

export { User, Employee }
