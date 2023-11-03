import { useDispatch } from "react-redux";
import { changeTableFilter } from "../ui/table/common-table-slice";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { FormikInputField, FormikSubmitButton } from "../ui";
import { Button } from "react-bootstrap";
const validationSchema = yup.object({ name: yup.string() });

export const Filter = () => {
  const dispatch = useDispatch();
  const dispatchFilter = (values) => dispatch(changeTableFilter(values));

  return (
    <div
      className="my-3"
      style={{ borderBottom: "1px solid #eee", paddingBottom: "10" }}
    >
      <Formik
        initialValues={{ name: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values) => dispatchFilter(values)}
      >
        {({ values, resetForm }) => {
          const isDisable = !values.name;

          return (
            <Form>
              <div className="row row-gap-3">
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 h-auto pb-2">
                  <FormikInputField
                    name="name"
                    inputFieldProps={{
                      label: "Name",
                      placeholder: "Enter a menu name",
                    }}
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-end h-auto pb-2">
                  <FormikSubmitButton
                    variant="primary"
                    size="sm"
                    className="me-1"
                    disabled={isDisable}
                    type="number"
                  >
                    Filter
                  </FormikSubmitButton>
                  
                  <Button
                    size="sm"
                    variant="warning"
                    disabled={isDisable}
                    onClick={() => {
                      resetForm(), dispatchFilter({});
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
