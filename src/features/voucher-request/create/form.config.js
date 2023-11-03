import * as yup from "yup";

export const InitialValues = {
  isApproved: false,
  point: 0,
};

export const VoucherRewquestSchema = yup.object({
  isApproved: yup.boolean(),
  point: yup.number().required("This field is required"),
});
