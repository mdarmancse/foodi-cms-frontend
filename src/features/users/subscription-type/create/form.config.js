import * as yup from "yup";


export const InitialValues = {
  name: "",
  fee: "",
  expireIn: 0,
  isPremium: false,
  detail: "",
};

export const SubscriptionTypeSchema = yup.object({
  name: yup.string().required("This field is required"),
  fee: yup.string().required("This field is required"),
  expireIn: yup.number(),
  isPremium: yup.boolean(),
  detail: yup.string().required("This field is required"),
});
