import * as yup from "yup";

export const InitialValues = {
  Name: "",
  Image: "",
  PriorityNumber: 0,
  IsShowInPanel: false,
  BranchId: 0,
};

export const CategorySchema = yup.object().shape({
  Name : yup.string().required("This field is required"),
  Image: yup.mixed().required("This field is required"),
  PriorityNumber: yup.number().required("This field is required"),
  IsShowInPanel: yup.boolean().required("This field is required"),
  BranchId: yup.number().required("This field is required"),
});
