import { useDispatch } from "react-redux";
import { FormikInputField, FormikSelectField, FormikSubmitButton, changeTableFilter } from "../ui";
import { Formik,Form } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
const validationSchema = Yup.object({
  Name: Yup.string().trim().required("This field is required"),
  IsApprove: Yup.boolean().nullable(),
});
export const Filter = () => {
  const dispatch = useDispatch();
  const dispatchFilter = (values) => dispatch(changeTableFilter(values));
  return (
    <div
      className="my-3"
      style={{ borderBottom: "1px solid #eee", paddingBottom: "10px" }}
    >
      <Formik
        initialValues={{ Name: "", IsApprove: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values) => dispatchFilter(values)}
      >
        {({ values, resetForm }) => {
            const isDisable = !values.Name && !values.IsApprove;
          return (
            <Form>
              <div className="row row-gap-3">
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 h-auto pb-3">
                  <FormikInputField
                    name="Name"
                    inputFieldProps={{
                      label: "Name",
                      placeholder: "Enter name",
                    }}
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 h-auto pb-3">
                  <FormikSelectField
                    name="IsApprove"
                    selectFieldProps={{
                      label: "ApproveRider",
                      options: [
                        { label: "Yes", value: true },
                        { label: "No", value: false },
                      ],
                    }}
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 h-auto pb-2 d-flex align-items-end">
                  <FormikSubmitButton
                    variant="primary"
                    size="sm"
                    className="me-1"
                    disabled={isDisable}
                  >
                    Filter
                  </FormikSubmitButton>
                  <Button
                    variant="warning"
                    size="sm"
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
