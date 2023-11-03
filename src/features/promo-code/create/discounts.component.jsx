import { FormikInputField, FormikToggleButton } from "@/features/ui";
import { useField } from "formik";
import { Col } from "react-bootstrap";

export function Discounts() {
  const [{ value: IsGradual }] = useField("isGradual");
  const [{ value: DiscountType }] = useField("isPercent");

  return (
    <>
      {IsGradual === "false" && (
        <Col xs={12} sm={6}>
          <FormikToggleButton
            name="isPercent"
            toggleButtonProps={{
              label: "DiscountType",
              options: [
                {
                  label: "Percent",
                  value: "true",
                },
                {
                  label: "Amount",
                  value: "false",
                },
              ],
              required: true,
            }}
          />
        </Col>
      )}
      {DiscountType === "true" && (
        <Col xs={12} sm={6}>
          <FormikInputField
            name="discountInPercent"
            inputFieldProps={{
              label: "Discount Percent (%)",
              placeholder: "Discount percent",
              required: true,
            }}
          />
        </Col>
      )}

      {DiscountType === "false" && (
        <Col xs={12} sm={6}>
          <FormikInputField
            name="discountInAmount"
            inputFieldProps={{
              label: "Discount Amount",
              placeholder: "Discount amount",
              required: true,
            }}
          />
        </Col>
      )}

      <Col xs={12} sm={6}>
        <FormikInputField
          name="minimumOrderAmount"
          inputFieldProps={{
            label: "Minimum Order Amount",
            placeholder: "Minimum order amount",
            required: true,
          }}
        />
      </Col>
      {DiscountType === "true" && (
        <Col xs={12} sm={6}>
          <FormikInputField
            name="maximumDiscountAmount"
            inputFieldProps={{
              label: "Minimum Discount Amount",
              placeholder: "Minimum discount amount",
              required: true,
            }}
          />
        </Col>
      )}
    </>
  );
}
