
export class HttpError extends Error  {
  message!: string;
  status!: number;

  constructor(message: string, status: number = 500) {
    super()
    this.message = message;
    this.status = status;
  }
}

export default {
  HttpError
}
