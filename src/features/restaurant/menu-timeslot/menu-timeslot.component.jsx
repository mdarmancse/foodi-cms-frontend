import { CommonTable, LinkButton } from "../../ui";
import { CommonLayout } from "../../layouts";
import { Api } from "@/constants";
import { useState } from "react";
import { TimeSlotMenuFilter } from "./timeslot-filter";
import { useNavigate } from "react-router-dom";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { useToggle } from "react-use";
import { Columns } from "./columns";

const breadcrumbItems = [{ name: "Menu Item TimeSlot", url: "/timeslot" }];

export const Timeslot = () => {
  const navigate = useNavigate();
  const [on, toggle] = useToggle();
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

  function handleDelete(id, isActive) {
    setSelected({ id, isActive });
    toggle();
  }

  const columns = Columns(navigate, handleDelete);

  return (
    <CommonLayout
      breadcrumbItems={breadcrumbItems}
      title="Menu Item TimeSlot"
      BtnComp={<LinkButton btnName="Create" to="/timeslot/create" />}
    >
      <CommonTable
        url={Api.GetMenuTimeSlotList}
        columns={columns}
        filterComp={<TimeSlotMenuFilter />}
      />

      {on && (
        <ActiveInactiveModal
          show={on}
          onClose={handleClose}
          selectedRow={selected}
        />
      )}
    </CommonLayout>
  );
};
