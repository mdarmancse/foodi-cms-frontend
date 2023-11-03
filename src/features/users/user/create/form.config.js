import * as yup from "yup";

export const InitialValues = {
  name: "",
  address: "",
  phoneNumber: "",
  email: "",
  password: "",
  confirmPassword: "",
  userType: "",
};

export const UserSchema = yup.object({
  name: yup.string().min(1).max(100).trim().required("This field is required"),
  address: yup
    .string()
    .min(1)
    .max(250)
    .trim()
    .required("This field is required"),
  phoneNumber: yup.number().positive().required("This field is required"),
  email: yup.string().email().required("This field is required"),
  password: yup
    .string()
    .min(1)
    .max(100)
    .trim()
    .required("This field is required"),
  confirmPassword: yup
    .string()
    .min(1)
    .max(100)
    .trim()
    .required("This field is required")
    .oneOf([yup.ref("password")], "Password dosen't match"),
  userType: yup.object().required("This field is required"),
});

export const UserSchemaForEdit = yup.object({
  name: yup.string().min(1).max(100).trim().required("This field is required"),
  address: yup
    .string()
    .min(1)
    .max(250)
    .trim()
    .required("This field is required"),
  phoneNumber: yup.number().positive().required("This field is required"),
  email: yup.string().email().required("This field is required"),
});
