import { CommonTable, LinkButton } from "../../ui";
import { CommonLayout } from "../../layouts";
import { Api } from "@/constants";
import { useState } from "react";
import { SystemOnOffFilter } from "./system-on-off-filter";
import { useNavigate } from "react-router-dom";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { useToggle } from "react-use";
import { Columns } from "./columns";

const breadcrumbItems = [
  { name: "System On & Off Reason", url: "/system-on-off-reason" },
];

export const SystemOnOffReason = () => {
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
      title="System On &Off Reason"
      BtnComp={
        <LinkButton btnName="Create" to="/system-on-off-reason/create" />
      }
    >
      <CommonTable
        url={Api.GetReasonListOfSystemOnOff}
        columns={columns}
        filterComp={<SystemOnOffFilter />}
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
