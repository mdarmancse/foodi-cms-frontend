import { Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { FormikInputField, FormikSubmitButton } from "../../ui";
import { changeTableFilter } from "../../ui/table/common-table-slice";

const ValidationSchema = yup.object({
  review: yup
    .string()
    .min(1)
    .max(100)
    .trim()
    .test("oneOfRequired", "Minimum One field is required", function () {
      if (
        !this.parent.review &&
        !this.parent.branchName &&
        !this.parent.rating
      ) {
        return false;
      } else {
        return true;
      }
    }),
  branchName: yup
    .string()
    .min(1)
    .max(100)
    .trim()
    .test("oneOfRequired", "Minimum One field is required", function () {
      if (
        !this.parent.review &&
        !this.parent.branchName &&
        !this.parent.rating
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
        !this.parent.review &&
        !this.parent.branchName &&
        !this.parent.rating
      ) {
        return false;
      } else {
        return true;
      }
    }),
});

export const RestaurantFilter = () => {
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
          review: "",
          branchName: "",
          rating: "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={async (values) => dispatchFilter(values)}
      >
        {({ values, resetForm }) => {
          const isDisable =
            !values.branchName && !values.review && !values.rating;

          return (
            <Form>
              <div className="row row-gap-3">
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <FormikInputField
                    name="review"
                    inputFieldProps={{
                      label: "Review",
                      placeholder: "Search",
                    }}
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <FormikInputField
                    name="branchName"
                    inputFieldProps={{
                      label: "Branch Name",
                      placeholder: "Enter a branch name",
                    }}
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <FormikInputField
                    name="rating"
                    inputFieldProps={{
                      label: "Rating",
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
