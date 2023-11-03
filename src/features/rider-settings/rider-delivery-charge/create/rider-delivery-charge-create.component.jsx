import { Form, Formik } from "formik";
import { Col, Modal, Row, Spinner } from "react-bootstrap";
import { RiderDeliveryChargeCreateSchema, initialValue } from "./form.config";
import {
  FormikInputField,
  FormikSelectField,
  FormikSubmitButton,
  useLazyGetTableListQuery,
} from "@/features/ui";
import {
  useGetRiderTypeOptionsQuery,
  useGetVehicleTypeOptionsQuery,
  useGetRiderDeliveryChargeByIdQuery,
  useAddRiderdeliveryChargeMutation,
  useEditRiderdeliveryChargeMutation,
} from "../rider-delivery-charge-api";
import { useEffect, useState } from "react";
import { CreateForm } from "./form.component";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Api } from "@/constants";

export const RiderDeliveryChargeCreate = ({ show, onClose, selectedRow }) => {
  const { data: riderDeliveryChargeData, isFetching } =
    useGetRiderDeliveryChargeByIdQuery(selectedRow?.id, {
      skip: !selectedRow?.id,
    });
  const { data: riderTypeData, isFetching: riderTypeFetching } =
    useGetRiderTypeOptionsQuery();
  const { data: vehicleTypeData, isFetching: vehicleTypeFetching } =
    useGetVehicleTypeOptionsQuery();
  const [
    addRiderDeliveryCharge,
    { data: postResponse, isSuccess: postSuccess },
  ] = useAddRiderdeliveryChargeMutation();
  const [
    editRiderDeliveryCharge,
    { data: putResponse, isSuccess: putSuccess },
  ] = useEditRiderdeliveryChargeMutation();
  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );

  useEffect(() => {
    if (postResponse && postSuccess) {
      toast.success(postResponse?.message);
      getList({
        url: Api.RiderdeliveryChargeList,
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
    if (putResponse && putSuccess) {
      toast.success(putResponse?.message);
      getList({
        url: Api.RiderdeliveryChargeList,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      });
      onClose();
    }
  }, [putResponse]);

  return (
    <>
      <Modal show={show && (!riderTypeFetching && !vehicleTypeFetching) && !isFetching} centered onHide={onClose}>
        <Modal.Header closeButton>
          {selectedRow?.id ? "Edit" : "Create"} rider delivery charge
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={
              selectedRow?.id
                ? {
                    id: selectedRow?.id,
                    riderTypeId: riderDeliveryChargeData?.data?.riderTypeId,
                    vehicleTypeId: riderDeliveryChargeData?.data?.vehicleTypeId,
                    deliveryChargeAmount:
                      riderDeliveryChargeData?.data?.deliveryChargeAmount,
                  }
                : initialValue
            }
            validationSchema={RiderDeliveryChargeCreateSchema}
            onSubmit={(values) => {
              selectedRow?.id
                ? editRiderDeliveryCharge(values)
                : addRiderDeliveryCharge(values);
            }}
          >
            {() => (
              <CreateForm
                riderTypeOptions={riderTypeData?.items}
                vehicleTypeOptions={vehicleTypeData?.items}
                selectedRow={selectedRow}
              />
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};
