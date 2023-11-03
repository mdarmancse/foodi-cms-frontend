import { FormikInputField, FormikSubmitButton } from "@/features/ui";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ShiftSwapStatusSchema, initialValue } from "./form.config";
import {
  useAddShiftStatusQueryMutation,
  useGetSwapStatusByIdQuery,
  useEditShiftSwapStatusMutation,
} from "../shift-swap-staus-api";

export const ShiftSwapStatusCreate = ({ show, onClose, selectedRow }) => {
  const [add, { isSuccess, isError, isLoading }] =
    useAddShiftStatusQueryMutation();
  const [edit, { isSuccess: editSuccess }] = useEditShiftSwapStatusMutation();
  const [loader, setLoader] = useState(false);

  const {
    data: editData,
    isSuccess: editFound,
    isFetching,
  } = useGetSwapStatusByIdQuery(selectedRow?.id, { skip: !selectedRow?.id });

  return (
    <div>
      <Modal show={show && !isFetching} centered onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedRow?.id
              ? "Update Shift swap status"
              : "Add Shift swap status"}
          </Modal.Title>
        </Modal.Header>

        <Formik
          initialValues={
            selectedRow?.id
              ? { id: selectedRow?.id, name: editData?.data?.name }
              : initialValue
          }
          validationSchema={selectedRow?.id ? "" : ShiftSwapStatusSchema}
          onSubmit={(values) => {selectedRow?.id ? edit(values) : add(values)}}
        >
          {({ values, handleChange }) => (
            <Form>
              {/* <p>{JSON.stringify(values)}</p> */}
              <Modal.Body>
                <div className="vstack gap-3">
                  <div>
                    <FormikInputField
                      name="name"
                      inputFieldProps={{ label: "Name", type: "text" }}
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="d-flex hstack gap-3 justify-content-end">
                  <Button onClick={onClose}>Close</Button>
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

export default ShiftSwapStatusCreate;
