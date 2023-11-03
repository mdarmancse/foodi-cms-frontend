import * as yup from "yup";

export const initialValues = {
  riderId: "",
  riderShitDutySetupId: "",
  shiftSwapStatusId: "",
  date: "",
  actualStartTime: "",
  actualEndTime: "",
  isBooked: false,
  isPresent: false,
  isInLeave: false,
  isInBreak: false,
  isExtendable: false,
  breakCount: 0,
  lateTime: null,
};

export const riderShiftValidationSchema = yup.object().shape({
  riderId: yup.string().required(),
  riderShitDutySetupId: yup.string().required(),
  shiftSwapStatusId: yup.string().required(),
  date: yup.string().required(),
});
