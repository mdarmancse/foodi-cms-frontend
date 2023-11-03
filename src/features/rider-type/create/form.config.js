import * as Yup from "yup";

export const initialValue = {
  riderContractTypeId : "",
  vehicleTypeId: "",
  monthlySalary: 0,
  deliveryChargeAmount: 0,
};

export const RiderTypeCreateSchemma = Yup.object().shape({
  riderContractTypeId: Yup.string(),
  vehicleTypeId: Yup.string(),
  monthlySalary: Yup.number(),
  deliveryChargeAmount: Yup.number(),
});
