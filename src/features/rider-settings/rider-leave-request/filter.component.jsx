import {
  FormikInputField,
  FormikSubmitButton,
  changeTableFilter,
} from "@/features/ui";
import { Form, Formik } from "formik";
import { values } from "lodash";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as yup from "yup";
const validationSchema = yup.object({
  RiderShiftDutyBookingId: yup.string(),
});
export const Filter = () => {
  const dispatch = useDispatch();
  const dispatchFilter = (values) => dispatch(changeTableFilter(values));
  return (
    <div
      className="my-2"
      style={{ borderBottom: "1px solid #eee", paddingBottom: "10px" }}
    >
      <Formik
        initialValues={{ RiderShiftDutyBookingId: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatchFilter(values);
        }}
      >
        {({ values, resetForm }) => {
          const isDisable = !values.RiderShiftDutyBookingId;
          return (
            <Form>
              <div className="row row-gap-3">
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <FormikInputField
                    name="RiderShiftDutyBookingId"
                    inputFieldProps={{
                      label: "Rider shift duty",
                      placeholder: "Enter booking ID",
                    }}
                  />
                </div>
                <div className="col-sm-6 col-md-4 col-lg-3 d-flex align-items-end h-auto pb-1">
                  <FormikSubmitButton
                    variant="primary"
                    size="sm"
                    disabled={isDisable}
                    type="number"
                    className="me-1"
                  >
                    Filter
                  </FormikSubmitButton>
                  <Button
                    variant="danger"
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
