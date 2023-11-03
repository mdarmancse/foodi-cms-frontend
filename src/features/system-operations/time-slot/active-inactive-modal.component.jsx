import { Button, Modal } from "react-bootstrap"
import { useDeleteTimeSlotMutation } from "./time-slot-api";
import { useLazyGetTableListQuery } from "@/features/ui";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Api } from "@/constants";

export const ActiveInactiveModal = ({show, selectedRow, onClose}) => {
    const [deleteItem, {data : deleteData, isSuccess}] = useDeleteTimeSlotMutation();
    const {pageNumber, itemsPerPage, isActive} = useSelector((state) => state?.commonTable);
    const [getList] = useLazyGetTableListQuery();

    function handleDelete() {
        deleteItem(selectedRow);
    }

    useEffect(() => {
        if(deleteData && isSuccess) {
            toast.success(deleteData?.message);
            getList({
                url: Api.GetPlatformTimeSlot,
                params : {
                    pageNumber,
                    itemsPerPage,
                    isActive
                }
            }),
            onClose();
        }
    },[deleteData])
    return (
        <Modal show={show} size="sm" centered>
            <Modal.Header>Are you sure want to active ?</Modal.Header>
            <Modal.Footer>
                <Button size="sm" variant="danger" onClick={onClose}>
                    Close
                </Button>
                 
                 <Button size="sm" variant="primary" onClick={handleDelete}>
                    Accept
                </Button>
            </Modal.Footer>
        </Modal>
    )
}