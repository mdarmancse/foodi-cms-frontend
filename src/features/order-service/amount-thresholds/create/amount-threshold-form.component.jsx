import {
  FormikInputField,
  FormikSelectField,
  FormikSubmitButton,
} from "@/features/ui";
import { Form } from "formik";
import { Col, Row } from "react-bootstrap";
import { useGetZoneListQuery } from "../amount-thresholds-api";

export const AmountThresholdform = ({ close }) => {
  const { data: zoneList } = useGetZoneListQuery();
  return (
    <Form>
      <Row>
        <Col xs={12} className="mb-1">
          <FormikSelectField
            name="zoneId"
            selectFieldProps={{
              required: true,
              label: "Zone Name",
              options: zoneList?.items || [],
            }}
          />
        </Col>
        <Col xs={12} className="mb-1">
          <FormikInputField
            name="amount"
            inputFieldProps={{
              label: "Amount",
              type: "number",
              required: true,
            }}
          />
        </Col>
      </Row>
      <div className="d-flex justify-content-end p-1">
        <FormikSubmitButton className="me-2" variant="warning" onClick={close}>
          Close
        </FormikSubmitButton>
        <FormikSubmitButton className="me-2">Submit</FormikSubmitButton>
      </div>
    </Form>
  );
};
