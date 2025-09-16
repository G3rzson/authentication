import axios from "axios";
import type { NavigateFunction } from "react-router-dom";

export async function handleLogout(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>,
  setUser: React.Dispatch<React.SetStateAction<string | null>>,
  setInfo: React.Dispatch<React.SetStateAction<string | null>>,
  setServerError: React.Dispatch<React.SetStateAction<string | null>>,
  navigate: NavigateFunction
) {
  try {
    setLoading(true);
    const response = await axios.post(
      "http://localhost:8000/user/logout",
      {},
      { withCredentials: true }
    );
    //console.log(response.data);
    if (response.data.error) {
      //console.log(response.data.error);
      setServerError(response.data.error);
    }
    if (response.data.message) {
      //console.log(response.data.message);
      setInfo(response.data.message);
      setAccessToken(null);
      setUser(null);
      navigate("/user/login");
    }
  } catch (error) {
    //console.log(error);
    if (axios.isAxiosError(error)) {
      //console.log(error.response?.data.error);
      setServerError(error.response?.data.error);
    } else {
      setServerError("Hiba történt a kijelentkezés során!");
    }
  } finally {
    setLoading(false);
  }
}
