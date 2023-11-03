import * as yup from "yup";

export const InitialValues = {
  title: "",
  description: "",
  image: "",
};

export const SchemaOfSystemOnOffReason = yup.object({
  title: yup.string().min(1).max(100).trim().required("Title is required"),
  description: yup
    .string()
    .min(1)
    .max(100)
    .trim()
    .required("Description is required"),
  image: yup.mixed(),
});
