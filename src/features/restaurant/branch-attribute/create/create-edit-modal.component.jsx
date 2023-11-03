import { PageLoader } from "@/features/ui/page-loader.component";
import { FormikContext, useFormik } from "formik";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Api } from "@/constants";
import { useLazyGetTableListQuery } from "@/features/ui";
import { convertToFormData } from "@/helper";
import {
  useAddBranchAttributeMutation,
  useEditBranchAttributeMutation,
  useLazyGetByIdBranchAttributeQuery,
} from "../..";
import { BranchAttributeForm } from "./create-form.component";
import { BranchAttributeSchema, InitialValues } from "./form.config";

export const CreateEditModal = ({ show, onClose, id = null }) => {
  const [
    addAction,
    {
      data: addData,
      isSuccess: addSuccess,
      error: addErrorData,
      isError: addErrorStatus,
    },
  ] = useAddBranchAttributeMutation();

  const [
    getById,
    {
      data: getByIdData,
      isSuccess: getByIdSuccess,
      isFetching: getByIdFetching,
    },
  ] = useLazyGetByIdBranchAttributeQuery();

  const [
    editAction,
    {
      data: editData,
      isSuccess: editSuccess,
      error: editErrorData,
      isError: editErrorStatus,
    },
  ] = useEditBranchAttributeMutation();

  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );

  useEffect(() => {
    if (id) {
      getById(id);
    }
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: id && getByIdSuccess ? getByIdData : InitialValues,

    validationSchema: BranchAttributeSchema,

    async onSubmit(values) {
      const formData = convertToFormData(values);
      id ? await editAction({ id, data: formData }) : await addAction(formData);
    },
  });

  useEffect(() => {
    if (addData && addSuccess) {
      toast.success(addData?.message);
      onClose();
      getList({
        url: Api.BranchAttribute,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      });
    }
    if (addErrorData && addErrorStatus) {
      toast.error(addErrorData?.data?.message);
    }
  }, [addData, addSuccess, addErrorData, addErrorStatus]);

  useEffect(() => {
    if (editData && editSuccess) {
      toast.success(editData?.message);
      onClose();

      getList({
        url: Api.BranchAttribute,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      });
    }
    if (editErrorData && editErrorStatus) {
      toast.error(editErrorData?.data?.message);
    }
  }, [editData, editSuccess, editErrorData, editErrorStatus]);

  return (
    <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title>
          {id ? "Edit Branch Attribute" : "Add Branch Attribute"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {getByIdFetching ? (
          <PageLoader />
        ) : (
          <FormikContext.Provider value={formik}>
            <BranchAttributeForm close={onClose} />
          </FormikContext.Provider>
        )}
      </Modal.Body>
    </Modal>
  );
};
