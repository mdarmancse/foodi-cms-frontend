import * as yup from "yup";

export const InitialValues = {
  name: "",
  isActive: true,
};

export const BranchAttributeSchema = yup.object({
  name: yup.string().min(1).max(100).trim().required("This field is required"),
  isActive: yup.boolean().required("This field is required"),
});
