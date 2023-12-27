import { Response } from 'express';
import { ZodError } from 'zod';

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const sendApiResponse = (
  res: Response,
  success: boolean,
  message: string,
  data?: any,
  status?: number
): void => {
  const response: ApiResponse = {
    success,
    message,
    data,
  };

  res.status(status || (success ? 200 : 400)).json(response);
};

export const sendSuccessResponse = (
  res: Response,
  message: string,
  data?: any,
  status?: number
): void => {
  sendApiResponse(res, true, message, data, status);
};

export const sendErrorResponse = (
  res: Response,
  message: string,
  data?: any,
  status?: number
): void => {
  sendApiResponse(res, false, message, data, status);
};

export const errorHandler = (res: Response, error: any, errorMessage?: string): void => {
  if (error instanceof ZodError) {
    // Handle Zod validation errors
    const formattedErrors = error.errors.map((err) => {
      return `${err.path.join('.')} - ${err.message}`;
    });
    sendErrorResponse(res, `Invalid data: ${formattedErrors.join('; ')}`);
  } else {
    // Handle other types of errors
    sendErrorResponse(res, errorMessage ? errorMessage : error.message, error);
  }
};