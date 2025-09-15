export type GlobalContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  info: string | null;
  setInfo: React.Dispatch<React.SetStateAction<string | null>>;
  serverError: string | null;
  setServerError: React.Dispatch<React.SetStateAction<string | null>>;
};
