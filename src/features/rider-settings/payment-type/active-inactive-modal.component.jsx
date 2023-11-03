import { Button, Modal } from "react-bootstrap";
import { useDeletePaymentTypeMutation } from "./payment-type-api-slice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Api } from "@/constants";
import { useLazyGetTableListQuery } from "@/features/ui";

export const ActiveInactiveModal = ({ show, onClose, selectedRow }) => {
  const [deletePaymentType, { data, isSuccess, isLoading }] =
    useDeletePaymentTypeMutation();
  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );

  const onDelete = async () => {
    await deletePaymentType(selectedRow);
  };
  useEffect(() => {
    if (data && isSuccess) {
      toast.success(data?.message);
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
  }, [data]);
  return (
    <Modal show={show} size="sm" centered>
      <Modal.Header>Are you sure you want to {isActive ? "Inactive" : "Active"}?</Modal.Header>
      <Modal.Footer>
        <Button
          size="sm"
          variant="warning"
          onClick={onClose}
          disabled={isLoading}
        >
          Close
        </Button>
        <Button
          size="sm"
          variant="success"
          onClick={onDelete}
          disabled={isLoading}
        >
          Accept
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
