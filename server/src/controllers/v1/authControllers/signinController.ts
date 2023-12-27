import { Request, Response } from 'express';
import { UserCredentials } from '../../../types/UserTypes';
import AuthService from '../../../services/authService';
import { errorHandler, sendSuccessResponse } from '../../../utils/responseUtils';

export interface SignInRequest extends Request {
    body: UserCredentials;
}

export const signInController = async (req: SignInRequest, res: Response): Promise<void> => {
    const credentials: UserCredentials = req.body;

    try {
        // Call the AuthService.signIn function
        await AuthService.signin(credentials);
        // Send a success response
        sendSuccessResponse(res, 'User signed in successfully');
    } catch (error) {
        // Use the errorHandler to handle different types of errors
        errorHandler(res, error);
    }
};