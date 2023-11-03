import * as yup from "yup";

export const InitialValues = {
  userName: "",
  password: "",
};

export const LoginValidationSchema = yup.object({
  userName: yup.string().email().min(1).max(150).required(),
  password: yup.string().min(1).max(150).required(),
});
