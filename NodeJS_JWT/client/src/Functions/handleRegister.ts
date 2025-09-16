import axios from "axios";
import type { RegisterFormData } from "../Validation/registerUserForm";
import type { NavigateFunction } from "react-router-dom";
import type { UseFormReset } from "react-hook-form";

export default async function handleRegister(
  data: RegisterFormData,
  setServerError: React.Dispatch<React.SetStateAction<string | null>>,
  setInfo: React.Dispatch<React.SetStateAction<string | null>>,
  navigate: NavigateFunction,
  reset: UseFormReset<{
    username: string;
    email: string;
    password: string;
  }>
) {
  try {
    const response = await axios.post(
      "http://localhost:8000/user/register",
      data
    );
    //console.log(response.data);
    if (response.data.error) {
      console.log(response.data.error);
      setServerError(response.data.error);
    }
    if (response.data.message) {
      console.log(response.data.message);
      setInfo(response.data.message);
      navigate("/user/login");
    }
  } catch (error) {
    //console.log(error);
    if (axios.isAxiosError(error)) {
      //console.log(error.response?.data.error);
      setServerError(error.response?.data.error);
    } else {
      setServerError("Hiba történt a regisztráció során!");
    }
  } finally {
    reset();
  }
}
