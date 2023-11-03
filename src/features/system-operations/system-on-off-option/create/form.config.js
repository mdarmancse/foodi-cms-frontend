import * as yup from "yup";

export const initialValues = {
  name: "",
  riderAssignRadius: 0,
  isAutoRouting: true,
  maxOrderValue: 0,
  minOrderValue: 0,
  orderVerificationMaxAmount: 0,
  contactUsEmail: "",
  iterationInterval: 0,
  riderMaxIteration: 0,
  isSystemOff: true,
  isFacebookAuthenticated: true,
  isGoogleAuthenticated: true,
  isPhoneNumberAuthenticated: true,
  systemOnOffReasonId: 0,
  systemOptionDetails: [0],
  deletedSystemOptionDetailIds: [0],
};

export const systemOptionSchema = yup.object().shape({
  name: yup.string().required(),
});
