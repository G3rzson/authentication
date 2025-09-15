import { Schema, model, models } from "mongoose";
import { RegisterFormData } from "../validation/registerUserForm";

// Schema
const registerUserSchema = new Schema<RegisterFormData>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
// Model
const RegisterUserModel =
  models.User || model<RegisterFormData>("User", registerUserSchema);

export default RegisterUserModel;
