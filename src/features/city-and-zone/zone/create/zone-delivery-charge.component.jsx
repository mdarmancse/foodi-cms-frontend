import { FormikInputField } from "@/features/ui";
import { Col, Row } from "react-bootstrap";

export const ZoneDeliveryCharge = () => {
  return (
    <div className="mb-3 border rounded">
      <div className="p-2 text-center bg-info rounded shadow-sm">
        <h6> Fixed Zone Delivery Charge</h6>
      </div>

      <div className="px-3 py-3">
        <Row>
          <Col xs={12} sm={4}>
            <FormikInputField
              name="zoneDeliveryCharges.distanceStartInKilometer"
              inputFieldProps={{
                label: "Distance Start ( KM. )",
              }}
            />
          </Col>
          <Col xs={12} sm={4}>
            <FormikInputField
              name="zoneDeliveryCharges.distanceEndInKilometer"
              inputFieldProps={{
                label: "Distance END ( KM. )",
              }}
            />
          </Col>
          <Col xs={12} sm={4}>
            <FormikInputField
              name="zoneDeliveryCharges.deliveryCharge"
              inputFieldProps={{
                label: "Delivery Charge ",
              }}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};
