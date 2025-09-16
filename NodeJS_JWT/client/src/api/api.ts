import axios from "axios";

export const createApi = (
  accessToken: string | null,
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        // új access token kérése refresh tokennel
        const refreshResponse = await axios.post(
          "http://localhost:8000/user/refresh-token",
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data.accessToken;

        // frissítjük a context-et
        setAccessToken(newAccessToken); //  <-- a GlobalContext hívása

        // frissítjük a header-t
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      }

      return Promise.reject(error);
    }
  );

  return api;
};
