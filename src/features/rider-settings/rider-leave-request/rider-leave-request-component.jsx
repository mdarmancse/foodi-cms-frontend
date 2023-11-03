import { Api } from "@/constants";
import { CommonLayout } from "@/features/layouts";
import { CommonTable, LinkButton } from "@/features/ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle } from "react-use";
import { Columns } from "./columns";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { Filter } from "./filter.component";
const Title = "Rider leave request";
const breadcrumbsItem = [{ name: "Foodi" }, { name: "Rider leave request" }];

export function RiderLeaveRequest() {
  const [on, toggle] = useToggle();
  const [selected, setSelected] = useState({ id: null, isActive: null });
  const navigate = useNavigate();

  function handleClose() {
    setSelected({ id: null, isActive: null });
    toggle();
  }

  function handleDelete(id, isActive) {
    setSelected({ id, isActive});
    toggle();
  }

  function handleEdit(id) {
    setSelected({ id: id });
  }

  const columns = Columns(navigate, handleDelete);

  return (
    <CommonLayout
      title={Title}
      breadcrumbItems={breadcrumbsItem}
      BtnComp={<LinkButton to="/rider-leave-request/create" btnName="Create" />}
    >
      <CommonTable url={Api.GetRiderLeaveRequestList} columns={columns} filterComp={<Filter/>}/>
      {on && (
        <ActiveInactiveModal
          onClose={handleClose}
          show={on}
          selectedRow={selected}
        />
      )}
    </CommonLayout>
  );
}
