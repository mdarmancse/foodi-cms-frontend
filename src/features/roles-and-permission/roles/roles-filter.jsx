import { useDispatch } from "react-redux";
import { changeTableFilter } from "@/features/ui/table/common-table-slice";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { FormikInputField, FormikSubmitButton } from "@/features/ui";
import { Button } from "react-bootstrap";

const searchValidation = yup.object({
  Name: yup.string().trim().required("This field is required"),
});

export const RolesFilter = () => {
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
        initialValues={{  Name: ""}}
        validationSchema={searchValidation}
        onSubmit={(values) => dispatchFilter(values)}
      >
        {({ values, resetForm }) => {
          const isDisable = !values.Name;
          return (
            <Form>
              <div className="row row-gap-3">
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <FormikInputField
                    name="Name"
                    inputFieldProps={{
                      label: "Name",
                      placeholder: "Enter name",
                    }}
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-end h-auto pb-1">
                  <FormikSubmitButton
                    variant="primary"
                    size="sm"
                    className="me-1"
                    disabled={isDisable}
                  >
                    Filter
                  </FormikSubmitButton>
                  <Button
                    variant="danger"
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
