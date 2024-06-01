import EmployeeModel from './db/Employee'
import UserModel from './db/User'

EmployeeModel.belongsTo(UserModel, {
    foreignKey: { name: 'user_id', allowNull: false },
    as: 'user',
})
UserModel.hasOne(EmployeeModel, {
    foreignKey: 'user_id',
    as: 'employee',
})

export { UserModel, EmployeeModel }
