import { User, UserRole } from "../models/userModel";
import { UserCredentials, UserSignupDataType } from "../types/UserTypes";
import { UserSigninSchema, userSignupSchema } from "../validators/authValidator";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const secretKey = process.env.SECRET_KEY || 'my secret key';


const AuthService = {
  signup: async (userData: UserSignupDataType): Promise<void> => {
    try {
      // Validate user data using Zod schema
      userSignupSchema.parse(userData);

      // Check if a user with the same username or email already exists
      const existingUser = await User.findOne({
        $or: [{ username: userData.username }, { email: userData.email }],
      });

      if (existingUser) {
        throw new Error('Username or email is already in use');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Create a new user instance
      const newUser = new User({
        ...userData,
        name: `${userData.firstName} ${userData.lastName}`,
        password: hashedPassword,
        role: UserRole.STUDENT, // Set the default role as needed
      });

      // Save the user to the database
      await newUser.save();

    } catch (error) {
      throw error
    }
  },
  signin: async (credentials: UserCredentials): Promise<void> => {
    try {

      UserSigninSchema.parse(credentials);
      // Find the user by username or email
      const user = await User.findOne({
        $or: [{ username: credentials.identifier }, { email: credentials.identifier }],
      });



      if (!user) {
        throw new Error('Invalid username or email address');
      }

      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      // Generate a JWT token inline
      const token = jwt.sign({ userId: user._id, username: user.username }, secretKey, { expiresIn: '1h' });

      // You can add more logic, such as generating a token, here if needed
    } catch (error) {
      throw error
    }
  },

};

export default AuthService;
