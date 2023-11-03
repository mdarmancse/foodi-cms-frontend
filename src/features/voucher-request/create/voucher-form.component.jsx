import {
  FormikCheckBox,
  FormikInputField,
  FormikSubmitButton,
} from "@/features/ui";
import { Form } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const VoucherRequestForm = ({ close }) => {
  return (
    <Form>
      <Row>
        <Col xs={12} className="mb-1">
          <FormikInputField
            name="point"
            inputFieldProps={{ label: "Point", required: true }}
          />
        </Col>
        <Col xs={12} className="mb-1">
          <FormikCheckBox
            name="isApproved"
            checkBoxProps={{ label: "Approved" }}
          />
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <Button size="sm" className="me-2" variant="warning" onClick={close}>
          Close
        </Button>
        <FormikSubmitButton>Update</FormikSubmitButton>
      </div>
    </Form>
  );
};
