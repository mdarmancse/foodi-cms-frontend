import * as yup from "yup";

export const InitialValues = {
  name: "",
  description: "",
};

export const specialHourTypeSchema = yup.object({
  name: yup.string().min(1).max(100).trim().required("Name Is Required"),
  description: yup
    .string()
    .min(1)
    .max(100)
    .trim()
    .required("Description Is Required"),
});
