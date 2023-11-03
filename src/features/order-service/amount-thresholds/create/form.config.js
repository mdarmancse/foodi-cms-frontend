import * as yup from "yup";

export const InitialValues = {
  zoneId: "",
  amount: "",
};

export const AmountThresholdSchema = yup.object({
  zoneId: yup.string().required("zoneId Is Required"),
  amount: yup.string().min(1).max(100).trim().required("amount Is Required"),
});
