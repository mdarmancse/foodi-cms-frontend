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
import { useGetAllRidersQuery } from "@/features/api/common-api-hooks";

export const AssignRider = ({ isModal, onHide, id }) => {
  const [updateStatus, { isSuccess, isError }] = useChangeStatusMutation();
  const [trigger, { data: editData }] = useLazyGetStatusByIdQuery();
  const [getList] = useLazyGetTableListQuery();
  const { data: riders } = useGetAllRidersQuery();

  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );

  console.log("Riders", riders);

  const handleSubmit = (values) => {
    // console.log("submit", values);

    updateStatus({ id, values });

    onHide("assign-rider");
  };

  useEffect(() => {
    if (id) {
      trigger(id);
    }
  }, [id]);

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
                riderId: editData?.data?.riderId,
              }
            : {
                id,
                riderId: "",
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
                    name="riderId"
                    selectFieldProps={{
                      label: "Assign Rider",
                      options: riders?.items,
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
                    onHide("assign-rider");
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
