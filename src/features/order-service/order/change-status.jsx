import { Formik, Form } from "formik";
import { Modal, Button, Col, Row } from "react-bootstrap";
import { FormikSelectField, FormikSubmitButton } from "@/features/ui";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useLazyGetTableListQuery } from "../../ui/table/common-table-api-slice";
import { useSelector } from "react-redux";
import {
  useChangeStatusMutation,
  useLazyGetStatusByIdQuery,
} from "./order-api";

const statuses = [
  { value: "placed", label: "Placed" },
  { value: "rider_assigned ", label: "Assigned" },
  { value: "rider_re_assigned ", label: "Reassigned" },
  { value: "cancelled", label: "Cancelled" },
];

export const ChangeStatus = ({ isModal, onHide, id }) => {
  const [updateStatus, { isSuccess, isError }] = useChangeStatusMutation();
  const [trigger, { data: editData }] = useLazyGetStatusByIdQuery();
  const [getList] = useLazyGetTableListQuery();

  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );

  const handleSubmit = (values) => {
    // console.log("submit", values);

    updateStatus({ id, values });

    onHide("change-status");
  };

  useEffect(() => {
    if (id) {
      trigger(id);
    }
  }, [id]);

  // console.log("edit", editData?.data);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Status Updated");
      getList({
        url: "/orders",
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      });
    }
    if (isError) {
      toast.error("Error Updating");
    }
  }, [isSuccess, isError]);

  return (
    <Modal show={isModal} centered>
      <Modal.Header>
        <Modal.Title>Select Status</Modal.Title>
      </Modal.Header>

      <Formik
        enableReinitialize
        initialValues={
          id
            ? {
                orderStatus: editData?.data?.orderStatus,
              }
            : {
                id,
                orderStatus: "",
              }
        }
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, errors }) => (
          <Form>
            {/* {JSON.stringify(values)} */}
            <Modal.Body>
              <Row>
                <Col xs={12} className="mb-1">
                  <FormikSelectField
                    name="orderStatus"
                    selectFieldProps={{
                      label: "Order Status",
                      options: statuses,
                    }}
                  />
                </Col>
              </Row>
            </Modal.Body>

            <Modal.Footer>
              <div className="d-flex hstack gap-1 justify-content-end">
                <Button
                  variant="danger"
                  onClick={() => {
                    onHide("change-status");
                  }}
                >
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
};
