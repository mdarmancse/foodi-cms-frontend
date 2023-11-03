import * as yup from "yup";

export const InitialValues = {
  name: "",
  systemName: "",
};

export const BagTypeSchema = yup.object({
  name: yup.string().min(1).max(100).trim().required("Name Is Required"),
  systemName: yup
    .string()
    .min(1)
    .max(100)
    .trim()
    .required("System Name is Required"),
});
