import { Formik, Form } from "formik";
import React from "react";
import { Row } from "react-bootstrap";
import { NotificationCreateSchema, initialValue } from "./form.config";
import {
  FormikImageField,
  FormikInputField,
  FormikSelectField,
  FormikSubmitButton,
} from "@/features/ui";

export const NotificationCreateForm = () => {
  return (
    <React.Fragment>
      <Formik
        initialValues={initialValue}
        validationSchema={NotificationCreateSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, error }) => (
          <Form>
            <Row className="mb-3">
              <FormikInputField
                name="title"
                inputFieldProps={{ label: "Title", type: "text" }}
              />
            </Row>
            <Row className="mb-3">
              <FormikInputField
                name="description"
                inputFieldProps={{ label: "Description", type: "text" }}
              />
            </Row>
            <Row className="mb-3">
              <FormikSelectField
                name="category"
                selectFieldProps={{
                  label: "Category",
                  options: [
                    {
                      label: "One",
                      value: 1,
                    },
                    { label: "Two", value: 2 },
                  ],
                }}
              />
            </Row>
            <Row className="mb-3">
              <FormikImageField
                name="image"
                imageFieldProps={{ label: "Image" }}
              />
            </Row>
            <Row className="mb-3">
              <FormikSelectField
                name="typeof"
                selectFieldProps={{
                  label: "Type of",
                  options: [
                    { label: "One", value: 1 },
                    { label: "Two", value: 2 },
                  ],
                }}
              />
            </Row>
            <div className="d-flex justify-content-end">
              <FormikSubmitButton>Submit</FormikSubmitButton>
            </div>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};
