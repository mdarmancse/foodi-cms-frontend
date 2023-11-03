import {
  FormikInputField,
  FormikSubmitButton,
  FormikTextAria,
} from "@/features/ui";
import { Form } from "formik";
import { Col, Row } from "react-bootstrap";
import { resolveLanguageSlug as lang } from "@/helper/language-helper";

export const SpecialHourTypeform = ({ close }) => {
  return (
    <Form>
      <Row>
        <Col xs={12} className="mb-1">
          <FormikInputField
            name="name"
            inputFieldProps={{ label: "Special Hour Type", required: true }}
          />
        </Col>
        <Col xs={12} className="mb-1">
          <FormikTextAria
            name="description"
            textAreaProps={{
              label: lang("description"),
              placeholder: lang("description"),
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
