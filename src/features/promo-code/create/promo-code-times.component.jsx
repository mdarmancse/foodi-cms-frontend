import { FormikInputField } from "@/features/ui";
import { Col } from "react-bootstrap";

export function PromoCodeTimes(params) {
  return (
    <>
      <Col xs={12} sm={6}>
        <FormikInputField
          name="startTime"
          inputFieldProps={{
            label: "Start Time",
            type: "date",
            required: true,
          }}
        />
      </Col>
      <Col xs={12} sm={6}>
        <FormikInputField
          name="endTime"
          inputFieldProps={{
            label: "End Time",
            type: "date",
            required: true,
          }}
        />
      </Col>
      <Col xs={12} sm={6}>
        <FormikInputField
          name="validTimeInADayStart"
          inputFieldProps={{
            label: "Valid Time In Day ( Start )",
            type: "time",
            required: true,
          }}
        />
      </Col>
      <Col xs={12} sm={6}>
        <FormikInputField
          name="validTimeInADayEnd"
          inputFieldProps={{
            label: "Valid Time In Day ( End )",
            type: "time",
            required: true,
          }}
        />
      </Col>
    </>
  );
}
