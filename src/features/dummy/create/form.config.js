import * as yup from "yup";

export const InitialValues = {
  firstName: "",
  lastName: "",
  image: {},
  presentAddress: "",
  permanentAddress: "",
  email: "",
  role: "",
  password: "",
  confirmPassword: "",
};

export const AdminisitrativeUserSchema = yup.object({
  firstName: yup.string().min(1).max(100).trim().required(),
  lastName: yup
    .string()
    .min(1)
    .max(100)
    .when("firstName", (value, schema) => {
      if (value[0]?.length > 0) {
        return schema.required();
      } else {
        return schema.notRequired();
      }
    })
    .trim(),
  //   image: yup.object().notRequired(),
  presentAddress: yup.string().min(1).max(250).trim().notRequired(),
  permanentAddress: yup.string().min(1).max(250).trim().notRequired(),
  mobileNumber: yup.number().notRequired(),
  email: yup.string().email().required(),
  role: yup.string().required(),
  password: yup.string().min(3).max(150).trim().required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Type type same password again"),
});
