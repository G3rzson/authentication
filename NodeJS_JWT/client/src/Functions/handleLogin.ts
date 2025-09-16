import axios from "axios";
import type { NavigateFunction } from "react-router-dom";
import type { UseFormReset } from "react-hook-form";
import type { LoginFormData } from "../Validation/loginUserForm";

export default async function handleLogin(
  data: LoginFormData,
  setServerError: React.Dispatch<React.SetStateAction<string | null>>,
  setInfo: React.Dispatch<React.SetStateAction<string | null>>,
  navigate: NavigateFunction,
  reset: UseFormReset<{
    username: string;
    password: string;
  }>,
  setUser: React.Dispatch<React.SetStateAction<string | null>>,
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
) {
  try {
    const response = await axios.post(
      "http://localhost:8000/user/login",
      data,
      {
        withCredentials: true,
      }
    );
    //console.log(response.data);
    if (response.data.error) {
      //console.log(response.data.error);
      setServerError(response.data.error);
    }
    if (response.data.message) {
      //console.log(response.data.message);
      setInfo(response.data.message);
      setAccessToken(response.data.accessToken);
      setUser(response.data.user.username);
      navigate("/user/info");
    }
  } catch (error) {
    //console.log(error);
    if (axios.isAxiosError(error)) {
      //console.log(error.response?.data.error);
      setServerError(error.response?.data.error);
    } else {
      setServerError("Hiba történt a bejelentkezés során!");
    }
  } finally {
    reset();
  }
}
