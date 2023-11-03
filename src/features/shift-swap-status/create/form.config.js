import * as Yup from "yup";

export const initialValue = {
  name: "",
};

export const ShiftSwapStatusSchema = Yup.object().shape({
  name: Yup.string(),
});
