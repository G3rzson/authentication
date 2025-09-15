import { useForm } from "react-hook-form";
import {
  loginFormSchema,
  type LoginFormData,
} from "../../Validation/loginUserForm";
import InputField from "./Elements/InputField";
import SubmitBtn from "./Elements/SubmitBtn";
import { zodResolver } from "@hookform/resolvers/zod";
import Paragraph from "./Elements/Paragraph";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  async function onSubmit(data: LoginFormData) {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      reset();
    }
  }

  return (
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
    </form>
  );
}
