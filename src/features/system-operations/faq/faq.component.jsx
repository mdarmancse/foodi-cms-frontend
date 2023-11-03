import { CommonLayout } from "@/features/layouts";
import { CommonTable, LinkButton } from "@/features/ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle } from "react-use";
import { Columns } from "./columns";
import { Api } from "@/constants";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { Filter } from "./filter.component";
const Title = "Faq";
const breadcrumbItems = [{ name: "Foodi" }, { name: "Faq" }];

export function Faq() {
  const navigate = useNavigate();
  const [on, toggle] = useToggle();
  const [selected, setSelected] = useState({ id: null, isActive: null });

  function handleClose() {
    setSelected({ id: null, isActive: null });
    toggle();
  }

  function handleDelete(id, isActive) {
    setSelected({ id, isActive });
    toggle();
  }

  function handleEdit(id) {
    setSelected({ id: id });
  }

  const columns = Columns(navigate, handleDelete, handleEdit);

  return (
    <CommonLayout
      title={Title}
      breadcrumbItems={breadcrumbItems}
      BtnComp={<LinkButton btnName="Create" to="/faq/create" />}
    >
      <CommonTable columns={columns} url={Api.GetFaqLists} filterComp={<Filter/>} />
      {on && (
        <ActiveInactiveModal
          show={on}
          onClose={handleClose}
          selectedRow={selected}
        />
      )}
    </CommonLayout>
  );
}
