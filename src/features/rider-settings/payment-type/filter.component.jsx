import { useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { Button } from "react-bootstrap";
import { FormikInputField, FormikSubmitButton, changeTableFilter } from "@/features/ui";

const validationSchema = yup.object({
  name: yup.string(),
});

export const Filter = () => {
  const dispatch = useDispatch();
  const dispatchFilter = (values) => dispatch(changeTableFilter(values));

  return (
    <div
      className="my-3"
      style={{
        borderBottom: "1px solid #eee",
        paddingBottom: 10,
      }}
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
                <div className="col-10 col-sm-6 col-md-4 col-lg-3">
                  <FormikInputField
                    name="name"
                    inputFieldProps={{
                      label: "Name",
                      placeholder: "Enter a name",
                    }}
                  />
                </div>
                <div className="col-10 col-sm-6 col-md-4 col-lg-3 d-flex align-items-end h-auto pb-1">
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
                    variant="warning"
                    size="sm"
                    disabled={isDisable}
                    onClick={() => {
                      resetForm();
                      dispatchFilter({});
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
