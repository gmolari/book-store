import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ResponseError } from '../lib'
import dotenv from 'dotenv'
dotenv.config()

const authMidleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const authHeader = req.headers.authorization

    if (!authHeader)
        return res.status(401).json({
            message: 'Não autorizado - Sem credencial.',
        } as ResponseError)

    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        res.locals.userId = decoded
        next()
    } catch (error) {
        res.status(401).json({
            message: 'Não autorizado - Credencial inválida.',
        })
    }
}

export default authMidleware
