import { Api } from "@/constants";
import { useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLazyGetTableListQuery } from "../../ui/table/common-table-api-slice";
import { useRemoveIdOfBagTypeMutation } from "./bag-type-api";

export const ActiveInactiveModal = ({ show, onClose, selectedRow }) => {
  const [removeId, { data, isSuccess, isLoading }] =
    useRemoveIdOfBagTypeMutation();

  const [getList] = useLazyGetTableListQuery();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );

  const onDelete = async () => {
    await removeId(selectedRow);
  };

  useEffect(() => {
    if (data && isSuccess) {
      toast.success(data?.message);
      getList({
        url: Api.GetListOfBagTypes,
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
