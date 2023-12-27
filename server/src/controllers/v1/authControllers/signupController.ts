import { Request, Response } from 'express';
import {
  errorHandler,
  sendSuccessResponse,
} from '../../../utils/responseUtils';
import AuthService from '../../../services/authService';
import { UserSignupDataType } from '../../../types/UserTypes';

export interface SignupRequest extends Request {
  body: UserSignupDataType;
}


export const signupController = async (req: SignupRequest, res: Response): Promise<void> => {
  const userData = req.body; // Assuming the user data is sent in the request body

  try {
    // Call the AuthService.signup function
    await AuthService.signup(userData);
    // Send a success response
    sendSuccessResponse(res, 'User signed up successfully');
  } catch (error) {
    // Use the errorHandler to handle different types of errors
    errorHandler(res, error);
  }
};