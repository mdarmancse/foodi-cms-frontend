import { Api } from "@/constants";
import { PageLoader } from "@/features/ui/page-loader.component";
import { useLazyGetTableListQuery } from "@/features/ui/table/common-table-api-slice";
import { FormikContext, useFormik } from "formik";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useCreateSpecialHourTypeMutation,
  useLazyGetSpecialHourTypeIdQuery,
  useUpdateSpecialHourTypeMutation,
} from "../special-hour-type-api";
import { SpecialHourTypeform } from "./special-hour-type-form.component";
import { specialHourTypeSchema, InitialValues } from "./form.config";

export const CreateEditModal = ({ show, onClose, id = null }) => {
  const [
    createData,
    {
      data: listData,
      isSuccess: successList,
      error: errorData,
      isError: errorStatus,
    },
  ] = useCreateSpecialHourTypeMutation();

  const [
    getById,
    {
      data: getByIdData,
      isSuccess: getByIdSuccess,
      isFetching: getByIdFetching,
    },
  ] = useLazyGetSpecialHourTypeIdQuery();

  const [
    updateData,
    {
      data: editData,
      isSuccess: editSuccess,
      error: editErrorData,
      isError: editErrorStatus,
    },
  ] = useUpdateSpecialHourTypeMutation();

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
        url: Api.GetListOfSpecialHourType,
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
        url: Api.GetListOfSpecialHourType,
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
            description: getByIdData?.data?.description,
          }
        : InitialValues,
    validationSchema: specialHourTypeSchema,
    onSubmit: (values) => {
      console.log("hour", values);
      id ? updateData(values) : createData(values);
    },
  });

  return (
    <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title>
          {id ? "Edit Special Hour Type" : "Create Special Hour Type"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {getByIdFetching ? (
          <PageLoader />
        ) : (
          <FormikContext.Provider value={formik}>
            <SpecialHourTypeform close={onClose} />
          </FormikContext.Provider>
        )}
      </Modal.Body>
    </Modal>
  );
};
