import { Formik, Form } from "formik";
import { Col, Modal, Row } from "react-bootstrap";
import { KmWiseDcCreateSchema, initailValues } from "./form.config";
import {
  FormikInputField,
  FormikSubmitButton,
  useLazyGetTableListQuery,
} from "@/features/ui";
import {
    useAddKmWiseDCMutation,
  useEditKmWiseDeliveryChargeMutation,
  useGetDeliveryChargeByIdQuery
} from "../km-wise-dc-api-slice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Api } from "@/constants";

export function KmWiseDeliveryChargeCreate({ show, selectedRow, onClose }) {
  const [ createItem,{ data: postResponse, isSuccess: postSuccess}] = useAddKmWiseDCMutation();
  const {
    data: editData,
    isSuccess: getSuccess,
    isFetching,
  } = useGetDeliveryChargeByIdQuery(selectedRow?.id, {
    skip: !selectedRow?.id,
  });
  const [getList] = useLazyGetTableListQuery();
  const [editItem, { data: editResponse, isSuccess: editSuccess }] =
    useEditKmWiseDeliveryChargeMutation();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );


  useEffect(() => {
    if (postResponse && postSuccess) {
      toast.success(postResponse?.message);
      getList({
        url: Api.GetKmWiseChargeList,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      }),
        onClose();
    }
  }, [postResponse]);

  useEffect(() => {
    if (editResponse && editSuccess) {
      toast.success(editResponse?.message);
      getList({
        url: Api.GetKmWiseChargeList,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      }),
        onClose();
    }
  }, [editResponse]);
  return (
    <Modal show={show && !isFetching} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{selectedRow?.id ? "Edit":  "Create"} KM Wise Delivery Charge</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          // enableReinitialize
          initialValues={selectedRow?.id ? {
            kilometer : editData?.data?.kilometer,
            deliveryChargeAmount : editData?.data?.deliveryChargeAmount
          } : initailValues}
          validationSchema={KmWiseDcCreateSchema}
          onSubmit={(values) => {
            selectedRow?.id ? editItem({...values, id: selectedRow?.id}) : createItem(values)
          }}
        >
          {({ values }) => (
            <Form>
              <Row>
                <Col className="mb-1" xs={12}>
                  <FormikInputField
                    name="kilometer"
                    inputFieldProps={{ label: "Distance (km)", type: "number" }}
                  />
                </Col>
                <Col className="mb-1" xs={12}>
                  <FormikInputField
                    name="deliveryChargeAmount"
                    inputFieldProps={{
                      label: "Delivery Charge",
                      type: "number",
                    }}
                  />
                </Col>
              </Row>
              <div className="d-flex justify-content-end mt-2">
                <FormikSubmitButton>{selectedRow?.id ? "Update" : "Submit"}</FormikSubmitButton>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}
