import { Col } from "react-bootstrap";
import { FormikInputField } from "@/features/ui";

export const VoucherSettings = () => {
  return (
    <>
      <Col md={12}>
        <FormikInputField
          name="minimumOrderAmount"
          inputFieldProps={{
            label: "Minimum Order Amount",
            type: "number",
          }}
        />
      </Col>
      <Col md={12}>
        <FormikInputField
          name="expireTime"
          inputFieldProps={{
            label: "Expire Time",
            type: "number",
          }}
        />
      </Col>
      <Col md={12}>
        <FormikInputField
          name="startTime"
          inputFieldProps={{
            label: "Start Time",
            type: "date",
          }}
        />
      </Col>
      <Col md={12}>
        <FormikInputField
          name="endTime"
          inputFieldProps={{
            label: "End Time",
            type: "date",
          }}
        />
      </Col>
    </>
  );
};
