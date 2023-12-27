export interface UserSignupDataType {
    username: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    email: string;
    password: string;
}

export interface UserCredentials {
    identifier: string; // This can be either username or email
    password: string;
}
