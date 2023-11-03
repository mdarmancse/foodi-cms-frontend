import * as Yup from "yup";

export const goalTemaplate = {
  sl: 0,
  name: "",
  requiredNumberOfOrder: 0,
  perOrderValue: 0,
};

export const initialValue = {
  name: "",
  acceptableAcceptanceRate: 0,
  acceptableCompletionRate: 0,
  startDate: new Date(),
  endDate: new Date(),
  startTime: "",
  endTime: "",
  hasTimeLimit: false,
  rules: "",
  zoneIds: [],
  goals: [goalTemaplate],
};
export const RiderQuestCreateSchema = Yup.object().shape({
  name: Yup.string(),
  acceptableAcceptanceRate: Yup.number(),
  acceptableCompletionRate: Yup.number(),
  startDate: Yup.date(),
  endDate: Yup.date(),
  startTime: Yup.string(),
  endTime: Yup.string(),
  hasTimeLimit: Yup.boolean(),
  rules: Yup.string(),
  zoneIds: Yup.array(),
  goals: Yup.array().of(
    Yup.object().shape({
      sl: Yup.number(),
      name: Yup.string(),
      requiredNumberOfOrder: Yup.number(),
      perOrderValue: Yup.number(),
    })
  ),
});
