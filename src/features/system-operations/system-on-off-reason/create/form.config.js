import * as yup from "yup";

export const InitialValues = {
  name: "",
  description: "",
  image: "",
};

export const SchemaOfSystemOnOffReason = yup.object({
  name: yup.string().min(1).max(100).trim().required("Name is required"),
  description: yup.string().required("Description is required"),
  image: yup.mixed(),
});
