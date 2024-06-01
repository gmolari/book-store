import express from 'express'
import dotenv from 'dotenv'
import sequelize from './database'
import { User, Employee } from './models'
dotenv.config()

async function syncDatabase(): Promise<string> {
    await sequelize.sync({ force: true })
    return 'Database synchronized successfully'
}

const app = express()

const PORT = process.env.PORT || 3001
app.listen(PORT, async () => {
    await syncDatabase()
        .then((res) => console.log(res))
        .catch((err) => console.error(err))

    const user = await User.create({
        username: 'teste',
        password: 'teste2',
        email: 'teste@email.com',
    })

    await Employee.create({
        first_name: 'Guilherme',
        last_name: 'Molari',
        user_id: user.id as number
    })

    const data = await Employee.findAll({
        include: { model: User, as: 'user' },
    })

    console.log(data[0].user)

    console.log(`Starting API at: http://localhost:${PORT}`)
})
