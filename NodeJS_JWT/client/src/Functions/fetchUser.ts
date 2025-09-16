import { createApi } from "../api/api";

export async function fetchUser(
  setUser: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  accessToken: string | null,
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
) {
  const api = createApi(accessToken, setAccessToken);
  try {
    setLoading(true);
    const response = await api.get("http://localhost:8000/user/me", {
      withCredentials: true,
    });
    //console.log(response.data);
    if (response.data.user.username) {
      setUser(response.data.user.username);
    }
  } catch (error) {
    console.log("Hiba a felhasználó lekérésekor!", error);
  } finally {
    setLoading(false);
  }
}
