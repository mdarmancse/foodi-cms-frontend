import { useDispatch } from "react-redux";
import { changeTableFilter } from "@/features/ui/table/common-table-slice";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { FormikInputField, FormikSubmitButton } from "@/features/ui";
import { Button } from "react-bootstrap";

const searchValidation = yup.object({
  Kilometer: yup.number(),
  DeliveryChargeAmount: yup.number(),
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
        initialValues={{ Kilometer: "", DeliveryChargeAmount: "" }}
        validationSchema={searchValidation}
        onSubmit={(values) => dispatchFilter(values)}
      >
        {({ values, resetForm }) => {
          const isDisable = !values.Kilometer && !values.DeliveryChargeAmount;
          return (
            <Form>
              <div className="row row-gap-3">
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <FormikInputField
                    name="Kilometer"
                    inputFieldProps={{
                      label: "Kilometer",
                      placeholder: "Enter distance(km)",
                    }}
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <FormikInputField
                    name="DeliveryChargeAmount"
                    inputFieldProps={{
                      label: "Delivery Charge",
                      placeholder: "Enter delivery charge",
                    }}
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-end h-auto pb-1">
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
