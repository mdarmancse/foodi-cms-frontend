import { Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { FormikSubmitButton, FormikSelectField, FormikInputField } from "../ui";
import { changeTableFilter } from "../ui/table/common-table-slice";

const ValidationSchema = yup.object({
  displayName: yup.string().trim(),
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
        initialValues={{
          displayName: "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={async (values) => dispatchFilter(values)}
      >
        {({ values, resetForm }) => {
          const isDisable = !values.branchName && !values.name && !values.price;

          return (
            <Form>
              <div className="row row-gap-3">
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <FormikInputField
                    name="displayName"
                    inputFieldProps={{
                      label: "Display Name",
                      placeholder: "Enter Display Name",
                    }}
                  />
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-end h-auto pb-1">
                  <FormikSubmitButton
                    variant="primary"
                    size="sm"
                    className="me-1"
                    //     disabled={isDisable}
                    type="number"
                  >
                    Filter
                  </FormikSubmitButton>
                  <Button
                    size="sm"
                    variant="warning"
                    //     disabled={isDisable}
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
