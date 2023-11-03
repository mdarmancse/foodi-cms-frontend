import * as Yup from "yup";

export const initialValue = {
  roles: [],
  menus: [],
};

export const PermissionCreateSchema = Yup.object().shape({
  roles: Yup.array().min(1).required(),
});
