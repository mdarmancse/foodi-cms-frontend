import * as yup from "yup";

export const initialValues = {
  targetDay: 0,
  targetOrder: 0,
  referredRiderBonusAmount: 0,
  newRiderBonusAmount: 0,
};

export const referrerValidationSchema = yup.object().shape({
  targetDay: yup.number().required(),
  targetOrder: yup.number().required(),
  referredRiderBonusAmount: yup.number().required(),
  newRiderBonusAmount: yup.number().required(),
});
