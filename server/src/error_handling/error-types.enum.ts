import { CustomError } from './custom-error';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

export enum ErrorTypes {
  Conflict = 'Conflict',
  NotFound = 'NotFound',
  InvalidFormat = 'InvalidFormat',
}

export const handleError = (err: CustomError) => {
  switch (err.type) {
    case ErrorTypes.Conflict:
      throw new ConflictException(err.message);
    case ErrorTypes.NotFound:
      throw new NotFoundException(err.message);
    case ErrorTypes.InvalidFormat:
      throw new BadRequestException(err.message);
    default:
      console.log(err);
      throw new Error(err.message);
  }
};
