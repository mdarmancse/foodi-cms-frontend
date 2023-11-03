import * as yup from "yup";

export const initialValues = {
  name: "",
  type: "",
  discountTypes: "",
  discountInPercent: "",
  discountInAmount: "",
  minimumOrderAmount: "",
  expireTime: "",
  startTime: "",
  endTime: "",
  zones: [
    {
      id: 0,
      zoneId: 0,
      voucherSettingId: 0,
    },
  ],
  branches: [
    {
      id: 0,
      branchId: 0,
      voucherSettingId: 0,
    },
  ],
  cuisines: [
    {
      id: 0,
      cuisineId: 0,
      voucherSettingId: 0,
    },
  ],
  users: [
    {
      id: 0,
      userId: 0,
      voucherSettingId: 0,
    },
  ],
  subscriptionTypes: [
    {
      id: 0,
      subscriptionTypeId: 0,
      voucherSettingId: 0,
    },
  ],
};

export const dineInVoucher = yup.object().shape({
  type: yup.string().required(),
  discountTypes: yup.string().required(),
});
