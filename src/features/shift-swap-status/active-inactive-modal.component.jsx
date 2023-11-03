import { Button, Modal, Spinner } from "react-bootstrap";
import {
  useDeleteShiftSwapStatusMutation,
  useLazyGetShiftSwapStatusQuery,
} from "./shift-swap-staus-api";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Api } from "@/constants";

export const ActiveInactiveModal = ({ show, onClose, selectedRow }) => {
  const [deleteShiftSwap, {data, isSuccess ,isLoading}] =
    useDeleteShiftSwapStatusMutation();
  const [getList] = useLazyGetShiftSwapStatusQuery();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );

  const onDelete = async () => {
    await deleteShiftSwap(selectedRow);
  };

  useEffect(() => {
    if (data && isSuccess) {
      toast.success(data?.message);
      getList({
        url: Api.GetShiftSwapStatusList,
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
      <Modal.Header className="fw-bold py-4">
        Are you sure you want to {isActive ? "Inactive" : "Active"} ?
      </Modal.Header>
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
          {isLoading && <Spinner size="sm" className="me-2" />}
          Accept
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
