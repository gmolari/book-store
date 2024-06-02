import { ValidationErrorItem } from 'sequelize'
import { ResponseError } from '../lib'

type ErrorMessagesGenerator<T> = (
    errors: T[],
    fields: { [key: string]: string },
) => ResponseError[]

const validationErrorMessagesGenerator: ErrorMessagesGenerator<
    ValidationErrorItem
> = (errors, fields) => {
    let errorMessage = []

    for (const error of errors) {
        if (error.validatorKey === 'is_null') {
            errorMessage.push({
                message: `O campo "${fields[error.path as string]}" é obrigatório e não pode ser nulo.`,
                field: error.path as string,
            })
        } else if (error.validatorKey === 'is_empty') {
            errorMessage.push({
                message: `O campo "${fields[error.path as string]}" não pode estar vazio.`,
                field: error.path as string,
            })
        } else if (error.validatorKey === 'min') {
            errorMessage.push({
                message: `O valor do campo "${fields[error.path as string]}" deve ser maior ou igual a ${error.validatorArgs?.[0]}.`,
                field: error.path as string,
            })
        } else if (error.validatorKey === 'max') {
            errorMessage.push({
                message: `O valor do campo "${fields[error.path as string]}" deve ser menor ou igual a ${error.validatorArgs?.[0]}.`,
                field: error.path as string,
            })
        } else if (error.validatorKey === 'is') {
            errorMessage.push({
                message: `O valor do campo "${fields[error.path as string]}" não é válido.`,
                field: error.path as string,
            })
        } else if (error.validatorKey === 'isEmail') {
            errorMessage.push({
                message: `O valor do campo "${fields[error.path as string]}" deve ser um endereço de e-mail válido.`,
                field: error.path as string,
            })
        } else if (error.validatorKey === 'not_unique') {
            errorMessage.push({
                message: `O valor do campo "${fields[error.path as string]}" já está cadastrado.`,
                field: error.path as string,
            })
        } else {
            errorMessage.push({
                message: `Erro de validação desconhecido no campo "${fields[error.path as string]}".`,
                field: error.path as string,
            })
        }
    }

    return errorMessage
}

export { validationErrorMessagesGenerator }
