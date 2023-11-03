import { FormikInputField, FormikSubmitButton } from "@/features/ui";
import { changeTableFilter } from "@/features/ui/table/common-table-slice";
import { Form, Formik } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as yup from "yup";

const VSchema = yup.object({
  name: yup.string().min(1).trim().max(150).required(),
});

export const ZoneFilter = () => {
  const dispatch = useDispatch();
  const dispatchFilter = (values) => dispatch(changeTableFilter(values));

  return (
    <Formik
      initialValues={{
        name: "",
      }}
      validationSchema={VSchema}
      onSubmit={(values) => dispatchFilter(values)}
    >
      {({ resetForm, values }) => (
        <Form className="py-4">
          <Row>
            <Col>
              <FormikInputField
                name="name"
                inputFieldProps={{
                  label: "Area Name",
                  placeholder: "Area name",
                }}
              />
            </Col>

            <Col className="d-flex align-items-end">
              <FormikSubmitButton
                disabled={!values.name}
                size="sm"
                variant="primary"
                className="me-1"
              >
                Filter
              </FormikSubmitButton>
              <Button
                disabled={!values.name}
                onClick={() => {
                  resetForm();
                  dispatchFilter({});
                }}
                size="sm"
                variant="danger"
              >
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};
