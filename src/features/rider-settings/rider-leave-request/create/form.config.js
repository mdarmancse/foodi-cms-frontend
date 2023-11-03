import * as Yup from "yup";

export const InitialValue = {
    riderId : "",
    riderShiftDutyBookingId : "",
    reason : "",
    isApproved : false,
}

export const RiderLeaveRequestSchema = Yup.object().shape({
    riderId : Yup.number().required("This field is required"),
    riderShiftDutyBookingId : Yup.number().required("This field is required"),
    reason : Yup.string().test('len','must have a reason',val => val.trim().length > 0).required("This field is required"),
    isApproved : Yup.boolean().required("This field is required"),
})