import * as yup from "yup";

export const InitialValues = {
  name: "",
  type: "",
  branchAndPromotions: [],
  bannerImage: "",
  startDate: "",
  endDate: "",
  isDelivery: false,
  isPickup: false,
  isDine: false,
};

export const ValidationSchema = yup.object().shape({
  name: yup.string().min(1).max(100).trim().required(),
  type: yup.string().oneOf(["slider", "banner"]).required(),
  branchAndPromotions: yup.array().of(yup.object({})).required(),
  startDate: yup.date().required(),
  endDate: yup.date().required(),
  isDelivery: yup.boolean("Not a valid value").required(),
  isPickup: yup.boolean("Not a valid value").required(),
  isDine: yup.boolean("Not a valid value").required(),
});
