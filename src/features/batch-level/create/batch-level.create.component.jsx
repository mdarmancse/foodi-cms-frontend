import {
  FormikCheckBox,
  FormikInputField,
  FormikSubmitButton,
} from "@/features/ui";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import {
  useAddBatchLevelMutation,
  useEditBatchLevelMutation,
  useGetBatchLevelQuery,
  useGetBatchLevelByIdQuery
} from "../batch-level-api";
import { Api } from "@/constants";
import { useLazyGetTableListQuery } from "@/features/ui/table/common-table-api-slice";
import { useSelector } from "react-redux";
import { BatchLevelSchema, InitailValue } from "./form.config";
import { toast } from "react-toastify";

export function BatchLevelCreate({ show, selectedRow, onClose }) {
  const [
    createItem,
    { data: addedData, isSuccess: postSuccess, isLoading, isError },
  ] = useAddBatchLevelMutation();
  const {
    data: editData,
    isSuccess: getSucceed,
    isFetching,
  } = useGetBatchLevelByIdQuery(selectedRow?.id, { skip: !selectedRow?.id });
  
  const [getList] = useLazyGetTableListQuery();
  const [editItem, { data: editResponse, isSuccess: editSuccess }] =
    useEditBatchLevelMutation();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );

  useEffect(() => {
    if (addedData && postSuccess) {
      toast.success(addedData?.message);
      getList({
        url: Api.GetBatchLevelList,
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
        url: Api.GetBatchLevelList,
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
        <Modal.Title>
          {selectedRow?.id ? "Edit" : "Add"} Batch Level
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize
          initialValues={
            selectedRow?.id
              ? {
                  id: selectedRow?.id,
                  name: editData?.data?.name,
                  lowerLimit: editData?.data?.lowerLimit,
                  higherLimit: editData?.data?.higherLimit,
                  bonusAmount: editData?.data?.bonusAmount,
                  isDefault: editData?.data?.isDefault,
                }
              : InitailValue
          }
          validationSchema={BatchLevelSchema}
          onSubmit={(values) => {
            selectedRow?.id ? editItem(values) : createItem(values);
          }}
        >
          {({ values }) => (
            <Form>
              <Row>
                <Col xs={12} className="mb-1">
                  <FormikInputField
                    name="name"
                    inputFieldProps={{ label: "Name", type: "text" }}
                  />
                </Col>
                <Col xs={12} className="mb-1">
                  <FormikInputField
                    name="lowerLimit"
                    inputFieldProps={{ label: "Lower limit", type: "number" }}
                  />
                </Col>
                <Col xs={12} className="mb-1">
                  <FormikInputField
                    name="higherLimit"
                    inputFieldProps={{ label: "Higher limit", type: "number" }}
                  />
                </Col>
                <Col xs={12} className="mb-1">
                  <FormikInputField
                    name="bonusAmount"
                    inputFieldProps={{ label: "Bonus amount", type: "number" }}
                  />
                </Col>
                <Col xs={12} className="mb-1">
                  <FormikCheckBox
                    name="isDefault"
                    checkBoxProps={{ label: "Default" }}
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
}
