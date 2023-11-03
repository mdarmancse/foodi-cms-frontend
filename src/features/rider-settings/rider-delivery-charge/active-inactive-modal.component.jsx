import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDeleteRiderDeliveryChargeMutation } from "./rider-delivery-charge-api";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Api } from "@/constants";
import { useLazyGetTableListQuery } from "@/features/ui";

export const ActiveInactiveModal = ({ show, onClose, selectedRow }) => {
  const [deleteItem, { data: deleteResponse, isSuccess, isLoading }] =
    useDeleteRiderDeliveryChargeMutation();
  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );
  function onDelete() {
    deleteItem(selectedRow);
  }
  useEffect(() => {
    if (deleteResponse && isSuccess) {
      toast.success(deleteResponse.message);
      getList({
        url: Api.RiderdeliveryChargeList,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      });
      onClose();
    }
  }, [deleteResponse]);
  return (
    <Modal centered show={show}>
      <Modal.Header>
        Are you sure want to {isActive ? "inactive" : "active"} ?
      </Modal.Header>
      <Modal.Footer>
        <Button
          variant="danger"
          size="sm"
          onClick={onClose}
          disabled={isLoading}
        >
          Close
        </Button>
        <Button
          variant="primary"
          size="sm"
          disabled={isLoading}
          onClick={onDelete}
        >
          Accept
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
