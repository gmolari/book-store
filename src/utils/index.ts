import { ValidationErrorItem } from 'sequelize'

type ErrorMessagesGenerator<T> = (
    errors: T[],
    fields: { [key: string]: string },
) => string[]

const validationErrorMessagesGenerator: ErrorMessagesGenerator<
    ValidationErrorItem
> = (errors, fields) => {
    let errorMessage = []

    for (const error of errors) {
        switch (error.validatorKey) {
            case 'is_unll':
                errorMessage.push(
                    `O campo '${fields[error.path as string]}' é obrigatório e não pode ser nulo.\n`,
                )
                break
            case 'is_empty':
                errorMessage.push(
                    `O campo '${fields[error.path as string]}' não pode estar vazio.\n`,
                )
                break
            case 'min':
                errorMessage.push(
                    `O valor do campo '${fields[error.path as string]}' deve ser maior ou igual a ${error.validatorArgs?.[0]}.\n`,
                )
                break
            case 'max':
                errorMessage.push(
                    `O valor do campo '${fields[error.path as string]}' deve ser menor ou igual a ${error.validatorArgs?.[0]}.\n`,
                )
                break
            case 'is':
                errorMessage.push(
                    `O valor do campo '${fields[error.path as string]}' não é válido.\n`,
                )
                break
            case 'is_email':
                errorMessage.push(
                    `O valor do campo '${fields[error.path as string]}' deve ser um endereço de e-mail válido.\n`,
                )
                break
            default:
                errorMessage.push(
                    `Erro de validação desconhecido no campo '${fields[error.path as string]}'.\n`,
                )
                break
        }
    }

    return errorMessage
}

export { validationErrorMessagesGenerator }
