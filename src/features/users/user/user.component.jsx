import { Api } from "@/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle } from "react-use";
import { CommonLayout } from "../../layouts";
import { CommonTable, LinkButton } from "../../ui";
import { ActiveInactiveModal } from "./active-inactive-modal.component";
import { Columns } from "./columns";
import { Filter } from "./filter.component";

const breadcrumbItems = [{ name: "User" }];

export const User = () => {
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
      title="Users"
      BtnComp={<LinkButton to="/users/create" btnName="Create" />}
    >
      <CommonTable url={Api.User} columns={columns} filterComp={<Filter />} />

      {/* Status Modal */}
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
