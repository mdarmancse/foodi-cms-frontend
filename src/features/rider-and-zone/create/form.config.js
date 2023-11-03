import * as Yup from "yup";

export const InitailValue = {
    zoneId: 0,
    riderId : 0,
}

export const RiderZoneAddSchema = Yup.object().shape({
    zoneId : Yup.number(),
    riderId : Yup.number(),
})