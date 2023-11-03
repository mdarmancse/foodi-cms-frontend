import * as yup from "yup";

export const initailValues = {
  kilometer: 0,
  deliveryChargeAmount: 0,
};

export const KmWiseDcCreateSchema = yup.object().shape({
    kilometer : yup.number().min(1).required(),
    deliveryChargeAmount : yup.number().positive().required(),
}) 
