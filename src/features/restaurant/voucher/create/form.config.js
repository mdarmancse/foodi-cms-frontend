import * as yup from "yup";

export const initialValues = {
  name: "",
  image: "",
  type: "",
  // voucherTypes: "",
  // discountTypes: "",
  // discountInAmount: "",
  // discountInPercent: "",
  // minimumOrderAmount: "",
  expireTime: "",
  // startTime: "",
  // endTime: "",
  voucherAmount: "",
  voucherCostInPoint: "",
  // validityTime: "",
  // deleteBranchIds: [],
  // deleteCuisineIds: [],
  // deleteZoneIds: [],
  // debuggereleteUserIds: [],
  // branches: [0],
  // cuisines: [0],
  // zones: [0],
  // users: [0],
  // subscriptionTypes: [0],
};

export const voucherSchema = yup.object().shape({
  type: yup.string().required(),
});
