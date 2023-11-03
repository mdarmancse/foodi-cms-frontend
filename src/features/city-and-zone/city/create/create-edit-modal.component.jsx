import { Api } from "@/constants";
import { useLazyGetTableListQuery } from "@/features/ui";
import { PageLoader } from "@/features/ui/page-loader.component";
import { FormikContext, useFormik } from "formik";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useCreateCityMutation,
  useLazyGetSingleCityQuery,
  useUpdateCityMutation,
} from "../..";
import { CityForm } from "./city-create-form.component";
import { CitySchema, InitialValues } from "./form.config";

export const CreateEditModal = ({ show, onClose, id = null }) => {
  const [
    addAction,
    {
      data: addData,
      isSuccess: addSuccess,
      error: addErrorData,
      isError: addErrorStatus,
    },
  ] = useCreateCityMutation();

  const [
    getById,
    {
      data: getByIdData,
      isSuccess: getByIdSuccess,
      isFetching: getByIdFetching,
    },
  ] = useLazyGetSingleCityQuery();

  const [
    editAction,
    {
      data: editData,
      isSuccess: editSuccess,
      error: editErrorData,
      isError: editErrorStatus,
    },
  ] = useUpdateCityMutation();

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

    validationSchema: CitySchema,

    async onSubmit(values) {
      id ? await editAction({ ...values, id: id }) : await addAction(values);
    },
  });

  useEffect(() => {
    if (addData && addSuccess) {
      toast.success(addData?.message);
      onClose();

      getList({
        url: Api.City,
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
        url: Api.City,
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
        <Modal.Title>{id ? "Edit City" : "Add City"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {getByIdFetching ? (
          <PageLoader />
        ) : (
          <FormikContext.Provider value={formik}>
            <CityForm close={onClose} />
          </FormikContext.Provider>
        )}
      </Modal.Body>
    </Modal>
  );
};
