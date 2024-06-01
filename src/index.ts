import express from 'express'
import dotenv from 'dotenv'
import sequelize from './database'
import cors from 'cors'
import userRoutes from './routes/userRoutes'
import { UserModel, EmployeeModel } from './models'
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

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
    return 'Database synchronized successfully'
}
