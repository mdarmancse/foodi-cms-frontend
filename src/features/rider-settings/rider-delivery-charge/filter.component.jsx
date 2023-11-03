import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { Button } from "react-bootstrap";
import * as yup from "yup";
import { changeTableFilter } from "@/features/ui/table/common-table-slice";
import { FormikInputField, FormikSubmitButton } from "@/features/ui";

const validationSchema = yup.object({
  RiderTypeId: yup.number(),
  VehicleTypeId: yup.number(),
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
        initialValues={{ RiderTypeId: "", VehicleTypeId: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatchFilter(values);
        }}
      >
        {({ values, resetForm }) => {
          const isDisable = !values.RiderTypeId && !values?.VehicleTypeId;
          return (
            <Form>
              <div className="row row-gap-3">
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <FormikInputField
                    name="RiderTypeId"
                    inputFieldProps={{
                      label: "RIder Type",
                      placeholder: "Enter rider type",
                    }}
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <FormikInputField
                    name="VehicleTypeId"
                    inputFieldProps={{
                      label: "Vehicle type",
                      placeholder: "Enter vehicle type",
                    }}
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-end align-items-end h-auto pb-1">
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
