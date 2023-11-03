import { FormikInputField, FormikSubmitButton } from "@/features/ui";
import { Form, Formik } from "formik";
import { Col, Modal, Row } from "react-bootstrap";
import { initialValue, validationSchema } from "./form.config";
import {
  useAddPaymentTypeMutation,
  useGetPaymentTypeByIdQuery,
  useEditPaymentTypeMutation,
} from "../payment-type-api-slice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useLazyGetTableListQuery } from "@/features/ui/table/common-table-api-slice";
import { Api } from "@/constants";

export const PayementTypeCreateModal = ({
  onClose,
  show,
  selectedRow,
}) => {
  const [
    createItem,
    { data: addedData, isSuccess: postSuccess, isLoading, isError },
  ] = useAddPaymentTypeMutation();
  const {
    data: editData,
    isSuccess: getSucceed,
    isFetching,
  } = useGetPaymentTypeByIdQuery(selectedRow?.id, { skip: !selectedRow?.id });
  const [getList] = useLazyGetTableListQuery();
  const [editItem, { data: editResponse, isSuccess: editSuccess }] = useEditPaymentTypeMutation();
  const { pageNumber, itemsPerPage, isActive } = useSelector( (state) => state.commonTable);

  useEffect(() => {
    if (addedData && postSuccess) {
      toast.success(addedData?.message);
      getList({
        url: Api.GetPaymentTypeList,
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
        url: Api.GetPaymentTypeList,
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
        <Modal.Title>{selectedRow?.id ? "Edit" :"Create" } Payment Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={
            selectedRow?.id ? { name: editData?.data?.name } : initialValue
          }
          validationSchema={validationSchema}
          onSubmit={(values) => {
            selectedRow?.id
              ? editItem({ id: selectedRow?.id, ...values })
              : createItem(values);
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
                <div className=" d-flex justify-content-end hstack gap-3">
                  <FormikSubmitButton>Submit</FormikSubmitButton>
                </div>
              </Row>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
