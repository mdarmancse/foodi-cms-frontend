import * as yup from "yup";

export const InitialValues = {
  name: "",
  startTime: "",
  endTime: "",
  branchId: "",
};

export const SchemaOfMenuItemTimeSlot = yup.object({
  name: yup.string().min(1).max(100).trim().required("Name is required"),
  startTime: yup.string().required("Start TIme is required"),
  endTime: yup.string().required("End Time is required"),
  branchId: yup.string().required("BranchID is required"),
});
