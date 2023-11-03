import { validateEndTimeGreaterThanStartTime } from "@/helper/validation-helper";
import * as yup from "yup";

export const WorkingHoursTemplate = {
  Day: 1,
  OpenTime: "00:00",
  CloseTime: "23:59",
};

export const InitialValues = {
  Name: "",
  ParentRestaurantId: null,
  Email: "",
  PhoneNumber: "",
  ZonalAdmin: null,
  BranchAdmin: null,
  CentralAdmin: null,
  Image: {},
  CoverImage: {},
  Cuisines: [],
  PriceRange: "",
  IsTakePreOrder: null,
  IsVeg: null,
  IsDelivery: null,
  IsPickup: null,
  IsDine: null,
  Commission: "",
  MinOrderValue: "",
  DeliveryTime: "",
  PickupTime: "",
  Address: "",
  Attributes: [],
  Location: {
    lat: 23.8103,
    lng: 90.4125,
  },
  WorkingHours: [WorkingHoursTemplate],
};

export const ValidationSchema = yup.object().shape({
  Name: yup.string().min(1).max(100).trim().required(),
  ParentRestaurantId: yup.number("Not a valid value").required(),
  Email: yup.string().email().trim(),
  PhoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required()
    .length(11),
  ZonalAdmin: yup.number("Not a valid value"),
  BranchAdmin: yup.number("Not a valid value"),
  CentralAdmin: yup.number("Not a valid value"),
  // Image: yup.mixed().required("Image is required"),
  // CoverImage: yup.mixed().required("Image is required"),
  Cuisines: yup.array().of(yup.object()).required(),
  PriceRange: yup.string().oneOf(["৳", "৳৳", "৳৳৳"]).required(),
  IsTakePreOrder: yup.number("Not a valid value").required(),
  IsVeg: yup.number("Not a valid value").required(),
  IsDelivery: yup.number("Not a valid value").required(),
  IsPickup: yup.number("Not a valid value").required(),
  IsDine: yup.number("Not a valid value").required(),
  Commission: yup.number("Not a valid value").max(100).positive().required(),
  MinOrderValue: yup.number("Not a valid value").positive().required(),
  DeliveryTime: yup.number("Not a valid value").positive().required(),
  PickupTime: yup.number("Not a valid value").positive().required(),
  Address: yup.string().min(1).max(100).required(),
  Attributes: yup.array().of(yup.object()),
  Location: yup.object().required(),
  WorkingHours: yup
    .array()
    .of(
      yup.object({
        Day: yup.number().min(1).max(7).required(),
        OpenTime: yup.string().required(),
        CloseTime: yup
          .string()
          .required()
          .test(
            "isCloseGreaterThanOpen",
            "Open time must be less than close time",
            function (EndTime) {
              const { OpenTime } = this.parent;
              return validateEndTimeGreaterThanStartTime({
                StartTime: OpenTime,
                EndTime,
              });
            }
          ),
      })
    )
    .nullable(),
});
