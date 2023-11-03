import { FormikInputField } from "@/features/ui";
import { Col } from "react-bootstrap";

export function PromoCodeLimits(params) {
  return (
    <>
      <Col xs={12} sm={6}>
        <FormikInputField
          name="useLimit"
          inputFieldProps={{
            label: "Total Limit",
            placeholder: "Total limit",
            required: true,
          }}
          type="number"
        />
      </Col>

      <Col xs={12} sm={6}>
        <FormikInputField
          name="dailyUseLimit"
          inputFieldProps={{
            label: "Daily Limit",
            placeholder: "Daily limit",
            required: true,
            type: "number",
          }}
        />
      </Col>

      <Col xs={12} sm={6}>
        <FormikInputField
          name="totalPromoCode"
          inputFieldProps={{
            label: "Total Coupon",
            placeholder: "Total coupon.",
            required: true,
            type: "number",
          }}
        />
      </Col>
    </>
  );
}
