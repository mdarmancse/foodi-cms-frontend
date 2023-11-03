import * as yup from "yup";

const addonObj = {
  addonId: 0,
  name: "",
  price: 0,
  categoryId: 0,
};
export const menuObj = {
  menuId: 0,
  name: "",
  price: 0,
  quantity: 0,
  categoryId: 0,
  variation: "",
  addons: [addonObj],
};

export const initialValues = {
  menus: [menuObj],
};
