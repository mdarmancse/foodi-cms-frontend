import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDeleteRewardPointSettingsMutation } from "./reward-point-settings-api";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useLazyGetTableListQuery } from "@/features/ui";
import { Api } from "@/constants";

export const ActiveInactiveModal = ({show, onClose, selectedRow}) => {
  const [deleteItem, {data : deleteData,isSuccess}] = useDeleteRewardPointSettingsMutation();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );
  const [getList] = useLazyGetTableListQuery();
  const onDelete = () => {
    deleteItem(selectedRow);
  }

  useEffect(() => {
    if(deleteData && isSuccess) {
      toast.success(deleteData?.message);
      getList({
        url: Api.GetRewardPointSettingsList,
        params : {
          pageNumber,
          itemsPerPage,
          isActive,
        }
      });
      onClose();
    }
  },[deleteData])
  return (
    <Modal show={show} centered>
      <Modal.Header>
        Are you sure want to {isActive ? "inactive" : "active"} ?
      </Modal.Header>
      <Modal.Footer>
        <Button variant="danger" size="sm" onClick={onClose} >
          Close
        </Button>
        <Button variant="primary" size="sm" 
        onClick={onDelete}
        >
          Accept
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

