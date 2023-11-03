import * as yup from "yup";

export const addonsTemplate = {
  addOnName: "",
  addOnPrice: 0,
  addOnCategoryName: "",
  addOnCategoryId: 0,
};

export const InitialValues = {
  name: "",
  description: "",
  presetAddOns: [addonsTemplate],
  isCategoryMultiple: false,
  maxChoice: 0,
};

export const AddonsCategorySchema = yup.object({
  name: yup.string().required("This field is required"),
  description: yup.string(),
  isCategoryMultiple: yup.boolean(),
  maxChoice: yup
    .number()
    .min(0)
    .integer()
    .required("This field is required"),
  presetAddOns: yup.array().of(
    yup.object().shape({
      addOnName: yup.string(),
      addOnPrice: yup.number().min(0),
      addOnCategoryName : yup.string(),
      addOnCategoryId: yup.number().min(0),
    })
  ),
});
