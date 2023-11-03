import { Form, Formik } from "formik";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { ReasonCreateSchema, initialValue } from "./form.config";
import {
  FormikImageField,
  FormikInputField,
  FormikSubmitButton,
  FormikTextAria,
} from "@/features/ui";

export const ReasonCreate = ({ isModalOpen, onHide }) => {
  return (
    <div>
      <Modal show={isModalOpen} centered>
        <Modal.Header>Add Reason</Modal.Header>
        <Formik
          initialValues={initialValue}
          validationSchema={ReasonCreateSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values, error }) => (
            <Form>
              <Modal.Body>
                <div className="vstack gap-3">
                  <div>
                    <FormikInputField
                      name="name"
                      inputFieldProps={{ label: "Name", type: "text" }}
                    />
                  </div>
                  <div>
                    <FormikTextAria
                      name="description"
                      textAreaProps={{ label: "Description" }}
                    />
                  </div>
                  <div>
                    <FormikImageField
                      name="image"
                      imageFieldProps={{ label: "Label" }}
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="d-flex  h-stack gap-3 justify-content-end">
                  <Button onClick={onHide}>Close</Button>
                  <FormikSubmitButton>Submit</FormikSubmitButton>
                </div>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default ReasonCreate;
