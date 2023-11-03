import {
  FormikInputField,
  FormikSubmitButton,
  useLazyGetTableListQuery,
} from "@/features/ui";
import { Form, Formik } from "formik";
import { Col, Modal, Row } from "react-bootstrap";
import {
  useAddNightShiftDeliveryChargeMutation,
  useEditNightShiftDeliveryChargeMutation,
  useGetNightShiftDeliveryChargeByIdQuery,
} from "../night-shift-delivery-charge-api";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { pullAt, values } from "lodash";
import { toast } from "react-toastify";
import { Api } from "@/constants";
import { validationSchema, initialValue } from "./form.config";
import moment from "moment";

export function NightShiftDeliveryChargeCreate({ show, selectedRow, onClose }) {
  const [addItem, { data: postResponse, isSuccess: postSuccess }] =
    useAddNightShiftDeliveryChargeMutation();
  const [editItem, { data: editResponse, isSuccess: editSuccess }] =
    useEditNightShiftDeliveryChargeMutation();
  const { data: editData, isFetching } =
    useGetNightShiftDeliveryChargeByIdQuery(selectedRow?.id, {
      skip: !selectedRow?.id,
    });
  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );
  useEffect(() => {
    if (postResponse && postSuccess) {
      toast.success(postResponse?.message);

      getList({
        url: Api.GetNightShiftDeliveryChargeList,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      });
      onClose();
    }
  }, [postResponse]);
  useEffect(() => {
    if (editResponse && editSuccess) {
      toast.success(editResponse?.message);
      getList({
        url: Api.GetNightShiftDeliveryChargeList,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      });
      onClose();
    }
  }, [editResponse]);
  const handleSubmit=(values)=>{
    let params = {
           ...values,
           startTime: values.startTime.length==8?values.startTime :values.startTime+":00",
           endTime: values.endTime.length==8?values.endTime : values.endTime+":00"
    }
    selectedRow?.id
    ? editItem(params)
    : addItem(params);
  }
  return (
    <Modal show={show && !isFetching} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedRow?.id ? "Edit" : "Create"} night shift delivery charge
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={
            selectedRow?.id
              ? {
                id:selectedRow?.id,
                  startTime: editData?.data?.startTime,
                  endTime: editData?.data?.endTime,
                  deliveryChargeAmount: editData?.data?.deliveryChargeAmount,
                }
              : initialValue
          }
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values }) => (
            <Form>
              <Row>
                <Col xs={12} mb-1>
                  <FormikInputField
                    name="startTime"
                    inputFieldProps={{
                      label: "Start time",
                      type: "time",
                    }}
                  />
                </Col>
                <Col xs={12} mb-1>
                  <FormikInputField
                    name="endTime"
                    inputFieldProps={{
                      label: "End time",
                      type: "time",
                    }}
                  />
                </Col>
                <Col xs={12} mb-1>
                  <FormikInputField
                    name="deliveryChargeAmount"
                    inputFieldProps={{
                      label: "Delivery charge",
                      type: "number",
                    }}
                  />
                </Col>
              </Row>
              <div className="d-flex justify-content-end mt-2 mb-2">
                <FormikSubmitButton>{selectedRow?.id ? "Update" : "Submit"}</FormikSubmitButton>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}
