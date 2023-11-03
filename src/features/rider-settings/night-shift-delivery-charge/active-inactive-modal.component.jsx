import { Button, Modal } from "react-bootstrap";
import { useDeleteNightShiftDeliveryChargeMutation } from "./night-shift-delivery-charge-api";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Api } from "@/constants";
import { useLazyGetTableListQuery } from "@/features/ui";

export const ActiveInactiveModal = ({show, onClose, selectedRow}) => {
    const [deleteItem, {data,isSuccess,isLoading}] = useDeleteNightShiftDeliveryChargeMutation();
    const [getList] = useLazyGetTableListQuery();
    const {pageNumber, itemsPerPage, isActive} = useSelector((state) => state?.commonTable);

    const onDelete = async() => {
        await deleteItem(selectedRow);
    }
    useEffect(() => {
        if(data && isSuccess) {
            toast.success(data?.message);
            getList({
                url : Api.GetNightShiftDeliveryChargeList,
                params : {
                    pageNumber,
                    itemsPerPage,
                    isActive
                }
            });
            onClose();
        }
    },[data])
  return (
    <Modal show={show} size="sm" centered>
      <Modal.Header className="fw-bold py-4">
        Are you sure you want to {isActive ? "in active " : "active "}?
      </Modal.Header>
      <Modal.Footer>
        <Button size="sm" variant="warning" onClick={onClose} disabled={isLoading}>
          Close
        </Button>
        <Button size="sm" variant="success" onClick={onDelete} disabled={isLoading}>
          Accept
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
