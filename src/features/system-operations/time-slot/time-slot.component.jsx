import { CommonLayout } from "@/features/layouts";
import { CommonTable, LinkButton } from "@/features/ui";
import { useState } from "react";
import { useToggle } from "react-use";
import { Columns } from "./columns";
import { Api } from "@/constants";
import { Filter } from "./filter.component";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { useNavigate } from "react-router-dom";

const title = "Time slot";
const breacrumbItems = [{ name: "Foodi" }, { name: "Time slot" }];

export const SystemTimeslot = () => {
  const [on, toggle] = useToggle();
  const [selected, setSelected] = useState({ id: null, isActive: null });
  const navigate = useNavigate();

  function handleDelete(id, isActive) {
    setSelected({id,isActive});
    toggle();
  }

  function handleClose() {
    setSelected({id : null,isActive : null});
    toggle();
  }

  const columns = Columns(handleDelete,navigate);
  return (
    <CommonLayout
      title={title}
      breadcrumbItems={breacrumbItems}
      BtnComp={<LinkButton btnName="Create" to="/systemOperation/time-slot/create" />}
    >
        <CommonTable columns={columns} url={Api.GetPlatformTimeSlot} filterComp={<Filter/>}/>
        {on && <ActiveInactiveModal show={on} selectedRow = {selected} onClose={handleClose}/>}
    </CommonLayout>
  );
};
