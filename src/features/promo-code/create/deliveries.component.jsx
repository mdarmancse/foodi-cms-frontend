import { FormikInputField, FormikSwitchButton } from "@/features/ui";
import { Col } from "react-bootstrap";

export function Deliveries(params) {
  return (
    <>
      <Col xs={12} sm={6}>
        <FormikSwitchButton
          name="isFreeDelivery"
          switchButtonProps={{
            label: "Free delivery",
          }}
        />
      </Col>
      <Col xs={12} sm={6}>
        <FormikSwitchButton
          name="isDelivery"
          switchButtonProps={{
            label: "Is Delivery",
          }}
        />
      </Col>
      <Col xs={12} sm={6}>
        <FormikSwitchButton
          name="isPickup"
          switchButtonProps={{
            label: "Is Pickup",
          }}
        />
      </Col>

      <Col xs={12} sm={6}>
        <FormikSwitchButton
          name="isAutoApply"
          switchButtonProps={{
            label: "Auto Apply",
          }}
        />
      </Col>
      <Col xs={12} sm={6}>
        <FormikSwitchButton
          name="isFlower"
          switchButtonProps={{
            label: "Is Flower",
          }}
        />
      </Col>

      <Col xs={12} sm={6}>
        <FormikSwitchButton
          name="withCommission"
          switchButtonProps={{
            label: "With Commission",
          }}
        />
      </Col>
      <Col xs={12} sm={6}>
        <FormikInputField
          name="restaurantBurn"
          inputFieldProps={{
            label: "Restaurant Burn",
            placeholder: "Restaurant Burn",
            type: "number",
          }}
        />
      </Col>
      <Col xs={12} sm={6}>
        <FormikInputField
          name="foodiBurn"
          inputFieldProps={{
            label: "Foodi Burn",
            placeholder: "Foodi Burn",
            type: "number",
          }}
        />
      </Col>
    </>
  );
}
