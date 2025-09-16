import { createApi } from "../api/api";

export async function getData(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  accessToken: string | null,
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>,
  setServerInfo: React.Dispatch<React.SetStateAction<string | null>>
) {
  const api = createApi(accessToken, setAccessToken);
  try {
    setLoading(true);
    const response = await api.get("/auth", { withCredentials: true });
    //console.log(response.data);
    setServerInfo(response.data.message);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}
