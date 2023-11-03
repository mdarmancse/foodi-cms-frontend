import * as Yup from "yup";

export const initialValue = {
  roleIds: [],
  userIds: [],
  createdBy: 0,
};

export const RoleUserCreateSchema = Yup.object().shape({
  roleIds: Yup.array(),
  userIds: Yup.array(),
  createdBy: Yup.number(),
});
