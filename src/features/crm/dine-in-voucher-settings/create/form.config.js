import * as yup from "yup";

export const InitialValues = {
  name: "",
  type: "dine_in",
  voucher_type: "",
  discount_type: "",
  discount_in_amount: 0,
  discount_in_percent: 0,
  minimum_order_amount: 0,
  expire_time: 0,
  start_time: new Date().toISOString().slice(0, 16),
  end_time: new Date().toISOString().slice(0, 16),
  branches: [],
  users: [],
  zones: [],
  cuisines: [],
  subscription_types: [],
};

export const DineInVoucherSettingSchema = yup.object({
  name: yup.string().required("This field is required"),
  voucher_type: yup.object().required("This field is required"),
  discount_type: yup.object().required("This field is required"),
  discount_in_amount: yup.number().min(0).required("This field is required"),
  discount_in_percent: yup.number().min(0).required("This field is required"),
  minimum_order_amount: yup.number().min(0).required("This field is required"),
  expire_time: yup.number().min(0).required("This field is required"),
  start_time: yup.date().required("This field is required"),
  end_time: yup.date().required("This field is required"),
  branches: yup.array().required("This field is required"),
  users: yup.array().required("This field is required"),
  zones: yup.array().required("This field is required"),
  cuisines: yup.array().required("This field is required"),
  subscription_types: yup.array(),
});
