import * as yup from "yup";

export const InitialValues = {
  Name: "",
  Description: "",
  Image: {},
  Branches: [],
  StartDate: "",
  EndDate: "",
  IsDelivery: "",
  IsPickup: "",
  IsDine: "",
};

export const ValidationSchema = yup.object().shape({
  Name: yup.string().min(1).max(100).trim().required(),
  Type: yup.string().oneOf(["slider", "banner"]).required(),
  Branches: yup.array().of(yup.object({})).required(),
  StartDate: yup.date().required(),
  EndDate: yup.date().required(),
  IsDelivery: yup.number("Not a valid value").required(),
  IsPickup: yup.number("Not a valid value").required(),
  IsDine: yup.number("Not a valid value").required(),
});
