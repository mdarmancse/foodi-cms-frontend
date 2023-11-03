import { FormikSubmitButton } from "@/features/ui";
import { Form } from "formik";
import { Col, Row } from "react-bootstrap";
import KilometerWiseDeliveryCharge from "./kilometer-wise-delivery-charge.component";
import { MapPolygon } from "./map-polygon.component";
import { BasicFields } from "./zone-basic-fields.component";
import { ZoneDeliveryCharge } from "./zone-delivery-charge.component";

export function ZoneForm() {
  return (
    <Form className="p-4 border rounded shadow">
      <Row>
        <BasicFields />

        <Col xs={12} className="my-4">
          <MapPolygon />
        </Col>
      </Row>

      <ZoneDeliveryCharge />

      <KilometerWiseDeliveryCharge />

      <div className="d-flex justify-content-end">
        <FormikSubmitButton className="mt-4">Submit</FormikSubmitButton>
      </div>
    </Form>
  );
}
