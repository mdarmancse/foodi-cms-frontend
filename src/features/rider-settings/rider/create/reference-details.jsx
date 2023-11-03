import { Col } from "react-bootstrap";
import {
  FormikImageField,
  FormikCheckBox,
  FormikInputField,
} from "@/features/ui";
import { DisplayImage } from "../../../ui/display-image";

export const ReferenceDetails = ({ values, id }) => {
  return (
    <>
      <Col xs={12} className="mb-2">
        <FormikInputField
          name="deviceId"
          inputFieldProps={{
            label: "Device ID",
            type: "text",
            placeholder: "Enter Device ID",
          }}
        />
      </Col>
      <Col xs={12} className="mb-2">
        <FormikInputField
          name="referrerUrl"
          inputFieldProps={{
            label: "Referrer URL",
            type: "text",
            placeholder: "Enter Referrer URL",
          }}
        />
      </Col>
      <Col xs={12} className="mb-2">
        <FormikInputField
          name="referredCode"
          inputFieldProps={{
            label: "Referred Code",
            type: "text",
            placeholder: "Enter Referred Code",
          }}
        />
      </Col>
      <Col xs={12} className="mb-2">
        <FormikImageField
          name="guardianNidFront"
          imageFieldProps={{
            label: "Guardian NID Front",
            accept: ".jpg, .jpeg, .bmp, .png, .webp",
          }}
        />
      </Col>

      {values.guardianNidFront && (
        <DisplayImage value={values?.guardianNidFront} id={id} />
      )}

      <Col xs={12} className="mb-2">
        <FormikImageField
          name="guardianNidBack"
          imageFieldProps={{
            label: "Guardian NID Back",
            accept: ".jpg, .jpeg, .bmp, .png, .webp",
          }}
        />
      </Col>

      {values.guardianNidBack && (
        <DisplayImage value={values?.guardianNidBack} id={id} />
      )}

      <Col xs={12} className="mb-2">
        <FormikImageField
          name="electricityBill"
          imageFieldProps={{
            label: "Electricity Bill",
            accept: ".jpg, .jpeg, .bmp, .png, .webp",
          }}
        />
      </Col>

      {values.electricityBill && (
        <DisplayImage value={values?.electricityBill} id={id} />
      )}

      <Col xs={12} className="mb-2">
        <FormikImageField
          name="houseNameplate"
          imageFieldProps={{
            label: "House Nameplate",
            accept: ".jpg, .jpeg, .bmp, .png, .webp",
          }}
        />
      </Col>
      {values.houseNameplate && (
        <DisplayImage value={values?.houseNameplate} id={id} />
      )}
      <Col xs={12} className="mb-2">
        <FormikCheckBox
          name="isApprove"
          checkBoxProps={{
            label: "Approved",
          }}
        />
      </Col>
    </>
  );
};
