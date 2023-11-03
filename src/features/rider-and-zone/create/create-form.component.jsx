import React from "react";
import { Form } from "formik";
import { Col, Row } from "react-bootstrap";
import { FormikAutoComplete, FormikSelectField, FormikSubmitButton } from "@/features/ui";
function RiderZoneForm({ zoneOptions, riderOptions }) {
  return (
    <Form>
      <Row>
        <Col className="mb-1 col-12">
          <FormikSelectField
            name="zoneId"
            selectFieldProps={{ label: "Zone", options: zoneOptions }}
          />
        </Col>
        <Col className="mb-1 col-12">
          <FormikSelectField
            name="riderId"
            selectFieldProps={{ label: "Rider", options: riderOptions }}
          />
        </Col>
        <div className="d-flex justify-content-end">
          <FormikSubmitButton className="mt-2">Submit</FormikSubmitButton>
        </div>
      </Row>
    </Form>
  );
}

export default RiderZoneForm;
