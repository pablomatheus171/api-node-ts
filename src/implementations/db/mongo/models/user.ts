import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  accessToken: { type: String }

}, { timestamps: true })
export const UserModel = model('User', userSchema)
