import * as yup from "yup";

export const foodDetail = {
  id: 0,
  branchId: "",
  menuItemId: "",
  isActive: true,
  menuArr: [],
};

export const initialValues = {
  startDateTime: "",
  endDateTime: "",
  startTimeInDay: "",
  endTimeInDay: "",
  featuredFoodDetail: [foodDetail],
  featuredFoodDetailDeletedIds: [0],
};

export const featuredFoodSchema = yup.object().shape({
  startDateTime: yup.string().required(),
  endDateTime: yup.string().required(),
  startTimeInDay: yup.string().required(),
  endTimeInDay: yup.string().required(),
  featuredFoodDetail: yup
    .array()
    .min(1)
    .of(
      yup.object().shape({
        branchId: yup.string().required(),
        menuItemId: yup.string().required(),
      })
    ),
});
