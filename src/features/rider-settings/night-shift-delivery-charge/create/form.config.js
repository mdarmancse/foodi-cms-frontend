import * as yup from "yup";
import moment from "moment";

export const initialValue = {
  startTime: "",
  endTime: "",
  deliveryChargeAmount: 0,
};

export const validationSchema = yup.object().shape({
  startTime: yup.string().required("start time cannot be empty"),
  endTime: yup
    .string()
    .required("end time cannot be empty")
    .test("is-greater", "end time should be greater than start time", function(value) {
      const { startTime } = this.parent;
      return moment(value, "HH:mm").isAfter(moment(startTime, "HH:mm"));
    }),
  deliveryChargeAmount: yup.number().positive().required(),
});
