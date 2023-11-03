import { Button, Modal } from "react-bootstrap";
import { useDeleteRiderLeaveRequestMutation } from "./rider-leave-request-api";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useLazyGetTableListQuery } from "@/features/ui";
import { toast } from "react-toastify";
import { Api } from "@/constants";

export const ActiveInactiveModal = ({show, onClose, selectedRow}) => {
  const [deleteRider,{data: deleteData, isSuccess}] = useDeleteRiderLeaveRequestMutation();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );
 
  const [getList] = useLazyGetTableListQuery();
  useEffect(() => {
    if (deleteData && isSuccess) {
      toast.success(deleteData?.message);
      getList({
        url: Api.GetRiderLeaveRequestList,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      });
      onClose();
    }
  }, [deleteData]);
  const onDelete = () => {
    deleteRider(selectedRow);
  }
  return (
    <Modal show={show} centered>
      <Modal.Header>
        Are you sure you want to {selectedRow?.id ? "update" : "create"} ?
      </Modal.Header>
      <Modal.Footer>
        <Button size="sm" variant="danger" onClick={onClose}>
          Close
        </Button>
        <Button size="sm" variant="primary" onClick={onDelete}>
          Accept
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
