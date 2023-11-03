import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDeleteRoleMutation } from "./roles-api";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Api } from "@/constants";

export const ActiveInactiveModal = ({ show , selectedRow, onClose}) => {
    const [deleteRole, {data : deleteResponse,isSuccess,error : errorDelete}] = useDeleteRoleMutation();
  const { pageNumber, itemsPerPage, isActive } = useSelector(
    (state) => state.commonTable
  );
  const [getList] = useLazyGetTableListQuery();
  function onDelete () {
    deleteRole(selectedRow);
  }
  useEffect(() => {
    if(deleteResponse &&  isSuccess){
        toast.success(deleteResponse?.message);
        getList({
            url : Api.GetRolesList,
            params : {
                pageNumber,
                itemsPerPage,
                isActive
            }
        });
        onClose();
    }
  },[deleteResponse])
  useEffect(() => {
    if(errorDelete){
        toast.error(errorDelete?.message);
        onClose();
    }
  },[errorDelete])
  return (
    <Modal size="sm" centered show={show}>
      <Modal.Header>
        Are you sure want to {isActive == true ? "inactive" : "active"} ?
      </Modal.Header>
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
