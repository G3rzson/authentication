import { useForm } from "react-hook-form";
import InputField from "./Elements/InputField";
import SubmitBtn from "./Elements/SubmitBtn";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerFormSchema,
  type RegisterFormData,
} from "../../Validation/registerUserForm";
import Paragraph from "./Elements/Paragraph";
import axios from "axios";
import Loading from "../../Loader/Loading";
import { useGlobalContext } from "../../Hooks/useGlobalContext";

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

  async function onSubmit(data: RegisterFormData) {
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

  if (isSubmitting) return <Loading />;

  return (
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
  );
}
