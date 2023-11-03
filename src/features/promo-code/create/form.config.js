import * as yup from "yup";
import { FieldValueForOption, NamesForOption } from "./constants";

export const GradualSingleRow = {
  Sequence: "",
  DiscountPercent: "",
};

export const ValidationSchema = yup.object({
  name: yup.string().min(1).max(150).trim().required(),
  description: yup.string().trim().notRequired(),
  couponTypeId: yup.object({
    label: yup.string().required("This field is required."),
    value: yup.string().required("This field is required."),
  }),
  image: yup.mixed().notRequired(),
  isGradual: yup.string().required(),
  useLimit: yup.number().min(0).required(),
  dailyUseLimit: yup.number().min(0).required(), // need to be change @TODO:
  totalPromoCode: yup.number().min(0).required(),
  isAutoApply: yup.boolean().required(),
  isPercent: yup.string().required(),
  discountInAmount: yup
    .number()
    .min(0)
    .when("IsPercent", (value, schema) => {
      if (value?.length) {
        if (value[0] === "false") {
          return schema.required();
        } else {
          return schema.notRequired();
        }
      } else {
        return schema.notRequired();
      }
    })
    .required(),
  discountInPercent: yup.number().min(0).max(100).required(),
  minimumOrderAmount: yup.number().min(0).required(),
  maximumDiscountAmount: yup.number().min(0).required(),
  startTime: yup.date().required(),
  endTime: yup
    .date()
    .required()
    .min(yup.ref("startTime"), "End date cannot be before start time."), //@TODO: need to implement date time validation
  validTimeInADayStart: yup.string().required(),
  validTimeInADayEnd: yup.string().required(),
  isFreeDelivery: yup.boolean().required(),
  isDelivery: yup.boolean().required(),
  isPickup: yup.boolean().required(),
  gradualInformation: yup
    .array()
    .of(
      yup.object({
        sequence: yup
          .number("Sequence must be a number")
          .min(0)
          .required("This field is required"),
        discountPercent: yup
          .number()
          .min(0, "Please enter a positive number.")
          .required("This field is required"),
      })
    )
    .when(["isGradual", "useLimit"], (value, schema) => {
      if (value.length) {
        if (value[0] == "true" && value[1]) {
          return schema.min(value[1]).required();
        } else {
          return schema.notRequired();
        }
      } else {
        return schema.notRequired();
      }
    }),
  [NamesForOption.Users]: yup
    .array()
    .when("couponTypeId", function (value, schema) {
      if (value.length) {
        const selectedTypeFieldValue = value[0]?.fieldValue;
        if (selectedTypeFieldValue == FieldValueForOption.Users) {
          return schema.min(1).required("This Field is required");
        } else {
          return schema.notRequired();
        }
      } else {
        return schema.notRequired();
      }
    }),
  [NamesForOption.Branch]: yup
    .array()
    .when("couponTypeId", function (value, schema) {
      if (value.length) {
        const selectedTypeFieldValue = value[0]?.fieldValue;
        if (selectedTypeFieldValue == FieldValueForOption.Categories) {
          return schema.min(1).required("This Field is required");
        } else if (selectedTypeFieldValue == FieldValueForOption.Branch) {
          return schema.min(1).required("This Field is required");
        } else if (selectedTypeFieldValue == FieldValueForOption.MenuItem) {
          return schema.min(1).required("This Field is required");
        } else {
          return schema.notRequired();
        }
      } else {
        return schema.notRequired();
      }
    }),
  [NamesForOption.Categories]: yup
    .array()
    .when("couponTypeId", function (value, schema) {
      if (value.length) {
        const selectedTypeFieldValue = value[0]?.fieldValue;

        if (selectedTypeFieldValue == FieldValueForOption.Categories) {
          return schema.min(1).required("This Field is required");
        } else {
          return schema.notRequired();
        }
      } else {
        return schema.notRequired();
      }
    }),
  [NamesForOption.SubscriptionType]: yup
    .array()
    .when("couponTypeId", function (value, schema) {
      const selectedTypeFieldValue = value[0]?.fieldValue;

      if (value.length) {
        if (selectedTypeFieldValue == FieldValueForOption.Categories) {
          return schema.min(1).required("This Field is required");
        } else if (selectedTypeFieldValue == FieldValueForOption.City) {
          return schema.min(1).required("This Field is required");
        } else if (selectedTypeFieldValue == FieldValueForOption.Restaurants) {
          return schema.min(1).required("This Field is required");
        } else if (selectedTypeFieldValue == FieldValueForOption.Branch) {
          return schema.min(1).required("This Field is required");
        } else if (selectedTypeFieldValue == FieldValueForOption.Zones) {
          return schema.min(1).required("This Field is required");
        } else if (selectedTypeFieldValue == FieldValueForOption.MenuItem) {
          return schema.min(1).required("This Field is required");
        } else if (selectedTypeFieldValue == FieldValueForOption.Cuisines) {
          return schema.min(1).required("This Field is required");
        } else {
          return schema.notRequired();
        }
      } else {
        return schema.notRequired();
      }
    }),
  [NamesForOption.City]: yup
    .array()
    .when("couponTypeId", function (value, schema) {
      if (value.length) {
        const selectedTypeFieldValue = value[0]?.fieldValue;
        if (selectedTypeFieldValue == FieldValueForOption.City) {
          return schema.min(1).required("This Field is required");
        } else {
          return schema.notRequired();
        }
      } else {
        return schema.notRequired();
      }
    }),
  [NamesForOption.Restaurants]: yup
    .array()
    .when("couponTypeId", function (value, schema) {
      if (value.length) {
        const selectedTypeFieldValue = value[0]?.fieldValue;
        if (selectedTypeFieldValue == FieldValueForOption.Restaurants) {
          return schema.min(1).required("This Field is required");
        } else {
          return schema.notRequired();
        }
      } else {
        return schema.notRequired();
      }
    }),
  [NamesForOption.Zones]: yup
    .array()
    .when("couponTypeId", function (value, schema) {
      if (value.length) {
        const selectedTypeFieldValue = value[0]?.fieldValue;
        if (selectedTypeFieldValue == FieldValueForOption.Zones) {
          return schema.min(1).required("This Field is required");
        } else {
          return schema.notRequired();
        }
      } else {
        return schema.notRequired();
      }
    }),
  [NamesForOption.MenuItem]: yup
    .array()
    .when("couponTypeId", function (value, schema) {
      if (value.length) {
        const selectedTypeFieldValue = value[0]?.fieldValue;
        if (selectedTypeFieldValue == FieldValueForOption.MenuItem) {
          return schema.min(1).required("This Field is required");
        } else {
          return schema.notRequired();
        }
      } else {
        return schema.notRequired();
      }
    }),
  [NamesForOption.Cuisines]: yup
    .array()
    .when("couponTypeId", function (value, schema) {
      if (value.length) {
        const selectedTypeFieldValue = value[0]?.fieldValue;
        if (selectedTypeFieldValue == FieldValueForOption.Cuisines) {
          return schema.min(1).required("This Field is required");
        } else {
          return schema.notRequired();
        }
      } else {
        return schema.notRequired();
      }
    }),
});

export const InitialPCValues = {
  name: "",
  description: "",
  couponTypeId: "",
  image: "",
  isGradual: "false",
  useLimit: "",
  dailyUseLimit: "",
  totalPromoCode: "",
  isAutoApply: false,
  isPercent: "true", // discount type
  discountInAmount: "",
  discountInPercent: "",
  minimumOrderAmount: "",
  maximumDiscountAmount: "",
  startTime: "",
  endTime: "",
  withCommission: false,
  restaurantBurn: "",
  foodiBurn: "",
  validTimeInADayStart: "",
  validTimeInADayEnd: "",
  isFreeDelivery: false,
  isDelivery: false,
  isPickup: false,
  deleteCouponMappingIds: [],
  deleteGradualInfoIds: [],
  gradualInformation: [],
  selectedTypes: {
    [NamesForOption.Branch]: [],
    [NamesForOption.Categories]: [],
    [NamesForOption.City]: [],
    [NamesForOption.Cuisines]: [],
    [NamesForOption.MenuItem]: [],
    [NamesForOption.Restaurants]: [],
    [NamesForOption.SubscriptionType]: [],
    [NamesForOption.Users]: [],
    [NamesForOption.Zones]: [],
  },
  sequence: "",
  discountPercent: "",
};
