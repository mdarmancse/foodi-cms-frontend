import * as yup from "yup";

export const InitialValues = {
  name: "",
  value: "",
  level: 0,
};

export const RewardLabelSchema = yup.object({
  name: yup.string().required("This field is required"),
  value: yup.string(),
  level: yup.number(),
});
