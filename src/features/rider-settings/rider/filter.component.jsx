import { Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import {
  FormikSubmitButton,
  FormikSelectField,
  FormikInputField,
} from "../../ui";
import { changeTableFilter } from "../../ui/table/common-table-slice";

const ValidationSchema = yup.object({
  mobileNumber: yup.string().trim().min(1).max(15),
  email: yup.string().min(1).max(100).trim(),
  isApprove: yup.string(),

  nidNo: yup.string().min(1).max(100).trim(),
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
          mobileNumber: "",
          email: "",
          isApprove: "",
          nidNo: "",
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
                    name="mobileNumber"
                    inputFieldProps={{
                      label: "Mobile Number",
                      placeholder: "Enter Mobile Number",
                    }}
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <FormikInputField
                    name="email"
                    inputFieldProps={{
                      label: "Email",
                      placeholder: "Enter Mobile Number",
                    }}
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <FormikSelectField
                    name="isApprove"
                    selectFieldProps={{
                      label: "Approved",
                      options: [
                        { value: true, label: "true" },
                        { value: false, label: "false" },
                      ],
                    }}
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <FormikInputField
                    name="nidNo"
                    inputFieldProps={{
                      label: "Nid No",
                      placeholder: "Enter NID No",
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
