import { useForm } from "react-hook-form";
import InputField from "./Elements/InputField";
import SubmitBtn from "./Elements/SubmitBtn";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerFormSchema,
  type RegisterFormData,
} from "../../Validation/registerUserForm";
import Paragraph from "./Elements/Paragraph";
import { useGlobalContext } from "../../Hooks/useGlobalContext";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../../Loader/LoadingModal";
import handleRegister from "../../Functions/handleRegister";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const { setServerError, setInfo } = useGlobalContext();
  const navigate = useNavigate();

  async function onSubmit(data: RegisterFormData) {
    //console.log(data)
    handleRegister(data, setServerError, setInfo, navigate, reset);
  }

  return (
    <>
      <LoadingModal isOpen={isSubmitting} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField<RegisterFormData>
          name="username"
          label="Felhasználónév:"
          register={register}
          errors={errors}
        />
        <InputField<RegisterFormData>
          name="email"
          label="Email:"
          register={register}
          errors={errors}
        />
        <InputField<RegisterFormData>
          name="password"
          label="Jelszó:"
          type="password"
          register={register}
          errors={errors}
        />
        <SubmitBtn isSubmitting={isSubmitting}>Regisztráció</SubmitBtn>
        <Paragraph
          text={"Van már fiókod?"}
          linkText={"Jelentkezz be!"}
          path="/user/login"
        />
      </form>
    </>
  );
}
