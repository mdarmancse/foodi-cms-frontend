import { Api } from "@/constants";
import { PageLoader } from "@/features/ui/page-loader.component";
import { useLazyGetTableListQuery } from "@/features/ui/table/common-table-api-slice";
import { FormikContext, useFormik } from "formik";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useCreateAmountThresholdMutation,
  useLazyGetAmountThresholdIdQuery,
  useUpdateAmountThresholdMutation,
} from "../amount-thresholds-api";
import { AmountThresholdform } from "./amount-threshold-form.component";
import { AmountThresholdSchema, InitialValues } from "./form.config";

export const AmountThresholdModal = ({ show, onClose, id = null }) => {
  const [
    createData,
    {
      data: listData,
      isSuccess: successList,
      error: errorData,
      isError: errorStatus,
    },
  ] = useCreateAmountThresholdMutation();

  const [
    getById,
    { data: patchID, isSuccess: getByIdSuccess, isFetching: getByIdFetching },
  ] = useLazyGetAmountThresholdIdQuery();

  const [
    updateData,
    {
      data: editData,
      isSuccess: editSuccess,
      error: editErrorData,
      isError: editErrorStatus,
    },
  ] = useUpdateAmountThresholdMutation();

  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );

  useEffect(() => {
    if (id) {
      getById(id);
    }
  }, [id]);

  useEffect(() => {
    if (listData && successList) {
      toast.success(listData?.message);
      onClose();
      formik.resetForm();
      getList({
        url: Api.GetThresholdList,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      });
    }
    if (errorData && errorStatus) {
      toast.error(errorData?.data?.message);
      formik.setSubmitting(false);
    }
  }, [listData, successList, errorData, errorStatus]);

  useEffect(() => {
    if (editData && editSuccess) {
      toast.success(editData?.message);
      onClose();
      formik.resetForm();
      getList({
        url: Api.GetThresholdList,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      });
    }
    if (editErrorData && editErrorStatus) {
      toast.error(editErrorData?.data?.message);
      formik.setSubmitting(false);
    }
  }, [editData, editSuccess, editErrorData, editErrorStatus]);

  const handleSubmit = (values) => {
    values.zoneId = parseInt(values.zoneId);
    values.amount = values.amount.toString();
    id ? updateData({ ...values, id: id }) : createData(values);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:
      id && getByIdSuccess
        ? {
            id,
            zoneId: patchID?.data?.zoneId,
            amount: patchID?.data?.amount,
          }
        : InitialValues,
    validationSchema: AmountThresholdSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title>
          {id ? "Edit Amount Threshold" : "Create Amount Threshold"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {getByIdFetching ? (
          <PageLoader />
        ) : (
          <FormikContext.Provider value={formik}>
            <AmountThresholdform close={onClose} />
          </FormikContext.Provider>
        )}
      </Modal.Body>
    </Modal>
  );
};
