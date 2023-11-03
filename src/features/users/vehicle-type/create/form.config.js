import * as yup from "yup";

export const InitialValues = {
  type: "",
  commission: 0,
  maximum_no_of_received_order_at_a_time: 0,
};

export const VehicleTypeSchema = yup.object({
  type: yup.string().required("This field is required"),
  commission: yup.number().min(0),
  maximum_no_of_received_order_at_a_time: yup.number().min(0),
});
