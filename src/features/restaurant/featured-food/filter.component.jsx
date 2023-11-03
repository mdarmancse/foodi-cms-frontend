import { Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { FormikSubmitButton, FormikSelectField } from "../../ui";
import { changeTableFilter } from "../../ui/table/common-table-slice";
import { useGetZonesQuery } from "./shift-duty-api";

const ValidationSchema = yup.object({
  zoneId: yup
    .string()
    .min(1)
    .max(100)
    .trim()
    .test("oneOfRequired", "Minimum One field is required", function () {
      if (!this.parent.zoneId) {
        return false;
      } else {
        return true;
      }
    }),
  // weekDayId: yup
  //   .string()
  //   .min(1)
  //   .max(100)
  //   .trim()
  //   .test("oneOfRequired", "Minimum One field is required", function () {
  //     if (!this.parent.weekDayId) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   }),
});

export const Filter = () => {
  const dispatch = useDispatch();
  const dispatchFilter = (values) => dispatch(changeTableFilter(values));
  const { data: zones } = useGetZonesQuery();

  console.log(zones?.data);

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
          zoneId: 0,
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
                  <FormikSelectField
                    name="zoneId"
                    selectFieldProps={{
                      label: "Zone",
                      options: zones?.data,
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
