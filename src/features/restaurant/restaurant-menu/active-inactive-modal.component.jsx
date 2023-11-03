import { Api } from "@/constants";
import { useLazyGetTableListQuery } from "@/features/ui";
import { useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDeleteRestaurantMenuMutation } from "./restaurant-api-slice";

export const ActiveInactiveModal = ({ show, onClose, selectedRow }) => {
  const [deleteSpecialHour, { data, isSuccess, isLoading, error, isError }] =
    useDeleteRestaurantMenuMutation();
  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );

  const onDelete = async () => {
    await deleteSpecialHour(selectedRow);
  };

  useEffect(() => {
    if (data && isSuccess) {
      toast.success(data?.message);
      getList({
        url: Api.GetRestaurantMenuList,
        params: {
          pageNumber,
          itemsPerPage,
          isActive,
        },
      });
      onClose();
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message);
    }
  }, [isError]);

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
