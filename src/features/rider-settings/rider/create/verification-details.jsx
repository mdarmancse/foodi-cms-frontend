import { Col } from "react-bootstrap";
import {
  FormikImageField,
  FormikInputField,
  FormikSelectField,
} from "@/features/ui";
import { DisplayImage } from "../../../ui/display-image";
import { useGetCityQuery, useGetVehicleTypeQuery } from "../rider-api";

export const VerificationDetails = ({ values, id }) => {
  const { data: city } = useGetCityQuery();
  const { data: vehicle } = useGetVehicleTypeQuery();

  // console.log("city", city?.items);
  // console.log("vehicle", vehicle);
  return (
    <>
      <Col xs={12} className="mb-1">
        <FormikInputField
          name="bkashNo"
          inputFieldProps={{
            label: "Bkash No",
            placeholder: "Enter Bkash No",
            type: "number",
          }}
        />
      </Col>
      <Col xs={12} className="mb-1">
        <FormikInputField
          name="nagadNo"
          inputFieldProps={{
            label: "Nagad No",
            placeholder: "Enter Nagad No",
            type: "number",
          }}
        />
      </Col>
      <Col xs={12} className="mb-1">
        <FormikInputField
          name="drivingLicenseId"
          inputFieldProps={{
            label: "Driving License ID",
            placeholder: "Enter Driving License ID",
          }}
        />
      </Col>
      <Col xs={12} className="mb-2">
        <FormikImageField
          name="drivingLicenseImage"
          imageFieldProps={{
            label: "Driving License Image",
            accept: ".jpg, .jpeg, .bmp, .png, .webp",
          }}
        />
      </Col>

      {values.drivingLicenceImage && (
        <DisplayImage value={values?.drivingLicenceImage} id={id} />
      )}
      <Col xs={12} className="mb-1">
        <FormikInputField
          name="vehicleRegistrationId"
          inputFieldProps={{
            label: "Vehicle Registration ID",
            placeholder: "Enter Vehicle Registration ID",
          }}
        />
      </Col>

      <Col xs={12} className="mb-2">
        <FormikImageField
          name="vehicleRegistrationImage"
          imageFieldProps={{
            label: "Vehicle Registration Image",
            accept: ".jpg, .jpeg, .bmp, .png, .webp",
          }}
        />
      </Col>
      {values.vehicleRegistrationImage && (
        <DisplayImage value={values?.vehicleRegistrationImage} id={id} />
      )}

      <Col xs={12} className="mb-1">
        <FormikInputField
          name="presentAddress"
          inputFieldProps={{
            label: "Present Address",
            placeholder: "Enter Present Address",
          }}
        />
      </Col>

      <Col xs={12} className="mb-1">
        <FormikInputField
          name="permanentAddress"
          inputFieldProps={{
            label: "Permanent Address",
            placeholder: "Enter Permanent Address",
          }}
        />
      </Col>

      <Col xs={12} className="mb-1">
        <FormikSelectField
          name="vehicleTypeId"
          selectFieldProps={{
            label: "Vehicle Type",
            options: vehicle?.items || [],
            required: true,
          }}
        />
      </Col>
      <Col xs={12} className="mb-1">
        <FormikSelectField
          name="cityId"
          selectFieldProps={{
            label: "City",
            options: city?.items || [],
          }}
        />
      </Col>
      <Col xs={12} className="mb-1">
        <FormikInputField
          name="mac"
          inputFieldProps={{
            label: "MAC",
            placeholder: "Enter MAC address",
          }}
        />
      </Col>
      <Col xs={12} className="mb-1">
        <FormikInputField
          name="imei"
          inputFieldProps={{
            label: "IMEI",
            placeholder: "Enter imei",
          }}
        />
      </Col>
    </>
  );
};
