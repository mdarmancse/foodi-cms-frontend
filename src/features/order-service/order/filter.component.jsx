import { Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import {
  FormikInputField,
  FormikSelectField,
  FormikSubmitButton,
} from "../../ui";
import { changeTableFilter } from "../../ui/table/common-table-slice";

const ValidationSchema = yup.object({
  fromDate: yup.string().min(1).max(100),
  toDate: yup.string().min(1).max(100),
  orderId: yup.string().min(1).max(100),
  userId: yup.string().min(1).max(100),
  riderId: yup.string().min(1).max(100),
  branchId: yup.string().min(1).max(100),
  deliveryZoneId: yup.string().min(1).max(100),
  isPreOrder: yup.string().min(1).max(100),
  isDelivered: yup.string().min(1).max(100),
});

const options = [
  { value: true, label: "True" },
  { value: false, label: "False" },
];

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
          fromDate: "",
          toDate: "",
          orderId: "",
          userId: "",
          isPreOrder: "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={async (values) => dispatchFilter(values)}
      >
        {({ values, resetForm }) => {
          return (
            <Form>
              <div className="row row-gap-3">
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <FormikInputField
                    name="fromDate"
                    inputFieldProps={{
                      label: "From",
                      type: "date",
                    }}
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <FormikInputField
                    name="toDate"
                    inputFieldProps={{
                      label: "To",
                      type: "date",
                    }}
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <FormikInputField
                    name="orderId"
                    inputFieldProps={{
                      label: "Order ID",
                    }}
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <FormikSelectField
                    name="isPreOrder"
                    selectFieldProps={{
                      label: "Pre Order",
                      options: options,
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
