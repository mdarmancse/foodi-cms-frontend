import { useSelector } from "react-redux";
import { useLazyGetTableListQuery } from "../ui/table/common-table-api-slice";
import { useDeleteBatchLevelMutation } from "./batch-level-api";
import { useEffect } from "react";
import { Api } from "@/constants";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export const ActiveInactiveModal = ({ show, onClose, selectedRow }) => {
  const [deleteBatchLevel, { data, isSuccess, isLoading }] =
    useDeleteBatchLevelMutation();
  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );

  const onDelete = async () => {
    await deleteBatchLevel(selectedRow);
  };

  useEffect(() => {
    if (data && isSuccess) {
      toast.success(data?.message);
      getList({
        url: Api.GetBatchLevelList,
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
    <Modal show={show} centered size="sm" onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure want to  {isActive ? "Inactive" : "Active"} ? </p>
      </Modal.Body>
      <Modal.Footer>
        <div className="hstack gap-3">
          <Button
            variant="warning"
            size="sm"
            onClick={onClose}
            disabled={isLoading}
            
          >
            Close
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={onDelete}
            disabled={isLoading}
          >
            Confirm
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
