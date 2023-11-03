import * as yup from "yup";

export const deliveryChargeTemplate = {
  distance_start: "",
  distance_end: "",
  delivery_charge: "",
};

export const defaultKMWiseCharge = {
  kilometer: "",
  charge: "",
};

export const InitialValues = {
  name: "",
  latLong: {
    coordinates: [],
    type: "polygon",
  },
  cityId: "",
  deletekilometerWiseDeliveryChargesIds: [],
  zoneDeliveryCharges: {
    distanceStartInKilometer: "",
    distanceEndInKilometer: "",
    deliveryCharge: "",
  },
  kilometerWiseDeliveryCharges: [defaultKMWiseCharge],
  autocompleteInput: "",
};

export const ZoneFormSchema = yup.object({
  name: yup.string().min(1).max(160).trim().required(),
  latLong: yup.object({
    coordinates: yup
      .array()
      .of(
        yup.object({
          lat: yup.number().required(),
          lng: yup.number().required(),
        })
      )
      .min(1)
      .required(),
    type: yup.string().required(),
  }),
  cityId: yup
    .object({
      label: yup.string().required("This field is required."),
      value: yup.string().required("This field is required."),
    })
    .required(),
  zoneDeliveryCharges: yup.object({
    distanceStartInKilometer: yup.number().required("This Field is required."),
    distanceEndInKilometer: yup.number().required("This Field is required."),
    deliveryCharge: yup.number().min(0).required("This Field is required."),
  }),
  kilometerWiseDeliveryCharges: yup
    .array()
    .of(
      yup
        .object({
          kilometer: yup.number(),
          charge: yup.number(),
        })
        .notRequired()
    )
    .min(0)
    .notRequired(),
});

export const getInitialValues = (data) => {
  const initialValues = {
    ...data,
    latLong: {
      ...data.latLong,
      coordinates: data.latLong?.coordinates?.map((coords) => {
        if (coords.length !== 2 || coords.length < 2) return;
        return {
          lat: coords[0],
          lng: coords[1],
        };
      }),
    },
    deletekilometerWiseDeliveryChargesIds: [],
  };
  initialValues.cityId = {
    label: data?.city?.name,
    value: data?.city?.id,
  };

  if (!initialValues.kilometerWiseDeliveryCharges.length) {
    initialValues.kilometerWiseDeliveryCharges = [defaultKMWiseCharge];
  }

  delete initialValues.branches;
  delete initialValues.city;
  delete initialValues.updatedAt;
  delete initialValues.updatedBy;
  delete initialValues.createdAt;
  delete initialValues.createdBy;

  return initialValues;
};
