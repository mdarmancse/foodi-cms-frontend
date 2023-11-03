import { validateEndDateTimeGreaterThanStartDateTime } from "@/helper/validation-helper";
import moment from "moment";
import * as yup from "yup";

export const InitialValues = {
  name: "",
  description: "",
  image: "",
  branchAndCampaigns: [],
  startDate: moment().format("YYYY-MM-DDTHH:mm"),
  endDate: moment().format("YYYY-MM-DDTHH:mm"),
  isDelivery: false,
  isPickup: false,
  isDine: false,
  isFlower: false,
};

export const ValidationSchema = yup.object().shape({
  name: yup.string().min(1).max(100).trim().required("This field is required"),
  description: yup.string().min(1).max(250).trim(),
  image: yup.mixed(),
  branchAndCampaigns: yup.array(),
  startDate: yup.date().required("This field is required"),
  endDate: yup
    .date()
    .required("This field is required")
    .test(
      "isCloseDateTimeGreaterThanOpenDateTime",
      "Start datetime must be less than close datetime",
      function (value) {
        const { StartDate } = this.parent;
        return validateEndDateTimeGreaterThanStartDateTime({
          StartDateTime: StartDate,
          EndDateTime: value,
        });
      }
    ),
  isDelivery: yup.boolean(),
  isPickup: yup.boolean(),
  isDine: yup.boolean(),
  isFlower: yup.boolean(),
});
