import {
  FormikInputField,
  FormikSelectField,
  FormikSubmitButton,
} from "@/features/ui";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { RiderTypeCreateSchemma, initialValue } from "./form.config";
import {
  useAddRiderTypeMutation,
  useEditRiderTypeMutation,
  useGetRiderTypeByIdQuery,
} from "../rider-type-api";
import { toast } from "react-toastify";
import { Col, Modal, Row } from "react-bootstrap";
import { useLazyGetTableListQuery } from "@/features/ui/table/common-table-api-slice";
import { Api } from "@/constants";
import { useSelector } from "react-redux";
import { useGetAllRiderContractTypeQuery, useGetAllVehicleTypeQuery } from "@/features/api";

export const RiderTypeCreate = ({ show, selectedRow, onClose }) => {
  const [
    createItem,
    { data: addedData, isSuccess: postSuccess, isLoading, isError },
  ] = useAddRiderTypeMutation();
  const {
    data: editData,
    isSuccess: getSucceed,
    isFetching,
  } = useGetRiderTypeByIdQuery(selectedRow?.id, { skip: !selectedRow?.id });

  const [getList] = useLazyGetTableListQuery();
  const [editItem, { data: editResponse, isSuccess: editSuccess }] =
    useEditRiderTypeMutation();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );

  const { data: vehicleTypeOptions } = useGetAllVehicleTypeQuery();
  const { data : riderContractType } = useGetAllRiderContractTypeQuery();

  useEffect(() => {
    if (addedData && postSuccess) {
      toast.success(addedData?.message);
      getList({
        url: Api.GetListOfRiderTypes,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      });
      onClose();
    }
  }, [addedData]);

  useEffect(() => {
    if (editResponse && editSuccess) {
      toast.success(editResponse?.message);
      getList({
        url: Api.GetListOfRiderTypes,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      });
      onClose();
    }
  }, [editResponse]);
  return (
    <Modal show={show && !isFetching} centered onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedRow?.id ? "Edit" : "Add"} Rider type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize
          initialValues={
            selectedRow?.id
              ? {
                  id: selectedRow?.id,
                  riderContractTypeId: editData?.data?.riderContractTypeId,
                  vehicleTypeId: editData?.data?.vehicleTypeId,
                  monthlySalary: editData?.data?.monthlySalary,
                  deliveryChargeAmount: editData?.data?.deliveryChargeAmount,
                }
              : initialValue
          }
          validationSchema={RiderTypeCreateSchemma}
          onSubmit={async (values) => {
            selectedRow?.id ? await editItem(values) : await createItem(values);
          }}
        >
          {({ values,setFieldValue }) => (
            <Form>
              <Row>
                <Col xs={12} className="mb-1">
                <FormikSelectField
                    name="riderContractTypeId"
                    selectFieldProps={{
                      label: "Rider contract",
                      options: riderContractType?.items,
                    }}
                  />
                </Col>
                <Col xs={12} className="mb-1">
                  <FormikSelectField
                    name="vehicleTypeId"
                    selectFieldProps={{
                      label: "Vehicle type",
                      options: vehicleTypeOptions?.items,
                    }}

                  />
                </Col>
                <Col xs={12} className="mb-1">
                  <FormikInputField
                    name="monthlySalary"
                    inputFieldProps={{
                      label: "Monthly Salary",
                      type: "number",
                    }}
                    
                  />
                </Col>
                <Col xs={12} className="mb-1">
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
                <FormikSubmitButton>Submit</FormikSubmitButton>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RiderTypeCreate;
