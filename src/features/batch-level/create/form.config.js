import * as Yup from "yup";

export const InitailValue = {
  name: "",
  lowerLimit: 0,
  higherLimit: 0,
  bonusAmount: 0,
  isDefault: false,
};

export const BatchLevelSchema = Yup.object().shape({
  name: Yup.string(),
  lowerLimit: Yup.number(),
  higherLimit: Yup.number(),
  bonusAmount: Yup.number(),
  isDefault: Yup.boolean(),
});
