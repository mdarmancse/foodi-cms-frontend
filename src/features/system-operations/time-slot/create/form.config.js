import * as Yup from "yup";

export const operation = {
  id: 0,
  platformOperationTimeSlotId: 0,
  zoneId: 0,
};

export const initailValue = {
  weekDay: 0,
  startTime: "",
  endTime: "",
  platformOperationDetailIds: [],
  operationsDetails: [operation],
};

export const TimeSlotValidationSchema = Yup.object().shape({
  weekDay: Yup.number().required("This field is required"),
  startTime: Yup.string().required("This field is required"),
  endTime: Yup.string().required("This field is required"),
  platformOperationDetailIds: Yup.array().of(Yup.number()),
  operationsDetails: Yup.array().of(
    Yup.object().shape({
      id: Yup.number(),
      platformOperationTimeSlotId: Yup.number(),
      zoneId: Yup.number(),
    })
  ),
});
