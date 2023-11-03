import { useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLazyGetTableListQuery } from "../../ui/table/common-table-api-slice";
import { useDeletePermissionMutation } from "./permission-api";

export const ActiveInactiveModal = ({ show, onClose, selectedRow }) => {
  const [deletePermission, { data, isSuccess, isLoading }] =
    useDeletePermissionMutation();
  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );

  console.log("selected", selectedRow);

  const onDelete = async () => {
    await deletePermission(selectedRow);
  };

  useEffect(() => {
    if (data && isSuccess) {
      toast.success(data?.message);
      getList({
        url: "/riders/api/BatchWiseShiftBookingConfig",
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
    <Modal
      show={show}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className=" fw-bold py-4">
        Are you want to sure {isActive ? "Inactive" : "Active"} ?
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
