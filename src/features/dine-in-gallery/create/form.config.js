import * as Yup from "yup";

export const initialValue = {
  name: "",
  branchId: "",
  thumbnailImage: "",
  images: "",
};

export const DineInGalleryCreateSchema = Yup.object().shape({
  name: Yup.string().min(1).max(100).trim().required("This field is required"),
  branchId: Yup.object(),
  thumbnailImage: Yup.mixed(),
  images: Yup.mixed(),
});
