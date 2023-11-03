import * as Yup from "yup";

export const initialValue = {
  name: "",
};

export const RoleCreateSchema = Yup.object().shape({
  name: Yup.string().required(),
});
