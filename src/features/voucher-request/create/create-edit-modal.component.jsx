import { Api } from "@/constants";
import { useLazyGetTableListQuery } from "@/features/ui";
import { PageLoader } from "@/features/ui/page-loader.component";
import { FormikContext, useFormik } from "formik";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { VoucherRequestForm } from "./voucher-form.component";
import { InitialValues, VoucherRewquestSchema } from "./form.config";
import { useUpdateVoucherRequestMutation } from "../voucher-request-api-slice";

export const CreateEditModal = ({
  show,
  onClose,
  id = null,
  point = 0,
  approved = false,
}) => {
  const [
    editAction,
    {
      data: editData,
      isSuccess: editSuccess,
      error: editErrorData,
      isError: editErrorStatus,
    },
  ] = useUpdateVoucherRequestMutation();

  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );

  console.log({ id, approved, point });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { isApproved: approved, point: point },

    validationSchema: VoucherRewquestSchema,

    async onSubmit(values) {
      await editAction({ ...values, id: id });
    },
  });

  useEffect(() => {
    if (editData && editSuccess) {
      toast.success(editData?.message);
      onClose();

      getList({
        url: Api.VoucherRequest,
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
        <Modal.Title>Update Voucher Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormikContext.Provider value={formik}>
          <VoucherRequestForm close={onClose} />
        </FormikContext.Provider>
      </Modal.Body>
    </Modal>
  );
};
