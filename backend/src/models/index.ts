import Book from './db/Book'
import BookModel from './db/Book'
import CategoryModel from './db/Category'
import EmployeeModel from './db/Employee'
import UserModel from './db/User'

// Employee config
EmployeeModel.belongsTo(UserModel, {
    foreignKey: { name: 'user_id', allowNull: false },
    as: 'user',
})
EmployeeModel.hasMany(Book, {
    foreignKey: {name: 'employee_id', allowNull: false},
    as: 'books',
})

// User config
UserModel.hasOne(EmployeeModel, {
    foreignKey: {name: 'user_id', allowNull: false},
    as: 'employee',
})

// Category config
CategoryModel.hasMany(Book, {
    foreignKey: {name: 'category_id', allowNull: false},
    as: 'books',
})

// Book config
BookModel.belongsTo(EmployeeModel, {
    foreignKey: { name: 'employee_id', allowNull: false },
    as: 'employee',
})
BookModel.belongsTo(CategoryModel, {
    foreignKey: { name: 'category_id', allowNull: false },
    as: 'category',
})

export { UserModel, EmployeeModel, BookModel, CategoryModel }
