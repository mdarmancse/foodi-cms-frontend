import * as yup from "yup";

export const InitialValues = {
  name: "",
  centralAdmin: "",
  mobile: "",
  logo: "",
  coverImage: "",
};

export const ValidationSchema = yup.object({
  name: yup.string().min(1).max(100).trim().required(),
  centralAdmin: yup.number().required(),
  mobile: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required()
    .length(11),
  logo: yup.mixed().required("Logo is required"),
  coverImage: yup.mixed().required("Cover image is required"),
});
