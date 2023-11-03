import { validateEndDateTimeGreaterThanStartDateTime } from "@/helper/validation-helper";
import moment from "moment";
import * as Yup from "yup";

export const InitialValues = {
  title: "",
  description: "",
  isRedirect: false,
  redirectType: "",
  restaurantId: "",
  campaignId: "",
  image: "",
  startDate: moment().format("YYYY-MM-DDTHH:mm"),
  endDate: moment().format("YYYY-MM-DDTHH:mm"),
  cancellable: false,
};

export const PopupBannerSchema = Yup.object().shape({
  title: Yup.string().min(1).max(100).trim().required("This field is required"),
  description: Yup.string().min(1).max(100).trim(),
  isRedirect: Yup.boolean(),
  redirectType: Yup.object().notRequired(),
  restaurantId: Yup.object({
    label: Yup.string(),
    value: Yup.string(),
  }),
  campaignId: Yup.object().notRequired(),
  image: Yup.mixed(),
  startDate: Yup.date().required("This field is required"),
  endDate: Yup.date()
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
  cancellable: Yup.boolean(),
});
