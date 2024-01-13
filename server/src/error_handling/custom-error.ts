import { ErrorTypes } from '.';
export class CustomError extends Error {
  constructor(
    public type: ErrorTypes,
    public message: string,
  ) {
    super(message);
  }
}
