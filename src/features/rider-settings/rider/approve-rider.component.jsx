import { Button, Modal } from "react-bootstrap";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useApproveRiderMutation } from "./rider-api";
import { useLazyGetTableListQuery } from "../../ui/table/common-table-api-slice";
import { toast } from "react-toastify";

export const ApproveRider = ({ isModal, onHide, selectedRow }) => {
  console.log("selectedRow", selectedRow);
  const [approveRider, { data, isSuccess, isLoading }] =
    useApproveRiderMutation();
  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );

  const handleApprove = () => {
    approveRider(selectedRow);
  };

  useEffect(() => {
    if (data && isSuccess) {
      toast.success(data?.message);
      getList({
        url: "/riders/api/Rider",
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      });
      onHide();
    }
  }, [data]);

  return (
    <Modal show={isModal} centered>
      <Modal.Title className="p-2">Approve Rider</Modal.Title>
      <Modal.Body>Are you sure you want to approve this rider?</Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-end gap-1">
          <Button variant="danger" onClick={onHide}>
            No
          </Button>
          <Button variant="success" onClick={handleApprove}>
            Yes
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
