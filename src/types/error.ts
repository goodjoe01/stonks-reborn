
export class HttpError extends Error {
  message!: string
  status!: number

  constructor (message: string, status: number = 500) {
    super()
    this.message = message
    this.status = status
  }
}

export class AuthorizationHttpError extends HttpError {
  constructor () {
    super('You don\'t have authorization to access this resource', 403)
  }
}

export class NotFoundHttpError extends HttpError {
  constructor () {
    super('Resource not found :c', 404)
  }
}
