import { Button, Modal } from "react-bootstrap";
import { useDeleteFaqMutation } from "./faq-api";
import { useSelector } from "react-redux";
import { useLazyGetTableListQuery } from "@/features/ui";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Api } from "@/constants";

export const ActiveInactiveModal = ({ show, onClose, selectedRow }) => {
  const [deleteItem, { data: deleteData, isSuccess }] = useDeleteFaqMutation();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state?.commonTable
  );
  const [getList] = useLazyGetTableListQuery();
  function onDelete() {
    deleteItem(selectedRow);
  }

  useEffect(() => {
    if (deleteData && isSuccess) {
      toast.success(deleteData?.message);
      getList({
        url: Api.GetFaqLists,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      }),
        onClose();
    }
  }, [deleteData]);
  return (
    <Modal centered show={show}>
      <Modal.Header>
        Are you sure want to{" "}
        {selectedRow?.isActive == true ? "inactive" : "active"} ?
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
