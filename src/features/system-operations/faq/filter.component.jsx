import {
  FormikInputField,
  FormikSubmitButton,
  changeTableFilter,
} from "@/features/ui";
import { Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as yup from "yup";

const validation = yup.object({ Question: yup.string() });

export const Filter = () => {
  const dispatch = useDispatch();
  const dispatchFilter = (values) => dispatch(changeTableFilter(values));

  return (
    <div
      className="my-3"
      style={{ borderBottom: "1px solid #eee", paddingBottom: "10px" }}
    >
      <Formik
        initialValues={{ Question: "" }}
        validationSchema={validation}
        onSubmit={async (values) => dispatchFilter(values)}
      >
        {({ values, resetForm }) => {
          const isDisable = !values?.Question;
          return (
            <Form>
              <div className="row row-gap-3">
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 h-auto pb-2">
                  <FormikInputField
                    name="Question"
                    inputFieldProps={{
                      label: "Quesstion",
                      placeholder: "Enter question..",
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
