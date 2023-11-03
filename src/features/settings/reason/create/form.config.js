import * as Yup from "yup";

export const initialValue = {
  name: "",
  description: "",
  image: "",
};

export const ReasonCreateSchema = Yup.object().shape({
  name: Yup.string(),
  description: Yup.string(),
  image: Yup.mixed(),
});
