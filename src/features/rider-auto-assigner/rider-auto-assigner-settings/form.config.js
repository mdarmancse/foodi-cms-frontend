import * as yup from "yup";

export const InitialValues = {
  orderForwardingInterval: 0,
  searchRadius: 0,
  searchTimeout: 0,
  riderLocationUpdateInterval: 0,
};

export const SchemaOfAutoServiceSettings = yup.object({
  orderForwardingInterval: yup
    .number()
    .min(0)
    .required("orderForwardingInterval is required"),
  searchRadius: yup.number().min(0).required("searchRadius is required"),
  searchTimeout: yup.number().min(0).required("searchTimeout is required"),
  riderLocationUpdateInterval: yup
    .number()
    .min(0)
    .required("riderLocationUpdateInterval is required"),
});
