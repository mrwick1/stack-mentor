import mongoose, { Schema, Document } from 'mongoose';

// Define a role enum
enum UserRole {
    ADMIN = 'ADMIN',
    TA = 'TA',
    STUDENT = 'STUDENT',
}

enum UserStatus {
    PENDING_APPROVAL = 'PENDING_APPROVAL',
    APPROVED = 'APPROVED',
}


// Define the user schema
const userSchema = new Schema({
    username: { type: String, required: true, minlength: 3 },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    name: { type: String, required: true },
    birthday: { type: Date, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.STUDENT },
    upvoteCount: { type: Number, default: 0 },
    downvoteCount: { type: Number, default: 0 },
    status: { type: String, enum: Object.values(UserStatus), default: UserStatus.PENDING_APPROVAL },
});

// Create a Mongoose model
interface UserModel extends Document {
    username: string;
    firstName: string;
    lastName: string;
    name: string;
    birthday: Date;
    email: string;
    password: string;
    role: UserRole;
    upvoteCount: number;
    downvoteCount: number;
    status: UserStatus;

}

const User = mongoose.model<UserModel>('User', userSchema);

export { User, UserRole };
