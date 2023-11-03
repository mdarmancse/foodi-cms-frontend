import * as Yup from "yup";

export const initialValue = {
    riderTypeId : 0,
    vehicleTypeId : 0,
    deliveryChargeAmount : 0,

}

export const RiderDeliveryChargeCreateSchema = Yup.object().shape({
    riderTypeId : Yup.number().required(),
    vehicleTypeId : Yup.number().required(),
    deliveryChargeAmount : Yup.number().positive().required(),
})

