import * as yup from "yup";

export const initialValues = {
  zoneId: 0,
  weekDayId: 0,
  startTime: "",
  endTime: "",
  swapRequestTimeout: "",
  numberOfRider: 0,
};

export const setupDutySchema = yup.object().shape({
  zoneId: yup.number().required(),
  weekDayId: yup.number().required(),
  startTime: yup.string().required(),
  endTime: yup.string().required(),
  swapRequestTimeout: yup.string().required(),
  numberOfRider: yup.number().required(),
});
