import * as yup from "yup";

export const initialValue = {
  name: "",
};

export const validationSchema = yup.object().shape({
  name: yup.string(),
});
