import * as yup from "yup";

export const initialValues = {
  name: "",
  displayName: "",
  icon: "",
  url: "",
  order: "",
  isModule: false,
  isParent: false,
  parentId: "",
  isVisible: false,
  levelAt: "",
  menuActionId: "",
};

export const menuSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  url: yup.string(),
  icon: yup.string().required("Icon is required"),
  displayName: yup.string().required("Display Name is required"),
  isModule: yup.boolean().required(),
  isParent: yup.boolean().required("Parent is required"),
  parentId: yup
    .number()
    .when("isParent", (value, schema) => {
      const val = value[0];
      if (Number(val) > 0) {
        return schema.required();
      } else {
        return schema.notRequired();
      }
    })
    .required(),
  order: yup.number().min(1).required("Order is required"),
  isVisible: yup.boolean().required("Visible is required"),
  levelAt: yup.number().positive().min(1).required("Level is required"),
});
