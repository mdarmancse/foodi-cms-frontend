import { Formik, Form } from "formik";
import { Col, Row } from "react-bootstrap";
import { InitialValues, VehicleTypeSchema } from "./form.config";
import {
  useAddVehicleTypeMutation,
  useVehicleByIdQuery,
  useEditVehicleTypeMutation,
  useLazyVehicleByIdQuery,
} from "../vehicle-type-api";

import { Modal, Button } from "react-bootstrap";
import { FormikInputField, FormikSubmitButton } from "@/features/ui";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useLazyGetTableListQuery } from "../../../ui/table/common-table-api-slice";
import { useSelector } from "react-redux";

export function VehicleTypeForm({ isModal, onHide, id }) {
  const [trigger, { data: editData, isLoading: editLoading }] =
    useLazyVehicleByIdQuery();
  const [add, { isSuccess: addSuccess, isError: addError, error }] =
    useAddVehicleTypeMutation();
  const [edit, { isSuccess: editSuccess, isError: editError }] =
    useEditVehicleTypeMutation();

  const [getList] = useLazyGetTableListQuery();

  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );

  const handleSubmit = async (values) => {
    id ? await edit(values) : await add(values);
    onHide();
  };

  useEffect(() => {
    if (id) {
      trigger(id);
    }
  }, [id]);

  useEffect(() => {
    if (addSuccess || editSuccess) {
      toast.success(id ? "Updated Successfully" : "Created Successfully");
      getList({
        url: "/riders/api/VehicleType",
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      });
    }
    if (addError || editError) {
      toast.error(id ? "Error updating" : "Error creating");
    }
  }, [addSuccess, addError, editSuccess, editError]);
  return (
    <Modal show={isModal} centered>
      <Modal.Header>
        <Modal.Title>
          {id ? "Update Vehicle Type" : "Add Vehicle Type"}
        </Modal.Title>
      </Modal.Header>

      <Formik
        enableReinitialize
        initialValues={
          id
            ? {
                id,
                type: editData?.data?.type,
                commission: editData?.data?.commission,
                maximum_no_of_received_order_at_a_time:
                  editData?.data?.maximumNoOfReceivedOrderAtAtime,
              }
            : InitialValues
        }
        validationSchema={VehicleTypeSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, errors }) => (
          <Form>
            {/* {JSON.stringify(values)} */}
            <Modal.Body>
              <Row>
                <Col xs={12} className="mb-1">
                  <FormikInputField
                    name="type"
                    inputFieldProps={{ label: "Vehicle Type", required: true }}
                    value={values.type}
                    onChange={handleChange}
                  />
                </Col>

                <Col xs={12} className="mb-1">
                  <FormikInputField
                    name="commission"
                    inputFieldProps={{ label: "Commission", type: "number" }}
                    value={values.commission}
                    onChange={handleChange}
                  />
                </Col>

                <Col xs={12} className="mb-1">
                  <FormikInputField
                    name="maximum_no_of_received_order_at_a_time"
                    inputFieldProps={{
                      label: "Maximum no of received order at a time",
                      type: "number",
                    }}
                    value={values.maximum_no_of_received_order_at_a_time}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Modal.Body>

            <Modal.Footer>
              <div className="d-flex hstack gap-1 justify-content-end">
                <Button variant="danger" onClick={onHide}>
                  Close
                </Button>
                <FormikSubmitButton>Submit</FormikSubmitButton>
              </div>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
