import * as yup from "yup";

export const initialValues = {
  batchLevelId: "",
  weekDayId: "",
  startTime: "",
  endTime: "",
};

export const batchwiseShiftSchema = yup.object().shape({
  batchLevelId: yup.string().required(),
  weekDayId: yup.string().required(),
  startTime: yup.string().required(),
  endTime: yup.string().required(),
});
