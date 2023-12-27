import { Request, Response, NextFunction } from 'express';
import { sendErrorResponse } from '../utils/responseUtils';

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default status code (500 - Internal Server Error)
  let statusCode = 500;

  // Determine the status code based on the error type
  if (err.status) {
    statusCode = err.status;
  }

  // Log the error for debugging purposes
  console.error(err);

  // Use the sendErrorResponse utility function to send a meaningful response
  sendErrorResponse(res, 'Something went wrong', err, statusCode);
};