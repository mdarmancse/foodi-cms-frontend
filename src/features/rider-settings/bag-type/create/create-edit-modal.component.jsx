import { Api } from "@/constants";
import { PageLoader } from "@/features/ui/page-loader.component";
import { useLazyGetTableListQuery } from "@/features/ui/table/common-table-api-slice";
import { FormikContext, useFormik } from "formik";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useCreateNewBagTypeMutation,
  useLazyGetIDBagTypeQuery,
  useUpdateBagTypeMutation,
} from "../bag-type-api";
import { BagTypeForm } from "./bag-type-form.component";
import { BagTypeSchema, InitialValues } from "./form.config";

export const CreateEditModal = ({ show, onClose, id = null }) => {
  const [
    createList,
    {
      data: listData,
      isSuccess: successList,
      error: errorData,
      isError: errorStatus,
    },
  ] = useCreateNewBagTypeMutation();

  const [
    getById,
    {
      data: getByIdData,
      isSuccess: getByIdSuccess,
      isFetching: getByIdFetching,
    },
  ] = useLazyGetIDBagTypeQuery();

  const [
    updateList,
    {
      data: editData,
      isSuccess: editSuccess,
      error: editErrorData,
      isError: editErrorStatus,
    },
  ] = useUpdateBagTypeMutation();

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
        url: Api.GetListOfBagTypes,
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
        url: Api.GetListOfWeekDay,
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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:
      id && getByIdSuccess
        ? {
            id,
            name: getByIdData?.data?.name,
            systemName: getByIdData?.data?.systemName,
          }
        : InitialValues,
    validationSchema: BagTypeSchema,
    onSubmit: (values) => {
      id ? updateList({ ...values, id: id }) : createList(values);
    },
  });
  return (
    <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title>{id ? "Edit Bag Type" : "Create Bag Type"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {getByIdFetching ? (
          <PageLoader />
        ) : (
          <FormikContext.Provider value={formik}>
            <BagTypeForm close={onClose} />
          </FormikContext.Provider>
        )}
      </Modal.Body>
    </Modal>
  );
};
