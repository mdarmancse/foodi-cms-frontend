import * as yup from "yup";

export const InitialValues = {
  name: "",
};

export const CitySchema = yup.object({
  name: yup.string().min(1).max(100).trim().required("This field is required"),
});
