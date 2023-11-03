import { Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { FormikInputField, FormikSubmitButton } from "../../ui";
import { changeTableFilter } from "../../ui/table/common-table-slice";

const ValidationSchema = yup.object({
  BranchId: yup
    .string()
    .min(1)
    .max(100)
    .trim()
    .test("oneOfRequired", "Minimum One field is required", function () {
      if (
        !this.parent.BranchId &&
        !this.parent.Search &&
        !this.parent.OrderId
      ) {
        return false;
      } else {
        return true;
      }
    }),
  Search: yup
    .string()
    .min(1)
    .max(100)
    .trim()
    .test("oneOfRequired", "Minimum One field is required", function () {
      if (
        !this.parent.BranchId &&
        !this.parent.Search &&
        !this.parent.OrderId
      ) {
        return false;
      } else {
        return true;
      }
    }),
  rating: yup
    .number()
    .min(1)
    .test("oneOfRequired", "Minimum One field is required", function () {
      if (
        !this.parent.BranchId &&
        !this.parent.Search &&
        !this.parent.OrderId
      ) {
        return false;
      } else {
        return true;
      }
    }),
});

export const RidersFilter = () => {
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
          BranchId: "",
          Search: "",
          OrderId: "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={async (values) => dispatchFilter(values)}
      >
        {({ values, resetForm }) => {
          const isDisable =
            !values.Search && !values.BranchId && !values.OrderId;

          return (
            <Form>
              <div className="row row-gap-3">
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <FormikInputField
                    name="BranchId"
                    inputFieldProps={{
                      label: "Branch ID",
                      placeholder: "Search",
                    }}
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <FormikInputField
                    name="Search"
                    inputFieldProps={{
                      label: "Search",
                      placeholder: "Enter a branch name",
                    }}
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <FormikInputField
                    name="OrderId"
                    inputFieldProps={{
                      label: "Order ID",
                      placeholder: "",
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
                    size="sm"
                    variant="danger"
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
