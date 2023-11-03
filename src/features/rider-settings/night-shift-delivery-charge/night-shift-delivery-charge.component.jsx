import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle } from "react-use";
import { Columns } from "./columns";
import { Api } from "@/constants";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { NightShiftDeliveryChargeCreate } from "./create/night-shift-deliverycharge.create.component";
import { CommonLayout } from "@/features/layouts";
import { CommonTable, LinkButton } from "@/features/ui";

const Title = "Night Shift Delivery Charge";
const breadcrumbItems = [
  { name: "Foodi" },
  { name: "Night shift delivery charge" },
];

export function NightShiftDeliveryCharge() {
  const [on, toggle] = useToggle();
  const [onCreate, createToggle] = useToggle();
  const navigate = useNavigate();
  const [selected, setSelected] = useState({
    id: null,
    isActive: null,
  });

  function handleClose() {
    setSelected({
      id: null,
      isActive: null,
    });
    toggle();
  }

  function handleEditClose() {
    setSelected({
      id: null,
      isActive: null,
    });
    createToggle();
  }

  function handleEdit(id) {
    setSelected({ id: id });
    createToggle();
  }

  function handleDelete(id, isActive) {
    setSelected({ id, isActive });
    toggle();
  }

  const columns = Columns(handleEdit, handleDelete);

  return (
    <CommonLayout
      title={Title}
      breadcrumbItems={breadcrumbItems}
      BtnComp={<LinkButton btnName="Create" onClick={createToggle} />}
    >
      <CommonTable
        columns={columns}
        url={Api.GetNightShiftDeliveryChargeList}
      />
      {on && (<ActiveInactiveModal show={on} onClose={handleClose} selectedRow={selected}/>)}
      {onCreate && (<NightShiftDeliveryChargeCreate show={onCreate} onClose={handleEditClose} selectedRow={selected}/>)}
    </CommonLayout>
  );
}
