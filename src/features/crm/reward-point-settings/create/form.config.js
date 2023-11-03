import * as yup from "yup";

export const InitialValues = {
  rewardLevelId: "",
  pointPerAmount: 0,
};

export const RewardPointSchema = yup.object({
  rewardLevelId: yup.string().required("This field is required"),
  pointPerAmount: yup.string().required("This field is required"),
});
