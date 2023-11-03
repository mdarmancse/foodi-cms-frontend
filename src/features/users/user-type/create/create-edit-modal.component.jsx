import { Api } from "@/constants";
import { useLazyGetTableListQuery } from "@/features/ui";
import { PageLoader } from "@/features/ui/page-loader.component";
import { FormikContext, useFormik } from "formik";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useCreateUserTypeMutation,
  useLazyGetSingleUserTypeQuery,
  useUpdateUserTypeMutation,
} from "../..";
import { InitialValues, UserTypeSchema } from "./form.config";
import { UserTypeForm } from "./user-type-create-form.component";

export const CreateEditModal = ({ show, onClose, id = null }) => {
  const [
    addAction,
    {
      data: addData,
      isSuccess: addSuccess,
      error: addErrorData,
      isError: addErrorStatus,
    },
  ] = useCreateUserTypeMutation();

  const [
    getById,
    {
      data: getByIdData,
      isSuccess: getByIdSuccess,
      isFetching: getByIdFetching,
    },
  ] = useLazyGetSingleUserTypeQuery();

  const [
    editAction,
    {
      data: editData,
      isSuccess: editSuccess,
      error: editErrorData,
      isError: editErrorStatus,
    },
  ] = useUpdateUserTypeMutation();

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
    initialValues: id && getByIdSuccess ? getByIdData.data : InitialValues,

    validationSchema: UserTypeSchema,

    async onSubmit(values) {
      id ? await editAction({ ...values, id: id }) : await addAction(values);
    },
  });

  useEffect(() => {
    if (addData && addSuccess) {
      toast.success(addData?.message);
      onClose();

      getList({
        url: Api.UserType,
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
        url: Api.UserType,
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
        <Modal.Title>{id ? "Edit User Type" : "Add User Type"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {getByIdFetching ? (
          <PageLoader />
        ) : (
          <FormikContext.Provider value={formik}>
            <UserTypeForm close={onClose} />
          </FormikContext.Provider>
        )}
      </Modal.Body>
    </Modal>
  );
};
