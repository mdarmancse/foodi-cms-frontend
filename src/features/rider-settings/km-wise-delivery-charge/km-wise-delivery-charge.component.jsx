import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useToggle } from "react-use";
import { Columns } from "./columns";
import { CommonLayout } from "@/features/layouts";
import { CommonTable, LinkButton } from "@/features/ui";
import { Api } from "@/constants";
import { Filter } from "./filter.component";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { KmWiseDeliveryChargeCreate } from "./create";

const Title = "Kilometer Wise Delivery Charge";
const breadcrumbItems = [
  { name: "Foodi" },
  { name: "Km wise delivery charge" },
];
export function KmWiseDeliveryCharge() {
  const [on, toggle] = useToggle();
  const [onCreate, createToggle] = useToggle();
  const navigate = useNavigate();
  const [selected, setSelected] = useState({
    id: null,
    isActive: null,
  });

  function handleClose() {
    setSelected({ id: null, isActive: null });
    toggle();
  }

  function handleEditClose () {
    setSelected({ id: null, isActive: null });
    createToggle();
  }

  function handleEdit(id) {
    setSelected({ id });
    createToggle();
  }

  function handleDelete(id, isActive) {
    setSelected({ id, isActive });
    toggle();
  }
  const columns = Columns(handleDelete, handleEdit);

  return (
    <CommonLayout
      title={Title}
      breadcrumbItems={breadcrumbItems}
      columns={columns}
      BtnComp={<LinkButton btnName="Create" onClick = {createToggle} />}
    >
      <CommonTable
        columns={columns}
        url={Api.GetKmWiseChargeList}
        filterComp={<Filter />}
      />
      {on && (
        <ActiveInactiveModal
          onClose={handleClose}
          show={on}
          selectedRow={selected}
        />
      )}
      {
        onCreate && <KmWiseDeliveryChargeCreate show={onCreate} selectedRow={selected} onClose={handleEditClose}/>
      }
    </CommonLayout>
  );
}
