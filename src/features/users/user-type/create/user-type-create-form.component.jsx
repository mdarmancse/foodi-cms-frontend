import { FormikInputField, FormikSubmitButton } from "@/features/ui";
import { Form } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const UserTypeForm = ({ close }) => {
  const { id } = useParams();
  return (
    <Form>
      <Row>
        <Col xs={12} className="mb-1">
          <FormikInputField
            name="name"
            inputFieldProps={{ label: "User Type Name", required: true }}
          />
        </Col>
      </Row>

      <div className="d-flex justify-content-end mt-2">
        <Button size="sm" className="me-2" variant="warning" onClick={close}>
          Close
        </Button>
        <FormikSubmitButton className="mt-4">
          {id ? "Update" : "Submit"}
        </FormikSubmitButton>
      </div>
    </Form>
  );
};
