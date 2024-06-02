import { Request, Response } from 'express'
import { UserModel } from '../models'
import jwt from 'jsonwebtoken'
import dotnev from 'dotenv'
import bcrypt from 'bcrypt'
import { ResponseApi, ResponseError } from '../lib'
dotnev.config()

const auth = async (req: Request, res: Response) => {
    const { username, email, password } = req.body

    try {
        if (!username && !email) throw new Error('Insira usuário ou email.')

        if (!password) throw new Error('Insira senha.')

        const user = await UserModel.findOne({
            where: email ? { email } : { username },
        })

        if (!user) throw new Error('Usuário não encontrado.')

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) throw new Error('Usuário/Email ou senha inválidos.')

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' },
        )

        res.status(200).json({
            message: 'Autenticado com sucesso!',
            errors: [],
            data: `Bearer ${token}`,
        } as ResponseApi<string>)
    } catch (error) {
        res.status(401).json({
            message: (error as Error).message || 'Erro ao autenticar.',
        } as ResponseError)
    }
}

export { auth }
