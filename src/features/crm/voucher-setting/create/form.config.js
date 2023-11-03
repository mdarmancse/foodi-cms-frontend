import * as yup from "yup";

export const InitialValues = {
  name: "",
  image: "",
  voucher_amount: 0,
  voucher_cost_in_point: 0,
  validity_time: 0,
  type: "",
};

export const VoucherSettingSchema = yup.object({
  name: yup.string().required("This field is required"),
  image: yup.mixed().required("This field is required"),
  voucher_amount: yup.number().min(0).required("This field is required"),
  voucher_cost_in_point: yup.number().min(0).required("This field is required"),
  validity_time: yup.number().min(0).required("This field is required"),
  type: yup.object().required("This field is required"),
});
