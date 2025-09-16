import { useForm } from "react-hook-form";
import {
  loginFormSchema,
  type LoginFormData,
} from "../../Validation/loginUserForm";
import InputField from "./Elements/InputField";
import SubmitBtn from "./Elements/SubmitBtn";
import { zodResolver } from "@hookform/resolvers/zod";
import Paragraph from "./Elements/Paragraph";
import { useGlobalContext } from "../../Hooks/useGlobalContext";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../../Loader/LoadingModal";
import handleLogin from "../../Functions/handleLogin";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const { setServerError, setInfo, setUser, setAccessToken } =
    useGlobalContext();
  const navigate = useNavigate();

  async function onSubmit(data: LoginFormData) {
    //console.log(data);
    handleLogin(
      data,
      setServerError,
      setInfo,
      navigate,
      reset,
      setUser,
      setAccessToken
    );
  }

  return (
    <>
      <LoadingModal isOpen={isSubmitting} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField<LoginFormData>
          name="username"
          label="Felhasználónév:"
          register={register}
          errors={errors}
        />
        <InputField<LoginFormData>
          name="password"
          label="Jelszó:"
          type="password"
          register={register}
          errors={errors}
        />
        <SubmitBtn isSubmitting={isSubmitting}>Bejelentkezés</SubmitBtn>
        <Paragraph
          text={"Nincs még fiókod?"}
          linkText={"Regisztrálj!"}
          path="/user/register"
        />
      </form>{" "}
    </>
  );
}
