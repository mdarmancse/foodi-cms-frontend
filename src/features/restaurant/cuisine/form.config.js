import * as yup from "yup";

export const CuisineLanguageTemplate = {
  languageId: null,
  name: "",
};

export const InitialValues = {
  name: "",
  isDelivery: false,
  isPickup: false,
  isDine: false,
  image: "",
  color: {
    fg: "#000000",
    bg: "#000000",
  },
  cuisineLangs: [CuisineLanguageTemplate],
};

export const ValidationSchema = yup.object().shape({
  name: yup.string().min(1).max(100).trim().required(),
  isDelivery: yup.boolean().required(),
  isPickup: yup.boolean().required(),
  isDine: yup.boolean().required(),
  // Image: yup.mixed().required("Image is required"),
  color: yup.object().shape({
    fg: yup
      .string()
      .matches("^#?[a-f0-9]{6}$", { message: "Not a valid color" })
      .required(),
    bg: yup
      .string()
      .matches("^#?[a-f0-9]{6}$", { message: "Not a valid color" })
      .required(),
  }),
  cuisineLangs: yup
    .array()
    .of(
      yup.object({
        name: yup
          .string()
          .required(
            "Name is required. Remove the fields if you don't want to add any language"
          ),
        languageId: yup
          .string()
          .required(
            "Language is required.Remove the fields if you don't want to add any language"
          ),
      })
    )
    .nullable(),
});
