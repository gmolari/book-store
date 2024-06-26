import express from 'express'
import dotenv from 'dotenv'
import sequelize from './database'
import cors from 'cors'
import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'
import { UserModel, EmployeeModel, CategoryModel, BookModel } from './models'
import authMidleware from './midlewares/authMidleware'
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/auth', authRoutes)

app.use(authMidleware)
app.use('/user', userRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, async () => {
    await syncDatabase()
        .then((res) => console.log(res))
        .catch((err) => console.error(err))

    console.log(`Starting API at: http://localhost:${PORT}`)
})

async function syncDatabase(): Promise<string> {
    await sequelize.sync()
    await UserModel.sync()
    await EmployeeModel.sync()
    await CategoryModel.sync()
    await BookModel.sync()
    return 'Database synchronized successfully'
}
