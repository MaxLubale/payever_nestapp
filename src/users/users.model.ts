import * as mongoose from 'mongoose';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string; // Optional avatar field
}

export const UserSchema = new mongoose.Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
});

export interface UserDocument extends mongoose.Document, User {}

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);
